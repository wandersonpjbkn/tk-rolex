import { seo } from './config'

/**
 * Cria um objeto com metadados para o SEO da página
 * @param {object} data Metadados primários
 * @returns {object} Metadados
 */
export const seoMeta = data => {
  const metadata = {
    title: `${data.title ? data.title : ''}`,
    titleTemplate: `${data.title ? '%s | ' + seo.NAME : seo.NAME}`,

    meta: [
      // Default
      { name: 'description', content: data.description },

      // OpenGraph data (Most widely used)
      { property: 'og:title', content: `${data.title ? data.title + ' | ' + seo.NAME : seo.NAME}` },
      { property: 'og:site_name', content: `${seo.NAME}` },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: `${seo.URL}${seo.PATH}` },
      { property: 'og:image', content: `${seo.URL}${seo.IMG}` },
      { property: 'og:description', content: data.description },

      // Twitter card
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: `${seo.URL}` },
      { name: 'twitter:title', content: `${data.title ? data.title + ' | ' + seo.NAME : seo.NAME}` },
      { name: 'twitter:description', content: data.description },

      // Google / Schema.org markup
      { itemprop: 'name', content: `${data.title ? data.title + ' | ' + seo.NAME : seo.NAME}` },
      { itemprop: 'description', content: data.description },
      { itemprop: 'image', content: `${seo.URL}${seo.IMG}` }
    ]
  }

  if (data.noindex) {
    const name = 'robots'
    const content = 'noindex, nofollow, noarchive, nosnippet, noodp'

    metadata.meta.push({ name, content })
  }

  return metadata
}
