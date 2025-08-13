import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUpForm from "../../pages/login/pages/SignUpView";
import Loading from "../tools/loading/Loading";
import Landing from "../../pages/Landing/Landing";
import { Landing4 } from "../../pages/Landing4";
import Login from "../../pages/login/pages/View";


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
    path: "/landing4",
    element: React.lazy(() => import("../../pages/Landing4/Landing4")),
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
        <Route path="/SignUp" element={<SignUpForm/>}></Route>
        <Route path="/landing" element={<Landing />} />
        <Route path="/landing4" element={<Landing4 />} />
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
      </Routes>
    </Suspense>
  );
};

export default LazyRouter;
