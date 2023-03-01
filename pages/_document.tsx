import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Open+Sans:wght@400;500;600"
        />
        <link
          rel="preload"
          as="image"
          href="https://sciencehub.lab.altoslabs.com/media/Rectangle-2495.png"
        />
        <meta name="description" content="..." />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
