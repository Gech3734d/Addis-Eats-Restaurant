import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getDishes } from "../api/dishes";
import useFetch from "../hooks/useFetch";

import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import Spinner from "../components/Spinner";

export default function Menu() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "All";

  const [search, setSearch] = useState("");

  const fetchDishes = useCallback(() => {
    return getDishes();
  }, []);

  const {
    data: dishes,
    loading,
    error,
  } = useFetch(fetchDishes);

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      const matchesCategory =
        category === "All" ||
        dish.category === category;

      const matchesSearch =
        dish.name
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [dishes, category, search]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="error-state">
        <h2>⚠️ Menu Error</h2>
        <p>{error}</p>
        <button
          className="btn"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <main className="page">
      <div className="container">

        <section className="page-heading">
          <span className="eyebrow">OUR MENU</span>

          <h1>
            Delicious food,
            <br />
            <span>made for Addis.</span>
          </h1>

          <p>
            Discover your favorite Ethiopian and international
            dishes delivered to your door.
          </p>
        </section>

        <div className="search-box">
          <span>🔍</span>

          <input
            type="search"
            placeholder="Search dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search dishes"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <CategoryBar />

        <div className="results-info">
          <strong>{filteredDishes.length}</strong> dishes found
        </div>

        <DishList dishes={filteredDishes} />

      </div>
    </main>
  );
}