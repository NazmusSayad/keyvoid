import z from 'zod'

export const SessionUser = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  avatarUrl: z.string().nullable(),
})

export const PublicVault = z.object({
  id: z.string(),

  createdAt: z.string(),
  updatedAt: z.string(),

  name: z.string(),
  icon: z.string().nullable(),
})

export const PublicRecord = z.object({
  id: z.string(),

  createdAt: z.string(),
  updatedAt: z.string(),

  name: z.string(),
  type: z.string(),

  data: z.record(z.string(), z.string()),
  metadata: z.array(z.tuple([z.string(), z.string()])),
})

export type SessionUserType = z.infer<typeof SessionUser>
export type PublicVaultType = z.infer<typeof PublicVault>
export type PublicRecordType = z.infer<typeof PublicRecord>
