import { Link } from "gatsby";
import * as React from "react";
import { ReactNode } from "react";
import { compact } from "lodash";

export interface LayoutProps {
  path: string;
  title: string;
  showLanguageSwitcher?: boolean;
  children: ReactNode;
}

const Layout = ({
  title,
  path,
  showLanguageSwitcher,
  children,
}: LayoutProps) => {
  const isRootPath = path === "/";

  return (
    <div
      className="flex flex-col w-[42rem] h-full mx-auto px-4 py-8"
      data-is-root-path={isRootPath}
    >
      <div className="flex flex-row justify-between items-start">
        <header className="mb-8">
          <h1 className="text-5xl font-enonly font-bold m-0">
            <Link to="/">{title}</Link>
          </h1>
        </header>
        {/* TODO: Add language switcher after content management is resolved */}
        {/* {showLanguageSwitcher && <LanguageSwitcher />} */}
      </div>
      <main className="flex flex-col grow">{children}</main>
      <footer className="py-6 px-0">
        by <a href="https://github.com/turastory">@turastory</a>{" "}
      </footer>
    </div>
  );
};

export default Layout;
