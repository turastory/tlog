import { resolve } from "path";
import { createFilePath } from "gatsby-source-filesystem";
import { convertDate } from "./src/utils/date";
import { GatsbyNode } from "gatsby";
import { containsKorean, parseFilePath } from "./src/utils/parse";

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export const onCreateNode: GatsbyNode<Queries.MarkdownRemark>["onCreateNode"] =
  async ({ node: _node, actions, getNode }) => {
    const { createNodeField } = actions;

    // const node = _node as Queries.MarkdownRemark;
    const node = {
      ..._node,
      frontmatter: {
        ..._node.frontmatter,
      },
    };

    if (node.internal.type === `MarkdownRemark`) {
      const value = createFilePath({
        node,
        getNode,
      });

      // Add default values for frontmatter fields
      node.frontmatter["tags"] = node.frontmatter["tags"] ?? [];

      const parent = node.parent
        ? (getNode(node.parent) as Queries.File | undefined)
        : null;
      const category = parent?.sourceInstanceName ?? null;

      if (category != null) {
        node.frontmatter["category"] = category;

        const parsedResult = parseFilePath(value);

        // TODO: actually use this language data
        if (parsedResult.language == null) {
          parsedResult.language = containsKorean(node.rawMarkdownBody ?? "")
            ? "ko"
            : "en";
        }

        if (parsedResult.date != null) {
          node.frontmatter["date"] = convertDate(parsedResult.date);
        }

        const slugWithoutCategory = parsedResult.fileName;
        const slug = `/${category}/${slugWithoutCategory}/`;
        createNodeField({
          name: `slug`,
          node,
          value: slug,
        });
      }
    }
  };

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions;

  // Define a template for blog post
  const blogPost = resolve(`./src/templates/blog-post.tsx`);

  // Get all markdown blog posts sorted by date
  const result = await graphql(`
    query CreatePageQuery {
      allMarkdownRemark(sort: { frontmatter: { date: ASC } }, limit: 1000) {
        nodes {
          id
          frontmatter {
            category
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    );
    return;
  }

  const posts = (result.data as any).allMarkdownRemark.nodes as any[];

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id;
      const nextPostId =
        index === posts.length - 1 ? null : posts[index + 1].id;

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          category: post.frontmatter.category,
          tags: post.frontmatter.tags,
          previousPostId,
          nextPostId,
        },
      });
    });

    const postList = resolve(`./src/pages/index.tsx`);
    const categories = [
      ...new Set(posts.map((post) => post.frontmatter.category)),
    ];

    categories.forEach((category) => {
      createPage({
        path: `/${category}/`,
        component: postList,
        context: {
          category,
        },
      });

      posts
        .filter((post) => post.frontmatter.category == category)
        .flatMap((post) => post.frontmatter.tags)
        .forEach((tag) => {
          createPage({
            path: `/${category}/tags/${tag}/`,
            component: postList,
            context: {
              category,
              tag,
            },
          });
        });
    });

    const tags = [
      ...new Set(posts.map((post) => post.frontmatter.tags).flat()),
    ];

    tags.forEach((tag) => {
      createPage({
        path: `/tags/${tag}/`,
        component: postList,
        context: {
          tag,
        },
      });
    });
  }
};

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  async ({ actions }) => {
    const { createTypes } = actions;

    // Explicitly define the siteMetadata {} object
    // This way those will always be defined even if removed from gatsby-config.js

    // Also explicitly define the Markdown frontmatter
    // This way the "MarkdownRemark" queries will return `null` even when no
    // blog posts are stored inside "content/blog" instead of returning an error
    createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      tags: [String]
    }

    type Fields {
      slug: String
    }
  `);
  };
