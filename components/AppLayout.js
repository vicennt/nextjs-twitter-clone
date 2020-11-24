import Head from 'next/head';
import styles, {globalStyles} from './styles';



export default function AppLayout({ children }) {
  return (
    <>
      <div>
        <Head>
          <title>Twitter dev</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          {children}
        </main>
      </div>
      <style jsx>{styles}</style>
      <style jsx global>{globalStyles}</style>
    </>
  );
}
