import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import type { PublicRecordType } from '@/lib/schema'
import { MoreVerticalIcon, NoteIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ViewRecordDialog } from './view-record-dialog'

type RecordRowProps = {
  record: PublicRecordType
  tags: string[]
}

export function RecordRow({ record, tags }: RecordRowProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  return (
    <>
      <TableRow
        className="cursor-pointer"
        onClick={() => router.replace(`?record=${record.id}`)}
      >
        <TableCell className="py-4">
          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={NoteIcon} className="ml-2 size-5" />

            <span className="font-medium">{record.name}</span>
          </div>
        </TableCell>

        <TableCell>
          {record.type?.trim() ? (
            <Badge variant="outline">{record.type}</Badge>
          ) : (
            <span className="text-muted-foreground text-sm">N/A</span>
          )}
        </TableCell>

        <TableCell className="text-muted-foreground">
          {new Date(record.updatedAt).toLocaleDateString()}
        </TableCell>

        <TableCell>
          <div className="flex flex-wrap gap-1.5">
            {tags.length === 0 ? (
              <span className="text-muted-foreground text-sm">No tags</span>
            ) : (
              tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="rounded-full">
                  {tag}
                </Badge>
              ))
            )}
            {tags.length > 3 ? (
              <Badge variant="outline" className="rounded-full">
                +{tags.length - 3}
              </Badge>
            ) : null}
          </div>
        </TableCell>

        <TableCell className="text-right">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="-mr-1"
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
            }}
          >
            <HugeiconsIcon icon={MoreVerticalIcon} className="size-4" />
            <span className="sr-only">Record actions</span>
          </Button>
        </TableCell>
      </TableRow>

      <ViewRecordDialog
        record={record}
        open={searchParams.get('record') === record.id}
        onOpenChange={(open) => {
          if (!open) {
            const clonedSearchParams = new URLSearchParams(
              searchParams.toString()
            )

            clonedSearchParams.delete('record')
            router.replace(`?${clonedSearchParams.toString()}`)
          }
        }}
      />
    </>
  )
}
