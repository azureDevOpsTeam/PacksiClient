import DashboardSvg from "../../icons/components/DashboardSvg";
import ZoneSvg from "../../icons/components/ZoneSvg";
import { useLocation } from "react-router-dom";
import TaskManagerSvg from "../../icons/components/TaskManagerSvg";
import FleetSvg from "../../icons/components/FleetSvg";
import {ReactComponent as ReportIcon} from "../../icons/svg/reportsIcon.svg";
import MicroHubSvg from "../../icons/components/MicroHubSvg";
import CartableSvg from "../../icons/components/CartableSvg";
import CapacitySvg from "../../icons/components/CapacitySvg";
import FrameSvg from "../../icons/components/FrameSvg";
import { ReactComponent as TaskManagerIcon } from "../../icons/svg/taskManagerIcon.svg";
import MessageSvg from "../../icons/components/MessageSvg";
import NodeSvg from "../../icons/components/NodeSvg";
import WalletSvg from "../../icons/components/WalletSvg";
import PersonnelSvg from "../../icons/components/PersonnelSvg";
import ReportSvg from "../../icons/components/ReportSvg";
import path from "path/posix";
import { icon } from "leaflet";
import { title } from "process";

 export const menuData = [
   {
     title: "داشبورد",
     path: "/dashboard",
     icon: <DashboardSvg />,
   },

   {
     title: "زون",
     path: "/zone",
     icon: <ZoneSvg />,
   },
   {
     title: "ناوگان",
     path: "/fleet",
     icon: <FleetSvg />,
   },
   {
     title: "مشتریان",
     path: "/customer",
     icon: <FrameSvg />,
   },

   {
     title: "میکروهاب",
     path: "/micro-hub",
     icon: <MicroHubSvg />,
   },
   {
     title: "نود",
     path: "/node",
     icon: <NodeSvg className={"w-[20px]"} />,
   },
   {
     title: "پرسنل",
     path: "/personnel",
     icon: <PersonnelSvg />,
   },
   {
     title: "خط تاکسی",
     path: "/taxiLine",
     icon: <PersonnelSvg />,
   },
   {
     title: "گزارش‌ها",
     path: "/reports",
     icon: <ReportIcon />,
     children: [
       { title: "مرسوله ها", path: "/report/parcel" },
       { title: "عملکرد ناوگان", path: "/report/fleetPerformance" },
     ],
   },
 ];
 export const FinancialMenuData = [
   {
     title: "کیف پول",
     path: "/Wallet",
     icon: <WalletSvg />,
   },
   {
     title: "گزارش‌ها",
     path: "/reports",
     icon: <ReportIcon />,
     children: [
       { title: "سفارشات", path: "/report/OrderReport" },
       { title: "مرسوله‌ها", path: "/report/ParcelReport" },
       { title: "تراکنش ها", path: "/report/TransactionsReport" },
       {
         title: "معوقات مشتریان",
         path: "/report/GetFinancialDebtsReport",
       },
     ],
   },
 ];
 export const SupervisorMenuData = [
   {
     title: "داشبورد",
     path: "/MhDashboard",
     icon: <DashboardSvg />,
   },
   {
     title: "مدیریت تسک",
     path: "/taskManager",
     icon: <TaskManagerSvg />,
   },
   {
     title: "کارتابل",
     path: "/MhDashboard",
     icon: <CartableSvg />,
     children: [
       { title: "مرسوله", path: "/cartable/parcel" },
       { title: "باندل", path: "/cartable/bundle" },
     ],
   },
   {
     title: "ماموریت",
     path: "/missions",
     icon: <CapacitySvg />,
   },
 ];

 export const SaMenuData = [
   {
     title: "داشبورد",
     path: "/dashboard",
     icon: <DashboardSvg />,
   },

   {
     title: "زون",
     path: "/zone",
     icon: <ZoneSvg />,
   },
   {
     title: "ناوگان",
     path: "/fleet",
     icon: <FleetSvg />,
   },
   {
     title: "مشتریان",
     path: "/customer",
     icon: <FrameSvg />,
   },

   {
     title: "میکروهاب",
     path: "/micro-hub",
     icon: <MicroHubSvg />,
   },
   {
     title: "نود",
     path: "/node",
     icon: <NodeSvg className={"w-[20px]"} />,
   },
   {
     title: "پرسنل",
     path: "/personnel",
     icon: <PersonnelSvg />,
   },
   {
     title: "خط تاکسی",
     path: "/taxiLine",
     icon: <PersonnelSvg />,
   },
   {
     title: "گزارش‌ها",
     path: "/reports",
     icon: <ReportIcon />,
     children: [
       { title: "مرسوله ها", path: "/report/parcel" },
       { title: "عملکرد ناوگان", path: "/report/fleetPerformance" },
     ],
   },
   {
     title: "مدیریت تسک",
     path: "/taskManager",
     icon: <TaskManagerSvg />,
   },
   {
     title: "کارتابل",
     path: "/MhDashboard",
     icon: <CartableSvg />,
     children: [
       { title: "مرسوله", path: "/cartable/parcel" },
       { title: "باندل", path: "/cartable/bundle" },
     ],
   },
   {
     title: "ماموریت",
     path: "/missions",
     icon: <CapacitySvg />,
   },
 ];


