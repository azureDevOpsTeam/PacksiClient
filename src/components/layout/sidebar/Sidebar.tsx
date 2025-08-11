import React from "react";
import {ReactComponent as UserAvatarIcon} from "../../icons/svg/userAvatar.svg";
import {ReactComponent as UserIcon} from "../../icons/svg/user.svg";
import {ReactComponent as LogoutIcon} from "../../icons/svg/logoutIcon.svg";
import {ReactComponent as NotificationIcon} from "../../icons/svg/notificationIcon.svg";
import {RemoveUserTokenAndRedirect} from "../../../services/api/ApiToken";
import { GetUserInfo} from "../../../setting/ApiUrl";
import {HttpMethod} from "../../../models/enums/HttpMethod";
import SkeletonDiv from "../../tools/loading/SkeletonDiv";
import { useReactQuery } from "../../../components/hooks/query/useReactQuery";
import useStore from "../../../store/zustand/store";
import  sidebarWidget  from "./sidebarWidgets";


export const Sidebar: React.FC = ({mini, setMini}: any) => {

  const userData = useStore((state)=>(state.userData));
   
    const SidebarComponent = sidebarWidget[userData?.Role]?.Component;
    const handleLogout = RemoveUserTokenAndRedirect();
    const apiDetails = {
        url: GetUserInfo,
        method: HttpMethod.GET,
    };

      const { data, isLoading } =
        useReactQuery(apiDetails);

    const userName =
      data?.data?.firstName + " " +data?.data?.lastName;

    return (
      <div
        className=" m-[40px] mt-0 pt-10 mb-0 pb-10 -ml-5 rounded-lg overflow-y-auto max-w-[260px] transition-all"
        style={{ width: mini ? 72 : 260 }}
      >
        <div
          className={`flex ${
            mini ? "justify-center" : "justify-start"
          } items-center bg-[#FF7959] transition-all w-full h-[56px] px-8 rounded-[12px]`}
        >
          <div className="w-[50px] transition-all flex items-center justify-center">
            <NotificationIcon />
          </div>
          {!mini && (
            <button className="w-full input input-ghost transition-all text-sm pr-2 text-white bg-transparent focus:outline-none border-none focus:ring-0 focus:bg-transparent text-right">
              <span>اعلان</span>
            </button>
          )}
        </div>

        <div
          className={`collapse rounded-[12px] bg-white mt-[25px] ${
            !mini && "collapse-arrow"
          }`}
        >
          <input type="checkbox" />
          <SkeletonDiv
            loading={isLoading}
            className="collapse-title  text-xl font-medium flex items-center justify-start gap-8"
          >
            <UserAvatarIcon />
            {!mini && (
              <div className="flex flex-col items-start justify-center ml-4">
                <div className="text-right text-[#111928] text-sm font-bold">
                  {userName}
                </div>
                <div className="text-right text-gray-400 text-sm font-bold">
                  {data?.data?.role}
                </div>
              </div>
            )}
          </SkeletonDiv>
          <div className="collapse-content flex  w-full items-center justify-center flex-col">
            <button
              className={
                "flex gap-2 items-center w-full justify-start rounded p-2 hover:scale-105 active:scale-100 transition-all"
              }
            >
              <UserIcon className={"w-[18px] h-[18px]"} />
              {!mini && (
                <span className={"text-right text-[#111928] text-sm font-bold"}>
                  حساب کاربری
                </span>
              )}
            </button>
            <button
              onClick={handleLogout}
              className={
                "flex gap-2 items-center w-full justify-start rounded p-2 hover:scale-105 active:scale-100 transition-all"
              }
            >
              <LogoutIcon className={"w-[18px] h-[18px] opacity-75"} />
              {!mini && (
                <span className={"text-right text-[#111928] text-sm font-bold"}>
                  خروج
                </span>
              )}
            </button>
          </div>
        </div>
        {SidebarComponent && <SidebarComponent mini={mini} />}
      </div>
    );
};
