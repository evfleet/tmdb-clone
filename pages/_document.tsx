import Document, { Head, Main, NextScript } from "next/document";

class CustomDocument extends Document {
  public render() {
    return (
      <html>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600"
          />
          <style>
            {`
              html, body {
                height: 100%;
              }

              body {
                margin: 0;
              }
            `}
          </style>
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
