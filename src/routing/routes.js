import React from "react";
import Detail from "../pages/Detail";
import Homepage from "../pages/Homepage";
import PageExample from "../pages/PageExample";

const pagesRoutes = [
  {
    name: "homepage",
    link: "/",
    component: Homepage,
  },
  {
    name: "detail",
    link: "/detail/:id",
    component: Detail,
  },

  {
    name: "pageExample",
    link: "/page",
    component: PageExample,
  },
];
export default pagesRoutes;
