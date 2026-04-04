'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { zodResolver } from '@hookform/resolvers/zod'
import { ViewIcon, ViewOffIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const requestRegisterFormSchema = z.object({
  email: z.email('Enter a valid email address.'),
  name: z.string().trim().min(1, 'Enter your name.'),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
})

type RequestRegisterFormData = z.infer<typeof requestRegisterFormSchema>

export function RequestRegisterForm({
  defaultData,
  onSubmit,
}: {
  defaultData: Partial<RequestRegisterFormData>
  onSubmit: (data: RequestRegisterFormData) => Promise<void> | void
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const form = useForm({
    defaultValues: {
      email: defaultData.email ?? '',
      name: defaultData.name ?? '',
      password: defaultData.password ?? '',
    },
    resolver: zodResolver(requestRegisterFormSchema),
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Your name"
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="name@company.com"
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative isolate">
                  <Input
                    {...field}
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder="Password"
                    disabled={form.formState.isSubmitting}
                  />

                  <Button
                    size="sm"
                    type="button"
                    variant="ghost"
                    className="absolute top-1/2 right-1.5 size-6 -translate-y-1/2"
                    onClick={() => setIsPasswordVisible((prev) => !prev)}
                  >
                    <HugeiconsIcon
                      className="size-3.5"
                      icon={isPasswordVisible ? ViewIcon : ViewOffIcon}
                    />
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          Continue
          {form.formState.isSubmitting && <Spinner />}
        </Button>
      </form>
    </Form>
  )
}
