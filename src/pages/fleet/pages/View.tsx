import React from "react";
import ViewLayout from "../../../components/layout/view/ViewLayout";
import MapComponent from "../../../components/tools/map/MapTest";
import DynamicTabs from "../../../components/tools/tab/DynamicTabs";
import { baseTitle, pageTitle } from "../../../assets/information/pageTitle";
import { Helmet } from "react-helmet";
import InformationForm from "../components/form/InformationForm";
import PersonnelForm from "../components/form/PersonnelForm";
import DocumentsForm from "../components/form/DocumentsForm";
import FormView from "../../fleet/components/form/FormView";
import useStore from "../../../store/zustand/store";
import FormResponsiveView from "../../fleet/components/form/FormResponsivView";

const View: React.FC = () => {

  const tabData = [
    {
      label: "اطلاعات",
      content: <InformationForm />,
    },
    {
      label: "پرسنل",
      content: <PersonnelForm />,
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
      <ViewLayout
        mapComponent={
          <MapComponent
            center={[35.6762, 51.4231]}
            zoom={15}
            markers={[
              {
                id: "1",
                lat: 35.6892,
                lng: 51.389,
                popupContent: (
                  <div className="relative bg-[#FF7959] w-fit p-4 rounded-xl shadow-md text-white">
                    <h3>نقطه ۱:</h3>
                    <button onClick={() => alert("نقطه ۱ کلیک شد!")}>
                      Click Me 1
                    </button>
                  </div>
                ),
              },
              {
                id: "2",
                lat: 35.72393889437902, // کمی بالاتر از تهران
                lng: 51.52016056771516,
                popupContent: (
                  <div className="relative bg-[#FF7959] w-fit p-4 rounded-xl shadow-md text-white">
                    <h3>نقطه ۲:</h3>
                    <button onClick={() => alert("نقطه ۲ کلیک شد!")}>
                      Click Me 2
                    </button>
                  </div>
                ),
              },
              {
                id: "3",
                lat: 35.73160340875959, // کمی پایین‌تر از تهران
                lng: 51.18064379622462,
                popupContent: (
                  <div className="relative bg-[#FF7959] w-fit p-4 rounded-xl shadow-md text-white">
                    <h3>نقطه ۳:</h3>
                    <button onClick={() => alert("نقطه ۳ کلیک شد!")}>
                      Click Me 3
                    </button>
                  </div>
                ),
              },
            ]}
            focusMarkerId={"3"}
            className="lg:relative fixed z-0"
            loading={true}
            loadTime={1000}
          />
        }
        mapOverlay={
          <DynamicTabs
            className={"bg-white shadow"}
            contentClassName={"mt-[16px]"}
            tabs={tabData}
            inputClassName={"w-[calc(100%-55px)]"}
          />
        }
        formComponent={<FormView />}
        formComponentResponsive={<FormResponsiveView />}
      />
    </>
  );
};

export default View;
