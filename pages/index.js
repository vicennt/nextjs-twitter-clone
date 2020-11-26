import AppLayout from "components/AppLayout";
import Button from "components/Button";
import GitHub from "components/Icons/GitHub";
import { colors } from "styles/theme";

import { loginWithGitHub, onAuthStateChanged } from "firebase/client";
import { useEffect, useState } from "react";
import Avatar from "components/Avatar";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(setUser);
  }, []); // Al montar la aplicación

  const handleClick = () => {
    loginWithGitHub()
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <AppLayout>
        <section>
          <img src="/logo.png" alt="Logo" />
          <h1>Devter</h1>
          <h2>Talk about development with developers</h2>
          <div>
            {user === null ? (
              <Button onClick={handleClick}>
                <GitHub fill="#ffff" width={24} height={24} />
                Login with GitHub
              </Button>
            ) : (
              <div>
                <Avatar
                  src={user.avatar}
                  alt={user.username}
                  text={user.username}
                  withText
                />
              </div>
            )}
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
