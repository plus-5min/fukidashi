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
                className="group flex aspect-4/3 cursor-pointer items-center justify-center rounded-2xl border-2 border-border bg-surface-raised text-foreground-muted transition-colors duration-200 hover:bg-surface-hover hover:text-foreground peer-checked:border-3 peer-checked:border-primary peer-checked:text-primary peer-checked:hover:text-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary motion-reduce:transition-none max-lg:hover:bg-surface-raised max-lg:hover:text-foreground-muted max-lg:peer-checked:hover:text-primary"
              >
                {renderOption(option)}
              </label>
              <span className="pointer-events-none absolute -top-2 -right-2 hidden size-7 peer-checked:block" aria-hidden="true">
                <svg className="size-full" viewBox="0 0 27 27" fill="none">
                  <circle cx="13.5" cy="13.5" r="13.5" fill="var(--color-primary)" />
                  <path d="M8 12.4418 12.7179 17.2733 19.8218 10" stroke="var(--color-on-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
