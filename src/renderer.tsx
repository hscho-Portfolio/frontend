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
