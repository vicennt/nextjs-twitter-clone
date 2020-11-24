import Head from 'next/head';
import Link from 'next/link';
import AppLayout from '../components/AppLayout';


export default function Home() {
  return (
    <div>
      <Head>
        <title>Twitter dev</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <h1><Link href="/"><a>devter</a></Link></h1>
        <nav>
          <Link href="/timeline"><a>Timeline</a></Link>
        </nav>
      </AppLayout>

      <style jsx>
        {`
          h1 {
            text-align: center;
            font-size: 48px;
          }

          nav {
            font-size: 24px;
            text-align: center;
          }
        `}
      </style>
    </div>
  )
}
