import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUpForm from "../../pages/login/pages/SignUpView";
import Loading from "../tools/loading/Loading";
import Landing from "../../pages/Landing/Landing";
import Login from "../../pages/login/pages/View";
import RequestList from "../../pages/Request/RequestList/RequestList";
// import DestinationRequestForm from "./components/request/DestinationRequestForm";
import OriginRequest from "../../pages/Request/OriginRequest/OriginRequest";
import RequestDetail from "../../pages/Request/RequestDetail/RequestDetail";
import DashboardView from "../../pages/Dashboard/View";
import AppLayout from "../layout/main/AppLayout";

const routes = [
  {
    path: "/login",
    element: React.lazy(() => import("../../pages/login/pages/View")),
  },
  {
    path: "/landing",
    element: React.lazy(() => import("../../pages/Landing/Landing")),
  },

 
 {
  path:'/NewRequest' ,
  element:React.lazy(()=>import("../../pages/Request/NewRequest/View"))
 }
];

const LazyRouter = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/OriginRequest" element={<OriginRequest />} />
        {/* <Route
          path="/DestinationRequest"
          element={<DestinationRequestForm />}
        /> */}
        <Route path="/RequestList" element={<RequestList />} />
        <Route path={`/RequestDetail/:id`} element={<RequestDetail />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route element={<AppLayout />}>
          <Route path="/Dashboard" element={<DashboardView />} />
          <Route path="/SignUp" element={<SignUpForm />} />
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={<route.element />} />
          ))}
          <Route path="/" element={<Navigate to="/landing" />} />
          <Route path="*" element={<Login />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default LazyRouter;
