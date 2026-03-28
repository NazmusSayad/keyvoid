'use client'

import { useAuthStore } from '@/store/use-auth-store'
import type { PropsWithChildren } from 'react'

export function PrivateLayout({ children }: PropsWithChildren) {
  const status = useAuthStore((state) => state.status)

  if (status === 'unauthenticated') {
    return <div>Unauthorized</div>
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'authenticated') {
    return children
  }

  return 'Something went wrong'
}
