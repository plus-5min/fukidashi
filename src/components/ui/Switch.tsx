type SwitchProps = {
  id: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

export function Switch({ id, checked, onCheckedChange }: SwitchProps) {
  return (
    <span className="relative h-7 w-12 shrink-0">
      <input
        className="peer absolute inset-0 z-10 cursor-pointer opacity-0"
        type="checkbox"
        role="switch"
        id={id}
        checked={checked}
        onChange={(event) => onCheckedChange(event.target.checked)}
      />
      <span className="absolute inset-0 rounded-full bg-[#d8d8d8] transition-colors peer-checked:bg-[#9ed9ef] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#9ed9ef]" />
      <span className="pointer-events-none absolute top-1 left-1 size-5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5" />
    </span>
  )
}
