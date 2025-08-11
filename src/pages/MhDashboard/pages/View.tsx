import React from "react";
import { ReactComponent as SearchIcon } from "../../../components/icons/svg/searchIcon.svg";
import {ReactComponent as TruckLoadSvg} from '../../../components/icons/svg/truckLoadIcon.svg';
import {ReactComponent as ExtraRedIcon} from '../../../components/icons/svg/extraRedIcon.svg';
import {ReactComponent as MapRedIcon} from '../../../components/icons/svg/mapRedIcon.svg';
import {ReactComponent as PluseWhiteIcon} from '../../../components/icons/svg/pluseWhiteIcon.svg';
import {ReactComponent as UserAvatarIcon} from '../../../components/icons/svg/userAvatarIcon.svg';
import {ReactComponent as DownloadWhiteIcon} from '../../../components/icons/svg/downloadWhiteIcon.svg';
import {ReactComponent as LeftArowIcon} from '../../../components/icons/svg/leftArowIcon.svg';
import {ReactComponent as HalazoneLogo} from '../../../components/icons/svg/halazoneLogo.svg';
import {ReactComponent as BarIcon} from '../../../components/icons/svg/barIcon.svg';
import BottomSheet from "../../../components/layout/bottom-sheet/BottomSheet";
import SectionZero from "../components/sections/SectionZero";
import MapOverlay from "../components/map/MapOverlay";
import {baseTitle, pageTitle} from "../../../assets/information/pageTitle";
import {Helmet} from "react-helmet";
import DashboardMap from "../components/map/DashboardMap";

const View: React.FC = () => {

    const truckValue = 46

    const trafficValue = 75

    return (
      <div className=" w-full max-w-[1440px]  mx-auto rounded-lg">
        <Helmet>
          <title>
            {baseTitle} | {pageTitle.MhDashboard}
          </title>
        </Helmet>
        <div className="relative w-full lg:h-[500px] h-screen rounded-[16px]">
          <DashboardMap />
          <div className={"lg:inline hidden"}>
            <div className={"absolute top-[80px] px-[15px]"}>
              <MapOverlay />
            </div>
            <SectionZero
              truckValue={truckValue}
              TruckLoadSvg={TruckLoadSvg}
              ExtraRedIcon={ExtraRedIcon}
              MapRedIcon={MapRedIcon}
              PluseWhiteIcon={PluseWhiteIcon}
              UserAvatarIcon={UserAvatarIcon}
              LeftArowIcon={LeftArowIcon}
              BarIcon={BarIcon}
              DownloadWhiteIcon={DownloadWhiteIcon}
            />
          </div>
          <div className={"lg:hidden relative"}>
            <BottomSheet minHeight={100}>
              <div className={"relative "}>
                <MapOverlay />
              </div>
              <SectionZero
                truckValue={truckValue}
                TruckLoadSvg={TruckLoadSvg}
                ExtraRedIcon={ExtraRedIcon}
                MapRedIcon={MapRedIcon}
                PluseWhiteIcon={PluseWhiteIcon}
                UserAvatarIcon={UserAvatarIcon}
                LeftArowIcon={LeftArowIcon}
                BarIcon={BarIcon}
                DownloadWhiteIcon={DownloadWhiteIcon}
              />
            </BottomSheet>
          </div>
        </div>
      </div>
    );
};

export default View;
