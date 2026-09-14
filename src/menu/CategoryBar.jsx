import { useSearchParams } from "react-router-dom";

const categories = ["All", "Ethiopian", "Pizza", "Burgers", "Drinks"];

export default function CategoryBar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selected = searchParams.get("category") || "All";

  function selectCategory(category) {
    if (category === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }

    setSearchParams(searchParams);
  }

  return (
    <div className="category-bar" aria-label="Food categories">
      {categories.map((category) => (
        <button
          key={category}
          className={selected === category ? "category active" : "category"}
          onClick={() => selectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}