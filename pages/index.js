import Head from 'next/head'


export default function Home() {
  return (
    <div>
      <Head>
        <title>Twitter dev</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1><a>devter</a></h1>
        <nav>
          <a href="/timeline">Timeline</a>
        </nav>
      </main>

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
