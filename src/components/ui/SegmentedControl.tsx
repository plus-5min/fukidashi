import type { ReactNode } from 'react'

type SegmentedControlOption<T extends string> = {
  value: T
  label: string
}

type SegmentedControlProps<T extends string> = {
  label: string
  name: string
  value: T
  options: Array<SegmentedControlOption<T>>
  onChange: (value: T) => void
  renderOption?: (option: SegmentedControlOption<T>) => ReactNode
}

export function SegmentedControl<T extends string>({ label, name, value, options, onChange, renderOption }: SegmentedControlProps<T>) {
  return (
    <fieldset>
      <legend className="font-poppins mb-2 block text-xs font-medium text-[#c3c3c3]">{label}</legend>
      <div className="grid grid-cols-2 rounded-full bg-[#f5f5f5] p-1">
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
    </fieldset>
  )
}
