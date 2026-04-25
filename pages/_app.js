import '../styles/globals.css'
import Script from 'next/script'
import Head from 'next/head'
import ChatWidget from '../components/ChatWidget'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (typeof window.gtag === 'function') {
        setTimeout(() => {
          window.gtag('config', 'G-G3X6LMB2HE', {
            page_path: url,
            page_title: document.title,
          })
        }, 0)
      }
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  return (
    <>
      <Head />
      <Script
        id="gtm"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KTSKLC3P');`
        }}
      />

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

          (function() {
            var depths = [25];
            var fired = {};
            var docHeight = 0;
            var winHeight = 0;

            function updateDimensions() {
              docHeight = Math.max(
                document.body.scrollHeight, document.documentElement.scrollHeight,
                document.body.offsetHeight, document.documentElement.offsetHeight
              );
              winHeight = window.innerHeight || document.documentElement.clientHeight;
            }

            updateDimensions();
            window.addEventListener('resize', updateDimensions, { passive: true });

            window.addEventListener('scroll', function() {
              if (docHeight - winHeight <= 0) return;
              var pct = Math.round((window.scrollY || 0) / (docHeight - winHeight) * 100);
              depths.forEach(function(d) {
                if (!fired[d] && pct >= d) {
                  fired[d] = true;
                  gtag('event', 'scroll_depth', { percent_scrolled: d });
                }
              });
            }, { passive: true });
          })();
        `}
      </Script>
      <main>
        <Component {...pageProps} />
      </main>
      {!['/interactive', '/'].includes(router.pathname) && <ChatWidget />}
    </>
  )
}