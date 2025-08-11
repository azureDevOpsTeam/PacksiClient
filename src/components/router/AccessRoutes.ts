import React from "react";

export interface AppRoute {
  path: string;
  element: any;
  roles?: string[];
  exact?: boolean;
  title?: string;
  icon?: React.ReactNode;
  children?: AppRoute[];
}
const fleetRoutes: AppRoute[] = [
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
];

const taxiLineRoute: AppRoute[] = [
  {
    path: "/taxiLine",
    element: React.lazy(() => import("../../pages/taxiLine/pages/View")),
  },
  {
    path: "/taxiLine/new",
    element:React.lazy(()=>import("../../pages/taxiLine/pages/New"))
  },
];

const microHubRoutes: AppRoute[] = [
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
];

const nodeRoutes: AppRoute[] = [
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
];

const personnelRoutes: AppRoute[] = [
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
];

const reportRoutes: AppRoute[] = [
  {
    path: "/report/parcel",
    element: React.lazy(
      () => import("../../pages/report/parcelReport/pages/View")
    ),
  },
  {
    path: "/report/fleetPerformance",
    element: React.lazy(
      () => import("../../pages/report/FleetPerformance/pages/View")
    ),
  },
];

const customerRoutes: AppRoute[] = [
  {
    path: "/customer",
    element: React.lazy(() => import("../../pages/customer/pages/View")),
  },
  {
    path: "/customer/new",
    element: React.lazy(() => import("../../pages/customer/pages/New")),
  },
];
const zoneRoutes: AppRoute[] = [
  {
    path: "/zone",
    element: React.lazy(() => import("../../pages/zone/pages/View")),
  },
  {
    path: "/zone/new",
    element: React.lazy(() => import("../../pages/zone/pages/New")),
  },
];

const sharedRoutes: AppRoute[] = [
  {
    path: "/parcelDetail/:id",
    element: React.lazy(
      () => import("../../pages/cartable/parcel/pages/ParcelDetail")
    ),
  },
  {
    path: "/bundleDetail/:id",
    element: React.lazy(
      () => import("../../pages/cartable/bundle/pages/BundleDetail")
    ),
  },
];

const opAdmin: AppRoute[] = [
  {
    path: "/dashboard",
    element: React.lazy(() => import("../../pages/AdDashboard/pages/View")),
  },

  ...fleetRoutes,
  ...microHubRoutes,
  ...nodeRoutes,
  ...personnelRoutes,
  ...reportRoutes,
  ...customerRoutes,
  ...sharedRoutes,
  ...zoneRoutes,
];

const adminRoutes: AppRoute[] = [
  {
    path: "/login",
    element: React.lazy(() => import("../../pages/login/pages/View")),
  },
  {
    path: "/dashboard",
    element: React.lazy(() => import("../../pages/AdDashboard/pages/View")),
  },

  ...fleetRoutes,
  ...microHubRoutes,
  ...nodeRoutes,
  ...personnelRoutes,
  ...reportRoutes,
  ...customerRoutes,
  ...sharedRoutes,
  ...zoneRoutes,
  ...taxiLineRoute,
];

const supervisorRoutes: AppRoute[] = [
  {
    path: "/MhDashboard",
    element: React.lazy(() => import("../../pages/MhDashboard/pages/View")),
  },
  {
    path: "/taskManager",
    element: React.lazy(() => import("../../pages/taskManager/pages/View")),
  },
  {
    path: "/cartable/parcel",
    element: React.lazy(() => import("../../pages/cartable/parcel/pages/View")),
  },
  {
    path: "/cartable/bundle",
    element: React.lazy(() => import("../../pages/cartable/bundle/pages/View")),
  },
  {
    path: "/missions",
    element: React.lazy(() => import("../../pages/mission/pages/View")),
  },
  ...sharedRoutes,
];


const FinancialManager: AppRoute[] = [
  {
    path: "/wallet",
    element: React.lazy(() => import("../../pages/createWallet/pages/View")),
  },
  {
    path: "/wallet/new",
    element: React.lazy(() => import("../../pages/createWallet/pages/New")),
  },
  {
    path: "/report/OrderReport",
    element: React.lazy(
      () => import("../../pages/report/OrderReport/pages/View")
    ),
  },
  {
    path: "/report/ParcelReport",
    element: React.lazy(
      () => import("../../pages/report/financialParcelReport/pages/View")
    ),
  },
  {
    path: "/report/TransactionsReport",
    element: React.lazy(
      () => import("../../pages/report/TransactionsReport/pages/View")
    ),
  },
  {
    path: "/report/GetFinancialDebtsReport",
    element: React.lazy(
      () => import("../../pages/report/DebtsReport/pages/View")
    ),
  },
];

const RoutesByRole: Record<string, AppRoute[]> = {
  Sa:opAdmin,
  Admin: adminRoutes,
  Supervisor: supervisorRoutes,
  Financial: FinancialManager,
};

export default RoutesByRole;
