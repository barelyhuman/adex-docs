import {
  ErrorBoundary,
  LocationProvider,
  Route,
  Router,
  hydrate,
  lazy,
  prerender as ssr,
} from "preact-iso";
import { routes } from "~routes";
import "./index.css";
import { sideBar } from "./content/data";

let baseURL = import.meta.env.BASE_URL;
baseURL = baseURL.endsWith("/") ? baseURL : baseURL + "/";

const PageRoutes = () => {
  return <Router>{mapPagesToRoutes(routes)}</Router>;
};

const Main = () => {
  return (
    <LocationProvider scope={import.meta.env.BASE_URL}>
      <ErrorBoundary>
        <PageRoutes />
      </ErrorBoundary>
    </LocationProvider>
  );
};

export const prerender = async (data) => {
  const { html, links: discoveredLinks } = await ssr(<Main />);
  const fromSidebar = Object.keys(sideBar).map((d) =>
    (baseURL + sideBar[d].key).replace(/^\.\//, "/")
  );

  return {
    html,
    links: new Set([...discoveredLinks, ...fromSidebar]),
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
  let baseURL = import.meta.env.BASE_URL ?? "/";
  baseURL = baseURL.endsWith("/") ? baseURL : baseURL + "/";

  const routeComponents = [];
  for (const route of routes) {
    const url = (baseURL + route.routePath)
      .replace(/\/{2,}/, "/")
      .replace(/^\.\//, "/");

    routeComponents.push(
      <Route path={url} component={lazy(() => route.module())} />
    );
  }
  return routeComponents;
}
