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

const loginFormSchema = z.object({
  email: z.email('Enter a valid email address.'),
  password: z.string().min(1, 'Enter your password.'),
})

type LoginFormData = z.infer<typeof loginFormSchema>

export function LoginForm({
  defaultData,
  onSubmit,
}: {
  defaultData: Partial<LoginFormData>
  onSubmit: (data: LoginFormData) => Promise<void> | void
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const form = useForm({
    defaultValues: {
      email: defaultData.email ?? '',
      password: defaultData.password ?? '',
    },
    resolver: zodResolver(loginFormSchema),
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    placeholder="Password"
                    disabled={form.formState.isSubmitting}
                    type={isPasswordVisible ? 'text' : 'password'}
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
          Sign in
          {form.formState.isSubmitting && <Spinner />}
        </Button>
      </form>
    </Form>
  )
}
