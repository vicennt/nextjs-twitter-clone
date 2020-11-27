import AppLayout from "components/AppLayout";
import Button from "components/Button";

export default function ComposeTweet() {
  return (
    <>
      <AppLayout>
        <form>
          <textarea placeholder="¿Qué esta pasando?"></textarea>
          <div>
            <Button>Devitear</Button>
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
