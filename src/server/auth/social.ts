'use server'

import { getSocialAuthUrl } from '@/server/auth/shared'
import { z } from 'zod'

const socialProviderSchema = z.enum(['GitHubOAuth', 'GoogleOAuth'])

export async function getSocialAuthUrlAction(
  provider: z.infer<typeof socialProviderSchema>
) {
  return {
    url: getSocialAuthUrl(socialProviderSchema.parse(provider)),
  }
}
