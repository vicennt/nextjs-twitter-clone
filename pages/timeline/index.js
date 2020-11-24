import Link from "next/link";
import AppLayout from "../../components/AppLayout";

export default function Timeline({ userName }) {
  return (
    <>
      <AppLayout>
        <Link href="/">
          <a>Go home!</a>
        </Link>
        <h1>This is the timeline of {userName}</h1>
      </AppLayout>

      <style jsx>
        {`
          h1 {
            font-size: 36px;
            color: red;
          }
        `}
      </style>
    </>
  );
}

// Hasta que no se finaliza la ejecución de este método no se renderiza el componente
Timeline.getInitialProps = () => {
    return fetch("http://localhost:3000/api/hello")
        .then(res => res.json()); // Este objeto es el que le llega al componente como props
        
}
// Este método solo se puede utilizar en las "pages"
