import * as React from "react";
import { PageProps, graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";

export default ({ data, path }: PageProps<NotFoundPageDataProps>) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout title={siteTitle} path={path}>
      <Seo title="404: Not Found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
};

export interface NotFoundPageDataProps {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

export const pageQuery = graphql`
  query NotFoundPageQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
