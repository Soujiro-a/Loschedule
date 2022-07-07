import Document, { Head, Main, NextScript } from "next/document";

export default class RootDocument extends Document {
  redner() {
    return (
      <html>
        <Head>
          <script src="./TW-ELEMENTS-PATH/dist/js/index.min.js"></script>
          <style global jsx>
            {`
              html,
              body,
              #__next {
                height: 100%;
                width: 100%;
                overflow: hidden;
              }
            `}
          </style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
