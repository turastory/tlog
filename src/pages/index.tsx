import * as React from "react";
import type { PageProps } from "gatsby";
import { graphql } from "gatsby";
import _ from "lodash";
import Layout from "../components/layout";
import Seo from "../components/seo";
import PostList from "../components/post-list";
import Categories from "../components/categories";
import { IndexDataProps, PageContextProps } from "../components/types";

export default ({
  data,
  pageContext,
  path,
}: PageProps<IndexDataProps, PageContextProps>) => {
  const { category } = pageContext;
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const siteDescription = data.site.siteMetadata?.description || `All posts`;
  const posts = data.allMarkdownRemark.nodes;
  const filtered = category
    ? posts.filter((post) => post.frontmatter.category === category)
    : posts;

  const result = _.groupBy(posts, (post) => post.frontmatter.category);
  const categories = Object.entries(result).map(([key, values]) => ({
    category: key,
    count: values.length,
  }));

  return (
    <Layout title={siteTitle} path={path}>
      <Seo title={siteDescription} />
      <Categories categories={categories} activeCategory={category} />
      <PostList posts={filtered} />
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
