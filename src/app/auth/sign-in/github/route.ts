import { getProviderAuthorizationUrl } from '@/server/auth/auth'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.redirect(getProviderAuthorizationUrl('GitHubOAuth'))
}
