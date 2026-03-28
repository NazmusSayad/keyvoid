import { z } from 'zod'

const serverEnvSchema = z.object({
  APP_URL: z.url(),
  DATABASE_URL: z.url(),

  JWT_SECRET: z.string(),
  JWT_REGISTER_SECRET: z.string(),
  JWT_RESET_PASSWORD_SECRET: z.string(),
})

export const serverEnv = serverEnvSchema.parse({
  ...process.env,
  APP_URL: process.env.NEXT_PUBLIC_APP_URL,
})
