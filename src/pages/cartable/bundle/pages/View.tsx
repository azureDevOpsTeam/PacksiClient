import React from "react";
import MhViewLayout from "../../../../components/layout/view/MhViewLayout";
import MapComponent from "../../../../components/tools/map/MapTest";
import DynamicTabs from "../../../../components/tools/tab/DynamicTabs";
import { baseTitle, pageTitle } from "../../../../assets/information/pageTitle";
import { Helmet } from "react-helmet";
import FormView from "../../../cartable/bundle/components/form/FormView";
import useStore from "../../../../store/zustand/store";


const View: React.FC = () => {

  const tabData = [
    {
      label: "اطلاعات",
      content: <div>jsj</div>,
    },
    {
      label: "پرسنل",
      content: <div>jsj</div>,
    },
    {
      label: "تاریخچه",
      content: <div>محتوای تاریخچه</div>,
    },
  ];
  return (
    <>
      <Helmet>
        <title>
          {baseTitle} | {pageTitle.fleet.view}
        </title>
      </Helmet>
      <MhViewLayout
        mapOverlay={
          <DynamicTabs
            className={"bg-white shadow"}
            contentClassName={"mt-[16px]"}
            tabs={tabData}
            inputClassName={"w-[calc(100%-55px)]"}
          />
        }
        formComponent={<FormView />}
 
      />
    </>
  );
};

export default View;
