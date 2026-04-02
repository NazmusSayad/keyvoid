import 'server-only'

import { PublicRecordDataType, PublicRecordMetadataType } from '@/lib/schema'
import { JsonValue } from '@prisma/client/runtime/client'

type EncryptRecordInput = {
  data?: PublicRecordDataType
  metadata?: PublicRecordMetadataType
}

type EncryptRecordOutput = {
  data?: string
  metadata?: string
}

export async function encryptRecord({
  data,
  metadata,
}: EncryptRecordInput): Promise<EncryptRecordOutput> {
  return {
    data: data ? JSON.stringify(data) : undefined,
    metadata: metadata ? JSON.stringify(metadata) : undefined,
  }
}

type DecryptRecordInput = {
  data?: JsonValue
  metadata?: JsonValue
}

type DecryptRecordOutput = {
  data?: PublicRecordDataType
  metadata?: PublicRecordMetadataType
}

export async function decryptRecord(
  input: Partial<DecryptRecordInput>
): Promise<DecryptRecordOutput> {
  return {
    data: typeof input.data === 'string' ? JSON.parse(input.data) : undefined,

    metadata:
      typeof input.metadata === 'string'
        ? JSON.parse(input.metadata)
        : undefined,
  }
}
