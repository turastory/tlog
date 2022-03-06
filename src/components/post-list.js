import * as React from "react";
import { Link } from "gatsby";
import PostHeader from "./post-header";

const PostList = ({ posts }) => {
  return (
    <ol style={{ listStyle: `none` }}>
      {posts.map((post) => {
        return (
          <li key={post.fields.slug}>
            <article
              className="post-list-item"
              itemScope
              itemType="http://schema.org/Article"
            >
              <PostHeader post={post} isListItem={true} />
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: post.frontmatter.description || post.excerpt,
                  }}
                  itemProp="description"
                />
              </section>
            </article>
          </li>
        );
      })}
    </ol>
  );
};

export default PostList;
