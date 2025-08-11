import React from "react";
import InformationForm from "../../createWallet/components/form/InformationForm";
import LocationForm from "../../node/components/form/LocationForm";
import PersonnelForm from "../../node/components/form/PersonnelForm";
import {baseTitle, pageTitle} from "../../../assets/information/pageTitle";
import {Helmet} from "react-helmet";
import ViewLayout from "../../../components/layout/view/ViewLayout";
import DynamicTabs from "../../../components/tools/tab/DynamicTabs";
import FormView from "../../node/components/form/FormView";
import { ReactComponent as PersonnelListSvg } from "../../../components/icons/svg/personnelListSvg.svg";
import FormResponsiveView from "../../node/components/form/FormResponsivView";
import DynamicTable from "../../../components/tools/table/DynamicTable";
import DocumentForm from "../components/form/DocumentForm";
import ListView from "../components/form/ListView";


const View: React.FC = () => {
    const tabData = [
      {
        label: "اطلاعات",
        content: <InformationForm/>,
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
            {baseTitle} | {pageTitle.personnel.view}
          </title>
        </Helmet>
        <ViewLayout
          mapComponent={
            <div
              className={
                "w-full h-full flex flex-col items-center justify-center gap-[34px]"
              }
            >
              <PersonnelListSvg />
              <div className="text-center text-[#111928] text-base font-bold w-1/2 leading-normal">
                برای مشاهده و یا ویرایش پرسنل روی یک مورد از لیست کلیک کنید، یا
                یک پرسنل جدید ایجاد کنید.
              </div>
            </div>
          }
          mapOverlay={
            <DynamicTabs
              className={"bg-white shadow"}
              contentClassName={"mt-[16px]"}
              tabs={tabData}
              inputClassName={"w-[calc(100%-65px)]"}
            />
          }
          formComponent={<ListView className={" pl-[40px] pt-[40px]"} />}
          formComponentResponsive={<ListView/>}
        />
      </>
    );
};

export default View;
