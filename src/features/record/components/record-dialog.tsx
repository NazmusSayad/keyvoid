import {
  BetterDialog,
  BetterDialogContent,
} from '@/components/ui/better-dialog'
import { PublicRecordType, PublicVaultType } from '@/lib/schema'

type RecordDialogProps = {
  open: boolean
  onOpenChange(open: boolean): void

  vault: PublicVaultType
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
  return <BetterDialogContent>Hello</BetterDialogContent>
}
