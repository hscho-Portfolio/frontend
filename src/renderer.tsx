import { jsxRenderer } from 'hono/jsx-renderer'

type RenderProps = {
  title?: string
  bodyClass?: string
  pageScript?: string
}

export const renderer = jsxRenderer(({ children, title, bodyClass, pageScript }: any) => {
  const pageTitle = title || 'CHO OS — Portfolio'
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{pageTitle}</title>
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%236366f1'/%3E%3Cstop offset='.5' stop-color='%238b5cf6'/%3E%3Cstop offset='1' stop-color='%23ec4899'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='64' height='64' rx='14' fill='url(%23g)'/%3E%3Ctext x='50%25' y='56%25' font-family='-apple-system,sans-serif' font-size='34' font-weight='800' text-anchor='middle' fill='white'%3EC%3C/text%3E%3C/svg%3E"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Pretendard:wght@300;400;500;600;700;800&display=swap"
        />
        <link
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
          rel="stylesheet"
        />
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="/static/style.css" rel="stylesheet" />
        <link href="/static/mac-laptop.css" rel="stylesheet" />
        <link href="/static/desktop.css" rel="stylesheet" />
      </head>
      <body class={bodyClass || ''}>
        {children}
        {pageScript ? <script type="module" src={pageScript}></script> : null}
      </body>
    </html>
  )
})
