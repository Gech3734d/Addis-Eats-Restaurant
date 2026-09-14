import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartBadge() {
  const { totalItems } = useCart();

  return (
    <Link to="/cart" className="cart-badge" aria-label="Open shopping cart">
      🛒
      {totalItems > 0 && (
        <span>{totalItems}</span>
      )}
    </Link>
  );
}