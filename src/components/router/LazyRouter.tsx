import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUpForm from "../../pages/login/pages/SignUpView";
import Loading from "../tools/loading/Loading";
import Landing from "../../pages/Landing/Landing";
import Login from "../../pages/login/pages/View";
import DashboardView from "../../pages/Dashboard/View";
import AppLayout from "../layout/main/AppLayout";


// مسیرها رو همینجا تعریف می‌کنیم
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
          <Route element={<AppLayout />}>
        <Route path="/Dashboard" element={<DashboardView/>}/>
        <Route path="/SignUp" element={<SignUpForm/>}/>
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* مسیر پیش‌فرض */}
        <Route path="/" element={<Navigate to="/landing" />} />

        {/* همه مسیرها */}
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<route.element />}
          />
        ))}

        {/* صفحه 404 */}
        <Route path="*" element={<Login />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default LazyRouter;
