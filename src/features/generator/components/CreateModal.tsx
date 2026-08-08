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
      className={`fixed inset-0 z-50 h-full w-full overflow-auto bg-black/50 px-5 py-10 text-center transition-all duration-300 ${
        open ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      aria-labelledby="create-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="absolute top-1/2 left-1/2 w-[calc(100%-40px)] max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-[30px] bg-white">
        <div className="px-[74px] py-[46px] max-[768px]:px-12 max-[768px]:py-6">
          <button
            type="button"
            className="absolute -top-16 right-0 cursor-pointer transition-opacity duration-300 hover:opacity-70"
            aria-label="閉じる"
            onClick={onClose}
          >
            <img src="/assets/close-circle.svg" alt="×" />
          </button>
          <div>
            <p className="font-poppins text-xl font-bold text-[#353b3c]" id="create-modal-title">
              CSS
            </p>
            <div className="relative mt-6">
              <textarea
                id="custom-css"
                className="relative mx-auto h-[196px] w-full max-w-[650px] resize-none rounded-[20px] bg-[#f5f5f5] px-12 py-6 text-left [&::-webkit-scrollbar]:hidden"
                value={css}
                onChange={(event) => onCssChange(event.target.value)}
              />
              <p className="mt-5 text-xs text-[#888]">対応環境：OBS幅300px以上</p>
              <button
                type="button"
                id="copyBtn"
                className="absolute top-3 right-3 cursor-pointer rounded-full bg-[#d8d8d8] p-2 transition-opacity duration-300 hover:opacity-70"
                aria-label="CSSをコピー"
                onClick={() => void copyCss()}
              >
                <img className="block size-4 object-contain" src="/assets/copy.svg" alt="copy" />
              </button>
              <div
                className={`absolute -top-8 -right-[38px] w-fit rounded-xl bg-[#707070] px-4 py-2 transition-opacity duration-500 before:absolute before:-bottom-1.5 before:left-1/2 before:h-0 before:w-0 before:-translate-x-1/2 before:border-x-[6px] before:border-t-[8px] before:border-x-transparent before:border-t-[#707070] before:content-[''] ${copied ? 'opacity-100' : 'opacity-0'}`}
              >
                <p className="text-xs text-white">コピーしました！</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
