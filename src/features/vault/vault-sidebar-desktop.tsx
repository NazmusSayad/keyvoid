'use client'

import { Loading } from '@/components/loading'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  BetterScrollAreaContent,
  BetterScrollAreaProvider,
} from '@/components/ui/better-scroll-area'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { signOutAction } from '@/server/auth/session'
import { getVaultsAction } from '@/server/vault/vault'
import { useAuthStore } from '@/store/use-auth-store'
import { WalletAdd01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { VaultCreateDialog } from './vault-create-dialog'

export function VaultSidebarDesktop() {
  const pathname = usePathname()
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const user = useAuthStore((state) => state.user)
  const clearSession = useAuthStore((state) => state.clearSession)
  const vaultsQuery = useQuery({
    queryFn: () => getVaultsAction(),
    queryKey: ['vaults'],
  })

  async function handleSignOut() {
    if (isSigningOut) {
      return
    }

    setIsSigningOut(true)

    try {
      await signOutAction()
      clearSession()
      router.push('/auth/login')
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <aside className="border-border bg-card grid h-screen w-[16rem] grid-rows-[auto_1fr_auto] border-r">
      <div>search</div>

      {!!vaultsQuery.data?.vaults.length && (
        <BetterScrollAreaProvider>
          <BetterScrollAreaContent
            style={{
              maskImage: `linear-gradient(to bottom, transparent 0, black 12px, black calc(100% - 12px), transparent 100%)`,
            }}
          >
            <ul className="flex flex-col gap-2 p-3">
              {vaultsQuery.data.vaults.map((vault) => {
                const isActive = pathname.startsWith(`/vault/${vault.id}`)

                return (
                  <li key={vault.id}>
                    <Button
                      asChild
                      size="lg"
                      className="w-full justify-start px-2"
                      variant={isActive ? 'default' : 'ghost'}
                    >
                      <Link href={`/vault/${vault.id}`}>
                        <span className="flex size-9 items-center justify-center overflow-hidden rounded-xl text-sm font-semibold uppercase">
                          {vault.icon?.trim().charAt(0) ||
                            vault.name.charAt(0).toUpperCase()}
                        </span>

                        <span className="truncate">{vault.name}</span>
                      </Link>
                    </Button>
                  </li>
                )
              })}
            </ul>
          </BetterScrollAreaContent>
        </BetterScrollAreaProvider>
      )}

      {vaultsQuery.data?.vaults.length === 0 && (
        <div className="flex h-full items-center justify-center">
          <VaultCreateDialog
            trigger={
              <Button>
                <HugeiconsIcon icon={WalletAdd01Icon} className="size-4" />
                Create new vault
              </Button>
            }
          />
        </div>
      )}

      <div className="flex flex-col gap-2 p-3">
        <VaultCreateDialog
          trigger={
            <Button variant="outline" className="w-full">
              <HugeiconsIcon icon={WalletAdd01Icon} className="size-4" />
              Create new vault
            </Button>
          }
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="lg"
              variant="outline"
              className="w-full justify-start gap-3 px-2"
            >
              <Avatar className="size-6">
                <AvatarImage
                  src={user?.avatarUrl || undefined}
                  alt={user?.name}
                />
                <AvatarFallback>{user?.name || 'Account'}</AvatarFallback>
              </Avatar>
              <span className="truncate">{user?.name || 'Account'}</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-[16rem]">
            <DropdownMenuItem asChild>
              <Link href="/account">Account</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              disabled={isSigningOut}
              onSelect={(event) => {
                event.preventDefault()
                void handleSignOut()
              }}
            >
              {isSigningOut && <Loading className="size-4" />}
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  )
}
