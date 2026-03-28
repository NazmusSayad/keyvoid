import type { ComponentProps } from 'react'
import { LuBookLock } from 'react-icons/lu'

export function Logo({ ...props }: ComponentProps<'svg'>) {
  return <LuBookLock height="1em" width="1em" color="currentColor" {...props} />
}
