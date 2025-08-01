import preact from "@preact/preset-vite";
import { readFile } from "fs/promises";
import { defineConfig } from "vite";
import mdx from "@mdx-js/rollup";
import reHighlight from "rehype-highlight";
import reSlugs from "rehype-slug";
import { remarkMdxToc } from "remark-mdx-toc";
import tailwindcss from "@tailwindcss/vite";

const baseURL = process.env.BASE_URL ?? "";
// https://vite.dev/config/
export default defineConfig({
  base: baseURL,
  plugins: [
    tailwindcss(),
    preact({
      prerender: {
        enabled: true,
        renderTarget: "#app",
      },
    }),
    {
      name: "",
      transformIndexHtml(html) {
        return html.replace("{{BASE_URL}}", baseURL);
      },
    },
    preactPages(),
    mdx({
      jsxImportSource: "preact",
      rehypePlugins: [reSlugs, reHighlight],
      remarkPlugins: [remarkMdxToc],
    }),
  ],
});

/**
 * @returns {import("vite").Plugin}
 */
function preactPages({ root = "/src/pages" } = {}) {
  return {
    name: "routes",
    enforce: "pre",
    resolveId(id) {
      if (id !== "~routes") {
        return;
      }
      return "/0~routes";
    },
    async load(id) {
      if (id !== "/0~routes") {
        return;
      }
      const code = (await readFile("./runtime/route.js", "utf8"))
        .replaceAll("#{__PLUGIN_PAGES_ROOT}", root + "/**/*.jsx")
        .replaceAll("#{__PLUGIN_PAGES_ROOT_REGEX}", `^${root}`);
      return {
        code,
      };
    },
  };
}
