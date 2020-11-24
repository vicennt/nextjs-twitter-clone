import Head from 'next/head';
import { fonts, colors } from '../styles/theme';
import { addOpacityToColor } from '../styles/utils';

const backgroundColor = addOpacityToColor(colors.primary, 0.3);


export default function AppLayout({ children }) {
  return (
    <>
      <Head>
        <title>Twitter dev</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
      <style jsx global>
        {`
          html,
          body {
            background-image: 
              radial-gradient(${backgroundColor} 1px, transparent 1px),
              radial-gradient(${backgroundColor} 1px, transparent 1px);
            background-position: 0 0, 25px 25px;
            background-size: 50px 50px;
            padding: 0;
            margin: 0;
            font-family: ${fonts.base};
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          * {
            box-sizing: border-box;
          }
        `}
      </style>
    </>
  );
}
