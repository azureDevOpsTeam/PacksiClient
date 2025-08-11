import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../../../../../components/tools/searchField/Search";
import { pageTitle } from "../../../../../assets/information/pageTitle";
import FilterButtons from "../../../../../components/tools/button/FilterButtons";
import { buttons } from "../../../../../assets/mock/mockData";
import { ReactComponent as BackIcon } from "../../../../../components/icons/svg/backArrowIcon.svg";
import { ReactComponent as SearchIcon } from "../../../../../components/icons/svg/searchIcon.svg";
import { ReactComponent as HalazoneLogo } from "../../../../../components/icons/svg/halazoneLogo.svg";

import useStore from "../../../../../store/zustand/store";
import TaskDetailForm from "./ParcelReportForm";

function FormView() {
    const navigate = useNavigate();
     const [searchQuery, setSearchQuery] = useState("");
  const { setToggledFalse } = useStore();
  const [activeButton, setActiveButton] = useState<
    "acceptance" | "delivery" | "return"
  >("acceptance");

  useEffect(() => {
    setToggledFalse();
  }, [setToggledFalse]);
  const [selectedValues, setSelectedValues] = useState<Record<string, any>>({});

    const onBackClick = () => {
      navigate(-1);
    };
  const handleButtonClick = (button: {
    id: string;
    value: any;
    label: string;
    category: string;
  }) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [button.category]: button.value,
    }));
    setToggledFalse();
  };

const onSearchClick=()=>{
}

  return (
    <div
      className={
        "w-full pl-[40px] pt-[40px] h-screen overflow-y-auto flex flex-col justify-start items-center  mr-[25px] "
      }
    >
      <div className={"flex items-center w-full justify-between"}>
        <div className="text-[#111928] text-xl  font-bold leading-normal">
          {pageTitle.report.orderReport}
        </div>
      </div>
      <TaskDetailForm
        activeButton={activeButton}
        searchQuery={searchQuery}
        onActiveChange={setActiveButton}
      />
    </div>
  );
}

export default FormView;
