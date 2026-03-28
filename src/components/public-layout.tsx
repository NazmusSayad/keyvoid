'use client'

import { useAuthStore } from '@/store/use-auth-store'
import { redirect } from 'next/navigation'
import type { PropsWithChildren } from 'react'

export function PublicLayout({ children }: PropsWithChildren) {
  const status = useAuthStore((state) => state.status)

  if (status === 'authenticated') {
    return redirect('/vault')
  }

  return children
}
