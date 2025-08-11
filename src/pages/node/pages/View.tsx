import React from "react";
import ViewLayout from "../../../components/layout/view/ViewLayout";
import NodeMap from "../components/map/nodeMap";
import InformationForm from "../components/form/InformationForm";
import LocationForm from "../components/form/LocationForm";
import PersonnelForm from "../components/form/PersonnelForm";
import DynamicTabs from "../../../components/tools/tab/DynamicTabs";
import { Helmet } from "react-helmet";
import { baseTitle, pageTitle } from "../../../assets/information/pageTitle";
import FormResponsiveView from "../components/form/FormResponsivView";
import FormView from "../components/form/FormView";
import { useToggle } from "../../../components/hooks/toggle/useToggle";

const View: React.FC = () => {
  const tabData = [
    {
      label: "اطلاعات",
      content: <InformationForm />,
    },
    {
      label: "لوکیشن",
      content: <LocationForm />,
    },
    // {
    //   label: "پرسنل",
    //   content: <PersonnelForm />,
    // },
    {
      label: "تاریخچه",
      content: <div>محتوای تاریخچه</div>,
    },
  ];
  return (
    <>
      <Helmet>
        <title>
          {baseTitle} | {pageTitle.node.view}
        </title>
      </Helmet>
      <ViewLayout
        mapComponent={<NodeMap/>}
        mapOverlay={
          <DynamicTabs
            className={"bg-white shadow"}
            contentClassName={""}
            tabs={tabData}
            inputClassName={"w-[calc(100%-65px)]"}
          />
        }
        formComponent={<FormView />}
        formComponentResponsive={<FormResponsiveView />}
      />
    </>
  );
};

export default View;
