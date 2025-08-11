import React, { useState } from "react";
import BottomSheet from "../bottom-sheet/BottomSheet";
import { ReactComponent as BackIcon } from "../../../components/icons/svg/backArrowIcon.svg";
import { ReactComponent as HalazoneLogo } from "../../../components/icons/svg/halazoneLogo.svg";
import Elasticsearch from "../../tools/searchField/Elasticsearch";
import { useNavigate } from "react-router-dom";
import { useIsToggled } from "../../hooks/toggle/useToggle";

type ViewLayoutProps = {
  mapComponent?: React.ReactNode;
  formComponent?: React.ReactNode;
  formComponentResponsive?: React.ReactNode;
  mapOverlay?: React.ReactNode;
};

function ViewLayout({
  mapComponent,
  formComponent,
  formComponentResponsive,
  mapOverlay,
}: ViewLayoutProps) {
  const navigate = useNavigate();
  const isToggled = useIsToggled();
  const [searchValue, setSearchValue] = useState("");

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="lg:w-[calc(100%+40px)] overflow-hidden w-full max-w-[1440px] mx-auto rounded-lg lg:-ml-[40px] -my-[40px]">
      <div className="w-full flex h-screen items-start justify-center relative">
        <span className="w-[calc(100%-5%)] lg:visible invisible mt-[100px]">
          {formComponent}
        </span>
        {mapComponent}
        <div className="absolute left-[40px] pr-[70px] w-1/2 bottom-[40px] lg:block hidden">
          {mapOverlay}
        </div>
        <div className="absolute top-0 left-0 w-full z-10 flex items-center justify-between px-5 pt-[40px]">
          <Elasticsearch
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearchClick={() => console.log("جستجو:", searchValue)}

          />
          <HalazoneLogo className="mr-auto" />
          <div
            onClick={handleBackClick}
            className="cursor-pointer hover:scale-105 active:scale-100 transition-all w-[56px] h-[56px] mr-[25px] rounded-[16px] flex items-center justify-center bg-white shadow"
          >
            <BackIcon />
          </div>
        </div>
      </div>
      {formComponentResponsive && (
        <div className="lg:hidden relative">
          <BottomSheet minHeight={100}>
            <div className="mb-5 w-full">{mapOverlay}</div>
            {formComponentResponsive}
          </BottomSheet>
        </div>
      )}
    </div>
  );
}

export default ViewLayout;
