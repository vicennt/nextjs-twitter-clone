import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/client";
import { useRouter } from "next/router";

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined,
};

export default function useUser() {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(setUser);
  }, []); // Al montar la aplicación

  useEffect(() => {
    // Si el usuario cambia y deja de estar logeado lo mandamos al indice
    user === USER_STATES.NOT_LOGGED && router.push("/");
  }, [user]);

  return user;
}
