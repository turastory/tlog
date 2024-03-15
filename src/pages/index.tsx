import * as React from "react";
import type { PageProps } from "gatsby";
import { graphql } from "gatsby";
import _ from "lodash";
import Layout from "../components/layout";
import Seo from "../components/seo";
import PostList from "../components/post-list";
import Categories from "../components/categories";
import { IndexDataProps, PageContextProps } from "../components/types";
import Tags from "../components/tags";

export default ({
  data,
  pageContext,
  path,
}: PageProps<IndexDataProps, PageContextProps>) => {
  const { category, tag } = pageContext;
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const siteDescription = data.site.siteMetadata?.description || `All posts`;
  let posts = data.allMarkdownRemark.nodes;
  let filteredPosts = posts;

  const categories = Object.entries(
    _.countBy(posts.map((post) => post.frontmatter.category))
  ).map(([category, count]) => ({ category, count }));

  // Filter posts by category
  filteredPosts = category
    ? filteredPosts.filter((post) => post.frontmatter.category === category)
    : filteredPosts;

  // Now we want to show tags within the category
  const filteredTags = Object.entries(
    _.countBy(
      filteredPosts
        .map((post) => post.frontmatter.tags)
        .filter((tag) => tag != null)
        .flat()
    )
  ).map(([tag, count]) => ({ tag, count }));

  const numberOfPosts = filteredPosts.length;

  // Filter posts by selected tag
  filteredPosts = tag
    ? filteredPosts.filter((post) => post.frontmatter.tags.includes(tag))
    : filteredPosts;

  return (
    <Layout title={siteTitle} path={path}>
      <Seo title={siteDescription} />
      <Categories categories={categories} activeCategory={category} />
      <Tags
        totalCount={numberOfPosts}
        tags={filteredTags}
        activeTag={tag}
        activeCategory={category}
      />
      <PostList posts={filteredPosts} />
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          title
          description
          category
          tags
        }
      }
    }
  }
`;
