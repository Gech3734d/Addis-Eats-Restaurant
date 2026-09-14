import {
  Routes,
  Route,
  Outlet,
  NavLink,
} from "react-router-dom";

import Header from "./components/Header";

import Home from "./pages/Home";
import Menu from "./menu/Menu";
import DishDetails from "./pages/DishDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";

function Layout() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <div>
            <h3>🍴 Addis Eats</h3>
            <p>Good food. Fast delivery. Addis Ababa.</p>
          </div>

          <div className="footer-links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/menu">Menu</NavLink>
            <NavLink to="/favorites">Favorites</NavLink>
            <NavLink to="/orders">Orders</NavLink>
          </div>

          <p>© 2026 Addis Eats</p>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="/menu" element={<Menu />} />

        <Route
          path="/menu/:id"
          element={<DishDetails />}
        />

        <Route path="/cart" element={<Cart />} />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/favorites"
          element={<Favorites />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Route>
    </Routes>
  );
}