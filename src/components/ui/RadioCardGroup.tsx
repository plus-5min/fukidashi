import type { ReactNode } from 'react'

type RadioCardOption<T extends string> = {
  value: T
  label: string
}

type RadioCardGroupProps<T extends string> = {
  'aria-labelledby': string
  name: string
  value: T
  options: Array<RadioCardOption<T>>
  onChange: (value: T) => void
  renderOption: (option: RadioCardOption<T>) => ReactNode
}

export function RadioCardGroup<T extends string>({ 'aria-labelledby': ariaLabelledBy, name, value, options, onChange, renderOption }: RadioCardGroupProps<T>) {
  return (
    <div role="radiogroup" aria-labelledby={ariaLabelledBy}>
      <div className="grid gap-2 grid-cols-3">
        {options.map((option) => {
          const id = `${name}-${option.value}`

          return (
            <div className="relative min-w-0" key={id}>
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
                className="flex aspect-4/3 cursor-pointer items-center justify-center rounded-2xl border-2 border-primary-subtle bg-white text-primary-muted transition-colors duration-200 peer-checked:border-3 peer-checked:border-primary peer-checked:text-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary motion-reduce:transition-none"
              >
                {renderOption(option)}
              </label>
              <span className="pointer-events-none absolute -top-2 -right-2 hidden size-7 peer-checked:block" aria-hidden="true">
                <img className="size-full" src="/assets/check.svg" alt="" />
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
