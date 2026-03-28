import { z } from 'zod'

const serverEnvSchema = z.object({
  APP_URL: z.url(),
  DATABASE_URL: z.url(),

  WORKOS_API_KEY: z.string().min(1),
  WORKOS_CLIENT_ID: z.string().min(1),
  WORKOS_COOKIE_PASSWORD: z.string().min(32),
  WORKOS_REDIRECT_URI: z.url(),

  JWT_SECRET: z.string(),
  JWT_REGISTER_SECRET: z.string(),
  JWT_RESET_PASSWORD_SECRET: z.string(),
})

export const serverEnv = serverEnvSchema.parse({
  ...process.env,
  APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  WORKOS_REDIRECT_URI: process.env.NEXT_PUBLIC_WORKOS_REDIRECT_URI,
})
