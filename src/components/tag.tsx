import * as React from "react";
import { tlsx } from "../utils/tlsx";

// TODO: hover effect / click to filter posts by tag
const Tag = ({ tag }: { tag: string }) => (
  <span
    className={tlsx(
      "inline-block font-enonly font-bold text-xs",
      "bg-tag-background text-tag",
      "px-1.5 py-1 mr-1",
      "rounded"
      // "hover:bg-tag hover:text-tag-background cursor-pointer",
    )}
  >
    {tag}
  </span>
);

export default Tag;
