import {
  useEffect,
  useId,
  useMemo,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from 'react'
import './App.css'
import { site } from './data/siteContent'
import { useHeaderScrolled } from './hooks/useHeaderScrolled'
import { useRevealOnScroll } from './hooks/useRevealOnScroll'

type TechCardTitleIconKey = (typeof site.technology.items)[number]['icon']

type BusinessElementTitleIconKey = (typeof site.businessElements.items)[number]['icon']

type OverviewStatusDtIconKey = (typeof site.overview.statusRows)[number]['icon']

/** 24×24 `#overview` 회사 현황 `dt` 앞 아이콘 — `currentColor`로 행 액센트와 맞춤 */
const OVERVIEW_STATUS_DT_ICONS: Record<OverviewStatusDtIconKey, ReactNode> = {
  general: (
    <svg viewBox="0 0 24 24" width="100%" height="100%" focusable="false" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.5 20.5V10.5L7.5 8.2V20.5" />
        <path d="M7.5 8.2 16 4.8V20.5" />
        <path d="M3.5 20.5h17" />
        <path d="M9.5 20.5v-5h5v5" />
        <path d="M17.5 12v8.5M20 14v6.5M15 15.5v5" opacity="0.9" />
      </g>
    </svg>
  ),
  business: (
    <svg viewBox="0 0 24 24" width="100%" height="100%" focusable="false" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 8V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2" />
        <rect x="4" y="8" width="16" height="12.5" rx="1.2" />
        <path d="M4 12.2h16" />
      </g>
    </svg>
  ),
  org: (
    <svg viewBox="0 0 24 24" width="100%" height="100%" focusable="false" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="3.5" width="6" height="4.5" rx="0.8" />
        <path d="M12 8v3.2" />
        <path d="M6.5 14.5h11" />
        <path d="M12 11.2v3.3" />
        <rect x="4" y="14.5" width="5.5" height="6" rx="0.8" />
        <rect x="14.5" y="14.5" width="5.5" height="6" rx="0.8" />
      </g>
    </svg>
  ),
  rnd: (
    <svg viewBox="0 0 24 24" width="100%" height="100%" focusable="false" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 5.5h7l1.2 6.5c.6 3.2-1.4 6.4-4.7 6.9a5.2 5.2 0 0 1-5.8-5.2c0-1.1.3-2.1.8-2.9L8.5 5.5Z" />
        <path d="M8.2 9.2h7.6" opacity="0.85" />
        <path d="M10 20.5h4" />
      </g>
    </svg>
  ),
}

/** Hand-authored 24×24 motifs for `#business-elements` cards — `currentColor` for theme tint. */
const BUSINESS_ELEMENT_TITLE_ICONS: Record<BusinessElementTitleIconKey, ReactNode> = {
  blood: (
    <svg viewBox="0 0 24 24" width="100%" height="100%" focusable="false">
      <path
        fill="currentColor"
        d="M12 5.4c-2.9 3.7-5.1 6.8-5.1 9.9a5.1 5.1 0 1 0 10.2 0c0-3.1-2.2-6.2-5.1-9.9Z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        d="M7.1 8.2c1.4 1.6 3.2 2.5 4.9 2.5s3.5-.9 4.9-2.5"
      />
    </svg>
  ),
  energy: (
    <svg viewBox="0 0 24 24" width="100%" height="100%" focusable="false">
      <path fill="currentColor" d="M13.6 2 7.4 13.6H12l-2.1 8.4 8.7-10.8H13l.6-9Z" />
    </svg>
  ),
  wave: (
    <svg viewBox="0 0 24 24" width="100%" height="100%" focusable="false">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        d="M2 12c2.2-2.9 4.5-2.9 6.7 0s4.5 2.9 6.7 0 4.5-2.9 6.7 0 4.5-2.9 6.7 0"
      />
    </svg>
  ),
  air: (
    <svg viewBox="0 0 24 24" width="100%" height="100%" focusable="false">
      <path
        fill="currentColor"
        d="M15.5 7.5a2.4 2.4 0 0 0-4.6-1A3.6 3.6 0 0 0 7 12.2 2.8 2.8 0 0 0 7 18h9.5a2.5 2.5 0 0 0 0-5h-.6a3.8 3.8 0 0 0-.4-5.5Z"
        opacity="0.22"
      />
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M3.5 9.5h12c2 0 3.5-1.2 3.5-2.8" />
        <path d="M4.5 14.8h11c2.4 0 4.5 1.4 4.5 3.2" />
        <path d="M5.5 19.5h8" />
      </g>
    </svg>
  ),
  qi: (
    <svg viewBox="0 0 24 24" width="100%" height="100%" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round">
        <path d="M12 3.5a8.5 8.5 0 0 1 8.2 11.2" />
        <path d="M12 20.5a8.5 8.5 0 0 1-8.2-11.2" />
        <path d="M6.5 12h11" opacity="0.45" />
      </g>
    </svg>
  ),
  life: (
    <svg viewBox="0 0 24 24" width="100%" height="100%" focusable="false">
      <path
        fill="currentColor"
        d="M11.8 21V11.2c-.2-2.8 1.8-5.2 4.8-5.4-.6 2.7-2.4 4.4-4.8 5.2Zm.4 0V11.5c2.6-.9 4.6-2.6 5.3-5.4-2.9.1-5 2.3-5.3 5.4Z"
      />
      <path fill="currentColor" d="M12 21v-8.5" opacity="0.55" />
    </svg>
  ),
}

function BusinessElementTitleIcon({ icon }: { icon: BusinessElementTitleIconKey }) {
  return BUSINESS_ELEMENT_TITLE_ICONS[icon]
}

/** Hand-authored 24×24 motifs for `#technology` cards — `currentColor` for theme tint. */
const TECH_CARD_TITLE_ICONS: Record<TechCardTitleIconKey, ReactNode> = {
  herb: (
    <svg viewBox="0 0 24 24" width="100%" height="100%" focusable="false">
      <path
        fill="currentColor"
        d="M12 22C7.5 18 5 14 5 9.5 5 5 7.8 2 12 2s7 3 7 7.5c0 4.5-2.5 8.5-7 12.5Z"
      />
    </svg>
  ),
  fir: (
    <svg viewBox="0 0 24 24" width="100%" height="100%" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
        <path d="M12 20.5Q7.5 14 4 9.5" />
        <path d="M12 20.5Q12 11 12 3.5" />
        <path d="M12 20.5Q16.5 14 20 9.5" />
        <path d="M12 20.5Q8 17 6 13" opacity="0.85" />
        <path d="M12 20.5Q16 17 18 13" opacity="0.85" />
      </g>
    </svg>
  ),
  crystal: (
    <svg viewBox="0 0 24 24" width="100%" height="100%" focusable="false">
      <polygon fill="currentColor" points="12,2.5 16.8,8.5 7.2,8.5" />
      <polygon fill="currentColor" points="12,9.2 17.6,17.2 6.4,17.2" />
      <polygon fill="currentColor" points="12,15.8 15.4,21.5 8.6,21.5" />
    </svg>
  ),
  pulse: (
    <svg viewBox="0 0 24 24" width="100%" height="100%" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
        <path d="M4 19.5Q12 5 20 19.5" />
        <path d="M6.5 19.5Q12 8.5 17.5 19.5" />
        <path d="M9 19.5Q12 12 15 19.5" />
      </g>
    </svg>
  ),
  noMolecule: (
    <svg viewBox="0 0 24 24" width="100%" height="100%" focusable="false">
      <path
        fill="currentColor"
        d="M10.5 3.2c0-1.7 2.2-1.7 2.2 0 0 1.6-1.1 3.8-2.2 5.8-1-2-2.2-4.2-2.2-5.8Z"
      />
      <circle cx="17.2" cy="8.3" r="2.15" fill="currentColor" />
      <circle cx="17.2" cy="14.2" r="2.15" fill="currentColor" />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        d="M11.8 7.5 15.5 6.5M11.8 11.2 15.5 12.4"
      />
    </svg>
  ),
}

type FeaturedProduct = (typeof site.products.featured)[number]

type BrandCharacterEntry = (typeof site.brandIp.characters)[number] & {
  readonly imageAnimated?: string
  /** @deprecated use `frames` from site content */
  readonly imageFrames?: readonly string[]
}

const reducedMotionSubscribe = (onStoreChange: () => void) => {
  if (typeof window === 'undefined') return () => {}
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', onStoreChange)
  return () => mq.removeEventListener('change', onStoreChange)
}

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    reducedMotionSubscribe,
    () =>
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  )
}

function pct(x: number): string {
  const n = Math.round(x * 1000) / 1000
  return `${n}%`
}

/** Per-layer keyframes so each layer is visible exactly one segment of the loop (crossfade at boundaries). */
function stackedCrossfadeKeyframes(i: number, n: number, animName: string): string {
  const seg = 100 / n
  const low = i * seg
  const high = (i + 1) * seg
  const fd = Math.min(seg * 0.14, 9)
  const rise0 = low
  const rise1 = Math.min(low + fd, high)
  const fall0 = Math.max(high - fd, low)
  const fall1 = high
  return `@keyframes ${animName} {
  0%, ${pct(Math.max(0, rise0 - 0.001))} { opacity: 0 }
  ${pct(rise0)} { opacity: 0 }
  ${pct(rise1)} { opacity: 1 }
  ${pct(fall0)} { opacity: 1 }
  ${pct(fall1)} { opacity: 0 }
  100% { opacity: 0 }
}`
}

function brandCharacterCrossfadeCss(cssSafeId: string, n: number, holdSec = 1.2): string {
  const dur = n * holdSec
  const blocks: string[] = []
  for (let i = 0; i < n; i++) {
    const animName = `brandCharXfade_${cssSafeId}_${i}`
    blocks.push(stackedCrossfadeKeyframes(i, n, animName))
    blocks.push(
      `[data-brand-char-xfade="${cssSafeId}"] > .card--brand__frame-img:nth-child(${i + 1}) { animation: ${animName} ${dur}s ease-in-out infinite; will-change: opacity; }`,
    )
  }
  return blocks.join('\n')
}

const HERO_GRID_BG_LOOP_SEC = 48

/** Hero grid background slideshow — same crossfade math as brand character frames; `holdSec * n` = total loop seconds. */
function heroGridCrossfadeCss(cssSafeId: string, n: number, holdSec: number): string {
  const dur = n * holdSec
  const blocks: string[] = []
  for (let i = 0; i < n; i++) {
    const animName = `heroGridXfade_${cssSafeId}_${i}`
    blocks.push(stackedCrossfadeKeyframes(i, n, animName))
    blocks.push(
      `[data-hero-grid-xfade="${cssSafeId}"] > .hero__grid-bg__layer:nth-child(${i + 1}) { animation: ${animName} ${dur}s ease-in-out infinite; will-change: opacity; }`,
    )
  }
  return blocks.join('\n')
}

function HeroGridBackgroundSlideshow() {
  const reduced = usePrefersReducedMotion()
  const rawId = useId()
  const cssSafeId = useMemo(() => rawId.replace(/:/g, ''), [rawId])
  const urls = site.editorial.heroGridBackgrounds
  const n: number = urls.length

  const xfadeCss = useMemo(() => {
    if (n < 2 || reduced) return null
    const holdSec = HERO_GRID_BG_LOOP_SEC / n
    return heroGridCrossfadeCss(cssSafeId, n, holdSec)
  }, [cssSafeId, n, reduced])

  if (n === 0) return null

  if (reduced || n === 1) {
    return (
      <div className="hero__grid-bg" aria-hidden="true">
        <div className="hero__grid-bg__layers hero__grid-bg__layers--static">
          <div
            className="hero__grid-bg__layer hero__grid-bg__layer--static-visible"
            style={{ backgroundImage: `url(${urls[0]})` }}
          />
        </div>
        <div className="hero__grid-bg__scrim" />
      </div>
    )
  }

  return (
    <div className="hero__grid-bg" aria-hidden="true">
      {xfadeCss ? <style>{xfadeCss}</style> : null}
      <div className="hero__grid-bg__layers" data-hero-grid-xfade={cssSafeId}>
        {urls.map((src) => (
          <div key={src} className="hero__grid-bg__layer" style={{ backgroundImage: `url(${src})` }} />
        ))}
      </div>
      <div className="hero__grid-bg__scrim" />
    </div>
  )
}

function brandCharacterFrameUrls(c: BrandCharacterEntry): readonly string[] | null {
  const from =
    c.frames && c.frames.length > 0
      ? c.frames
      : c.imageFrames && c.imageFrames.length > 0
        ? c.imageFrames
        : null
  return from
}

function BrandCharacterMedia({ c }: { c: BrandCharacterEntry }) {
  const reduced = usePrefersReducedMotion()
  const rawId = useId()
  const cssSafeId = useMemo(() => rawId.replace(/:/g, ''), [rawId])
  const urls = brandCharacterFrameUrls(c)
  const xfadeCss = useMemo(() => {
    if (!urls || urls.length < 2 || reduced) return null
    const n = urls.length
    const holdSec = n >= 12 ? 0.72 : n >= 8 ? 0.88 : 1.15
    return brandCharacterCrossfadeCss(cssSafeId, n, holdSec)
  }, [cssSafeId, urls, reduced])

  if (c.imageAnimated) {
    return (
      <img
        className="card--brand__img"
        src={c.imageAnimated}
        alt={c.imageAlt}
        width={640}
        height={800}
        loading="lazy"
        decoding="async"
      />
    )
  }

  if (urls && urls.length >= 2) {
    if (reduced) {
      return (
        <img
          className="card--brand__img"
          src={urls[0]}
          alt={c.imageAlt}
          width={640}
          height={800}
          loading="lazy"
          decoding="async"
        />
      )
    }
    return (
      <>
        {xfadeCss ? <style>{xfadeCss}</style> : null}
        <div className="card--brand__frames" data-brand-char-xfade={cssSafeId}>
          {urls.map((src, i) => (
            <img
              key={src}
              className="card--brand__img card--brand__frame-img"
              src={src}
              alt={i === 0 ? c.imageAlt : ''}
              width={640}
              height={800}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              aria-hidden={i > 0}
            />
          ))}
        </div>
      </>
    )
  }

  const single = urls && urls.length === 1 ? urls[0] : c.image
  return (
    <span className="card--brand__img-breathe">
      <img
        className="card--brand__img"
        src={single}
        alt={c.imageAlt}
        width={640}
        height={800}
        loading="lazy"
        decoding="async"
      />
    </span>
  )
}

function youtubeVideoIdFromWatchUrl(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.replace(/^\//, '').split('/')[0]
      return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null
    }
    const v = u.searchParams.get('v')
    return v && /^[a-zA-Z0-9_-]{11}$/.test(v) ? v : null
  } catch {
    return null
  }
}

function editorialPremiumSrc(premiumIndex: number): string {
  const n = String(premiumIndex).padStart(2, '0')
  return `/assets/editorial/premium-${n}.png`
}

function EditorialGalleryStrip() {
  const start = site.editorial.galleryPremiumStart
  const count = site.editorial.galleryCount
  const items = Array.from({ length: count }, (_, i) => editorialPremiumSrc(start + i))
  return (
    <section
      className="section section--surface editorial-gallery section--reveal-chrome"
      aria-label={site.ui.editorialGalleryAria}
      data-reveal
    >
      <div className="editorial-gallery__inner">
        <div className="editorial-gallery__viewport">
          <div className="editorial-gallery__track" role="list">
            {items.map((src) => (
              <figure key={src} className="editorial-gallery__item" role="listitem">
                <img src={src} alt="" width={720} height={450} loading="lazy" decoding="async" />
              </figure>
            ))}
            {items.map((src) => (
              <figure key={`${src}-marquee-clone`} className="editorial-gallery__item" aria-hidden="true">
                <img src={src} alt="" width={720} height={450} loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function BrandGlobiNubiAnimationRow() {
  const { globiNubiAnimations: block } = site.brandIp
  return (
    <div className="brand-ip-anim">
      <header className="brand-ip-anim__header">
        <span className="brand-ip-anim__badge">{block.eyebrow}</span>
        <h3 className="brand-ip-anim__title">{block.title}</h3>
        <p className="brand-ip-anim__lead">{block.lead}</p>
      </header>
      <div className="brand-ip-anim__grid" role="list">
        {block.videos.map((v) => (
          <a
            key={v.videoId}
            className="brand-ip-anim__card"
            href={`https://www.youtube.com/watch?v=${v.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            role="listitem"
            aria-label={`${site.ui.youtubeOpenPrefix}${v.titleKo}`}
          >
            <div className="brand-ip-anim__media">
              <img
                className="brand-ip-anim__thumb"
                src={`https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`}
                alt=""
                width={480}
                height={360}
                loading="lazy"
                decoding="async"
              />
              <span className="brand-ip-anim__play" aria-hidden="true">
                ▶
              </span>
            </div>
            <span className="brand-ip-anim__label">{v.label}</span>
          </a>
        ))}
      </div>
      <p className="brand-ip-anim__channel">
        <a href={block.channelUrl} target="_blank" rel="noopener noreferrer">
          {block.channelLinkLabel}
          <span aria-hidden="true"> ↗</span>
        </a>
      </p>
    </div>
  )
}

function BrandTvAdsRow() {
  const { tvAds } = site.brandIp
  return (
    <div className="brand-tv-ads">
      <header className="brand-tv-ads__header">
        <span className="brand-tv-ads__badge">{tvAds.eyebrow}</span>
        <h3 className="brand-tv-ads__title">{tvAds.title}</h3>
        <p className="brand-tv-ads__lead">{tvAds.statusLine}</p>
      </header>
      <div className="brand-tv-ads__track" role="list">
        {tvAds.videos.map((v) => {
          const id = youtubeVideoIdFromWatchUrl(v.url)
          const thumb = id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null
          return (
            <a
              key={v.url}
              className="brand-tv-ads__card"
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              role="listitem"
              aria-label={`${site.ui.youtubeOpenPrefix}${v.label}`}
            >
              <div className="brand-tv-ads__media">
                {thumb ? (
                  <img
                    className="brand-tv-ads__thumb"
                    src={thumb}
                    alt=""
                    width={480}
                    height={360}
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
                <span className="brand-tv-ads__play" aria-hidden="true">
                  ▶
                </span>
              </div>
              <span className="brand-tv-ads__label">{v.label}</span>
            </a>
          )
        })}
      </div>
      <p className="brand-tv-ads__channel">
        <a href={tvAds.channelUrl} target="_blank" rel="noopener noreferrer">
          {tvAds.channelLinkLabel}
          <span aria-hidden="true"> ↗</span>
        </a>
      </p>
    </div>
  )
}

function ProductHighlights({ product }: { product: FeaturedProduct }) {
  if (!('highlights' in product)) return null
  const lines = product.highlights
  if (!Array.isArray(lines) || lines.length === 0) return null
  return (
    <ul className="product-card__highlights">
      {lines.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  )
}

/** 미션 줄에서 `emphasis` 구간을 모두 span으로 분리 (원문 단어 누락 없음, 출현 순서 기준) */
function renderMissionLine(
  line: string,
  emphasis: readonly { readonly phrase: string; readonly tone: 'gold' | 'teal' }[],
): ReactNode {
  const hits = emphasis
    .map((e) => ({ ...e, index: line.indexOf(e.phrase) }))
    .filter((h) => h.index !== -1)
    .sort((a, b) => a.index - b.index)

  if (hits.length === 0) return line

  const nodes: ReactNode[] = []
  let cursor = 0
  hits.forEach((h, idx) => {
    if (h.index < cursor) return
    if (h.index > cursor) nodes.push(line.slice(cursor, h.index))
    const cls = h.tone === 'teal' ? 'mission-em mission-em--teal' : 'mission-em mission-em--gold'
    nodes.push(
      <span key={`m-${idx}-${h.index}`} className={cls}>
        {h.phrase}
      </span>,
    )
    cursor = h.index + h.phrase.length
  })
  if (cursor < line.length) nodes.push(line.slice(cursor))
  return <>{nodes}</>
}

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <header className="section-head">
      <p className="section-head__eyebrow">{eyebrow}</p>
      <h2 className="section-head__title">{title}</h2>
    </header>
  )
}

function SocialLinks({ variant }: { variant: 'header' | 'footer' | 'drawer' }) {
  const cls =
    variant === 'header'
      ? 'social-links social-links--header'
      : variant === 'footer'
        ? 'social-links social-links--footer'
        : 'social-links social-links--drawer'
  return (
    <ul className={cls} aria-label={site.ui.socialNavAria}>
      {site.socialChannels.map((ch) => {
        const isPlaceholder = ch.href === '#'
        const isExternal = ch.href.startsWith('http')
        return (
          <li key={ch.label}>
            <a
              href={ch.href}
              className="social-links__btn"
              aria-label={ch.label}
              title={
                isPlaceholder
                  ? `${ch.label} — ${site.ui.socialLinkSoon}`
                  : `${ch.label} (${site.ui.socialNewTab})`
              }
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <span className="social-links__abbr" aria-hidden="true">
                {ch.abbr}
              </span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}

function App() {
  const scrolled = useHeaderScrolled()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  useRevealOnScroll()

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <div id="top" className="site">
      <a className="skip-link" href="#main">
        {site.ui.skipToContent}
      </a>

      <header className={`topbar ${scrolled ? 'topbar--scrolled' : ''}`}>
        <a className="logo" href="#top" onClick={() => setMenuOpen(false)}>
          <img
            className="logo__img"
            src={site.brand.logoNav}
            alt={`${site.nameKo} (${site.nameEn})`}
            width={253}
            height={51}
            decoding="async"
          />
        </a>

        <nav className="nav nav--desktop" aria-label={site.ui.navMainAria}>
          <ul>
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <SocialLinks variant="header" />

        <button
          type="button"
          className={`menu-btn ${menuOpen ? 'menu-btn--open' : ''}`}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="menu-btn__lines" aria-hidden="true" />
          <span className="visually-hidden">{menuOpen ? site.ui.menuClose : site.ui.menuOpen}</span>
        </button>
      </header>

      <div
        className={`drawer-backdrop ${menuOpen ? 'is-open' : ''}`}
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
      />

      <nav id={menuId} className={`drawer ${menuOpen ? 'is-open' : ''}`} aria-label={site.ui.navMobileAria}>
        {site.nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="drawer__link"
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <div className="drawer__social">
          <p className="drawer__social-label">{site.ui.drawerSnsLabel}</p>
          <SocialLinks variant="drawer" />
        </div>
      </nav>

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__layers" aria-hidden="true">
            <div className="hero__mesh" />
          </div>
          <HeroGridBackgroundSlideshow />
          <div className="hero__grid">
            <div className="hero__editorial-card hero__copy hero__copy--stagger" data-reveal>
              <img
                className="hero__lockup"
                src={site.brand.logoLockup}
                alt=""
                width={3000}
                height={1987}
                decoding="async"
              />
              <p className="hero__slogan" lang="en">
                {site.brand.sloganEn}
              </p>
              <p className="hero__eyebrow">{site.nameEn}</p>
              <h1 id="hero-title" className="hero__title">
                {site.nameKo}
              </h1>
              <p className="hero__tagline">{site.tagline}</p>
              <p className="hero__vision-echo">{site.heroVisionEcho}</p>
              <p className="hero__lead">{site.heroLead}</p>
              <p className="hero__legal">
                {site.legal.companyName} · {site.legal.bizRegWords} {site.legal.bizReg}
              </p>
              <div className="hero__actions">
                {site.heroActions.map((action) => (
                  <a
                    key={action.href}
                    className={`btn ${action.variant === 'primary' ? 'btn--primary' : 'btn--ghost'}`}
                    href={action.href}
                  >
                    {action.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="trust-strip" data-reveal>
            {site.trustStrip.map((item) => (
              <div key={item.label} className="trust-strip__item">
                <span className="trust-strip__value">{item.value}</span>
                <span className="trust-strip__label">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section
          id="overview"
          className="section section--surface section--editorial section--reveal-chrome"
          data-reveal
        >
          <div className="section__inner section__split">
            <div className="section__split-main">
              <SectionHead eyebrow={site.sectionEyebrow.overview} title={site.overview.title} />
              <blockquote className="overview-callout">
                <p>{site.overview.slogan}</p>
              </blockquote>
              {site.overview.paragraphs.map((p, i) => (
                <p key={i} className="prose">
                  {p}
                </p>
              ))}
              <h3 className="subsection-title subsection-title--tight">{site.overview.statusTitle}</h3>
              <dl className="overview-status">
                {site.overview.statusRows.map(({ key, icon }) => (
                  <div
                    key={key}
                    className="overview-status__row"
                    data-overview-row={key}
                  >
                    <dt>
                      <span className="overview-status__dt-inner">
                        <span className="overview-status__dt-icon" aria-hidden>
                          {OVERVIEW_STATUS_DT_ICONS[icon]}
                        </span>
                        {site.overview.statusLabels[key]}
                      </span>
                    </dt>
                    <dd>{site.overview.status[key]}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <figure className="section__split-media editorial-aside">
              <div
                className="overview-aside-panel"
                role="img"
                aria-label={site.ui.overviewAsideVisualAria}
                style={
                  {
                    ['--ed-overview-1' as string]: `url(${site.editorial.overviewAside})`,
                    ['--ed-overview-2' as string]: 'none',
                  } as CSSProperties
                }
              />
              <figcaption className="visually-hidden">{site.ui.overviewFigureCaption}</figcaption>
            </figure>
          </div>
        </section>

        <EditorialGalleryStrip />

        <section
          id="philosophy"
          className="section section--philosophy section--reveal-chrome"
          data-reveal
        >
          <div
            className="philosophy-hero-band"
            aria-hidden="true"
            style={
              {
                ['--ed-philosophy-hero-band' as string]: `url(${site.editorial.philosophyHeroBand})`,
              } as CSSProperties
            }
          />
          <div className="section__inner section__inner--philosophy">
            <SectionHead
              eyebrow={site.sectionEyebrow.philosophy}
              title={site.philosophy.title}
            />
            <div className="philosophy-manifesto">
              <p className="philosophy-manifesto__line">
                <span className="philosophy-manifesto__line-en">{site.philosophy.manifesto.lineEn}</span>
                <span className="philosophy-manifesto__line-ko">{site.philosophy.manifesto.lineKo}</span>
              </p>
              <p className="philosophy-manifesto__sub">{site.philosophy.manifesto.sub}</p>
              <ul className="pill-list pill-list--center">
                {site.philosophy.brandValuesFour.map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
            </div>

            <div
              className={
                site.philosophy.missionBackground
                  ? 'philosophy-mission philosophy-mission--has-photo'
                  : 'philosophy-mission'
              }
              aria-labelledby="philosophy-mission-heading"
              style={
                site.philosophy.missionBackground
                  ? ({
                      ['--ed-philosophy-mission-bg' as string]: `url(${site.philosophy.missionBackground})`,
                    } as CSSProperties)
                  : undefined
              }
            >
              <p className="philosophy-mission__eyebrow">{site.philosophy.mission.titleEn}</p>
              <h3 id="philosophy-mission-heading" className="philosophy-mission__title">
                {site.philosophy.mission.title}
              </h3>
              <div className="philosophy-mission__body">
                {site.philosophy.mission.lines.map((line) => (
                  <p key={line} className="philosophy-mission__line">
                    {renderMissionLine(line, site.philosophy.mission.emphasis)}
                  </p>
                ))}
              </div>
            </div>

            <h3 className="subsection-title">{site.philosophy.visionTitle}</h3>
            <p className="prose prose--center">{site.philosophy.visionStatement}</p>
            <div className="vision-grid">
              {site.philosophy.visionItems.map((item) => (
                <article key={item.title} className="vision-card">
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>

            <h3 className="subsection-title">{site.philosophy.valuesTitle}</h3>
            <div className="values-grid">
              {site.philosophy.coreValues.map((item) => (
                <article key={item.title} className="value-chip">
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="business-elements" className="section section--surface section--reveal-chrome" data-reveal>
          <div className="section__inner">
            <SectionHead
              eyebrow={site.sectionEyebrow.businessElements}
              title={site.businessElements.title}
            />
            <div className="business-elements__intro">
              <p className="prose prose--center business-elements__lead">{site.businessElements.lead}</p>
              <p className="prose prose--center business-elements__note">{site.businessElements.footnote}</p>
            </div>
            <div className="business-elements-grid">
              {site.businessElements.items.map((item) => (
                <article key={item.nameKo} className="business-element-card">
                  <h3 className="business-element-card__title">
                    <span className="business-element-card__title-icon" aria-hidden="true">
                      <BusinessElementTitleIcon icon={item.icon} />
                    </span>
                    <span className="business-element-card__title-label">
                      <span className="business-element-card__name">{item.nameKo}</span>
                      {item.hanja ? (
                        <span className="business-element-card__hanja" lang="zh">
                          {' '}
                          ({item.hanja})
                        </span>
                      ) : null}
                    </span>
                  </h3>
                  <dl className="business-element-card__meta">
                    <div className="business-element-card__row">
                      <dt>형태</dt>
                      <dd>{item.form}</dd>
                    </div>
                    <div className="business-element-card__row">
                      <dt>기능</dt>
                      <dd>{item.function}</dd>
                    </div>
                    <div className="business-element-card__row">
                      <dt>역할</dt>
                      <dd>{item.role}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="history"
          className="section section--surface section--history section--reveal-chrome"
          data-reveal
        >
          <div className="section__inner">
            <SectionHead eyebrow={site.sectionEyebrow.history} title={site.history.title} />
            <ol className="timeline">
              {site.history.milestones.map((block) => (
                <li key={block.year} className="timeline__item">
                  <div className="timeline__year">{block.year}</div>
                  <div className="timeline__body">
                    <ul>
                      {block.items.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="technology"
          className="section section--surface section--technology section--reveal-chrome"
          data-reveal
        >
          <div className="section__inner">
            <SectionHead
              eyebrow={site.sectionEyebrow.technology}
              title={site.technology.title}
            />
            <div className="technology-accent" aria-hidden="true" />
            <div className="card-grid card-grid--tech">
              {site.technology.items.map((item, i) => (
                <article key={item.title} className="card card--tech">
                  <span className="card__index" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3>
                    <span className="card--tech__title-icon" aria-hidden="true">
                      {TECH_CARD_TITLE_ICONS[item.icon]}
                    </span>
                    {item.title}
                  </h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
            <div className="credentials-block">
              <h3 className="subsection-title subsection-title--tight">{site.credentials.title}</h3>
              <p className="prose prose--tech-note">{site.credentials.intro}</p>
              <ul className="credentials-block__list">
                {site.credentials.bullets.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="products" className="section section--products section--reveal-chrome" data-reveal>
          <div className="section__inner">
            <SectionHead eyebrow={site.sectionEyebrow.products} title={site.products.title} />
            <div className="product-grid card-grid--products">
              {site.products.featured.map((p) => (
                <article key={p.shopHref} className="product-card">
                  <div className="product-card__media">
                    <img
                      src={p.image}
                      alt={p.name}
                      width={'imageWidth' in p && typeof p.imageWidth === 'number' ? p.imageWidth : 400}
                      height={
                        'imageHeight' in p && typeof p.imageHeight === 'number' ? p.imageHeight : 400
                      }
                    />
                  </div>
                  <div className="product-card__body">
                    <h3>{p.name}</h3>
                    <p>{p.blurb}</p>
                    <ProductHighlights product={p} />
                    <p className="product-card__shop">
                      <a href={p.shopHref} target="_blank" rel="noopener noreferrer">
                        {site.ui.productShopLink}
                        <span className="product-card__shop-arrow" aria-hidden="true">
                          ↗
                        </span>
                      </a>
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <p className="prose prose--center product-list-hub">
              <a
                className="product-list-hub__link"
                href={site.products.listUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {site.products.listLabel}
                <span aria-hidden="true"> ↗</span>
              </a>
            </p>
            <p className="prose prose--center product-list-outro">{site.products.outro}</p>
            {site.products.moreCategories.length > 0 ? (
              <ul className="checklist checklist--boxed">
                {site.products.moreCategories.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>

        <section id="brand" className="section section--surface section--reveal-chrome" data-reveal>
          <div className="section__inner">
            <SectionHead eyebrow={site.sectionEyebrow.brand} title={site.brandIp.title} />
            <div className="brand-philosophy">
              <h3 className="subsection-title subsection-title--tight brand-philosophy__title">
                {site.brandIp.symbolStory.title}
              </h3>
              {site.brandIp.symbolStory.paragraphs.map((p, i) => (
                <p key={`brand-symbol-${i}`} className="prose prose--center brand-philosophy__p">
                  {p}
                </p>
              ))}
            </div>
            <BrandTvAdsRow />
            <p className="prose prose--center brand-ip-intro">{site.brandIp.intro}</p>
            <p className="palette-note">{site.brandIp.palette}</p>
            <div className="card-grid card-grid--brand">
              {site.brandIp.characters.map((c) => (
                <article key={c.name} className="card card--brand">
                  <div className="card--brand__layout">
                    <div className="card--brand__media">
                      <BrandCharacterMedia c={c} />
                    </div>
                    <div className="card--brand__body">
                      <h3>{c.name}</h3>
                      <p className="card__role">{c.role}</p>
                      <p>{c.desc}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <BrandGlobiNubiAnimationRow />
          </div>
        </section>

        <section
          id="global"
          className="section section--global section--reveal-chrome"
          data-reveal
        >
          <div className="section--global__photo" aria-hidden="true" />
          <div className="section--global__scrim" aria-hidden="true" />
          <div className="section__inner section__inner--global">
            <SectionHead
              eyebrow={site.sectionEyebrow.partnership}
              title={site.partnership.title}
            />
            <ul className="checklist checklist--global">
              {site.partnership.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="channels" className="section section--surface section--reveal-chrome" data-reveal>
          <div className="section__inner section__inner--narrow">
            <SectionHead
              eyebrow={site.sectionEyebrow.channels}
              title={site.officialChannels.title}
            />
            <p className="prose prose--center">{site.officialChannels.intro}</p>
            <ul className="official-links">
              {site.officialChannels.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    <span className="official-links__media">
                      <img src={link.visualSrc} alt="" width={48} height={48} decoding="async" />
                    </span>
                    <span className="official-links__label">{link.label}</span>
                    <span className="official-links__arrow" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" className="section section--contact section--reveal-chrome" data-reveal>
          <div className="section__inner section__inner--narrow">
            <SectionHead eyebrow={site.sectionEyebrow.contact} title={site.contact.title} />
            <div className="contact-offices">
              {site.contact.offices.map((office) => (
                <article key={office.heading} className="contact-office">
                  <h3>{office.heading}</h3>
                  <p className="contact-office__address">{office.address}</p>
                  <ul className="contact-office__maps" aria-label={site.ui.contactMapListAria}>
                    {site.contact.externalMapLinks.map((mapLink) => (
                      <li key={`${office.heading}-${mapLink.id}`}>
                        <a
                          className="contact-office__map-link"
                          href={`${mapLink.hrefPrefix}${encodeURIComponent(office.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {mapLink.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="contact-office__line">
                    <a href={office.telHref}>{office.telDisplay}</a>
                  </p>
                  {'faxDisplay' in office && office.faxDisplay ? (
                    <p className="contact-office__line">{office.faxDisplay}</p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <img
            className="footer__logo"
            src={site.brand.logoLockup}
            alt={site.nameEn}
            width={240}
            height={62}
            decoding="async"
          />

          <div className="footer__columns">
            <div className="footer__col footer__col--company">
              <p className="footer__line footer__line--strong">{site.footer.companyLine}</p>
              <p className="footer__line">{site.footer.addressLine}</p>
              <p className="footer__line">
                {site.footer.bizRegPrefix}
                {site.legal.bizReg}{' '}
                <a
                  className="footer__outlink"
                  href={site.footer.bizRegCheckHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {site.footer.bizRegCheckLabel} &gt;
                </a>
              </p>
              <p className="footer__line">{site.footer.mailOrder}</p>
              <p className="footer__line">
                {site.footer.mainTelLabel} :{' '}
                <a href={site.footer.mainTelHref}>{site.footer.mainTelDisplay}</a>
              </p>
              {site.footer.faxLine ? <p className="footer__line">{site.footer.faxLine}</p> : null}
              <p className="footer__line">{site.footer.privacyOfficer}</p>
            </div>

            <div className="footer__col footer__col--meta">
              <nav className="footer__legal" aria-label="약관 및 안내">
                {site.footer.legalLinks.map((link, i) => (
                  <span key={link.label} className="footer__legal-item">
                    {i > 0 ? (
                      <span className="footer__sep" aria-hidden="true">
                        |
                      </span>
                    ) : null}
                    <a href={link.href}>{link.label}</a>
                  </span>
                ))}
              </nav>

              <SocialLinks variant="footer" />

              <p className="footer__copyright">{site.footer.copyrightLine}</p>
              <p className="footer__email">
                <a href={`mailto:${site.footer.email}`}>{site.footer.email}</a>
              </p>

              <div className="footer__pay-badges" aria-label="결제·에스크로 안내">
                {site.footer.paymentBadges.map((b) => (
                  <a key={b.label} className="footer__pay-badge" href={b.href}>
                    {b.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="footer__fineprints">
            {site.footer.fineprints.map((line) => (
              <p key={line} className="fineprint">
                {line}
              </p>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
