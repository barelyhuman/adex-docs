import { hydrate, prerender as ssr } from "preact-iso";
import { Route, Router } from "wouter-preact";
import { routes } from "~routes";
import "./index.css";
import { sideBar } from "./content/data";

const PageRoutes = ({ ssrPath }) => {
  const baseUrl = import.meta.env.BASE_URL.replace(/(^\.\/)/, "").replace(
    /\/$/,
    ""
  );
  if (ssrPath) {
    return (
      <Router ssrPath={baseUrl + ssrPath} base={baseUrl}>
        {mapPagesToRoutes(routes)}
      </Router>
    );
  }
  return <Router base={baseUrl}>{mapPagesToRoutes(routes)}</Router>;
};

const Main = ({ url }) => {
  return <PageRoutes ssrPath={url} />;
};

export const prerender = async (data) => {
  const { html, links: discoveredLinks } = await ssr(<Main url={data.url} />);

  const toDiscover = new Set();
  for (let key in sideBar) {
    toDiscover.add(sideBar[key].key);
  }

  return {
    html,
    links: new Set([...discoveredLinks, ...toDiscover]),
    data: { url: data.url },
    head: {
      lang: "en",
      title: "Adex Documentation",
      elements: new Set([]),
    },
  };
};

if (typeof window !== "undefined") {
  hydrate(<Main />, document.getElementById("app"));
}

function mapPagesToRoutes(routes) {
  const routeComponents = [];
  for (const route of routes) {
    const componentMod =
      "default" in route.module ? route.module.default : route.module;

    routeComponents.push(
      <Route path={route.routePath} component={componentMod} />
    );
  }
  return routeComponents;
}
