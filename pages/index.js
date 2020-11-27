import AppLayout from "components/AppLayout";
import Button from "components/Button";
import GitHub from "components/Icons/GitHub";
import Logo from "components/Icons/Logo";
import { colors } from "styles/theme";

import { loginWithGitHub, onAuthStateChanged } from "firebase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined,
};

export default function Home() {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(setUser);
  }, []); // Al montar la aplicación

  useEffect(() => {
    // Vamos a la home si el usuario esta logueado
    user && router.replace("/home");
  }, [user]);

  const handleClick = () => {
    loginWithGitHub().catch((error) => {
      console.log(error);
    });
  };

  return (
    <div>
      <AppLayout>
        <section>
          <Logo width="200" />
          <h1>Devter</h1>
          <h2>Talk about development with developers</h2>
          <div>
            {user === USER_STATES.NOT_LOGGED && (
              <Button onClick={handleClick}>
                <GitHub fill="#ffff" width={24} height={24} />
                Login with GitHub
              </Button>
            )}
            {user === USER_STATES.NOT_KNOWN && <span>Loaging...</span>}
          </div>
        </section>
      </AppLayout>

      <style jsx>{`
        section {
          display: grid;
          height: 100%;
          place-items: center;
          place-content: center;
        }

        div {
          margin-top: 16px;
        }

        img {
          width: 120px;
        }

        h1 {
          color: ${colors.primary};
          font-weight: 800;
          font-size: 32px;
          margin-bottom: 8px;
        }

        h2 {
          font-size: 16px;
          color: ${colors.secondary};
          margin: 0;
        }
      `}</style>
    </div>
  );
}
