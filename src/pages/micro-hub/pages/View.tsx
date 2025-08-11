import React from "react";
import ViewLayout from "../../../components/layout/view/ViewLayout";
import { useToggle } from "../../../components/hooks/toggle/useToggle";
import {Helmet} from "react-helmet";
import {baseTitle, pageTitle} from "../../../assets/information/pageTitle";
import InformationForm from "../components/form/InformationForm";
import PersonnelForm from "../components/form/PersonnelForm";
import DynamicTabs from "../../../components/tools/tab/DynamicTabs";
import LocationForm from "../components/form/LocationForm";
import FormView from "..//components/form/FormView";
import FormResponsiveView from "../components/form/FormResponsivView";
import HubMap from "../components/map/hubMap";

const View: React.FC = () => {
    const toggle = useToggle();
    const handleButtonClick = (id: string): void => {

    };
    const handleClick = () => {
          toggle();
    };
    const tabData = [
        {
            label: 'اطلاعات',
            content: <InformationForm/>
        },
        {
            label: 'لوکیشن',
            content: <LocationForm/>
        },
        {
            label: 'پرسنل',
            content: <PersonnelForm/>
        },
        {
            label: 'تاریخچه',
            content: <div>محتوای تاریخچه</div>
        }
    ];
    return (
      <>
        <Helmet>
          <title>
            {baseTitle} | {pageTitle.microhub.view}
          </title>
        </Helmet>
        <ViewLayout
          mapComponent={
          <HubMap/>
          }
          mapOverlay={
            <DynamicTabs
              className={"bg-white shadow"}
              contentClassName={"mt-[16px]"}
              tabs={tabData}
              inputClassName={"w-[calc(100%-55px)]"}
            />
          }
          formComponent={<FormView/>}
          formComponentResponsive={<FormResponsiveView />}
        />
      </>
    );
};

export default View;
