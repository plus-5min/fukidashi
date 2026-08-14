import metadataFile from './pageMetadata.json'

export type PageMetadataConfig = {
  title: string
  description: string
  path?: string
  keywords?: readonly string[]
  noIndex?: boolean
}

export const siteOrigin = metadataFile.siteOrigin
export const ogImageUrl = metadataFile.ogImageUrl

export const pageMetadata = metadataFile.pages satisfies Record<string, PageMetadataConfig>
