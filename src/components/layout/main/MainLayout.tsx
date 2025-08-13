import React, { useEffect, useState } from "react";
import { useTheme } from "../../hooks/theme/ThemeContext";
import { Sidebar } from "../sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import DrawerContent from "./DrawerContent";
import { GetUserToken } from "../../../services/api/ApiToken";
import { ReactComponent as MiniIcon } from "../../icons/svg/miniIconRed.svg";

import "aos/dist/aos.css";
// @ts-ignore
import AOS from "aos";

const ALLOWED_ROUTES = ["/login", "/register", "/forgot-password"];

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mini, setMini] = useState<boolean>(false);
  const { colors } = useTheme();
  const location = useLocation();


  const [activePath, setActivePath] = useState(location.pathname);


  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const unMountLayout =
    ALLOWED_ROUTES.includes(location.pathname) || location.pathname === "/404";

  // useEffect(() => {
  //   if (ALLOWED_ROUTES.includes(location.pathname)) return;
  //   const token = GetUserToken();
  //   if (!token) {
  //     window.location.replace("/login");
  //   }
  // }, [location.pathname]);

  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease",
      once: true,
    });
  }, []);

  return (
    <div
      dir="rtl"
      className="w-full h-screen "
      style={{ backgroundColor: colors.background }}
    >
      {/* {!unMountLayout && (
        <div className="lg:flex hidden relative">
          <div
            onClick={() => setMini(!mini)}
            className="h-9 w-4 absolute px-1 py-3 rotate-180 bg-white top-[300px] -left-9 rounded-tr-lg rounded-br-lg justify-center items-center "
          >
            <MiniIcon className={`${!mini && "rotate-180"} transition-all`} />
          </div>

          <Sidebar
            // @ts-ignore
            mini={mini}
            key={location.pathname}
            setMini={setMini}
          />
        </div>
      )}

      {!unMountLayout && (
        <DrawerContent
          content={
            <div>
              <div
                onClick={() => setMini(!mini)}
                className={`h-9 w-4 absolute px-1 py-3 rotate-180 transition-all bg-white top-[350px] ${
                  !mini ? "left-1" : "left-8"
                } rounded-tr-lg rounded-br-lg justify-center items-center `}
              >
                <MiniIcon
                  className={`${!mini && "rotate-180"} transition-all`}
                />
              </div>
              <Sidebar
                // @ts-ignore
                mini={mini}
                key={location.pathname}
                setMini={setMini}
              />
            </div>
          }
          mini={mini}
        />
      )} */}

      <div
        className={`flex-1 h-screen ${
          !unMountLayout && "lg:rounded-lg"
        } lg:overflow-y-auto`}
      >
        {children || <p>no content</p>}
      </div>
    </div>
  );
};

export default MainLayout;
