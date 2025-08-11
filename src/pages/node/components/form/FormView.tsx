import React, { useState, useEffect } from "react";
import { pageTitle } from "../../../../assets/information/pageTitle";
import { Link } from "react-router-dom";
import FilterButtons from "../../../../components/tools/button/FilterButtons";
import { buttons } from "../../../../assets/mock/mockData";
import CardListView from "../../../../components/tools/card/CardListView";
import { useToggle } from "../../../../components/hooks/toggle/useToggle";
import { ReactComponent as PlusRedIcon } from "../../../../components/icons/svg/plusRedIcon.svg";
import useStore from "../../../../store/zustand/store";
import Loading from "../../../../components/tools/loading/Loading";
import { NodeRequest } from "../../../../setting/ApiUrl";
import { CreateToast } from "../../../../components/tools/toast/CreateToast";
import ServerError from "../../../../components/tools/errors/serverError";
import { ToastType } from "../../../../models/enums/ToastType";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import { useReactQuery } from "../../../../components/hooks/query/useReactQuery";


const FormView: React.FC = () => {
      const { setRefetch } = useStore();
      const { setToggledFalse } = useStore();
      const [selectedValues, setSelectedValues] = useState<Record<string, any>>(
        {isActive:true}
      );
      
      const apiDetails = {
        url: NodeRequest,
        method: HttpMethod.POST,
        body: selectedValues,
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
   setSelectedValues((prevValues) => {
     const isAlreadyActive = prevValues[button.category] === button.value;

     if (isAlreadyActive) {
       // حذف فیلتر اگه دکمه فعال بود
       const updated = { ...prevValues };
       delete updated[button.category];
       return updated;
     } else {
       // اضافه‌کردن فیلتر جدید
       return {
         ...prevValues,
         [button.category]: button.value,
       };
     }
   });

   setToggledFalse(); // تابع دلخواه شما بعد از هر کلیک
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
        sixthHead:"طول وعرض",
        firstHeadValue: card.address,
        latitude: card.latitude,
        longitude: card.longitude,
        tags: [
          {
            label: card.isActive ? "فعال" : "غیرفعال",
            color: card.isActive ? "#e6fee1" : "#ffe2e2",
            borderColor: card.isActive ? "#9abd7d" : "#9f5b5b",
          },
        ],
      }));

  
  return (
    <div className="w-full pl-[40px] pt-[40px] h-screen overflow-y-auto flex flex-col justify-start items-center">
      <div className="flex items-center w-full justify-between">
        <div
          className="text-[#111928] text-base font-bold leading-normal"
          onClick={handleClick}
        >
          {pageTitle.node.view}
        </div>
        <Link
          to={"/node/new"}
          className="h-[49px] hover:scale-105 active:scale-100 transition-all px-4 gap-2 py-3 rounded-xl border border-[#FF7959] flex items-center justify-between"
        >
          <PlusRedIcon />
          <div className="text-right text-[#FF7959] text-base font-bold">{`${pageTitle.node.view} جدید`}</div>
        </Link>
      </div>
      <FilterButtons buttons={buttons.node} onButtonClick={handleButtonClick} />
      {isLoading && <Loading />}
      {(!updateData || updateData.length === 0) && !isLoading ? (
        <CardListView cards={updateData} errorPage={<ServerError />} />
      ) : (
        <CardListView cards={updateData} />
      )}
    </div>
  );
};

export default FormView;
