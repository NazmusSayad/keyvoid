import { z } from 'zod'

const serverEnvSchema = z.object({
  APP_URL: z.url(),
  DATABASE_URL: z.url(),

  WORKOS_API_KEY: z.string(),
  WORKOS_CLIENT_ID: z.string(),
  WORKOS_COOKIE_PASSWORD: z.string(),
  WORKOS_REDIRECT_URI: z.url(),
})

export const serverEnv = serverEnvSchema.parse({
  ...process.env,
  APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  WORKOS_REDIRECT_URI: process.env.NEXT_PUBLIC_WORKOS_REDIRECT_URI,
})
