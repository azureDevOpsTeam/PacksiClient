import React, { useState, useEffect } from "react";
import { pageTitle } from "../../../../assets/information/pageTitle";
import { Link } from "react-router-dom";
import FilterButtons from "../../../../components/tools/button/FilterButtons";
import { buttons, cards } from "../../../../assets/mock/mockData";
import CardListView from "../../../../components/tools/card/CardListView";
import { ReactComponent as PlusRedIcon } from "../../../../components/icons/svg/plusRedIcon.svg";
import { useIsToggled } from "../../../../components/hooks/toggle/useToggle";
import { GetTaxiLines } from "../../../../setting/ApiUrl";
import { useToggle } from "../../../../components/hooks/toggle/useToggle";
import useStore from "../../../../store/zustand/store";
import { CreateToast } from "../../../../components/tools/toast/CreateToast";
import { ToastType } from "../../../../models/enums/ToastType";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import { useReactQuery } from "../../../../components/hooks/query/useReactQuery";


function FormResponsivView() {
    const isToggled = useIsToggled();
    const { setRefetch } = useStore();
    const { setToggledFalse } = useStore();
    const [selectedValues, setSelectedValues] = useState<Record<string, any>>(
      {}
    );
    const apiDetails = {
      url: GetTaxiLines,
      method: HttpMethod.POST,
      body: {
        isActive:true
      },
    };
    const { data, isLoading, isError, error, refetch } =
      useReactQuery(apiDetails);
      
    useEffect(() => {
      setRefetch(refetch);
      setToggledFalse();
    }, [setToggledFalse]);


    useEffect(() => {
      if (data?.status !== 200 && data?.status !== undefined) {
        CreateToast(
          ToastType.ERROR,
          "خطایی در بارگذاری داده‌ها رخ داد. لطفاً دوباره تلاش کنید."
        );
      }
    }, [data?.status]);

    const setDataList = useStore((state) => state.setDataList);
    const toggle = useToggle();
    const handleClick = () => {
   
      toggle();
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
  

    useEffect(() => {
      if (data?.data) {
        setDataList(data?.data);
      }
    }, [data?.data, setDataList]);

   const updateData = data?.data?.map((card: any) => ({
     id: card.id,
     isActive: card.isActive,
     title: card.title,
     firstHead: "آدرس",
     latitude: card.latitude,
     longitude: card.longitude,
     tags: [
       {
         label: card.isActive ? "فعال" : "غیرفعال",
         color: card.isActive ? "#e6fee1" : "#ffe2e2",
         borderColor: card.isActive ? "#9abd7d" : "#9f5b5b",
       },
     ],
     firstHeadValue: card.address,
   }));
  return (
    <div
      className={`w-full h-screen  relative overflow-y-auto flex flex-col justify-start items-center transition-all ${
        !isToggled ? "-mt-[85px] z-40" : "mt-0 "
      } `}
    >
      <div
        className={"flex items-center w-full justify-between pt-[5px] pl-[5px]"}
      >
        <div className="text-[#111928] text-base font-bold leading-normal">
          {pageTitle.node.view}
        </div>
        <Link
          to={"/node/new"}
          className={
            "h-[49px] hover:scale-105 active:scale-100 transition-all px-4 gap-2 py-3 rounded-xl border border-[#FF7959] flex items-center justify-between"
          }
        >
          <PlusRedIcon />
          <div className="text-right text-[#FF7959] text-base font-bold">{`${pageTitle.node.view} جدید`}</div>
        </Link>
      </div>
      <FilterButtons buttons={buttons.node} onButtonClick={handleButtonClick} />
      <CardListView cards={updateData} />
    </div>
  );
}

export default FormResponsivView;
