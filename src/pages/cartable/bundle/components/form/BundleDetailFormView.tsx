import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Modal from "../../../../../components/tools/modal/madal";
import { HttpMethod } from "../../../../../models/enums/HttpMethod";
import ScanModal from "../../../../../components/tools/modal/ScannModal";
import { CreateToast } from "../../../../../components/tools/toast/CreateToast";
import { ToastType } from "../../../../../models/enums/ToastType";
import { useNavigate } from "react-router-dom";
import Search from "../../../../../components/tools/searchField/Search";
import { ReactComponent as BackIcon } from "../../../../../components/icons/svg/backArrowIcon.svg";
import { ReactComponent as HalazoneLogo } from "../../../../../components/icons/svg/halazoneLogo.svg";
import useStore from "../../../../../store/zustand/store";
import { ReactComponent as ScannIcon } from "../../../../../components/icons/svg/scannIcon.svg";
import BundleList from "./BundleList";
import {
  useReactQuery,
  useReactMutation,
} from "../../../../../components/hooks/query/useReactQuery";
import { useLocation } from "react-router-dom";
import {
  GetBundle,
  ScanDelivery,
  SetContractStatus,
} from "../../../../../setting/ApiUrl";
import BundleParcelsList from "./BundleParcelsList";
import {ReactComponent as WarningIcon} from "../../../../../components/icons/svg/YellowWarningIcon.svg";


interface Props {
  showButton?: boolean;
}



function BundleDetailFormView({ showButton = false }: Props) {
  const navigate = useNavigate();
  const [errorModal,setErrorModal]=useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [refetchTrigger, setRefetchTrigger] = useState(0);
  const triggeredByConfirm = useRef(false);
  const [scanValue, setScanValue] = useState("");
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const { state } = location; 
  const { setToggledFalse } = useStore();
  const { id } = useParams();
  const apiDetails = {
    url: GetBundle,
    method: HttpMethod.POST,
    body: {
      pageNumber: 1,
      pageSize: 5,
      bundleId: id,
    },
  };
    
  const handleExternalRefetch = () => {
    setRefetchTrigger((prev) => prev + 1);
  };

  const handleErrorModalClick=()=>{
    setErrorModal(false)
    setVisible(true)
  }

const onConfirmClick = (value: any) => {
  setScanValue(value.myField);
  scanMutation(value.myField);
  triggeredByConfirm.current = true;
};
  const cancelDelete = () => {
    setVisible(false);
  };
    const scanApiDetail = {
      url: ScanDelivery,
      method: HttpMethod.POST,
      body: {
        barcode: scanValue,
      },
    };
    const {
      mutate:scanMutation,
      data: scanData,
      isError: scanIsError,
      error: scanError,
    } = useReactMutation(scanApiDetail);
    
useEffect(() => {
  if (triggeredByConfirm.current && scanData?.data) {
    if (scanData.data.isSuccess === false && scanValue !== "") {
setErrorModal(true)
 
      setVisible(false);
    } else if (scanData.data.isSuccess === true) {
      CreateToast(ToastType.SUCCESS, scanData.data.message);
      handleExternalRefetch();
      setVisible(false);

    }
    triggeredByConfirm.current = false;
  }
}, [scanData]);
const { data, isLoading, isError, error, refetch:bundelRefetch } = useReactQuery(apiDetails);
  useEffect(() => {
    setToggledFalse();
  }, [setToggledFalse]);
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


  const handleSelectedParcelChange = (id: string | null) => {
  };

  return (
    <div className="w-full pl-[40px] pt-[40px] h-screen overflow-y-auto flex flex-col justify-start items-center mr-[25px]">
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
      <div className="flex items-center w-full justify-between">
        <div className="text-[#111928] text-xl font-bold leading-normal">
          <span className="font-bold">
            {data?.data?.id} | {data?.data?.customerName}
          </span>
        </div>
      </div>
      <div className="w-full flex justify-between mt-4">
        <p className="text-[#111928] font-bold">
          ثبت سفارش:{data?.data?.createdDate}{" "}
        </p>
        <p className="text-[#111928] font-bold">میکروهاب مقصد: {data?.data?.lastNodeName}</p>
      </div>
      <div className="w-full flex justify-between items-stretch">
        {/* <FilterButtons
          buttons={buttons.fleet}
          onButtonClick={handleButtonClick}
        /> */}
        {state?.showButton && (
          <button
            className="mt-6 h-9 flex items-center gap-2 px-3 py-2 text-white bg-[#FF7959] rounded-[12px] whitespace-nowrap"
            onClick={() => setVisible(true)}
          >
            <ScannIcon />
            <span>اسکن تحویل</span>
          </button>
        )}
      </div>
      <BundleParcelsList
        id={id}
        externalRefetch={refetchTrigger}
        onSelectParcel={handleSelectedParcelChange}
      />
      {visible && (
        <ScanModal
          onConfirm={onConfirmClick}
          title="اسکن کد"
          onCancel={cancelDelete}
          confirmText="تایید بارکد"
          cancelText="بیخیال"
        />
      )}
      {errorModal && (
        <Modal
          titleIcon={<WarningIcon />}
          cancelButtonTextColor="bg-[#FACA15]"
          confirmButtonColor="bg-[#FACA15]"
          cancelButtonColor="bg-[#FDFDEA]"
          onConfirm={handleErrorModalClick}
          title="!هشدار"
          onCancel={() => setErrorModal(false)}
          confirmText="تلاش مجدد"
          cancelText="بیخیال"
          message={scanData?.data?.message}
        />
      )}
    </div>
  );
}
export default BundleDetailFormView;
