import Document, { Head, Main, NextScript } from "next/document";

class CustomDocument extends Document {
  public render() {
    return (
      <html>
        <Head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css"
          />
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default CustomDocument;
