import { useEffect, useRef, type ReactNode } from 'react'

import { useModalScrollLock } from '../../hooks/useModalScrollLock'

type ModalProps = {
  open: boolean
  titleId: string
  onClose: () => void
  children: ReactNode
  fitContentOnDesktop?: boolean
}

export function Modal({ open, titleId, onClose, children, fitContentOnDesktop = false }: ModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)

  useModalScrollLock(open)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!open) return

    const previouslyFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current()
    }

    document.addEventListener('keydown', closeOnEscape)
    closeButtonRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      previouslyFocusedElement?.focus()
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex overflow-hidden bg-black/50 p-5 transition-opacity duration-200 ease-out starting:opacity-0 motion-reduce:transition-none ${fitContentOnDesktop ? 'md:overflow-y-auto' : ''}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        className={`relative m-auto flex h-full min-h-96 max-h-160 w-full min-w-2xl max-w-3xl flex-col overflow-hidden rounded-4xl bg-white text-center transition-[opacity,transform] duration-200 ease-out starting:translate-y-4 starting:scale-95 starting:opacity-0 motion-reduce:transition-none max-md:min-w-0 ${fitContentOnDesktop ? 'md:h-auto md:max-h-none' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="absolute top-6 right-6 z-10 cursor-pointer transition-opacity duration-300 hover:opacity-70"
          aria-label="閉じる"
          onClick={onClose}
        >
          <img className="size-5" src="/assets/close.svg" alt="" />
        </button>
        <div
          className={`flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto p-16 max-md:px-6 max-md:py-8 ${fitContentOnDesktop ? 'md:flex-none md:overflow-visible' : ''}`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
