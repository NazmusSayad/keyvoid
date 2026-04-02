import z from 'zod'

export const SessionUser = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  avatarUrl: z.string().nullable(),
})

export type SessionUserType = z.infer<typeof SessionUser>
