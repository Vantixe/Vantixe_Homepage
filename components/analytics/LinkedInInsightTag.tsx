import Script from 'next/script'

const PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID

/**
 * LinkedIn Insight Tag loader.
 *
 * Powers LinkedIn Ads conversion tracking, website retargeting audiences and
 * website demographics. Renders nothing unless NEXT_PUBLIC_LINKEDIN_PARTNER_ID
 * is set, so local development never sends traffic to LinkedIn: the variable is
 * set in the Railway production service only.
 *
 * One install here covers BOTH vantixe.com and vantixe.ai, because they are
 * served from the same Next.js deployment (see middleware.ts).
 *
 * The inline script is LinkedIn's own snippet, kept verbatim apart from the
 * partner ID. Do NOT also add this tag in Google Tag Manager: two copies would
 * double-count every page view.
 */
export function LinkedInInsightTag() {
  if (!PARTNER_ID) return null

  return (
    <>
      <Script id="linkedin-insight" strategy="afterInteractive">
        {`_linkedin_partner_id = "${PARTNER_ID}";
        window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
        window._linkedin_data_partner_ids.push(_linkedin_partner_id);
        (function(l) {
        if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
        window.lintrk.q=[]}
        var s = document.getElementsByTagName("script")[0];
        var b = document.createElement("script");
        b.type = "text/javascript";b.async = true;
        b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
        s.parentNode.insertBefore(b, s);})(window.lintrk);`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element -- tracking pixel, not content imagery */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://px.ads.linkedin.com/collect/?pid=${PARTNER_ID}&fmt=gif`}
        />
      </noscript>
    </>
  )
}
