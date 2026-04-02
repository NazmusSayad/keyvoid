import z from 'zod'

export const SessionUser = z.object({
  id: z.string(),

  name: z.string(),
  email: z.string(),

  avatarUrl: z
    .string()
    .nullable()
    .optional()
    .transform((o) => o || undefined),
})

export const PublicVault = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

  name: z.string(),
  icon: z
    .string()
    .nullable()
    .optional()
    .transform((o) => o || undefined),
})

export const PublicRecordData = z.record(z.string(), z.string())

export const PublicRecordMetadata = z.array(z.tuple([z.string(), z.string()]))

export const PublicRecord = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

  name: z.string(),
  type: z
    .string()
    .nullable()
    .optional()
    .transform((o) => o || undefined),

  data: PublicRecordData.nullable()
    .optional()
    .transform((o) => o || undefined),

  metadata: PublicRecordMetadata.nullable()
    .optional()
    .transform((o) => o || undefined),
})

export type SessionUserType = z.infer<typeof SessionUser>
export type PublicVaultType = z.infer<typeof PublicVault>
export type PublicRecordDataType = z.infer<typeof PublicRecordData>
export type PublicRecordMetadataType = z.infer<typeof PublicRecordMetadata>
export type PublicRecordType = z.infer<typeof PublicRecord>
