import React, { useState, useEffect } from "react";
import { pageTitle } from "../../../../assets/information/pageTitle";
import { Link } from "react-router-dom";
import FilterButtons from "../../../../components/tools/button/FilterButtons";
import { buttons, cards } from "../../../../assets/mock/mockData";
import CardListView from "../../../../components/tools/card/CardListView";
import { ReactComponent as PlusRedIcon } from "../../../../components/icons/svg/plusRedIcon.svg";
import { useToggle } from "../../../../components/hooks/toggle/useToggle";
import { AuthApiHeader } from "../../../../services/api/ApiHeader";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import { ToastType } from "../../../../models/enums/ToastType";
import { CreateToast } from "../../../../components/tools/toast/CreateToast";
import { useReactQuery } from "../../../../components/hooks/query/useReactQuery";
import ServerError from "../../../../components/tools/errors/serverError";
import Loading from "../../../../components/tools/loading/Loading";
import { GetAllNodeData } from "../../../../setting/ApiUrl";
import useStore from "../../../../store/zustand/store";

function FormView() {
   const refetch =useStore((state) =>(state.refetch));
   const { setRefetch } = useStore();
  const { setToggledFalse } = useStore();

  useEffect(() => {
    setToggledFalse();
  }, [setToggledFalse]);
  const [selectedValues, setSelectedValues] = useState<Record<string, any>>({});
 

  const apiDetails = {
    url: GetAllNodeData,
    method: HttpMethod.POST,
    headers: AuthApiHeader,
    body: selectedValues,
  };
 const {
   data: NodeData,
   isLoading,
   isError,
   error,
   refetch: NodeRefetch,
 } = useReactQuery(apiDetails);


       useEffect(() => {
         setRefetch(NodeRefetch);
         setToggledFalse();
       }, [setToggledFalse]);

        useEffect(() => {
          if (NodeData?.status !== 200 && NodeData?.status !== undefined) {
            CreateToast(
              ToastType.ERROR,
              "خطایی در بارگذاری داده‌ها رخ داد. لطفاً دوباره تلاش کنید."
            );
          }
        }, [NodeData?.status]);
  const setHubList = useStore((state) => state.setHubList);
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
    if (NodeData?.data) {
      setHubList(NodeData?.data);
    }
  }, [NodeData?.data, setHubList]);

  const updateData = NodeData?.data?.map((card: any) => ({
    id: card.id,
    isActive: card.isActive,
    title: card.nodeTitle,
    // redTitle: card.zone.name,
    firstHead: "آدرس",
    secondHeadValue:card.zoneTitle,
    secondHead: "زون",
    // latitude: card.latitude,
    // longitude: card.longitude,
    // fourthHead: card.hubType.title,
    // fourthHeadValue: card.node.name,
    // fifthHead: card.hubType.capacity,
    tags: [
      {
        label: card.isActive ? "فعال" : "غیرفعال",
        color: card.isActive ? "#e6fee1" : "#ffe2e2",
        borderColor: card.isActive ? "#9abd7d" : "#9f5b5b",
      },
      {
        label: card.nodeType,
        color: "#e1effe",
        borderColor: "#7d97bd",
      },
    ],
    firstHeadValue: card.address,
  }));

  return (
    <div
      className={
        "w-full pl-[40px] pt-[40px] h-screen overflow-y-auto flex flex-col justify-start items-center "
      }
    >
      <div className={"flex items-center w-full justify-between mb-2"}>
        <div className="text-[#111928] text-base font-bold leading-normal">
          {pageTitle.microhub.view}
        </div>
        <Link
          to={"/micro-hub/new"}
          className={
            "h-[49px] hover:scale-105 active:scale-100 transition-all  px-4 gap-2 py-3 rounded-xl border border-[#FF7959] flex items-center justify-between"
          }
        >
          <PlusRedIcon />
          <div className="text-right text-[#FF7959] text-base font-bold">{`${pageTitle.microhub.view} جدید`}</div>
        </Link>
      </div>
      <FilterButtons
        buttons={buttons.microhub}
        onButtonClick={handleButtonClick}
      />
      {isLoading && <Loading />}
      {(!updateData || updateData.length === 0) && !isLoading ? (
        <CardListView cards={updateData} errorPage={<ServerError/>} />
      ) : (
        <CardListView cards={updateData} />
      )}
    </div>
  );
}

export default FormView;
