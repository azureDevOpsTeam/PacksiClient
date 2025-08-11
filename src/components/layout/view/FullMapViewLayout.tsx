import React from 'react';
import BottomSheet from "../bottom-sheet/BottomSheet";
import {ReactComponent as BackIcon} from '../../../components/icons/svg/backArrowIcon.svg';
import {useNavigate} from "react-router-dom";
import {useIsToggled} from "../../hooks/toggle/useToggle"

function MapViewLayout({mapComponent, mapOverlay}: any) {
    const navigate = useNavigate();
    const IsToggled = useIsToggled();
    const handleClick = () => {
        navigate(-1);
    };
    return (
      <div className="lg:w-[calc(100%+40px)] w-full max-w-[1800px]  mx-auto rounded-lg lg:-ml-[40px] -my-[40px]">
        <div
          className={"w-full flex h-screen items-start justify-center relative"}
        >
          {/* <span className={`w-[calc(100%-5%)] lg:visible invisible`}>
          {formComponent && formComponent }
          </span> */}
          {mapComponent &&  mapComponent }
          <div
            className={
              "absolute left-[40px] pr-[70px] w-full bottom-[40px] lg:block hidden"
            }
          >
       {mapOverlay &&  mapOverlay }
          </div>
          <div
            onClick={handleClick}
            className={
              "fixed shadow lg:top-[35px] top-[35px] cursor-pointer hover:scale-105 active:scale-100 transition-all left-[10px] w-[56px] h-[56px] rounded-[16px] flex items-center justify-center bg-white"
            }
          >
            <BackIcon />
          </div>
        </div>
        {/* {formComponentResponsive && (
          <div className={"lg:hidden relative"}>
            <BottomSheet minHeight={100}>
              <div className={"mb-5 w-full"}>{mapOverlay}</div>
              {formComponentResponsive}
            </BottomSheet>
          </div>
        )} */}
      </div>
    );
}

export default MapViewLayout;