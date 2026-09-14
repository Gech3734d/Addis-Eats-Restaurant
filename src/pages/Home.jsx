import { Link } from "react-router-dom";
import { useCallback } from "react";

import { getDishes } from "../api/dishes";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import DishCard from "../menu/DishCard";

export default function Home() {
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
        <h2>Unable to load specials</h2>
        <p>{error}</p>
      </div>
    );
  }

  const specials = dishes.slice(0, 4);

  return (
    <main className="home">

      {/* HERO */}

      <section className="hero">
        <div className="container hero-content">

          <div className="hero-text">

            <span className="eyebrow">
              WELCOME TO ADDIS EATS
            </span>

            <h1>
              Taste the best
              <span> of Addis.</span>
            </h1>

            <p>
              Delicious Ethiopian and international food,
              delivered fresh to your doorstep.
            </p>

            <div className="hero-actions">
              <Link
                to="/menu"
                className="btn"
              >
                Explore Menu →
              </Link>

              <Link
                to="/favorites"
                className="secondary-btn"
              >
                ❤️ Favorites
              </Link>
            </div>

          </div>

          <div className="hero-image">
            <img
              src={dishes[0]?.image}
              alt="Delicious Ethiopian food"
            />

            <div className="floating-card">
              ⭐ 4.9
              <span>Customer rating</span>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURES */}

      <section className="features">
        <div className="container feature-grid">

          <div className="feature">
            <span>🚀</span>
            <h3>Fast Delivery</h3>
            <p>Fresh food delivered quickly.</p>
          </div>

          <div className="feature">
            <span>🍽️</span>
            <h3>Fresh Food</h3>
            <p>Made fresh with quality ingredients.</p>
          </div>

          <div className="feature">
            <span>❤️</span>
            <h3>Made With Love</h3>
            <p>Your satisfaction comes first.</p>
          </div>

        </div>
      </section>

      {/* SPECIALS */}

      <section className="specials">
        <div className="container">

          <div className="section-heading">
            <div>
              <span className="eyebrow">
                TODAY'S PICKS
              </span>

              <h2>Today's Specials</h2>
            </div>

            <Link to="/menu">
              View all →
            </Link>
          </div>

          <div className="dish-grid">
            {specials.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
              />
            ))}
          </div>

        </div>
      </section>

    </main>
  );
}