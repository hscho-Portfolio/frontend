import { jsxRenderer } from 'hono/jsx-renderer'

const BACKEND_URL: string = (import.meta as any).env?.VITE_BACKEND_URL ?? 'http://localhost:8080'

/**
 * 페이지별 추가 CSS/JS 옵션
 * - title       : <title>
 * - bodyClass   : <body class=...>  (intro-body·desktop-body·project-body·admin-body·admin-login-body·not-found-body)
 * - pageScript  : 페이지 전용 entry script  (e.g. /static/desktop.js)
 * - css         : 페이지 전용 추가 CSS 목록
 */
export type RenderOptions = {
  title?: string
  bodyClass?: string
  pageScript?: string
  css?: string[]
}

const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%236366f1'/%3E%3Cstop offset='.5' stop-color='%238b5cf6'/%3E%3Cstop offset='1' stop-color='%23ec4899'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='64' height='64' rx='14' fill='url(%23g)'/%3E%3Ctext x='50%25' y='56%25' font-family='-apple-system,sans-serif' font-size='34' font-weight='800' text-anchor='middle' fill='white'%3EC%3C/text%3E%3C/svg%3E"

const FA_CSS = 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css'
const FONTS_CSS =
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Pretendard:wght@300;400;500;600;700;800&display=swap'
const PRETENDARD_CSS =
  'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css'

/** 모든 페이지에서 공통으로 로드되는 base/tokens */
const BASE_CSS = ['/static/style.css']

/** 모든 페이지에 적용되는 반응형 (마지막에 로드) */
const RESPONSIVE_CSS = ['/static/css/responsive.css', '/static/css/components.css']

export const renderer = jsxRenderer(
  ({ children, title, bodyClass, pageScript, css = [] }: any) => {
    const pageTitle = title || 'CHO OS — Portfolio'
    const cssLinks = [...BASE_CSS, ...css, ...RESPONSIVE_CSS]
    return (
      <html lang="ko">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>{pageTitle}</title>
          <link rel="icon" type="image/svg+xml" href={FAVICON} />
          <link href={FA_CSS} rel="stylesheet" />
          <link rel="stylesheet" href={FONTS_CSS} />
          <link href={PRETENDARD_CSS} rel="stylesheet" />
          {cssLinks.map((href) => (
            <link href={href} rel="stylesheet" />
          ))}
        </head>
        <body class={bodyClass || ''}>
          {children}
          {/* :has() fallback for older browsers — mirror body class onto <html> for overflow control */}
          <script
            dangerouslySetInnerHTML={{
              __html: `window.BACKEND_URL=${JSON.stringify(BACKEND_URL)};(function(){var b=document.body.className||'';if(b)document.documentElement.classList.add(b);})();`,
            }}
          ></script>
          {pageScript ? <script type="module" src={pageScript}></script> : null}
        </body>
      </html>
    )
  }
)
