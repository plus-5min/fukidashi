import { useEffect, useRef, useState } from 'react'

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
    <div
      className={`create-modal-contents create-modal${open ? ' is-active' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      aria-labelledby="create-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="create-modal-wrap">
        <div className="create-modal-inner">
          <button type="button" className="create-close-btn create-modal-close" aria-label="閉じる" onClick={onClose}>
            <img src="/assets/close-circle.svg" alt="×" />
          </button>
          <div className="modal-container">
            <p className="modal-heading" id="create-modal-title">
              CSS
            </p>
            <div className="modal-css-content">
              <textarea id="custom-css" className="modal-css" value={css} onChange={(event) => onCssChange(event.target.value)} />
              <p className="create-text">対応環境：OBS幅300px以上</p>
              <button type="button" id="copyBtn" className="copy-btn" aria-label="CSSをコピー" onClick={() => void copyCss()}>
                <img src="/assets/copy.svg" alt="copy" />
              </button>
              <div className={`copy-tooltip${copied ? ' show' : ''}`}>
                <p className="copy-tooltip-text">コピーしました！</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
