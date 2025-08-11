import React, { useState, useEffect } from "react";
import { pageTitle } from "../../../../assets/information/pageTitle";
import { Link } from "react-router-dom";
import Filter from "../../../../components/tools/filters/Filter";
import CardListView from "../../../../components/tools/card/CardListView";
import { ReactComponent as PlusRedIcon } from "../../../../components/icons/svg/plusRedIcon.svg";
import { FleetRequest } from "../../../../setting/ApiUrl";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import useStore from "../../../../store/zustand/store";
import { useReactQuery } from "../../../../components/hooks/query/useReactQuery";
import ServerError from "../../../../components/tools/errors/serverError";
import Loading from "../../../../components/tools/loading/Loading";

function FormView() {
  const { setToggledFalse } = useStore();
    type FilterType = "normal" | "dropDown" | "date";
    interface OptionType {
      value: string | number | boolean;
      label: string;
    }
    const { setRefetch } = useStore();
  interface FilterItem {
    value?: number;
    label?: string;
    icon?: React.ReactNode;
    multiSelect?: boolean;
    category?: string;
    type: FilterType; 
    options?: OptionType[];
    url?: string | undefined;
  }
  const filters: Record<string, FilterItem> = {
    all: {
      label: "همه",
      category: "status",
      type: "normal",      
    },
    status: {
      value: 1,
      label: "وضعیت",
      category: "isActive",
      multiSelect: false,
      type: "dropDown",
      options: [
        { value: true, label: "فعال" },
        { value: false, label: "غیرفعال" },
      ],
    },
    fleetTypeId: {
      value: 2,
      label: "نوع ناوگان",
      category: "fleetType",
      multiSelect: false,
      type: "dropDown",
      options: [
        { value: 1, label: "اختصاصی" },
        { value: 2, label: "اشتراکی" },
      ],
    },

  };
  useEffect(() => {
    setToggledFalse();
    setRefetch(refetch);
  }, [setToggledFalse]);
  const [selectedValues, setSelectedValues] = useState<Record<string, any>>({
 isActive:null
  });
  console.log("selectedValues", selectedValues);
  const apiDetails = {
    url: FleetRequest,
    method: HttpMethod.POST,
    body: selectedValues,
  };
  const { data:FleetData, isLoading, isError, error, refetch } =
      useReactQuery(apiDetails);
const handleFilterChange = (values: any) => {
  const selections = values.dropdownSelections || {};

  const transformed: any = {};

  if (selections.isActive?.length) {
    transformed.isActive = selections.isActive[0];
  }

  if (selections.fleetType?.length) {
    transformed.fleetTypeId = selections.fleetType[0];
  }

  // اگه selectedDateRange هم خواستی بررسی کنی:
  if (values.selectedDateRange) {
    transformed.dateRange = values.selectedDateRange;
  }

  setSelectedValues(transformed);
};

  const setFleetList = useStore((state) => state.setFleetList);
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
    if (FleetData?.data) {
      setFleetList(FleetData?.data);
    }
  }, [FleetData?.data, setFleetList]);

const updateData = FleetData?.data?.map((card: any) => {
  const zoneOrTaxi = card.zone?.name ?? card.taxiLine;
  console.log("card.zone", card.zone);
  console.log("card.taxi", card.taxiLine);
  return {
    id: card.id,
    isActive: card.isActive,
    title: card.name,
    redTitle: zoneOrTaxi,
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

console.log("updateData", updateData);
return (
  <div className="w-full h-screen flex flex-col">
    {/* Header - ثابت */}
    <div className="pl-[40px] pt-[40px] flex flex-col items-center">
      <div className="flex items-center w-full justify-between mb-2">
        <div className="text-[#111928] text-base font-bold leading-normal">
          {pageTitle.fleet.view}
        </div>
        <Link
          to="/fleet/new"
          className="h-[49px] hover:scale-105 active:scale-100 transition-all px-4 gap-2 py-3 rounded-xl border border-[#FF7959] flex items-center justify-between"
        >
          <PlusRedIcon />
          <div className="text-right text-[#FF7959] text-base font-bold">{`${pageTitle.fleet.view} جدید`}</div>
        </Link>
      </div>

      <div className="w-full flex justify-end">
        <div className="w-full max-w-full">
          <Filter filters={filters} onChange={handleFilterChange} />
        </div>
      </div>
    </div>

    {/* محتوا - اسکرول‌پذیر */}
    <div className="flex-1 overflow-y-auto px-[40px] pb-[40px]">
      {isLoading && <Loading />}
      <div className="w-full">
        {(!updateData || updateData.length === 0) && !isLoading ? (
          <CardListView cards={updateData} errorPage={<ServerError />} />
        ) : (
          <CardListView cards={updateData} />
        )}
      </div>
    </div>
  </div>
);

}

export default FormView;
