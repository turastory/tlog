import * as React from "react";
import Tag from "./tag";

interface Props {
  totalCount: number;
  tags: {
    tag: string;
    count: number;
  }[];
  activeCategory?: string;
  activeTag?: string;
}

const Tags = ({ totalCount, tags, activeCategory, activeTag }: Props) => {
  const allInserted = [{ tag: "All", count: totalCount }, ...tags];

  return (
    <div className="flex flex-wrap gap-1 pb-4">
      {allInserted.map(({ tag, count }) => {
        const isAll = tag === "All";
        const isActive = isAll ? activeTag == null : tag === activeTag;
        const linkPath =
          (activeCategory ? `/${activeCategory}` : "") +
          (isAll ? "/" : `/tags/${tag}`);

        return (
          <Tag
            key={tag}
            tag={tag}
            count={count}
            active={isActive}
            linkTo={linkPath}
          />
        );
      })}
    </div>
  );
};

export default Tags;
