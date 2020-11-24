import Link from 'next/link';
import AppLayout from '../components/AppLayout';
import { breakpoints, fonts, colors } from "../styles/theme";


export default function Home() {
  return (
    <div>
      <AppLayout>
        <section>
          <img src="/logo.png" alt="Logo"/>
          <h1>Devter</h1>
          <h2>Talk about development with developers</h2>   
        </section>
      </AppLayout>
      
      <style jsx>{`
        section {
          display: grid;
          height: 100%;
          place-items: center;
          place-content: center;
        }

        img{
          width: 120px;
        }

        h1 {
          color: ${colors.primary};
          font-weight: 800;
          margin-bottom: 8px;
        }

        h2 {
          font-size: 16px;
          color: ${colors.secondary};
          margin: 0;
        }      
      `}</style>
    </div>
  )
}
