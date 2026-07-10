import Script from 'next/script'

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

/**
 * Google Tag Manager loader.
 *
 * Renders nothing unless NEXT_PUBLIC_GTM_ID is set, so this is safe to ship
 * before the GTM container exists — the site behaves exactly as before until
 * the env var is filled in.
 *
 * One install here covers BOTH vantixe.com and vantixe.ai, because they are
 * served from the same Next.js deployment (see middleware.ts).
 */
export function GoogleTagManager() {
  if (!GTM_ID) return null

  return (
    <>
      <Script id="gtm-base" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  )
}
