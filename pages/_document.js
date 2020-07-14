import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta charset='utf-8' />
          <meta http-equiv='X-UA-Compatible' content='IE=edge' />
          <meta
            name='viewport'
            content='width=device-width,initial-scale=1'
          />
          <meta name='title' content='Weather Clock Now' />
          <meta
            name='description'
            content='a simple clock and weather web app'
          />
          <meta name='keywords' content='Keywords' />
          <title>Weather Clock Now</title>
          <link rel='manifest' href='/manifest.json' />
          <link
            href='/favicon-16x16.png'
            rel='icon'
            type='image/png'
            sizes='16x16'
          />
          <link
            href='/favicon-32x32.png'
            rel='icon'
            type='image/png'
            sizes='32x32'
          />
          <link rel='apple-touch-icon' href='/apple-icon.png'></link>
          <meta name='theme-color' content='#7d4cdb' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
