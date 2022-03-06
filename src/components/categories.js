import * as React from "react";
import { Link } from "gatsby";

const Categories = ({ categories, activeCategory }) => {
  const totalCount = categories
    .map((category) => category.count)
    .reduce((prev, curr) => prev + curr, 0);

  const allInserted = [{ category: "All", count: totalCount }, ...categories];

  return (
    <div className="category">
      {allInserted.map(({ category, count }) => {
        const isAll = category === "All";
        const isActive = isAll
          ? activeCategory == null
          : category === activeCategory;
        return (
          <div className="category-item">
            <Link to={isAll ? `/` : `/category/${category}`} itemProp="url">
              <span itemProp="category">{category.toUpperCase()}</span>
              <span className="count">{count}</span>
              {isActive ? <div className="pointer" /> : ""}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
