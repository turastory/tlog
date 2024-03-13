import * as React from "react";
import { Link } from "gatsby";
import { ReactNode } from "react";

export interface LayoutProps {
  path: string;
  title: string;
  children: ReactNode;
}

const Layout = ({ title, path, children }: LayoutProps) => {
  const isRootPath = path === "/";

  console.log(path);

  const header =
    isRootPath || path.startsWith("/category") ? (
      <h1 className="text-5xl font-enonly font-bold m-0">
        <Link to="/">{title}</Link>
      </h1>
    ) : (
      <h1 className="text-xl font-enonly font-bold m-0">
        <Link to="/">{title}</Link>
      </h1>
    );

  return (
    <div className="w-[42rem] mx-auto px-4 py-8" data-is-root-path={isRootPath}>
      <header className="mb-8">{header}</header>
      <main>{children}</main>
      <footer className="py-6 px-0">
        by <a href="https://github.com/turastory">@turastory</a>{" "}
      </footer>
    </div>
  );
};

export default Layout;
