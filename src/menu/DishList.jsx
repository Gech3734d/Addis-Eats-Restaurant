import { memo } from "react";
import DishCard from "./DishCard";

function DishList({ dishes }) {
  if (dishes.length === 0) {
    return (
      <div className="empty-state">
        <div>🍽️</div>
        <h3>No dishes found</h3>
        <p>Try another search or category.</p>
      </div>
    );
  }

  return (
    <div className="dish-grid">
      {dishes.map((dish) => (
        <DishCard
          key={dish.id}
          dish={dish}
        />
      ))}
    </div>
  );
}

export default memo(DishList);