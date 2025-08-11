import React, { useState, useEffect } from "react";
import { pageTitle } from "../../../../assets/information/pageTitle";
import { Link } from "react-router-dom";
import FilterButtons from "../../../../components/tools/button/FilterButtons";
import { buttons, cards } from "../../../../assets/mock/mockData";
import CardListView from "../../../../components/tools/card/CardListView";
import { ReactComponent as PlusRedIcon } from "../../../../components/icons/svg/plusRedIcon.svg";
import { useToggle } from "../../../../components/hooks/toggle/useToggle";
import { ZoneRequest } from "../../../../setting/ApiUrl";
import { AuthApiHeader } from "../../../../services/api/ApiHeader";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import { useReactQuery } from "../../../../components/hooks/query/useReactQuery";
import ServerError from "../../../../components/tools/errors/serverError";
import Loading from "../../../../components/tools/loading/Loading";
import useStore from "../../../../store/zustand/store";

function FormView() {
  const { setToggledFalse } = useStore();
  const { setRefetch } = useStore();
  const [selectedValues, setSelectedValues] = useState<Record<string, any>>({});



  const [ButtonValue, setButtonValue] = useState(null);
  const setZoneList = useStore((state) => state.setZoneList);
  const toggle = useToggle();
  const apiDetails = {
    url: ZoneRequest,
    method: HttpMethod.POST,
    headers: AuthApiHeader,
    body: selectedValues,
  };
    const { data:ZoneData, isLoading, isError, error, refetch } =
      useReactQuery(apiDetails);
 
      useEffect(() => {
        setRefetch(refetch);
        setToggledFalse();
      }, [setToggledFalse]);
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
    if (ZoneData?.data) {
      setZoneList(ZoneData?.data);
    }
  }, [ZoneData?.data, setZoneList]);

  const updateData = ZoneData?.data?.map((card: any) => ({
    id: card.id,
    isActive: card.isActive,
    title: card.name,
    thirdHead: "ند ها",
    thirdHeadValue: card?.nodes?.map((item: any) => item.name).join(", "),
    // firstHead: "آدرس",
    firstHeadValue: card.address,
    // secondHeadValue: "پل سید خندان",
    // secondHead: "میکروهاب",
    latitude: card?.latitude,
    longitude: card?.longitude,
    // fourthHead: card?.hubType.title,
    fourthHeadValue: card?.zonePolygons,
    // fifthHead: card.hubType.capacity,
    tags: [
      {
        label: card.isActive ? "فعال" : "غیرفعال",
        color: card.isActive ? "#e6fee1" : "#ffe2e2",
        borderColor: card.isActive ? "#9abd7d" : "#9f5b5b",
      },
    ],
  }));
  
  return (
    <div
      className={
        "w-full pl-[40px] pt-[40px] h-screen overflow-y-auto flex flex-col justify-start items-center "
      }
    >
      <div className={"flex items-center w-full justify-between"}>
        <div className="text-[#111928] text-base font-bold leading-normal">
          {pageTitle.zone}
        </div>
        <Link
          to={"/zone/new"}
          className={
            "h-[49px] hover:scale-105 active:scale-100 transition-all px-4 gap-2 py-3 rounded-xl border border-[#FF7959] flex items-center justify-between"
          }
        >
          <PlusRedIcon />
          <div className="text-right text-[#FF7959] text-base font-bold">{`${pageTitle.zone} جدید`}</div>
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
}

export default FormView;
