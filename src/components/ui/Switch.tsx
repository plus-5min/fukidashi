type SwitchProps = {
  'aria-labelledby': string
  id: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

export function Switch({ 'aria-labelledby': ariaLabelledBy, id, checked, onCheckedChange }: SwitchProps) {
  return (
    <span className="relative h-8 w-16 shrink-0">
      <input
        className="peer absolute inset-0 z-10 cursor-pointer opacity-0"
        type="checkbox"
        role="switch"
        id={id}
        aria-labelledby={ariaLabelledBy}
        checked={checked}
        onChange={(event) => onCheckedChange(event.target.checked)}
      />
      <span className="absolute inset-0 rounded-full bg-primary-subtle transition-colors duration-200 peer-checked:bg-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary motion-reduce:transition-none" />
      <span className="pointer-events-none absolute top-1 left-1 size-6 rounded-full bg-white shadow-sm transition-transform duration-200 peer-checked:translate-x-8 motion-reduce:transition-none" />
    </span>
  )
}
