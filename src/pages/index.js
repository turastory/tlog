import * as React from "react";
import { Link, graphql } from "gatsby";

import _ from "lodash";
import Layout from "../components/layout";
import Seo from "../components/seo";
import PostList from "../components/post-list";
import Categories from "../components/categories";

const BlogIndex = ({ data, location, pageContext }) => {
  const { category } = pageContext;
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const siteDescription = data.site.siteMetadata?.description || `All posts`;
  const posts = data.allMarkdownRemark.nodes;
  const filtered = category
    ? posts.filter((post) => post.frontmatter.category === category)
    : posts;

  const result = _.groupBy(posts, (post) => post.frontmatter.category);
  const categories = Object.entries(result).map(([key, values]) => {
    return {
      category: key,
      count: values.length,
    };
  });

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={siteDescription} />
      <Categories categories={categories} activeCategory={category} />
      <PostList posts={filtered} />
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
