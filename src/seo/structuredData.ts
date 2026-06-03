import { site } from '../data/siteContent'
import { SEO, absoluteUrl } from './seoConfig'

/** SNS 등 공개 프로필 URL만 (href 가 '#' 인 채널 제외) */
function sameAsUrls(): string[] {
  const out: string[] = []
  for (const c of site.socialChannels) {
    const h = c.href
    if (h.startsWith('http')) out.push(h)
  }
  return out
}

/**
 * Organization + WebSite JSON-LD (schema.org)
 * @see https://developers.google.com/search/docs/appearance/structured-data/organization
 */
export function buildJsonLdGraph(): Record<string, unknown> {
  const orgId = `${SEO.origin}/#organization`
  const webId = `${SEO.origin}/#website`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': orgId,
        name: site.legal.companyName,
        alternateName: [site.nameKo, site.nameEn, 'BEONE', 'k.BEONE'],
        url: SEO.origin,
        logo: {
          '@type': 'ImageObject',
          url: absoluteUrl(site.brand.logoLockup),
        },
        description: SEO.description,
        foundingDate: '2001',
        slogan: site.brand.sloganEn,
        identifier: {
          '@type': 'PropertyValue',
          name: '사업자등록번호',
          value: site.legal.bizReg,
        },
        sameAs: sameAsUrls(),
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: site.footer.mainTelDisplay,
            contactType: 'customer service',
            areaServed: 'KR',
            availableLanguage: ['Korean', 'English'],
          },
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.footer.addressLine.replace(/^주소\s*:\s*/, ''),
          addressCountry: 'KR',
        },
      },
      {
        '@type': 'WebSite',
        '@id': webId,
        url: SEO.origin,
        name: `${site.nameKo} | ${site.nameEn}`,
        description: SEO.description,
        inLanguage: 'ko-KR',
        publisher: { '@id': orgId },
      },
    ],
  }
}

export function structuredDataScriptContent(): string {
  return JSON.stringify(buildJsonLdGraph())
}
