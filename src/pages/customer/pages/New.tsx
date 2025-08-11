import React from "react";
import FullFormViewLayout from "../../../components/layout/view/FullFormViewLayout";
import { Helmet } from "react-helmet";
import { baseTitle, pageTitle } from "../../../assets/information/pageTitle";
import ContractsForm from "../components/form/createCustomer/ContractsForm";
import { ReactComponent as PersonnelListSvg } from "../../../components/icons/svg/personnelListSvg.svg";
import NewForm from "../components/form/createCustomer/NewForm";

const New: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>
          {baseTitle} | {pageTitle.personnel.new}
        </title>
      </Helmet>
      <FullFormViewLayout
        // mapComponent={<ContractsForm/>}
        formComponent={
          <div className={"w-full h-screen overflow-y-auto px-8 py-16"}>
            <NewForm />
          </div>
        }
        // formComponentResponsive={<NewForm />}
      />
    </>
  );
};

export default New;
