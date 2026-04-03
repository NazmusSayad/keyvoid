'use client'

import { Logo } from '@/components/brand/logo'
import { Button } from '@/components/ui/button'
import { Wrapper } from '@/components/wrapper'
import { StartUp02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'

export function Navbar() {
  return (
    <nav className="border-border/60 bg-background/90 fixed top-0 z-50 w-full border-b backdrop-blur-md">
      <Wrapper className="flex h-13 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-sm font-medium tracking-tight"
        >
          <Logo className="-mt-[2.5px] size-6" />
          <span className="font-mono text-xl">KeyVoid</span>
        </Link>

        <Button asChild variant="ghost" className="px-3" size="lg">
          <Link href="/auth/signup">
            <HugeiconsIcon size={16} icon={StartUp02Icon} /> Get Started
          </Link>
        </Button>
      </Wrapper>
    </nav>
  )
}
