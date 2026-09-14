import { useCallback } from "react";
import {
  Link,
  useParams,
} from "react-router-dom";

import { getDishes } from "../api/dishes";
import useFetch from "../hooks/useFetch";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { formatCurrency } from "../utils/formatCurrency";
import Spinner from "../components/Spinner";

export default function DishDetails() {
  const { id } = useParams();
  const { dispatch } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const fetchDishes = useCallback(() => {
    return getDishes();
  }, []);

  const {
    data: dishes,
    loading,
    error,
  } = useFetch(fetchDishes);

  if (loading) return <Spinner />;

  if (error) {
    return (
      <div className="error-state">
        <h2>Something went wrong</h2>
        <p>{error}</p>
      </div>
    );
  }

  const dish = dishes.find(
    (item) => String(item.id) === id
  );

  if (!dish) {
    return (
      <div className="empty-state">
        <h2>Dish not found</h2>
        <Link to="/menu" className="btn">
          Back to Menu
        </Link>
      </div>
    );
  }

  const favorite = isFavorite(dish.id);

  return (
    <main className="page">
      <div className="container">

        <Link to="/menu" className="back-link">
          ← Back to menu
        </Link>

        <section className="detail-card">

          <div className="detail-image">
            <img
              src={dish.image}
              alt={dish.name}
            />
          </div>

          <div className="detail-content">

            <span className="dish-category">
              {dish.category}
            </span>

            <h1>{dish.name}</h1>

            <p className="detail-description">
              {dish.description}
            </p>

            {dish.spicy && (
              <div className="spicy-info">
                🌶️ This dish is spicy
              </div>
            )}

            <div className="detail-price">
              {formatCurrency(dish.price)}
            </div>

            <div className="detail-actions">

              <button
                className="btn"
                onClick={() =>
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: dish,
                  })
                }
              >
                🛒 Add to Cart
              </button>

              <button
                className="favorite-large"
                onClick={() => toggleFavorite(dish)}
              >
                {favorite
                  ? "❤️ Remove Favorite"
                  : "🤍 Add Favorite"}
              </button>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}