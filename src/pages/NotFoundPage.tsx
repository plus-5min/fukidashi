import { Link } from 'react-router'

import { PageMetadata, type PageMetadataProps } from '../app/components/PageMetadata'

const metadata = {
  title: 'ページが見つかりません | fukidashi',
  description: 'お探しのページは見つかりませんでした。',
  noIndex: true,
} satisfies PageMetadataProps

export function NotFoundPage() {
  return (
    <>
      <PageMetadata {...metadata} />
      <div className="flex flex-1 items-center justify-center overflow-y-auto px-4 py-12 sm:px-6">
        <section className="mx-auto w-full max-w-xl rounded-4xl bg-white px-6 py-16 text-center sm:px-12" aria-labelledby="not-found-heading">
          <p className="font-poppins text-7xl leading-none font-bold text-[#c3c3c3] sm:text-8xl">404</p>
          <h1 id="not-found-heading" className="mt-6 text-2xl font-bold text-[#353b3c] sm:text-3xl">
            ページが見つかりませんでした
          </h1>
          <p className="mt-4 leading-8 text-[#555]">URLが正しいか確認して、もう一度お試しください。</p>
          <Link
            to="/"
            className="font-poppins mx-auto mt-8 flex w-fit min-w-52 items-center justify-center rounded-full bg-[#585858] px-8 py-3 text-base font-bold text-white transition-opacity hover:opacity-70 max-md:hover:opacity-100"
          >
            トップへ戻る
          </Link>
        </section>
      </div>
    </>
  )
}
