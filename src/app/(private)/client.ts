'use client'

import dynamic from 'next/dynamic'

export const PrivateLayoutClient = dynamic(
  () => import('@/components/private-layout').then((mod) => mod.PrivateLayout),
  { ssr: false }
)
