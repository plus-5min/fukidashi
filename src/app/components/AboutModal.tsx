type AboutModalProps = {
  open: boolean
  onClose: () => void
}

export function AboutModal({ open, onClose }: AboutModalProps) {
  return (
    <div
      className={`fixed inset-0 z-50 h-full w-full overflow-auto bg-white px-5 py-[120px] text-center transition-all duration-300 ${
        open ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      aria-labelledby="about-modal-title"
    >
      <div className="mx-auto w-full max-w-[800px]">
        <div>
          <div className="grid gap-[120px] max-[768px]:gap-[60px]">
            <div>
              <h2 className="font-poppins text-center text-[32px] font-bold text-[#353b3c]" id="about-modal-title">
                fukidashi
              </h2>
              <div className="mt-16 text-center text-[#353b3c]">
                <p>fukidashiは、Youtube / Twitch用のコメントCSSを生成できるツールです。</p>
                <p>お好みの色を使用してふきだし型のコメントデザインを作ることができます。</p>
                <p>Youtubeでの配信活動等にお使いください。</p>
              </div>
            </div>
            <div>
              <h3 className="font-poppins text-center text-2xl font-bold text-[#353b3c]">Creater</h3>
              <div className="mt-8 flex items-center justify-center gap-9 rounded-[20px] bg-[#fafafa] p-8 max-[768px]:gap-7 max-[768px]:p-4">
                <div className="size-[104px] shrink-0">
                  <img className="h-auto w-full object-contain" src="/image/profile.png" width="104" height="104" alt="通行止め.ᐟ.ᐟ" />
                </div>
                <div className="grid gap-6">
                  <p className="text-left text-xl font-bold text-[#353b3c]">通行止め.ᐟ.ᐟ</p>
                  <div className="flex gap-6 max-[768px]:gap-4">
                    <p className="text-[#9ed9ef] underline transition-opacity duration-300 hover:opacity-70 max-[768px]:hover:opacity-100">
                      <a href="https://x.com/tsuko111d0me" target="_blank" rel="noreferrer">
                        Twitter(X)
                      </a>
                    </p>
                    <p className="text-[#9ed9ef] underline transition-opacity duration-300 hover:opacity-70 max-[768px]:hover:opacity-100">
                      <a href="https://tsukodome.booth.pm/" target="_blank" rel="noreferrer">
                        BOOTH
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-poppins text-center text-2xl font-bold text-[#353b3c]">Contact</h3>
              <div className="mt-8 font-light text-[#353b3c]">
                <span className="inline-block">お問い合わせはメール、</span>
                <span className="inline-block">
                  または
                  <span className="underline">
                    <a href="https://x.com/tsuko111d0me" target="_blank" rel="noreferrer">
                      Twitter(X)
                    </a>
                  </span>
                  まで
                </span>
                <p className="mt-4 font-bold text-[#353b3c]">tuukou.dome111@gmail.com</p>
              </div>
            </div>
          </div>
          <button type="button" className="absolute top-[30px] right-9 cursor-pointer" aria-label="閉じる" onClick={onClose}>
            <img className="block h-auto w-full object-contain" src="/assets/close.svg" alt="×" />
          </button>
        </div>
      </div>
    </div>
  )
}
