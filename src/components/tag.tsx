import * as React from "react";
import { tlsx } from "../utils/tlsx";
import { Link } from "gatsby";

interface TagProps {
  tag: string;
  count?: number;
  active?: boolean;
  linkTo?: string;
}

// TODO: hover effect / click to filter posts by tag
const Tag = ({ tag, count, active, linkTo }: TagProps) => {
  const makeTagElement = () => (
    <div
      className={tlsx(
        "inline-block font-enonly font-bold text-xs",
        "px-1.5 py-1",
        "rounded",
        active ? "bg-tag text-tag-background" : "bg-tag-background text-tag",
        linkTo != null
          ? "hover:bg-tag hover:text-tag-background cursor-pointer"
          : ""
      )}
    >
      <span>{tag}</span>
      {count != null && (
        <span className="ml-1 text-xs opacity-50">{count}</span>
      )}
    </div>
  );

  return linkTo != null ? (
    <Link to={linkTo} children={makeTagElement()} />
  ) : (
    makeTagElement()
  );
};

export default Tag;
