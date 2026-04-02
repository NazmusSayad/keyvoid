import {
  BetterDialog,
  BetterDialogContent,
} from '@/components/ui/better-dialog'
import { useVaultContext } from '@/features/vault/contexts/vault-context'
import { PublicRecordType } from '@/lib/schema'

type RecordDialogProps = {
  open: boolean
  onOpenChange(open: boolean): void

  record: PublicRecordType
}

export function RecordDialog({ ...props }: RecordDialogProps) {
  return (
    <BetterDialog
      width="56rem"
      open={props.open}
      onOpenChange={props.onOpenChange}
    >
      <RecordDialogContent {...props} />
    </BetterDialog>
  )
}

function RecordDialogContent({}: RecordDialogProps) {
  const { vault } = useVaultContext()
  console.log(vault)

  return <BetterDialogContent>Hello</BetterDialogContent>
}
