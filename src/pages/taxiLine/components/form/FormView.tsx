import React, { useEffect, useMemo, useCallback, useState } from "react";
import { pageTitle } from "../../../../assets/information/pageTitle";
import { Link } from "react-router-dom";
import FilterButtons from "../../../../components/tools/button/FilterButtons";
import { buttons } from "../../../../assets/mock/mockData";
import CardListView from "../../../../components/tools/card/CardListView";
import { useToggle } from "../../../../components/hooks/toggle/useToggle";
import { ReactComponent as PlusRedIcon } from "../../../../components/icons/svg/plusRedIcon.svg";
import useStore from "../../../../store/zustand/store";
import Loading from "../../../../components/tools/loading/Loading";
import { GetTaxiLines } from "../../../../setting/ApiUrl";
import { CreateToast } from "../../../../components/tools/toast/CreateToast";
import ServerError from "../../../../components/tools/errors/serverError";
import { ToastType } from "../../../../models/enums/ToastType";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import Filter from "../../../../components/tools/filters/Filter";
import { useReactQuery } from "../../../../components/hooks/query/useReactQuery";

const FormView: React.FC = () => {
  const { setRefetch, setToggledFalse, setDataList } = useStore();
  const [selectedValues, setSelectedValues] = useState<Record<string, any>>({});
  const toggle = useToggle();

  const apiDetail = useMemo(
    () => ({
      url: GetTaxiLines,
      method: HttpMethod.POST,
      body: { isActive:selectedValues},
    }),
    [selectedValues]
  );

  type FilterType = "normal" | "dropDown" | "date";
interface OptionType {
  value: string | number | boolean;
  label: string;
}
 

  interface FilterItem {
    value?: number;
    label?: string;
    icon?: React.ReactNode;
    multiSelect?: boolean;
    category?: string;
    type: FilterType; // ✅ تایپ محدود
    options?: OptionType[];
    url?: string | undefined;
  }
  const { data, isLoading, isError, error, refetch } = useReactQuery(apiDetail);

  useEffect(() => {

    refetch();
  }, [refetch, selectedValues]);
  
const filters: Record<string, FilterItem> = {
  all: {
    label: "همه",
    category: "status",
    type: "normal", // ✅ دقیقا یکی از نوع‌های مجاز
  },
  status: {
    value: 1,
    label: "وضعیت",
    category: "isActive",
    multiSelect: false,
    type: "dropDown", // ✅ مجاز
    options: [
      { value: true, label: "فعال" },
      { value: false, label: "غیرفعال" },
    ],
  },
  // date: {
  //   value: 7,
  //   label: "تاریخ",
  //   category: "date",
  //   type: "date", // ✅ مجاز
  // },
};
  useEffect(() => {
    setRefetch(refetch);
    setToggledFalse();
  }, [refetch, setRefetch, setToggledFalse]);

  useEffect(() => {
    if (data?.status !== 200 && data?.status !== undefined) {
      CreateToast(
        ToastType.ERROR,
        "خطایی در بارگذاری داده‌ها رخ داد. لطفاً دوباره تلاش کنید."
      );
    }
  }, [data?.status]);

  useEffect(() => {
    if (data?.data) {
      setDataList(data.data);
    }
  }, [data?.data, setDataList]);

  const handleClick = () => {
    toggle();
  };

  const handleFilterChange = (values:any) => {

    setSelectedValues(values.dropdownSelections["isActive"]?.[0]);
    // call API, filter data, etc...
  };
  const handleButtonClick = useCallback(
    (button: { id: string; value: any; label: string; category: string }) => {
      setSelectedValues((prev) => {
        const isActive = prev[button.category] === button.value;
        const updated = { ...prev };
        if (isActive) {
          delete updated[button.category];
        } else {
          updated[button.category] = button.value;
        }
        return updated;
      });

      setToggledFalse();
    },
    [setToggledFalse]
  );

  const updateData = useMemo(() => {
    return (
      data?.data?.map((card: any) => ({
        id: card.id,
        isActive: card.isActive,
        title: card.lineName,
        firstHead: card.firstNodeName,
        thirdHead: card.secondNodeName,
        firstHeadValue: card.firstNodeAddress,
        thirdHeadValue: card.secondNodeAddress,
        tags: [
          {
            label: card.isActive ? "فعال" : "غیرفعال",
            color: card.isActive ? "#e6fee1" : "#ffe2e2",
            borderColor: card.isActive ? "#9abd7d" : "#9f5b5b",
          },
        ],
      })) || []
    );
  }, [data?.data]);

  return (
    <div className="w-full pl-[40px] pt-[40px] h-screen overflow-y-auto flex flex-col justify-start items-center">
      <div className="flex items-center w-full justify-between">
        <div
          className="text-[#111928] text-base font-bold leading-normal cursor-pointer"
          onClick={handleClick}
        >
          {pageTitle.taxiLine.view}
        </div>
        <Link
          to="/taxiLine/new"
          className="h-[49px] hover:scale-105 active:scale-100 transition-all px-4 gap-2 py-3 rounded-xl border border-[#FF7959] flex items-center"
        >
          <PlusRedIcon />
          <div className="text-[#FF7959] text-base font-bold">
            {`${pageTitle.taxiLine.view} جدید`}
          </div>
        </Link>
      </div>

      <div className="mb-[25px] w-full flex justify-end">
        <div className="w-full max-w-full">
          <Filter filters={filters} onChange={handleFilterChange} />
        </div>
      </div>

      {isLoading && <Loading />}

      {!isLoading && (
        <CardListView
          cards={updateData}
          errorPage={!updateData?.length ? <ServerError /> : undefined}
        />
      )}
    </div>
  );
};

export default FormView;
