import { useState } from "react";
import { menuData, SupervisorMenuData ,FinancialMenuData ,SaMenuData } from "./menuData";
import SidebarMenuMini from "./SidebarMenuMini";
import SidebarMenuDesktop from "./SidebarMenuDesktop";
import { useLocation } from "react-router-dom";
import { useTheme } from "../../../components/hooks/theme/ThemeContext";
import SkeletonDiv from "../../tools/loading/SkeletonDiv";
import ProgressBar from "../../icons/ProgressBar";
import { ReactComponent as UserMiniIcon } from "../../icons/svg/userMiniIcon.svg";
import { ReactComponent as Policy } from "../../icons/svg/policy.svg";
import { ReactComponent as SupportIcon } from "../../icons/svg/supportIcon.svg";
import { ReactComponent as MicroHubIcon } from "../../icons/svg/microhubIcone.svg";
import { ReactComponent as TaskManagerIcon } from "../../icons/svg/taskManagerIcon.svg";
import { ReactComponent as PackageIcon } from "../../icons/svg/packageIcon.svg";
import { ReactComponent as FleetIcon } from "../../icons/svg/fleetIcon.svg";
import { ReactComponent as NewOrderIcon } from "../../icons/svg/newOrderIcon.svg";
import { ReactComponent as ZoneIcon } from "../../icons/svg/zoneIcon.svg";
const sidebarWidget: Record<
  string,
  { roles: string[]; Component: React.FC<{ mini: boolean }> }
> = {
  Admin: {
    roles: ["admin"],
    Component: ({ mini }: { mini: boolean }) => {
      const miniDashboardSidebarButton = [
        {
          id: 1,
          icon: <UserMiniIcon />,
          label: "کاربر",
        },
        {
          id: 2,
          icon: <MicroHubIcon />,
          label: "میکروهاب",
        },
        {
          id: 3,
          icon: <PackageIcon />,
          label: "پکیج",
        },
        {
          id: 4,
          icon: <FleetIcon />,
          label: "ناوگان",
        },
        {
          id: 5,
          icon: <ZoneIcon />,
          label: "زون",
        },
        {
          id: 6,
          icon: <TaskManagerIcon />,
          label: "مدیریت تسک",
        },
      ];
      const [activeTab, setActiveTab] = useState("pending");
      const location = useLocation();
      const handleTabClick = (tabId: any) => {
        setActiveTab(tabId);
      };
      const tabItems = [
        { id: "pending", label: "نیاز به انجام" },
        { id: "inProgress", label: "در حال انجام" },
        { id: "distributed", label: "توزیع شده" },
      ];

      //   const isDashboard =
      //     location.pathname === "/dashboard" ||
      //     location.pathname === "/MhDashboard";

      return (
        <div className="mt-[25px]">
          {mini ? (
            <SidebarMenuMini items={menuData} />
          ) : (
            <SidebarMenuDesktop items={menuData} />
          )}
          {location.pathname === "/dashboard" && (
            <div className="mt-[25px]">
              <div
                className={`w-full cursor-pointer bg-[#FF7959] flex items-center ${
                  !mini ? "justify-start px-6" : "justify-center"
                } rounded-[16px] h-[57px]`}
              >
                <SupportIcon />
                {!mini && (
                  <div className="text-right text-white text-base mx-2 font-bold">
                    پشتیبانی
                  </div>
                )}
              </div>
            </div>
          )}
          {location.pathname === "/dashboard" && !mini && (
            <div className="mt-[25px]">
              <SkeletonDiv
                loading={false}
                className={`w-full bg-[#FF7959] p-[16px] flex flex-col items-center justify-between rounded-[28px] h-[204px]`}
              >
                <div className="text-white text-sm font-bold self-start">
                  وضعیت فعلی سفر مرسولات
                </div>
                <div className="flex w-full items-center justify-between">
                  {/* Tabs Section */}
                  <div className="flex flex-col items-center justify-center gap-2">
                    {tabItems.map((tab) => (
                      <div
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        className={`h-[31px] px-3 py-1.5 hover:scale-95 active:scale-100 transition-all ${
                          activeTab === tab.id ? "bg-white" : ""
                        } rounded-xl justify-center items-center gap-2 inline-flex cursor-pointer`}
                      >
                        <div
                          className={`text-right text-xs font-bold ${
                            activeTab === tab.id
                              ? "text-[#FF7959]"
                              : "text-white"
                          }`}
                        >
                          {tab.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shipment Info */}
                  <div className="w-[100px] flex-col justify-start items-end inline-flex">
                    <div className="self-stretch justify-end items-center gap-1.5 inline-flex">
                      <div className="text-right text-white text-sm font-bold">
                        مرسوله
                      </div>
                      <div className="text-right text-white text-[32px] font-bold">
                        {activeTab === "pending" && 1234}
                        {activeTab === "inProgress" && 1250}
                        {activeTab === "distributed" && 125}
                      </div>
                    </div>
                    <div className="self-stretch justify-end items-center gap-1.5 inline-flex">
                      <div className="text-right text-white/40 text-sm font-bold">
                        از {34512} مرسوله
                      </div>
                    </div>
                  </div>
                </div>
              </SkeletonDiv>
            </div>
          )}
          {location.pathname === "/dashboard" && !mini && (
            <div className="mt-[25px]">
              <div
                className={
                  "w-full flex items-center justify-center bg-white rounded-[16px] h-[56px]"
                }
              >
                {miniDashboardSidebarButton?.map((item) => (
                  <div
                    key={item.id}
                    className={
                      "p-3 hover:scale-95 active:scale-100 transition-all hover:bg-gray-100 rounded-xl"
                    }
                  >
                    {item.icon}
                  </div>
                ))}
              </div>
              <div
                className={`w-full hover:scale-95 active:scale-100 transition-all cursor-pointer border-dashed bg-white border-2 flex-col border-[#FF7959] flex items-center justify-center rounded-[28px] h-[124px] mt-[24px]`}
              >
                <NewOrderIcon className="my-2" />
                <div className="text-center my-2 text-[#111928] text-sm font-bold">
                  ایجاد درخواست جدید
                </div>
              </div>
            </div>
          )}
        </div>
      );
    },
  },
  Supervisor: {
    roles: ["Supervisor"],
    Component: ({ mini }: { mini: boolean }) => {
      const { colors } = useTheme();
      const location = useLocation();
      return (
        <div className="mt-[25px]">
          {mini ? (
            <SidebarMenuMini items={SupervisorMenuData} />
          ) : (
            <SidebarMenuDesktop items={SupervisorMenuData} />
          )}
          {location.pathname === "/MhDashboard" && !mini && (
            <div className="mt-[25px]">
              <SkeletonDiv
                loading={false}
                className="w-full bg-white rounded-[28px] p-4"
              >
                <div className="flex justify-between w-full text-black text-sm font-bold">
                  <span>ظرفیت</span>
                  <a className="text-[#FF7959] hover:underline">
                    اطلاعات بیشتر
                  </a>
                </div>
                <div className="py-4 flex gap-[3px]">
                  <span className="text-black text-sm font-bold ">
                    میکروهاب
                  </span>
                  <span className="text-[#FF7959] text-sm font-bold">
                    سید خندان
                  </span>
                </div>
                <div
                  className={
                    "relative flex justify-center items-center h-[100px]"
                  }
                >
                  <div
                    className={
                      "absolute z-10 text-[24px] font-bold top-[36px] right-[80px]"
                    }
                  >
                    {61}%
                  </div>
                  <div className="w-[165px] absolute top-[7px] rotate-180 right-[17px]">
                    <ProgressBar
                      value={61}
                      height={"h-[89px]"}
                      color="bg-red-400"
                      borderRadius="rounded-[5px]"
                    />
                  </div>
                </div>
                <div className="w-[220px] mt-[20px] justify-between items-start inline-flex">
                  <div
                    className="text-right text-sm font-bold"
                    style={{ color: colors.text.primary }}
                  >
                    ظرفیت فعلی:
                  </div>
                  <div className="justify-start items-center gap-[5px] flex">
                    <div className="text-right">
                      <span
                        className=" text-sm font-bold"
                        style={{ color: colors.text.secondary }}
                      >
                        {10}{" "}
                      </span>
                      <span
                        className=" text-[10px] font-bold"
                        style={{ color: colors.text.light }}
                      >
                        باندل
                      </span>
                    </div>
                    <div
                      className="text-right  text-sm font-bold"
                      style={{ color: colors.text.light }}
                    >
                      /
                    </div>
                    <div className="text-right">
                      <span
                        className=" text-sm font-bold"
                        style={{ color: colors.text.secondary }}
                      >
                        {1}{" "}
                      </span>
                      <span
                        className=" text-[10px] font-bold"
                        style={{ color: colors.text.light }}
                      >
                        باندل
                      </span>
                    </div>
                  </div>
                </div>
              </SkeletonDiv>

              {location.pathname === "/MhDashboard" && !mini && (
                <div className="mt-[25px]">
                  <SkeletonDiv
                    loading={false}
                    className={`w-full bg-[#FF7959] p-[16px] flex flex-col items-center justify-between rounded-[16px] `}
                  >
                    <div className="flex items-center w-full text-white text-sm font-bold gap-2">
                      <Policy />
                      <span>تحویل موفق بار</span>
                      <span className="ml-auto">78%</span>
                    </div>
                  </SkeletonDiv>
                </div>
              )}
            </div>
          )}
        </div>
      );
    },
  },
    Financial: {
      roles: ["Financial"],
      Component: ({ mini }: { mini: boolean }) => {
        const { colors } = useTheme();
        const location = useLocation();
        return (
          <div className="mt-[25px]">
            {mini ? (
              <SidebarMenuMini items={FinancialMenuData} />
            ) : (
              <SidebarMenuDesktop items={FinancialMenuData} />
            )}
            {location.pathname === "/MhDashboard" && !mini && (
              <div className="mt-[25px]">
                <SkeletonDiv
                  loading={false}
                  className="w-full bg-white rounded-[28px] p-4"
                >
                  <div className="flex justify-between w-full text-black text-sm font-bold">
                    <span>ظرفیت</span>
                    <a className="text-[#FF7959] hover:underline">
                      اطلاعات بیشتر
                    </a>
                  </div>
                  <div className="py-4 flex gap-[3px]">
                    <span className="text-black text-sm font-bold ">
                      میکروهاب
                    </span>
                    <span className="text-[#FF7959] text-sm font-bold">
                      سید خندان
                    </span>
                  </div>
                  <div
                    className={
                      "relative flex justify-center items-center h-[100px]"
                    }
                  >
                    <div
                      className={
                        "absolute z-10 text-[24px] font-bold top-[36px] right-[80px]"
                      }
                    >
                      {61}%
                    </div>
                    <div className="w-[165px] absolute top-[7px] rotate-180 right-[17px]">
                      <ProgressBar
                        value={61}
                        height={"h-[89px]"}
                        color="bg-red-400"
                        borderRadius="rounded-[5px]"
                      />
                    </div>
                  </div>
                  <div className="w-[220px] mt-[20px] justify-between items-start inline-flex">
                    <div
                      className="text-right text-sm font-bold"
                      style={{ color: colors.text.primary }}
                    >
                      ظرفیت فعلی:
                    </div>
                    <div className="justify-start items-center gap-[5px] flex">
                      <div className="text-right">
                        <span
                          className=" text-sm font-bold"
                          style={{ color: colors.text.secondary }}
                        >
                          {10}{" "}
                        </span>
                        <span
                          className=" text-[10px] font-bold"
                          style={{ color: colors.text.light }}
                        >
                          باندل
                        </span>
                      </div>
                      <div
                        className="text-right  text-sm font-bold"
                        style={{ color: colors.text.light }}
                      >
                        /
                      </div>
                      <div className="text-right">
                        <span
                          className=" text-sm font-bold"
                          style={{ color: colors.text.secondary }}
                        >
                          {1}{" "}
                        </span>
                        <span
                          className=" text-[10px] font-bold"
                          style={{ color: colors.text.light }}
                        >
                          باندل
                        </span>
                      </div>
                    </div>
                  </div>
                </SkeletonDiv>

                {location.pathname === "/MhDashboard" && !mini && (
                  <div className="mt-[25px]">
                    <SkeletonDiv
                      loading={false}
                      className={`w-full bg-[#FF7959] p-[16px] flex flex-col items-center justify-between rounded-[16px] `}
                    >
                      <div className="flex items-center w-full text-white text-sm font-bold gap-2">
                        <Policy />
                        <span>تحویل موفق بار</span>
                        <span className="ml-auto">78%</span>
                      </div>
                    </SkeletonDiv>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      },
    },
    Sa: {
      roles: ["Sa"],
      Component: ({ mini }: { mini: boolean }) => {
        const miniDashboardSidebarButton = [
          {
            id: 1,
            icon: <UserMiniIcon />,
            label: "کاربر",
          },
          {
            id: 2,
            icon: <MicroHubIcon />,
            label: "میکروهاب",
          },
          {
            id: 3,
            icon: <PackageIcon />,
            label: "پکیج",
          },
          {
            id: 4,
            icon: <FleetIcon />,
            label: "ناوگان",
          },
          {
            id: 5,
            icon: <ZoneIcon />,
            label: "زون",
          },
          {
            id: 6,
            icon: <TaskManagerIcon />,
            label: "مدیریت تسک",
          },
        ];
        const [activeTab, setActiveTab] = useState("pending");
        const location = useLocation();
        const handleTabClick = (tabId: any) => {
          setActiveTab(tabId);
        };
        const tabItems = [
          { id: "pending", label: "نیاز به انجام" },
          { id: "inProgress", label: "در حال انجام" },
          { id: "distributed", label: "توزیع شده" },
        ];

        //   const isDashboard =
        //     location.pathname === "/dashboard" ||
        //     location.pathname === "/MhDashboard";

        return (
          <div className="mt-[25px]">
            {mini ? (
              <SidebarMenuMini items={SaMenuData} />
            ) : (
              <SidebarMenuDesktop items={SaMenuData} />
            )}
            {location.pathname === "/dashboard" && (
              <div className="mt-[25px]">
                <div
                  className={`w-full cursor-pointer bg-[#FF7959] flex items-center ${
                    !mini ? "justify-start px-6" : "justify-center"
                  } rounded-[16px] h-[57px]`}
                >
                  <SupportIcon />
                  {!mini && (
                    <div className="text-right text-white text-base mx-2 font-bold">
                      پشتیبانی
                    </div>
                  )}
                </div>
              </div>
            )}
            {location.pathname === "/dashboard" && !mini && (
              <div className="mt-[25px]">
                <SkeletonDiv
                  loading={false}
                  className={`w-full bg-[#FF7959] p-[16px] flex flex-col items-center justify-between rounded-[28px] h-[204px]`}
                >
                  <div className="text-white text-sm font-bold self-start">
                    وضعیت فعلی سفر مرسولات
                  </div>
                  <div className="flex w-full items-center justify-between">
                    {/* Tabs Section */}
                    <div className="flex flex-col items-center justify-center gap-2">
                      {tabItems.map((tab) => (
                        <div
                          key={tab.id}
                          onClick={() => handleTabClick(tab.id)}
                          className={`h-[31px] px-3 py-1.5 hover:scale-95 active:scale-100 transition-all ${
                            activeTab === tab.id ? "bg-white" : ""
                          } rounded-xl justify-center items-center gap-2 inline-flex cursor-pointer`}
                        >
                          <div
                            className={`text-right text-xs font-bold ${
                              activeTab === tab.id
                                ? "text-[#FF7959]"
                                : "text-white"
                            }`}
                          >
                            {tab.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Shipment Info */}
                    <div className="w-[100px] flex-col justify-start items-end inline-flex">
                      <div className="self-stretch justify-end items-center gap-1.5 inline-flex">
                        <div className="text-right text-white text-sm font-bold">
                          مرسوله
                        </div>
                        <div className="text-right text-white text-[32px] font-bold">
                          {activeTab === "pending" && 1234}
                          {activeTab === "inProgress" && 1250}
                          {activeTab === "distributed" && 125}
                        </div>
                      </div>
                      <div className="self-stretch justify-end items-center gap-1.5 inline-flex">
                        <div className="text-right text-white/40 text-sm font-bold">
                          از {34512} مرسوله
                        </div>
                      </div>
                    </div>
                  </div>
                </SkeletonDiv>
              </div>
            )}
            {location.pathname === "/dashboard" && !mini && (
              <div className="mt-[25px]">
                <div
                  className={
                    "w-full flex items-center justify-center bg-white rounded-[16px] h-[56px]"
                  }
                >
                  {miniDashboardSidebarButton?.map((item) => (
                    <div
                      key={item.id}
                      className={
                        "p-3 hover:scale-95 active:scale-100 transition-all hover:bg-gray-100 rounded-xl"
                      }
                    >
                      {item.icon}
                    </div>
                  ))}
                </div>
                <div
                  className={`w-full hover:scale-95 active:scale-100 transition-all cursor-pointer border-dashed bg-white border-2 flex-col border-[#FF7959] flex items-center justify-center rounded-[28px] h-[124px] mt-[24px]`}
                >
                  <NewOrderIcon className="my-2" />
                  <div className="text-center my-2 text-[#111928] text-sm font-bold">
                    ایجاد درخواست جدید
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      },
    },
};

export default sidebarWidget;
