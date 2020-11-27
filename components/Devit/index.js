import Avatar from "components/Avatar";

export default function Devit({
  createdAt,
  id,
  userName,
  avatar,
  content,
  userId,
}) {
  return (
    <>
      <article>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> · </span>
            <date>{createdAt}</date>
          </header>
          <p>{content}</p>
        </section>
      </article>
      <style jsx>
        {`
          article {
            display: flex;
            border-bottom: 1px solid #eee;
            padding: 10px 15px;
          }

          div {
            padding-right: 10px;
          }

          p {
            line-height: 1.3125;
            margin: 0;
          }

          date {
            color: #555;
            font-size: 14px;
          }
        `}
      </style>
    </>
  );
}
