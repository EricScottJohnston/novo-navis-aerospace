import '../styles/globals.css'
import Script from 'next/script'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KTSKLC3P');`
          }}
        />
        {/* Reddit Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js?pixel_id=a2_is5chzhhi73u",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','a2_is5chzhhi73u');rdt('track', 'PageVisit');`
          }}
        />
      </Head>

      {/* GTM noscript fallback */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-KTSKLC3P"
          height="0"
          width="0"
          style={{display: 'none', visibility: 'hidden'}}
        />
      </noscript>

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-G3X6LMB2HE"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-G3X6LMB2HE');
        `}
      </Script>
      <Script id="scroll-depth" strategy="afterInteractive">
        {`
          (function() {
            var depths = [25, 50, 90];
            var fired = {};
            function getScrollPercent() {
              var el = document.documentElement;
              return Math.round((el.scrollTop || document.body.scrollTop) / ((el.scrollHeight || document.body.scrollHeight) - el.clientHeight) * 100);
            }
            window.addEventListener('scroll', function() {
              var pct = getScrollPercent();
              depths.forEach(function(d) {
                if (!fired[d] && pct >= d) {
                  fired[d] = true;
                  window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({
                    event: 'scroll_depth',
                    percent_scrolled: d
                  });
                }
              });
            }, { passive: true });
          })();
        `}
      </Script>
      <Component {...pageProps} />
    </>
  )
}