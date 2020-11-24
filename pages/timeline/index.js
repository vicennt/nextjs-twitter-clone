import Link from "next/link";
import AppLayout from "../../components/AppLayout";

export default function Timeline() {
  return (
    <>
      <AppLayout>
        <Link href="/">
          <a>Go home!</a>
        </Link>
        <h1>This is the timeline!</h1>
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
