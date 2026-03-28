import type { Metadata } from 'next'
import { PrivateLayoutClient } from './client'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default PrivateLayoutClient
