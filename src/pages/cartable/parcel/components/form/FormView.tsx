import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { pageTitle } from "../../../../../assets/information/pageTitle";
import Search from "../../../../../components/tools/searchField/Search";
import FilterButtons from "../../../../../components/tools/button/FilterButtons";
import { buttons } from "../../../../../assets/mock/mockData";
import { ReactComponent as BackIcon } from "../../../../../components/icons/svg/backArrowIcon.svg";
import { ReactComponent as SearchIcon } from "../../../../components/icons/svg/searchIcon.svg";
import { ReactComponent as HalazoneLogo } from "../../../../../components/icons/svg/halazoneLogo.svg";
import useStore from "../../../../../store/zustand/store";
import ParcelList from "./ParcelList";

function FormView() {
  const { setToggledFalse } = useStore();
      const navigate = useNavigate();
      const [searchQuery, setSearchQuery] = useState("");
  const [selectedValues, setSelectedValues] = useState<Record<string, any>>({});

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
const onSearchClick = () => {
};

    const onBackClick = () => {
      navigate(-1);
    };
  return (
    <div
      className={
        "w-full pl-[40px] pt-[40px] h-screen overflow-y-auto flex flex-col justify-start items-center  mr-[25px] "
      }
    >
      {/* <div className="absolute top-0 left-0 w-full z-10 flex items-center justify-between px-5 pt-[40px]">
        <Search
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearchClick={onSearchClick}
        />
        <HalazoneLogo className="mr-auto" />

        <div
          onClick={onBackClick}
          className="cursor-pointer hover:scale-105 active:scale-100 transition-all w-[56px] h-[56px] mr-[25px] rounded-[16px] flex items-center justify-center bg-white shadow"
        >
          <BackIcon />
        </div>
      </div> */}

      <div className={"flex items-center w-full justify-between"}>
        <div className="text-[#111928] text-xl text-base font-bold leading-normal">
          {pageTitle.parcel.view}
        </div>
      </div>
      {/* <FilterButtons
        buttons={buttons.fleet}
        onButtonClick={handleButtonClick}
      /> */}
      <ParcelList />
    </div>
  );
}

export default FormView;
