import { NavLink } from "react-router-dom";
import CartBadge from "./CartBadge";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="container nav-container">

        <NavLink to="/" className="logo">
          🍴 Addis Eats
        </NavLink>

        <nav className="nav">
          <NavLink to="/" end>
            Home
          </NavLink>

          <NavLink to="/menu">
            Menu
          </NavLink>

          <NavLink to="/favorites">
            ❤️ Favorites
          </NavLink>

          <NavLink to="/orders">
            Orders
          </NavLink>
        </nav>

        <div className="header-actions">
          <button
            className="theme-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <CartBadge />
        </div>

      </div>
    </header>
  );
}