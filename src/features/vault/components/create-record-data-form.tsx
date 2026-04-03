'use client'

import {
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
import { Textarea } from '@/components/ui/textarea'
import { RECORD_TYPES } from '@/features/vault/constants/types'
import { useFormContext } from 'react-hook-form'
import type { CreateRecordFormValues } from './create-record-dialog'

export function CreateRecordDataForm() {
  const form = useFormContext<CreateRecordFormValues>()
  const selectedRecordType = RECORD_TYPES.find(
    (recordType) => recordType.id === form.watch('type')
  )

  if (!selectedRecordType) {
    return (
      <p className="text-muted-foreground text-sm">
        Choose a record type above to see its fields.
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {selectedRecordType.fields.map((recordField) => (
        <FormField
          key={recordField.id}
          control={form.control}
          name={`data.${recordField.id}`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{recordField.name}</FormLabel>
              <FormControl>
                {recordField.type === 'textarea' ? (
                  <Textarea
                    {...field}
                    placeholder={`Enter ${recordField.name.toLowerCase()}`}
                  />
                ) : recordField.type === 'boolean' ? (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a value" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="true">True</SelectItem>
                      <SelectItem value="false">False</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    {...field}
                    type={recordField.type === 'number' ? 'number' : 'text'}
                    placeholder={`Enter ${recordField.name.toLowerCase()}`}
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  )
}
