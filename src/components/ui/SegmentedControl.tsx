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
      <div className="grid grid-flow-col auto-cols-fr rounded-full bg-[#f5f5f5] p-1">
        {options.map((option) => {
          const id = `${name}-${option.value}`

          return (
            <div className="min-w-0" key={id}>
              <input
                className="peer sr-only"
                type="radio"
                id={id}
                name={name}
                aria-label={option.label}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
              />
              <label
                htmlFor={id}
                className="flex cursor-pointer items-center justify-center rounded-full px-4 py-2 text-center text-sm font-medium text-[#888] transition-all peer-checked:bg-white peer-checked:text-[#353b3c] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#9ed9ef]"
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
