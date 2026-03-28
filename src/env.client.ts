'use client'

import { z } from 'zod'

const clientEnvSchema = z.object({
  APP_URL: z.url(),
  WORKOS_REDIRECT_URI: z.url(),
})

export const clientEnv = clientEnvSchema.parse({
  APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  WORKOS_REDIRECT_URI: process.env.NEXT_PUBLIC_WORKOS_REDIRECT_URI,
})
