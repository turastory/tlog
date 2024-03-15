const { resolve } = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({
      node,
      getNode,
    });

    // Add default values for frontmatter fields
    node.frontmatter["tags"] = node.frontmatter["tags"] ?? [];

    const parent = getNode(node.parent);
    const category = parent["sourceInstanceName"];

    if (category != null) {
      node.frontmatter["category"] = category;

      if (category == "math") {
        const slug = `/${category}${value}`;
        createNodeField({
          name: `slug`,
          node,
          value: slug,
        });
      } else {
        const splitted = value
          .split("/")
          .filter((item) => item != "post" && item != "");

        const lastItem = splitted[splitted.length - 1];
        const dateString = lastItem?.split("-")[0];
        if (dateString != null) {
          node.frontmatter["date"] = convertDate(dateString);
          splitted[splitted.length - 1] = lastItem
            .split("-")
            .slice(1)
            .join("-");
        }

        const slug = `/${category}/${splitted.join("/")}/`;

        createNodeField({
          name: `slug`,
          node,
          value: slug,
        });
      }
    }
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Define a template for blog post
  const blogPost = resolve(`./src/templates/blog-post.tsx`);

  // Get all markdown blog posts sorted by date
  const result = await graphql(`
    {
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

  const posts = result.data.allMarkdownRemark.nodes;

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

// Convert YYYYMMDD -> YYYY-MM-DD
function convertDate(dateString) {
  return (
    dateString.slice(0, 4) +
    "-" +
    dateString.slice(4, 6) +
    "-" +
    dateString.slice(6)
  );
}

exports.createSchemaCustomization = ({ actions }) => {
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
