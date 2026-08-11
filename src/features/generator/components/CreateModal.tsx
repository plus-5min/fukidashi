import { useEffect, useRef, useState } from 'react'

import { Modal } from '../../../components/ui/Modal'

type CreateModalProps = {
  open: boolean
  css: string
  onCssChange: (css: string) => void
  onClose: () => void
}

export function CreateModal({ open, css, onCssChange, onClose }: CreateModalProps) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    },
    [],
  )

  const copyCss = async () => {
    await navigator.clipboard.writeText(css)
    setCopied(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setCopied(false), 2500)
  }

  return (
    <Modal open={open} titleId="create-modal-title" onClose={onClose}>
      <div className="flex min-h-0 flex-1 flex-col">
        <h2 className="font-poppins shrink-0 text-xl font-bold text-primary" id="create-modal-title">
          CSS
        </h2>
        <div className="relative mt-4 flex min-h-0 flex-1 flex-col">
          <label className="sr-only" htmlFor="custom-css">
            生成されたCSS
          </label>
          <textarea
            id="custom-css"
            className="relative min-h-48 w-full flex-1 resize-none rounded-2xl bg-secondary p-8 pr-16 text-left font-mono focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-scrollbar]:hidden max-lg:p-4 max-lg:pr-16"
            value={css}
            onChange={(event) => onCssChange(event.target.value)}
          />
          <p className="mt-4 shrink-0 text-xs text-primary-muted">対応環境：OBS幅300px以上</p>
          <button
            type="button"
            id="copyBtn"
            className="absolute top-2 right-2 flex size-12 cursor-pointer items-center justify-center rounded-full bg-primary-subtle transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none max-lg:hover:opacity-100"
            aria-label="CSSをコピー"
            onClick={() => void copyCss()}
          >
            {copied ? (
              <svg className="size-5 animate-copy-success text-primary motion-reduce:animate-none" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <img className="block size-4 object-contain" src="/assets/copy.svg" alt="" />
            )}
          </button>
          <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
            {copied ? 'CSSをコピーしました' : ''}
          </p>
        </div>
      </div>
    </Modal>
  )
}
