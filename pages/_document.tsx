import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html>
      <Head>
        <script
          async
          defer
          data-website-id='20a9541b-7caa-4ae6-8f3f-952bf0c3a006'
          src='https://analytics.hdas.nl/umami.js'
        ></script>
      </Head>
      <body>
        <Main></Main>
        <NextScript></NextScript>
      </body>
    </Html>
  );
};

export default Document;
