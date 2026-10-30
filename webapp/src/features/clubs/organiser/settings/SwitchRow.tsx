import { useId } from 'react'
import { Switch } from '../../../../components/ui/switch'
import { Label } from '../../../../components/ui/label'

type Props = {
  title: string
  description: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  children?: React.ReactNode // extra options, shown only while the switch is on
}

export function SwitchRow({ title, description, checked, onCheckedChange, children }: Props) {
  const id = useId()
  return (
    <div className="py-4 first:pt-0 last:pb-0">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 space-y-1">
          <Label htmlFor={id} className="text-sm font-medium">
            {title}
          </Label>
          <p id={`${id}-desc`} className="text-sm text-ink-muted">
            {description}
          </p>
        </div>
        <Switch
          id={id}
          checked={checked}
          onCheckedChange={onCheckedChange}
          aria-describedby={`${id}-desc`}
          className="shrink-0 data-[state=checked]:bg-neon-violet data-[state=checked]:shadow-neon-sm"
        />
      </div>
      {checked && children && <div className="mt-3">{children}</div>}
    </div>
  )
}