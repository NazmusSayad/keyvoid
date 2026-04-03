'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  BetterDialog,
  BetterDialogContent,
} from '@/components/ui/better-dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RECORD_TYPES } from '@/features/vault/constants/types'
import { queryClient } from '@/lib/query-client'
import { encryptRecordClient } from '@/lib/record-encrypt-client'
import { createVaultRecordAction } from '@/server/vault/vault-record'
import { useAuthStore } from '@/store/use-auth-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { File01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useMutation } from '@tanstack/react-query'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { CreateRecordDataForm } from './create-record-data-form'
import { CreateRecordMetadataForm } from './create-record-metadata-form'

type RecordCreateDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  vaultId: string
}

type RecordCreateDialogContentProps = {
  onOpenChange: (open: boolean) => void
  vaultId: string
}

function createDataFieldValueSchema(
  type: 'text' | 'textarea' | 'number' | 'boolean'
) {
  if (type === 'number') {
    return z
      .string()
      .trim()
      .min(1, 'Enter a value.')
      .refine((value) => !Number.isNaN(Number(value)), 'Enter a valid number.')
  }

  if (type === 'boolean') {
    return z.enum(['true', 'false'], {
      message: 'Select true or false.',
    })
  }

  return z.string().trim().min(1, 'Enter a value.')
}

const recordCreateFormSchema = z
  .object({
    name: z.string().trim().min(1, 'Enter a record name.'),
    type: z.string().trim().min(1, 'Select a record type.'),
    data: z.record(z.string(), z.string()),
    metadata: z.array(
      z.object({
        key: z.string(),
        value: z.string(),
      })
    ),
  })
  .superRefine((value, context) => {
    const selectedRecordType = RECORD_TYPES.find(
      (recordType) => recordType.id === value.type
    )

    if (!selectedRecordType) {
      context.addIssue({
        code: 'custom',
        message: 'Select a valid record type.',
        path: ['type'],
      })
      return
    }

    const dataSchema = z
      .object(
        Object.fromEntries(
          selectedRecordType.fields.map((field) => [
            field.id,
            createDataFieldValueSchema(field.type),
          ])
        )
      )
      .strict()

    const dataResult = dataSchema.safeParse(value.data)

    if (dataResult.success) {
      return
    }

    for (const issue of dataResult.error.issues) {
      context.addIssue({
        ...issue,
        path: ['data', ...issue.path],
      })
    }
  })

export type CreateRecordFormValues = z.infer<typeof recordCreateFormSchema>

export function CreateRecordDialog({
  open,
  onOpenChange,
  vaultId,
}: RecordCreateDialogProps) {
  return (
    <BetterDialog open={open} onOpenChange={onOpenChange} width="56rem">
      <CreateRecordDialogContent
        vaultId={vaultId}
        onOpenChange={onOpenChange}
      />
    </BetterDialog>
  )
}

function CreateRecordDialogContent({
  onOpenChange,
  vaultId,
}: RecordCreateDialogContentProps) {
  const auth = useAuthStore(
    (state) => state.vaultAuthByVaultId[vaultId] ?? null
  )
  const formRef = useRef<HTMLFormElement>(null)
  const form = useForm<CreateRecordFormValues>({
    defaultValues: {
      name: '',
      type: '',
      data: {},
      metadata: [],
    },
    resolver: zodResolver(recordCreateFormSchema),
  })
  const createRecordMutation = useMutation({
    mutationFn: async (input: {
      data: Record<string, string>
      metadata: [string, string][]
      name: string
      type: string
    }) => {
      if (!auth) {
        throw new Error('Unlock this vault first.')
      }

      const encrypted = await encryptRecordClient({
        key: auth,
        data: input.data,
        metadata: input.metadata.length > 0 ? input.metadata : undefined,
      })

      return createVaultRecordAction({
        auth,
        data: encrypted.data ?? undefined,
        metadata: encrypted.metadata ?? undefined,
        name: input.name,
        type: input.type,
        vaultId,
      })
    },
    onSuccess: async () => {
      onOpenChange(false)

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['vault', vaultId] }),
        queryClient.invalidateQueries({ queryKey: ['vault-record', vaultId] }),
        queryClient.invalidateQueries({ queryKey: ['vaults'] }),
      ])

      toast.success('Record created.')
    },
  })

  return (
    <BetterDialogContent
      title="Create a new record"
      description="Add the name, choose the type, and define the key-value fields."
      className="space-y-1"
      footerCancel
      footerSubmit="Create record"
      footerSubmitIcon={<HugeiconsIcon icon={File01Icon} className="size-4" />}
      footerSubmitLoading={createRecordMutation.isPending}
      onFooterSubmitClick={() => formRef.current?.requestSubmit()}
    >
      <Form {...form}>
        <form
          ref={formRef}
          className="space-y-6"
          onSubmit={form.handleSubmit((values) => {
            createRecordMutation.mutate(
              {
                data: values.data,
                metadata: values.metadata
                  .map(
                    (field) =>
                      [field.key.trim(), field.value.trim()] as [string, string]
                  )
                  .filter(
                    (field) => field[0].length > 0 && field[1].length > 0
                  ),
                name: values.name,
                type: values.type,
              },
              {
                onError: (mutationError) => {
                  form.setError('root', {
                    message:
                      mutationError instanceof Error
                        ? mutationError.message
                        : 'Could not create the record.',
                  })
                },
              }
            )
          })}
        >
          <fieldset
            disabled={createRecordMutation.isPending}
            className="space-y-6 disabled:pointer-events-none disabled:opacity-80"
          >
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_16rem]">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Record name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Primary database" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Record type</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(nextType) => {
                          const selectedRecordType = RECORD_TYPES.find(
                            (recordType) => recordType.id === nextType
                          )

                          field.onChange(nextType)

                          if (!selectedRecordType) {
                            return
                          }

                          form.setValue(
                            'data',
                            Object.fromEntries(
                              selectedRecordType.fields.map((recordField) => [
                                recordField.id,
                                '',
                              ])
                            ),
                            { shouldValidate: true }
                          )
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a record type" />
                        </SelectTrigger>

                        <SelectContent>
                          {RECORD_TYPES.map((recordType) => (
                            <SelectItem
                              key={recordType.id}
                              value={recordType.id}
                            >
                              {recordType.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <CreateRecordDataForm />
            <CreateRecordMetadataForm />
          </fieldset>

          {form.formState.errors.root?.message ? (
            <Alert variant="destructive">
              <AlertTitle>Could not save record</AlertTitle>
              <AlertDescription>
                {form.formState.errors.root.message}
              </AlertDescription>
            </Alert>
          ) : null}
        </form>
      </Form>
    </BetterDialogContent>
  )
}
