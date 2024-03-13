import * as React from "react";
import { PostHeader } from "./post-header";
import { IndexDataProps } from "./types";

interface Props {
  posts: IndexDataProps["allMarkdownRemark"]["nodes"];
}

const PostList = ({ posts }: Props) => {
  return (
    <ol className="m-0 p-0 list-none">
      {posts.map((post) => {
        return (
          <li key={post.fields.slug}>
            <article
              className="post-list-item my-8"
              itemScope
              itemType="http://schema.org/Article"
            >
              <PostHeader post={post} isListItem={true} />
              <section>
                <p
                  className="mb-0 text-sm text-text"
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
