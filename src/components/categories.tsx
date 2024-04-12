import * as React from "react";
import { Link } from "gatsby";
import { tlsx } from "../utils/tlsx";

interface Props {
  categories: {
    category: string;
    count: number;
  }[];
  activeCategory?: string;
}

const Categories = ({ categories, activeCategory }: Props) => {
  const totalCount = categories
    .map((category) => category.count)
    .reduce((prev, curr) => prev + curr, 0);

  const allInserted = [...categories];

  return (
    <div className="flex pb-4">
      {allInserted.map(({ category, count }) => {
        const isActive = category === activeCategory;
        return (
          <div
            className={tlsx(
              "relative font-bold font-enonly mr-4 last:mr-0",
              isActive
                ? "text-text border-b-2 border-primary pb-1"
                : "text-text-light"
            )}
            key={category}
          >
            <Link className="relative" to={`/${category}`} itemProp="url">
              <span className="font-bold" itemProp="category">
                {category.toUpperCase()}
              </span>
              <span className="text-text-light text-sm ml-1">{count}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
