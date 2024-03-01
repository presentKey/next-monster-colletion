import Script from 'next/script';

export default function GoogleAnalytics() {
  return (
    <>
      <Script src='https://www.googletagmanager.com/gtag/js?id=G-B774HHMY5F' />
      <Script id='google-analytics'>
        {`
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());
       
         gtag('config', 'G-B774HHMY5F');
        `}
      </Script>
    </>
  );
}
