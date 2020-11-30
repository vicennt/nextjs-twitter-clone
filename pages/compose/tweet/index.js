import AppLayout from "components/AppLayout";
import Avatar from "components/Avatar";
import Button from "components/Button";
import useUser from "hooks/useUser";
import { useState, useEffect } from "react";
import { addDevit, uploadImage } from "firebase/client";
import { useRouter } from "next/router";
import Head from "next/head";

const COMPOSE_STATES = {
  USER_NOT_KNWON: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
};

export default function ComposeTweet() {
  const user = useUser();
  const router = useRouter();
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNWON);
  const [message, setMessage] = useState("");
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
  const [task, setTask] = useState(null);
  const [imgURL, setImgURL] = useState(null);

  useEffect(() => {
    if (task) {
      const onProgress = () => {};
      const onError = () => {};
      const onComplete = () => {
        console.log("onComplete");
        task.snapshot.ref.getDownloadURL().then((imgURL) => {
          setImgURL(imgURL);
        });
      };
      task.on("state_changed", onProgress, onError, onComplete);
    }
  }, [task]);

  const handleChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
    const file = event.dataTransfer.files[0];
    console.log(file);
    const task = uploadImage(file);
    setTask(task);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus(COMPOSE_STATES.LOADING);
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.userName,
      img: imgURL,
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
        <Head>
          <title>Crear un devit / Devter</title>
        </Head>
        <section className="form-container">
          {user && (
            <section className="avatar-container">
              <Avatar src={user.avatar} />
            </section>
          )}
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="¿Qué esta pasando?"
              value={message}
              onChange={handleChange}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            />
            {imgURL && (
              <section className="remove-image">
                <button onClick={() => setImgURL(null)}>x</button>
                <img src={imgURL} />
              </section>
            )}
            <div>
              <Button disabled={isButtonDisabled}>Devitear</Button>
            </div>
          </form>
        </section>
      </AppLayout>
      <style jsx>{`
        div {
          padding: 15px;
        }

        button {
          background: rgba(0, 0, 0, 0.3);
          border: 0;
          border-radius: 999px;
          color: #fff;
          font-size: 24px;
          width: 32px;
          height: 32px;
          top: 15px;
          position: absolute;
          right: 15px;
        }

        .avatar-container {
          padding-top: 20px;
          padding-left: 10px;
        }

        .form-container {
          align-items: flex-start;
          display: flex;
        }

        .remove-img {
          position: relative;
        }

        form {
          margin: 10px;
        }

        img {
          border-radius: 10px;
          height: auto;
          width: 100%;
        }

        textarea {
          width: 100%;
          font-size: 21px;
          border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
            ? "3px dashed #09f"
            : "3px solid transparent"};
          border-radius: 10px;
          padding: 15px;
          resize: none;
          min-height: 200px;
          outline: 0;
        }
      `}</style>
    </>
  );
}
