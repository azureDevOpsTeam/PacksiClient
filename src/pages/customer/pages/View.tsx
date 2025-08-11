import React from "react";
import InformationForm from "../../customer/components/form/InformationForm";
import {baseTitle, pageTitle} from "../../../assets/information/pageTitle";
import {Helmet} from "react-helmet";
import ViewLayout from "../../../components/layout/view/ViewLayout";
import DynamicTabs from "../../../components/tools/tab/DynamicTabs";
import { ReactComponent as PersonnelListSvg } from "../../../components/icons/svg/personnelListSvg.svg";
import ContractsForm from "../components/form/ContractsForm";
import WarehousesForm from "../components/form/WarehousesForm";
import ListView from "../components/form/ListView";


const View: React.FC = () => {
    const tabData = [
      {
        label: "اطلاعات",
        content: <InformationForm />,
      },
      {
        label: "انبارها",
        content: <WarehousesForm />,
      },
      {
        label: "قراردادها",
        content: <ContractsForm />,
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
            {baseTitle} | {pageTitle.customer.view}
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
                برای مشاهده و یا ویرایش مشتری روی یک مورد از لیست کلیک کنید، یا
                یک مشتری جدید ایجاد کنید.
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
          formComponentResponsive={<ListView />}
        />
      </>
    );
};

export default View;
