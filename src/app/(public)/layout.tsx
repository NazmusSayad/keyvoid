import { PublicLayout } from '@/components/public-layout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default PublicLayout
