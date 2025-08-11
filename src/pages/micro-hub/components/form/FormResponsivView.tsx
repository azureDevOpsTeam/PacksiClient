import React, { useEffect,useState } from "react";
import { pageTitle } from "../../../../assets/information/pageTitle";
import { Link } from "react-router-dom";
import FilterButtons from "../../../../components/tools/button/FilterButtons";
import { buttons, cards } from "../../../../assets/mock/mockData";
import CardListView from "../../../../components/tools/card/CardListView";
import { ReactComponent as PlusRedIcon } from "../../../../components/icons/svg/plusRedIcon.svg";
import { useIsToggled } from "../../../../components/hooks/toggle/useToggle";
import useStore from "../../../../store/zustand/store";
import { useToggle } from "../../../../components/hooks/toggle/useToggle";
import { useReactQuery } from "../../../../components/hooks/query/useReactQuery";
import { AuthApiHeader } from "../../../../services/api/ApiHeader";
import { CreateToast } from "../../../../components/tools/toast/CreateToast";
import { ToastType } from "../../../../models/enums/ToastType";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import { GetAllNodeData } from "../../../../setting/ApiUrl";

function FormResponsivView() {
    const isToggled = useIsToggled();
    const { setToggledFalse } = useStore();
     const [selectedValues, setSelectedValues] = useState<Record<string, any>>(
       {}
     );

    useEffect(() => {
      setToggledFalse();
    }, [setToggledFalse]);
   

    const apiDetails = {
      url: GetAllNodeData,
      method: HttpMethod.POST,
      headers: AuthApiHeader,
      body: { nodeTypeId: 1 },
    };
    const {
      data: NodeData,
      isLoading,
      isError,
      error,
      refetch,
    } = useReactQuery(apiDetails);

    const setHubList = useStore((state) => state.setHubList);
     useEffect(() => {
       if (NodeData?.status !== 200 && NodeData?.status !== undefined) {
         CreateToast(
           ToastType.ERROR,
           "خطایی در بارگذاری داده‌ها رخ داد. لطفاً دوباره تلاش کنید."
         );
       }
     }, [NodeData?.status]);
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
    secondHeadValue: "زون تستی",
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
      className={`w-full h-screen  relative overflow-y-auto flex flex-col justify-start items-center transition-all ${
        !isToggled ? "-mt-[100px] z-40" : "mt-0 "
      } `}
    >
      <div
        className={"flex items-center w-full justify-between pt-[5px] pl-[5px]"}
      >
        <div className="text-[#111928] text-base font-bold leading-normal ">
          {pageTitle.fleet.view}
        </div>
        <Link
          to={"/fleet/new"}
          className={
            "h-[49px] hover:scale-105 active:scale-100 transition-all px-4 gap-2 py-3 rounded-xl border border-[#FF7959] flex items-center justify-between"
          }
        >
          <PlusRedIcon />
          <div className="text-right text-[#FF7959] text-base font-bold">{`${pageTitle.fleet.view} جدید`}</div>
        </Link>
      </div>
      <FilterButtons
        buttons={buttons.fleet}
        onButtonClick={handleButtonClick}
      />
      <CardListView cards={updateData} />
    </div>
  );
}

export default FormResponsivView;
