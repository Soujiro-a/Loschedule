import Document, { Head, Main, NextScript } from "next/document";

export default class RootDocument extends Document {
  redner() {
    return (
      <html>
        <Head>
          <script src="../path/to/flowbite/dist/flowbite.js"></script>
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
