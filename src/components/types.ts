export interface IndexDataProps {
  site: {
    siteMetadata: {
      title: string;
      description: string;
    };
  };
  allMarkdownRemark: {
    nodes: {
      excerpt: string;
      fields: {
        slug: string;
      };
      frontmatter: {
        date: string;
        title: string;
        description: string;
        category: string;
        tags: string[];
      };
    }[];
  };
}

// Check /gatsby-node.ts for the usage of this type
export interface PageContextProps {
  category: string;
}
