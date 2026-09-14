import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import DishCard from "../menu/DishCard";

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <main className="page">
      <div className="container">

        <div className="page-heading compact">
          <span className="eyebrow">YOUR COLLECTION</span>

          <h1>❤️ Favorite Dishes</h1>

          <p>
            Your favorite Addis Eats dishes are saved here.
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🤍</div>

            <h2>No favorites yet</h2>

            <p>
              Tap the heart on a dish to save it here.
            </p>

            <Link to="/menu" className="btn">
              Explore Menu
            </Link>
          </div>
        ) : (
          <>
            <div className="results-info">
              <strong>{favorites.length}</strong>{" "}
              favorite dishes
            </div>

            <div className="dish-grid">
              {favorites.map((dish) => (
                <DishCard
                  key={dish.id}
                  dish={dish}
                />
              ))}
            </div>
          </>
        )}

      </div>
    </main>
  );
}