"use client";

import Script from "next/script";

type AnalyticsScriptsProps = {
  gaTrackingId?: string;
  metricaId?: string;
};

export function AnalyticsScripts({ gaTrackingId, metricaId }: AnalyticsScriptsProps) {
  const googleId = gaTrackingId ?? process.env.NEXT_PUBLIC_GA_ID;
  const ymId = metricaId ?? process.env.NEXT_PUBLIC_YM_ID;

  return (
    <>
      {googleId ? (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${googleId}`}
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleId}');
            `}
          </Script>
        </>
      ) : null}

      {ymId ? (
        <Script id="ym-init" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              k=e.createElement(t),a=e.getElementsByTagName(t)[0];
              k.async=1;k.src=r;a.parentNode.insertBefore(k,a);
            })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
            ym(${ymId}, 'init', {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
            });
          `}
        </Script>
      ) : null}
    </>
  );
}
