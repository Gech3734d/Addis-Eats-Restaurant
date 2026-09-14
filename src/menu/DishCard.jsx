import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { formatCurrency } from "../utils/formatCurrency";

export default function DishCard({ dish }) {
  const { dispatch } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const favorite = isFavorite(dish.id);

  function addToCart() {
    dispatch({
      type: "ADD_TO_CART",
      payload: dish,
    });
  }

  return (
    <article className="dish-card">

      <div className="dish-image-wrapper">
        <img
          src={dish.image}
          alt={dish.name}
          className="dish-image"
        />

        <button
          className="favorite-btn"
          onClick={() => toggleFavorite(dish)}
          aria-label={
            favorite
              ? `Remove ${dish.name} from favorites`
              : `Add ${dish.name} to favorites`
          }
        >
          {favorite ? "❤️" : "🤍"}
        </button>

        {dish.spicy && (
          <span className="spicy-badge">
            🌶️ Spicy
          </span>
        )}
      </div>

      <div className="dish-content">
        <span className="dish-category">
          {dish.category}
        </span>

        <h3>{dish.name}</h3>

        <p>{dish.description}</p>

        <div className="dish-footer">
          <strong>{formatCurrency(dish.price)}</strong>

          <button
            className="btn btn-small"
            onClick={addToCart}
          >
            + Add
          </button>
        </div>

        <Link
          to={`/menu/${dish.id}`}
          className="details-link"
        >
          View details →
        </Link>
      </div>

    </article>
  );
}