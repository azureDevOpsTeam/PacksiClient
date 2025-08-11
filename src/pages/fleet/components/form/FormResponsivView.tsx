import React, { useState, useEffect } from "react";
import { pageTitle } from "../../../../assets/information/pageTitle";
import { Link } from "react-router-dom";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import FilterButtons from "../../../../components/tools/button/FilterButtons";
import { buttons, cards } from "../../../../assets/mock/mockData";
import CardListView from "../../../../components/tools/card/CardListView";
import useStore from "../../../../store/zustand/store";
import { FleetRequest } from "../../../../setting/ApiUrl";
import { useReactQuery } from "../../../../components/hooks/query/useReactQuery";
import { useIsToggled } from "../../../../components/hooks/toggle/useToggle";
import { ReactComponent as PlusRedIcon } from "../../../../components/icons/svg/plusRedIcon.svg";
import Loading from "../../../../components/tools/loading/Loading";

function FormResponsivView() {
  const { setToggledFalse } = useStore();
  const isToggled = useIsToggled();
  
  useEffect(() => {
    setToggledFalse();
  }, [setToggledFalse]);

  const [selectedValues, setSelectedValues] = useState<Record<string, any>>({});
  
  const apiDetails = {
    url: FleetRequest,
    method: HttpMethod.POST,
    body: selectedValues,
  };
  const {
    data: FleetData,
    isLoading,
    isError,
    error,
    refetch,
  } = useReactQuery(apiDetails);

  const setFleetList = useStore((state) => state.setFleetList);
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
    if (FleetData?.data) {
      setFleetList(FleetData?.data);
    }
  }, [FleetData?.data, setFleetList]);
  
const updateData = FleetData?.data?.map((card: any) => {
  const zoneOrTaxi = card.zone ?? card.taxi; // اگر zone نبود، از taxi استفاده کن

  return {
    id: card.id,
    isActive: card.isActive,
    title: zoneOrTaxi?.name,
    redTitle: zoneOrTaxi?.name,
    firstHead: "ظرفیت",
    firstHeadValue: card?.capacity,
    secondHeadValue: card.user?.fullName,
    secondHead: "پرسنل",
    latitude: card?.latitude,
    longitude: card?.longitude,
    fourthHead: card.fleetType.title,
    tags: [
      {
        label: card.isActive ? "فعال" : "غیرفعال",
        color: card.isActive ? "#e6fee1" : "#ffe2e2",
        borderColor: card.isActive ? "#9abd7d" : "#9f5b5b",
      },
      {
        label: card.fleetType.title,
        color: "#e1effe",
        borderColor: "#7d97bd",
      },
    ],
  };
});

  return (
    <div
      className={`w-full h-screen  relative overflow-y-auto flex flex-col justify-start items-center transition-all ${
        !isToggled ? "-mt-[6rem]  z-40" : "mt-0"
      } `}
    >
      <div className={"flex items-center w-full justify-between"}>
        <div className="text-[#111928] text-base font-bold leading-normal">
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
