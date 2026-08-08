import { useEffect, useRef, type ReactNode } from 'react'

import { useModalScrollLock } from '../../hooks/useModalScrollLock'

type ModalProps = {
  open: boolean
  titleId: string
  onClose: () => void
  children: ReactNode
}

export function Modal({ open, titleId, onClose, children }: ModalProps) {
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
      className="fixed inset-0 z-50 flex overflow-y-auto bg-black/50 p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        className="relative m-auto w-full max-w-[800px] rounded-[30px] bg-white px-[74px] py-[46px] text-center max-[768px]:px-12 max-[768px]:py-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="absolute top-6 right-6 cursor-pointer transition-opacity duration-300 hover:opacity-70"
          aria-label="閉じる"
          onClick={onClose}
        >
          <img className="size-5" src="/assets/close.svg" alt="" />
        </button>
        {children}
      </div>
    </div>
  )
}
