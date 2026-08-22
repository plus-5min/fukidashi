import type { ReactNode } from 'react'

type SegmentedControlOption<T extends string> = {
  value: T
  label: string
}

type SegmentedControlProps<T extends string> = {
  'aria-labelledby': string
  name: string
  value: T
  options: Array<SegmentedControlOption<T>>
  onChange: (value: T) => void
  renderOption?: (option: SegmentedControlOption<T>) => ReactNode
}

export function SegmentedControl<T extends string>({
  'aria-labelledby': ariaLabelledBy,
  name,
  value,
  options,
  onChange,
  renderOption,
}: SegmentedControlProps<T>) {
  return (
    <div role="radiogroup" aria-labelledby={ariaLabelledBy}>
      <div className="grid grid-flow-col auto-cols-fr gap-2 rounded-full border-2 border-surface-raised bg-surface-raised p-1">
        {options.map((option) => {
          const id = `${name}-${option.value}`

          return (
            <div className="min-w-0" key={id}>
              <input
                className="peer sr-only focus-visible:outline-none"
                type="radio"
                id={id}
                name={name}
                aria-label={option.label}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
              />
              <label
                htmlFor={id}
                className="font-poppins group flex min-h-10 cursor-pointer items-center justify-center rounded-full px-4 py-0 text-center text-sm font-medium text-foreground-muted outline-primary transition-all duration-200 hover:bg-surface-hover hover:text-foreground peer-checked:bg-primary peer-checked:text-on-primary peer-checked:hover:bg-primary peer-checked:hover:text-on-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 motion-reduce:transition-none max-lg:hover:bg-transparent max-lg:hover:text-foreground-muted max-lg:peer-checked:hover:bg-primary max-lg:peer-checked:hover:text-on-primary"
              >
                {renderOption ? renderOption(option) : option.label}
              </label>
            </div>
          )
        })}
      </div>
    </div>
  )
}
