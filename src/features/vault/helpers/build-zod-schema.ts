import { z } from 'zod'
import { FieldInputType, RecordTypeDetails } from '../constants/types'

function createDataFieldValueSchema(type: FieldInputType) {
  if (type === 'number') {
    return z
      .string()
      .trim()
      .min(1, 'Enter a value.')
      .refine((value) => !Number.isNaN(Number(value)), 'Enter a valid number.')
  }

  if (type === 'boolean') {
    return z.enum(['true', 'false'], {
      message: 'Select true or false.',
    })
  }

  return z.string().trim().min(1, 'Enter a value.')
}

export function buildRecordCreateFormSchema(
  selectedRecordType?: RecordTypeDetails
) {
  return z.object({
    name: z.string().trim().min(1, 'Enter a record name.'),
    type: selectedRecordType
      ? z.literal(selectedRecordType.id)
      : z.string().trim().min(1, 'Select a record type.'),
    data: selectedRecordType
      ? z
          .object(
            Object.fromEntries(
              selectedRecordType.fields.map((field) => [
                field.id,
                createDataFieldValueSchema(field.type),
              ])
            )
          )
          .strict()
      : z.record(z.string(), z.string()),
    metadata: z.array(
      z.object({
        key: z.string(),
        value: z.string(),
      })
    ),
    tags: z.array(z.string()),
  })
}
