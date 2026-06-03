import { structuredDataScriptContent } from './structuredData'

const JSON_LD_ID = 'beone-jsonld-organization'

function upsertMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  if (!content.trim()) return
  const sel = attr === 'name' ? `meta[name="${name}"]` : `meta[property="${name}"]`
  let el = document.head.querySelector(sel) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * 환경변수로 검색 콘솔 소유 확인 메타를 넣고, JSON-LD를 주입합니다.
 * .env.production 예: VITE_GOOGLE_SITE_VERIFICATION=xxxx
 */
export function injectVerificationAndJsonLd(): void {
  const g = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION as string | undefined
  const n = import.meta.env.VITE_NAVER_SITE_VERIFICATION as string | undefined
  if (g) upsertMeta('google-site-verification', g)
  if (n) upsertMeta('naver-site-verification', n)

  if (document.getElementById(JSON_LD_ID)) return
  const script = document.createElement('script')
  script.id = JSON_LD_ID
  script.type = 'application/ld+json'
  script.textContent = structuredDataScriptContent()
  document.head.appendChild(script)
}
