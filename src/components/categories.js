import * as React from "react";
import { Link } from "gatsby";

const Categories = ({ categories, activeCategory }) => {
  return (
    <div className="category">
      {categories.map(({ category, count }) => {
        const isActive = category === activeCategory;
        return (
          <div className="category-item">
            <Link to={`/category/${category}`} itemProp="url">
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
