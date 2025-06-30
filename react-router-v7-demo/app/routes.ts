import {
  type RouteConfig,
  index,
  prefix,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  // Nested route with layout for about
  ...prefix("about", [
    {
      path: "",
      file: "routes/layouts/about._layout.tsx",
      children: [index("routes/about.tsx")],
    },
  ]),
  // Nested route with layout for countries
  ...prefix("countries", [
    {
      path: "",
      file: "routes/layouts/countries._layout.tsx",
      children: [
        index("routes/countries.tsx"),
        route(":countryName", "routes/country.tsx"),
      ],
    },
  ]),
  // Add fetcher-demo page
  route("fetcher-demo", "routes/fetcher-demo.tsx"),
  // Add countdown-demo page
  route("countdown-demo", "routes/countdown-demo.tsx"),
  // Add sse-demo page
  route("sse-demo", "routes/sse-demo.tsx"),
  // Add countdown provider demo page
  route("countdown-provider-demo", "routes/countdown-provider-demo.tsx"),
] satisfies RouteConfig;
