import AppLayout from "components/AppLayout";
import Button from "components/Button";
import useUser from "hooks/useUser";
import { useState } from "react";
import { addDevit } from "firebase/client";

export default function ComposeTweet() {
  const user = useUser();
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addDevit({
      avatar: user.avatar,
      content: user.message,
      userId: user.uid,
      userName: user.userName,
    });
  };

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
            <Button disabled={message.length === 0 || message.length > 140}>
              Devitear
            </Button>
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
