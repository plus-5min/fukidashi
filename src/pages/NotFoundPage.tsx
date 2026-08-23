import { Link } from 'react-router'

import { PageMetadata } from '../app/components/PageMetadata'
import { pageMetadata } from '../app/pageMetadata'

export function NotFoundPage() {
  return (
    <>
      <PageMetadata {...pageMetadata.notFound} />
      <div className="flex flex-1 items-center justify-center overflow-y-auto px-8 py-12 max-lg:px-4">
        <section className="mx-auto w-full max-w-xl rounded-4xl bg-surface px-12 py-16 text-center max-lg:px-4" aria-labelledby="not-found-heading">
          <p className="font-poppins text-8xl leading-none font-bold text-secondary max-lg:text-7xl">404</p>
          <h1 id="not-found-heading" className="mt-4 text-3xl font-bold text-foreground max-lg:text-2xl">
            ページが見つかりませんでした
          </h1>
          <p className="mt-4 leading-8 text-foreground">URLが正しいか確認して、もう一度お試しください。</p>
          <Link
            to="/"
            className="font-poppins mx-auto mt-8 flex min-h-12 w-fit min-w-52 items-center justify-center rounded-full bg-primary px-8 py-2 text-base font-bold text-on-primary transition duration-200 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none max-lg:hover:brightness-100"
          >
            トップへ戻る
          </Link>
        </section>
      </div>
    </>
  )
}
