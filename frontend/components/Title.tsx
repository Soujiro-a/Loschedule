import Head from "next/head";
import { ScriptProps } from "next/script";

const Title = ({ title }: ScriptProps) => {
  return (
    <Head>
      <title>{title} | Loschedule</title>
    </Head>
  );
};

export default Title;
