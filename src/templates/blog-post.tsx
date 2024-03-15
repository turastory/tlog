import * as React from "react";
import { Link, PageProps, graphql } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";
import { ExtendedPostHeader } from "../components/post-header";
import { tlsx } from "../utils/tlsx";

const BlogPostTemplate = ({ data, path }: PageProps<BlogPostData>) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const { previous, next } = data;

  return (
    <Layout title={siteTitle} path={path}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article className="grow" itemScope itemType="http://schema.org/Article">
        <ExtendedPostHeader post={post} />
        <section
          className="blog-post"
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
      </article>
      <nav>
        <ul
          className={tlsx("flex flex-wrap justify-between list-none p-0 m-0")}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

export default BlogPostTemplate;

export interface BlogPostData {
  site: {
    siteMetadata: {
      title: string;
    };
  };
  markdownRemark: {
    id: string;
    fields: {
      slug: string;
    };
    excerpt: string;
    html: string;
    frontmatter: {
      date: string;
      title: string;
      description: string;
      category: string;
      tags: string[];
    };
  };
  previous: {
    fields: {
      slug: string;
    };
    frontmatter: {
      title: string;
    };
  };
  next: {
    fields: {
      slug: string;
    };
    frontmatter: {
      title: string;
    };
  };
}

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      fields {
        slug
      }
      excerpt(pruneLength: 160)
      html
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        title
        description
        category
        tags
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
