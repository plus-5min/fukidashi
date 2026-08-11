export type PageMetadataProps = {
  title: string
  description: string
  path?: string
  keywords?: string[]
  noIndex?: boolean
}

const siteOrigin = 'https://fukidashi-css.com'
const ogImageUrl = `${siteOrigin}/image/ogp.png`

export function PageMetadata({ title, description, path, keywords, noIndex = false }: PageMetadataProps) {
  const pageUrl = path ? `${siteOrigin}${path}` : null

  return (
    <>
      <title>{title}</title>
      {pageUrl && <link rel="canonical" href={pageUrl} />}
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords.join(',')} />}
      {noIndex && <meta name="robots" content="noindex" />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {pageUrl && <meta property="og:url" content={pageUrl} />}
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content="fukidashi" />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@asahinapipi_5m" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
    </>
  )
}
