import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html style={{ height: "100%" }}>
      <Head>
        <link
          rel="preload"
          href="/Fonts/kanit-black-webfont.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/Fonts/kanit-bold-webfont.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/Fonts/kanit-light-webfont.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/Fonts/kanit-medium-webfont.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <style>
          {`
            #__next { height: 100% }
          `}
        </style>
      </Head>

      <body style={{ height: "100%" }}>
        <div id="modal-root"></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
