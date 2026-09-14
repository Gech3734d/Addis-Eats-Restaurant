import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="page">
      <div className="container empty-state">

        <div className="empty-icon">
          🔎
        </div>

        <h1>404</h1>

        <h2>Page not found</h2>

        <p>
          Sorry, the page you are looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="btn"
        >
          Go Home
        </Link>

      </div>
    </main>
  );
}