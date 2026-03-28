'use client'

import dynamic from 'next/dynamic'

export const PrivateLayoutClient = dynamic(
  () => import('./private-layout').then((mod) => mod.PrivateLayout),
  { ssr: false }
)
