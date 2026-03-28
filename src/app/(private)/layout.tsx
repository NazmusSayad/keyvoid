import { PrivateLayoutClient } from '@/components/private-layout.client'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default PrivateLayoutClient
