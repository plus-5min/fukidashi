import type { CSSProperties } from 'react'

type MaskedIconProps = {
  className?: string
  src: string
}

export function MaskedIcon({ className = '', src }: MaskedIconProps) {
  const maskImage = `url("${src}")`
  const style: CSSProperties = {
    WebkitMaskImage: maskImage,
    WebkitMaskPosition: 'center',
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskSize: 'contain',
    maskImage,
    maskPosition: 'center',
    maskRepeat: 'no-repeat',
    maskSize: 'contain',
  }

  return <span className={`inline-block shrink-0 ${className}`} style={style} aria-hidden="true" />
}
