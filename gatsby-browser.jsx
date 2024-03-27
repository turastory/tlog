// custom typefaces
import "@fontsource/montserrat";
import "@fontsource/merriweather";

// KaTeX CSS
import "katex/dist/katex.min.css";

import "./src/styles/global.css";

// Highlighting for code blocks
import "prismjs/themes/prism.css";

import * as React from "react";
import { LanguageProvider } from "./src/components/language-switcher";

export const wrapRootElement = ({ element }) => {
  return <LanguageProvider>{element}</LanguageProvider>;
};
