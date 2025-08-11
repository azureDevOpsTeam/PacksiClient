import React from "react";

const routes = [
  {
    path: "/login",
    element: React.lazy(() => import("../../pages/login/pages/View")),
  },
  {
    path: "/dashboard",
    element: React.lazy(() => import("../../pages/AdDashboard/pages/View")),
  },
  {
    path: "/MhDashboard",
    element: React.lazy(() => import("../../pages/MhDashboard/pages/View")),
  },
  {
    path: "/fleet",
    element: React.lazy(() => import("../../pages/fleet/pages/View")),
  },
  {
    path: "/fleet/new",
    element: React.lazy(() => import("../../pages/fleet/pages/New")),
  },
  {
    path: "/fleet/edit",
    element: React.lazy(() => import("../../pages/fleet/pages/Edit")),
  },
  {
    path: "/micro-hub",
    element: React.lazy(() => import("../../pages/micro-hub/pages/View")),
  },
  {
    path: "/micro-hub/new",
    element: React.lazy(() => import("../../pages/micro-hub/pages/New")),
  },
  {
    path: "/micro-hub/edit",
    element: React.lazy(() => import("../../pages/micro-hub/pages/Edit")),
  },
  {
    path: "/zone",
    element: React.lazy(() => import("../../pages/zone/pages/View")),
  },
  {
    path: "/zone/new",
    element: React.lazy(() => import("../../pages/zone/pages/New")),
  },
  {
    path: "/node",
    element: React.lazy(() => import("../../pages/node/pages/View")),
  },
  {
    path: "/node/new",
    element: React.lazy(() => import("../../pages/node/pages/New")),
  },
  {
    path: "/node/edit",
    element: React.lazy(() => import("../../pages/node/pages/Edit")),
  },
  {
    path: "/personnel",
    element: React.lazy(() => import("../../pages/personnel/pages/View")),
  },
  {
    path: "/personnel/new",
    element: React.lazy(() => import("../../pages/personnel/pages/New")),
  },
  {
    path: "/personnel/edit",
    element: React.lazy(() => import("../../pages/personnel/pages/Edit")),
  },
  {
    path: "/taxiLine",
    element: React.lazy(() => import("../../pages/taxiLine/pages/View")),
  },
  {
    path: "/wallet",
    element: React.lazy(() => import("../../pages/createWallet/pages/View")),
  },
];

export default routes;
