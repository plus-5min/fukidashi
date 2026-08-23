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
  const dialogRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)

  useModalScrollLock(open)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!open) return

    const previouslyFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const handleDialogKeys = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseRef.current()
        return
      }

      if (event.key !== 'Tab') return

      const dialog = dialogRef.current
      if (!dialog) return

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute('hidden') && element.getAttribute('aria-hidden') !== 'true' && !element.closest('[inert]'))

      if (focusableElements.length === 0) {
        event.preventDefault()
        closeButtonRef.current?.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements.at(-1)
      const activeElement = document.activeElement

      if (event.shiftKey && (activeElement === firstElement || !dialog.contains(activeElement))) {
        event.preventDefault()
        lastElement?.focus()
      } else if (!event.shiftKey && (activeElement === lastElement || !dialog.contains(activeElement))) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleDialogKeys)
    closeButtonRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleDialogKeys)
      previouslyFocusedElement?.focus()
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex bg-overlay p-4 transition-opacity duration-200 ease-out starting:opacity-0 motion-reduce:transition-none ${fitContentOnDesktop ? 'overflow-y-auto max-lg:overflow-hidden' : 'overflow-hidden'}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        className={`relative m-auto flex min-h-96 w-full min-w-2xl max-w-3xl flex-col overflow-hidden rounded-4xl bg-surface text-center transition duration-200 ease-out starting:translate-y-4 starting:scale-95 starting:opacity-0 motion-reduce:transition-none max-lg:min-w-0 ${
          fitContentOnDesktop ? 'h-auto max-h-none max-lg:h-full max-lg:max-h-160' : 'h-full max-h-160'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="absolute top-8 right-8 z-10 size-5 cursor-pointer rounded-full transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none max-lg:hover:opacity-100"
          aria-label="閉じる"
          onClick={onClose}
        >
          <img className="block size-5 brightness-0 invert" src="/assets/close.svg" alt="" />
        </button>
        <div
          className={`flex min-h-0 flex-col p-16 max-lg:px-8 max-lg:pt-16 max-lg:pb-8 ${
            fitContentOnDesktop
              ? 'flex-none overflow-visible max-lg:flex-1 max-lg:overflow-x-hidden max-lg:overflow-y-auto'
              : 'flex-1 overflow-x-hidden overflow-y-auto'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
