import * as React from "react";
import { Link } from "gatsby";

const PostHeader = ({ post, isListItem }) => {
  const { slug } = post.fields;
  const { title, category, date } = post.frontmatter;
  return (
    <header className="post-header">
      {isListItem ? (
        <h2 className="header">
          <Link to={slug} itemProp="url">
            <span itemProp="headline">{title}</span>
          </Link>
        </h2>
      ) : (
        <h1 className="header">
          <span itemProp="headline">{title}</span>{" "}
        </h1>
      )}
      <div className="category">
        <Link to={`/category/${category}/`} itemProp="url">
          <span itemProp="category">{category.toUpperCase()} </span>
        </Link>
      </div>
      <small>{date}</small>
    </header>
  );
};

export default PostHeader;
