import React from "react";
import BottomSheet from "../bottom-sheet/BottomSheet";
import { ReactComponent as BackIcon } from "../../../components/icons/svg/backArrowIcon.svg";
import { useNavigate } from "react-router-dom";
import { ReactComponent as HalazoneLogo } from "../../../components/icons/svg/halazoneLogo.svg";
import { useIsToggled } from "../../hooks/toggle/useToggle";

function FullFormViewLayout({
  mapComponent,
  formComponent,
  formComponentResponsive,
  mapOverlay,
}: any) {
  const navigate = useNavigate();
  const IsToggled = useIsToggled();
  const handleClick = () => {
    navigate(-1);
  };
  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="w-full h-full flex items-start justify-center relative">
        {/* فرم کامل تمام صفحه */}
        <div className="w-full h-full">{formComponent}</div>

        {/* دکمه برگشت + لوگو */}
        <div className="fixed top-[35px] left-[30px] flex items-center gap-2 z-50 ">
          <HalazoneLogo />
          <div
            onClick={handleClick}
            className="cursor-pointer hover:scale-105 active:scale-100 transition-all w-[56px] h-[56px] rounded-[16px] flex items-center justify-center bg-white"
          >
            <BackIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullFormViewLayout;
