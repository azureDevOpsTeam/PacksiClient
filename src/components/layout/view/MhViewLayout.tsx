import React ,{useState}from "react";
import BottomSheet from "../bottom-sheet/BottomSheet";
import { ReactComponent as BackIcon } from "../../../components/icons/svg/backArrowIcon.svg";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../../../components/icons/svg/searchIcon.svg";
import { ReactComponent as HalazoneLogo } from "../../../components/icons/svg/halazoneLogo.svg";
import Elasticsearch from "../../tools/searchField/Elasticsearch";
import { useIsToggled } from "../../hooks/toggle/useToggle";

function MhViewLayout({
  mapComponent,
  formComponent,
  formComponentResponsive,
  mapOverlay,
}: any) {
  const navigate = useNavigate();
  const IsToggled = useIsToggled();
  const [searchValue, setSearchValue] = useState("");

  const handleBackClick = () => {
    navigate(-1);
  };


  return (
    <div className=" overflow-hidden relative lg:w-[calc(100%+40px)] w-full max-w-[1600px] mx-auto rounded-lg lg:-ml-[40px] -my-[40px]">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full z-10 flex items-center justify-between px-5 pt-[40px]">
        <Elasticsearch
          value={searchValue}
          onChange={(e:any) => setSearchValue(e.target.value)}
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

      {/* محتوای اصلی، که زیر هدر قرار بگیرد */}
      <div className="w-full flex h-screen items-start justify-center relative pt-[70px]">
        <span className={`w-[calc(100%)] lg:visible invisible`}>
          {formComponent}
        </span>
        {mapComponent && { mapComponent }}
        <div className="absolute left-[40px] pr-[70px] w-1/2 bottom-[40px] lg:block hidden">
          {mapOverlay}
        </div>
      </div>

      {/* نسخه ریسپانسیو فرم */}
      {formComponentResponsive && (
        <div className={"lg:hidden relative"}>
          <BottomSheet minHeight={100}>
            <div className={"mb-5 w-full"}>{mapOverlay}</div>
            {formComponentResponsive}
          </BottomSheet>
        </div>
      )}
    </div>
  );
}

export default MhViewLayout;
