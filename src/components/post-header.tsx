import { Link } from "gatsby";
import * as React from "react";
import { IndexDataProps } from "./types";
import Tag from "./tag";

export interface PostHeaderProps {
  post: IndexDataProps["allMarkdownRemark"]["nodes"][0];
  isListItem?: boolean;
}

// Copy url to clipboard
const copyToClipboard = (url: string) => {
  navigator.clipboard.writeText(url);
};

export const ExtendedPostHeader = ({ post }: PostHeaderProps) => {
  const { slug } = post.fields;
  const { title, category, date, tags } = post.frontmatter;
  return (
    <header className="mb-2">
      <h1 className="text-2.5xl">
        <Link to={slug} itemProp="url">
          <span itemProp="headline">{title}</span>
        </Link>
      </h1>
      <div className="grid grid-cols-[4rem_1fr] mt-4 mb-8 text-sm gap-2 bg-slate-50 p-4 rounded-lg">
        <span className="font-bold">카테고리</span>
        <span className="text-sm font-bold" itemProp="category ">
          <Link to={`/${category}/`} itemProp="url">
            {category.toUpperCase()}{" "}
          </Link>
        </span>
        {date ? (
          <>
            <span className="font-bold">작성일</span>
            <span className="text-text-light">{date}</span>
          </>
        ) : null}
        {tags && tags.length > 0 ? (
          <>
            <span className="font-bold">태그</span>
            <div className="inline gap-1">
              {tags.map((tag) => (
                <Tag key={tag} tag={tag} />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </header>
  );
};

export const PostHeader = ({ post }: PostHeaderProps) => {
  const { slug } = post.fields;
  const { title, category, date } = post.frontmatter;
  return (
    <header className="mb-2">
      <h2 className="mb-0 mt-0">
        <Link to={slug} itemProp="url">
          <span itemProp="headline">{title}</span>
        </Link>
      </h2>
      <div className="inline-flex items-center gap-2">
        <Link to={`/${category}/`} itemProp="url">
          <span className="text-sm font-bold" itemProp="category ">
            {category.toUpperCase()}{" "}
          </span>
        </Link>
        <span className="text-xs text-text-light">{date}</span>
      </div>
    </header>
  );
};
