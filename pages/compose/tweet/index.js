import AppLayout from "components/AppLayout";
import Button from "components/Button";
import useUser from "hooks/useUser";
import { useState } from "react";
import { addDevit } from "firebase/client";
import { useRouter } from "next/router";

const COMPOSE_STATES = {
  USER_NOT_KNWON: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};

export default function ComposeTweet() {
  const user = useUser();
  const router = useRouter();
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNWON);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus(COMPOSE_STATES.LOADING);
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.userName,
    })
      .then(() => {
        router.push("/home");
      })
      .catch((err) => {
        console.error(err);
        setStatus(COMPOSE_STATES.ERROR);
      });
  };

  const isButtonDisabled =
    message.length === 0 || status === COMPOSE_STATES.LOADING;

  return (
    <>
      <AppLayout>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="¿Qué esta pasando?"
            value={message}
            onChange={handleChange}
          />
          <div>
            <Button disabled={isButtonDisabled}>Devitear</Button>
          </div>
        </form>
      </AppLayout>
      <style jsx>{`
        div {
          padding: 15px;
        }

        textarea {
          width: 100%;
          font-size: 21px;
          border: 0;
          padding: 15px;
          resize: none;
          min-height: 200px;
          outline: 0;
        }
      `}</style>
    </>
  );
}