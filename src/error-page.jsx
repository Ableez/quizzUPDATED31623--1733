import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error">
      <h1>Ooops!</h1>
      <p>sorry something went wrong</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
