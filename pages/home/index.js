import AppLayout from "components/AppLayout";
import { useState, useEffect } from "react";
import Devit from "components/Devit";
import useUser from "hooks/useUser";

export default function HomePage() {
  const [timeline, setTimeline] = useState([]);
  const user = useUser();

  useEffect(() => {
    user &&
      fetch("http://localhost:3000/api/statuses/home_timeline")
        .then((res) => res.json())
        .then(setTimeline);
  }, [user]);

  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map((devit) => {
            return (
              <Devit
                key={devit.id}
                username={devit.userName}
                avatar={devit.avatar}
                message={devit.message}
                id={devit.id}
              />
            );
          })}
        </section>
        <nav></nav>
      </AppLayout>

      <style jsx>{`
        header {
          background: #ffffffaa;
          backdrop-filter: blur(5px);
          align-items: center;
          border-bottom: 1px solid #eee;
          height: 49px;
          display: flex;
          position: sticky;
          top: 0;
          width: 100%;
        }

        h2 {
          font-size: 21px;
          font-weight: 700;
          padding-left: 15px;
        }

        nav {
          background: #fff;
          bottom: 0;
          border-top: 1px solid #eee;
          height: 49px;
          position: sticky;
          width: 100%;
        }
      `}</style>
    </>
  );
}
