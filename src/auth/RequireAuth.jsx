import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <div className="auth-gate">
        <div className="auth-card">
          <div className="auth-icon">🔐</div>

          <h2>Sign in required</h2>

          <p>
            Please sign in before continuing to checkout.
          </p>

          <Navigate
            to="/checkout"
            state={{ from: location.pathname }}
            replace
          />
        </div>
      </div>
    );
  }

  return children;
}