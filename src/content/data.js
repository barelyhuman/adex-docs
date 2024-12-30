const contentMap = {};
const posts = import.meta.glob("./**/*.mdx", { eager: true });

for (let i in posts) {
  contentMap[i] = "default" in posts[i] ? posts[i].default : posts[i];
  contentMap[i].toc = "toc" in posts[i] ? posts[i].toc : {};
}

export const sideBar = {
  introduction: {
    order: 0,
    label: "Introduction",
    source: contentMap["./introduction.mdx"],
    key: "introduction",
  },
  "getting-started": {
    order: 1,
    label: "Getting Started",
    source: contentMap["./getting-started.mdx"],
    key: "getting-started",
  },
  concepts: {
    order: 1,
    label: "Concepts",
    source: contentMap["./concepts.mdx"],
    key: "concepts",
  },
  configuration: {
    order: 99,
    label: "Configuration Reference",
    source: contentMap["./configuration.mdx"],
    key: "configuration",
  },
};
