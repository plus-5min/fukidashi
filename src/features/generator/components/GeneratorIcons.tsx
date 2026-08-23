type GeneratorIconProps = {
  className?: string
}

const iconProps = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  'aria-hidden': true,
  focusable: 'false',
} as const

export function PlatformIcon({ className = 'size-6' }: GeneratorIconProps) {
  return (
    <svg {...iconProps} className={className}>
      <path
        d="M18.3697 6H6.63029C5.17762 6 4 7.3007 4 8.90518V15.3348C4 16.9393 5.17762 18.24 6.63029 18.24H18.3697C19.8224 18.24 21 16.9393 21 15.3348V8.90518C21 7.3007 19.8224 6 18.3697 6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M15.4699 12.2051 10.7998 9.50879V14.9029L15.4699 12.2051Z" fill="currentColor" />
    </svg>
  )
}

export function TemplateIcon({ className = 'size-6' }: GeneratorIconProps) {
  return (
    <svg {...iconProps} className={className}>
      <path
        d="M19.0368 16.5395C20.2752 15.3011 21.0193 13.7203 21.0193 11.9998C21.0176 8.02251 17.0577 4.7998 12.1704 4.7998C7.28307 4.7998 3.32324 8.02251 3.32324 11.9998C3.32324 15.9771 7.28481 19.1998 12.1704 19.1998C14.0219 19.1998 15.739 18.7369 17.159 17.9457C17.1765 17.9526 17.194 17.9596 17.2132 17.9649L18.9826 18.4382C19.2516 18.5098 19.4979 18.2636 19.4263 17.9946L19.0368 16.5395Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M8.68566 12.8752C9.16897 12.8752 9.56076 12.4834 9.56076 12.0001C9.56076 11.5168 9.16897 11.125 8.68566 11.125C8.20235 11.125 7.81055 11.5168 7.81055 12.0001C7.81055 12.4834 8.20235 12.8752 8.68566 12.8752Z"
        fill="currentColor"
      />
      <path
        d="M12.17 12.8752C12.6533 12.8752 13.0451 12.4834 13.0451 12.0001C13.0451 11.5168 12.6533 11.125 12.17 11.125C11.6867 11.125 11.2949 11.5168 11.2949 12.0001C11.2949 12.4834 11.6867 12.8752 12.17 12.8752Z"
        fill="currentColor"
      />
      <path
        d="M15.6573 12.8752C16.1406 12.8752 16.5324 12.4834 16.5324 12.0001C16.5324 11.5168 16.1406 11.125 15.6573 11.125C15.174 11.125 14.7822 11.5168 14.7822 12.0001C14.7822 12.4834 15.174 12.8752 15.6573 12.8752Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function DesignIcon({ className = 'size-6' }: GeneratorIconProps) {
  return (
    <svg {...iconProps} className={className}>
      <path
        d="M9.43475 18.8019 5 19 5.19806 14.5653 15.762 4 20 8.23668 9.43475 18.8019Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ColorIcon({ className = 'size-6' }: GeneratorIconProps) {
  return (
    <svg {...iconProps} className={className}>
      <circle cx="12.5" cy="11.5" r="6.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

export function CreateIcon({ className = 'size-6' }: GeneratorIconProps) {
  return (
    <svg {...iconProps} className={className}>
      <path
        d="M19.5 11.75C14.6896 13.3746 13.3746 14.6896 11.75 19.5C10.1254 14.6896 8.81043 13.3746 4 11.75C8.81043 10.1254 10.1254 8.81043 11.75 4C13.3746 8.81043 14.6896 10.1254 19.5 11.75Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
