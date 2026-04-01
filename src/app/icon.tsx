import { Logo } from '@/components/brand/logo'
import { ImageResponse } from 'next/og'

export const size = {
  width: 128,
  height: 128,
}

export default function Icon() {
  return new ImageResponse(
    <Logo style={{ width: size.width, height: size.height }} />,
    size
  )
}
