import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  const { pathname } = useLocation();
  return (
    <div class="h-100 p-5  rounded-3 title text-center mx-auto w-100 rounded-5 bg-opacity-75">
      <h2 className="display-1 fw-bold">404</h2>
      <p className="fs-3">
        <span className="text-danger">Oops!</span> Page not found.
      </p>
      <p className="lead">{pathname} doesn’t exist.</p>
      <Link to={"/"} className="returnHome">
        Go Home
      </Link>
    </div>
  );
}
