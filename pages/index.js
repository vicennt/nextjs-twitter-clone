import Link from 'next/link';
import AppLayout from '../components/AppLayout';


export default function Home() {
  return (
    <div>
      <AppLayout>
        <h1><Link href="/"><a>devter</a></Link></h1>
      </AppLayout>
    </div>
  )
}
