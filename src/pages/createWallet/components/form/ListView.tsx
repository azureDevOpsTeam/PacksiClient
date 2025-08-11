import React ,{useState,useEffect}from 'react';
import {pageTitle} from "../../../../assets/information/pageTitle";
import {Link} from "react-router-dom";
import FilterButtons from "../../../../components/tools/button/FilterButtons";
import {buttons, personnelList} from "../../../../assets/mock/mockData";
import {ReactComponent as PlusRedIcon} from "../../../../components/icons/svg/plusRedIcon.svg";
import DynamicTable from "../../../../components/tools/table/DynamicTable";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import { useReactQuery } from "../../../../components/hooks/query/useReactQuery";
import Badge from "../../../../components/tools/tags/Badge";
import { useToggle } from "../../../../components/hooks/toggle/useToggle";
import {
  GetCustomersWallet,
  GetUsersDropDown,
} from "../../../../setting/ApiUrl";
import TableCell from "../../../../components/tools/table/TableCell";
import Loading from '../../../../components/tools/loading/Loading';
import useStore from '../../../../store/zustand/store';
interface User {
  firstName: string;
  lastName:string;
  phoneNumber:string;
  Role:string;
  date:string;
  isActive:boolean;
}

function ListView({className}: { className?: string }) {
    const [selectedValues, setSelectedValues] = useState<Record<string, any>>(
      {}
    );
  const { setRefetch } = useStore();
  const { setToggledFalse } = useStore();
  const SelectedItem = useStore((state)=>(state.setSelectedItem))
  const [userList, setUserList] = useState<User[]>([]);
  const toggle = useToggle();
  const apiDetails = {
    url: GetUsersDropDown,
    method: HttpMethod.POST,
    body: {
      listByRole: 0,
    },
  };

  const customerWallet ={
    url: GetCustomersWallet,
    method :HttpMethod.GET
  }
    const { data: GetCustomerWalletData, isLoading: GetCustomerWalletLoading } =
      useReactQuery(customerWallet);
  useEffect(() => {
    setRefetch(refetch);
    setToggledFalse();
  }, [setToggledFalse]);
  
  const { data, isLoading, isError, error, refetch } =
    useReactQuery(apiDetails);

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
  
  const handleRowClick = (values: any) => {
     
      
    toggle();
    SelectedItem(values)
  };
  useEffect(() => {
    if (data?.data) {
      const userListArray = Array.isArray(data.data)
        ? [...data.data]
        : [data.data];
      setUserList(userListArray);
    }
  },[data]);
 console.log(" GetCustomerWalletData?.data", GetCustomerWalletData?.data);
  const transformedData =
    GetCustomerWalletData?.data?.length > 0
      ? GetCustomerWalletData?.data?.map((item: any) => ({
           original: item,
          id: item.customerId,
          brand: <TableCell>{`${item.brand}`}</TableCell>,
          walletType: <TableCell>{`${item.walletType}`}</TableCell>,
        }))
      : [];

  return (
    <div
      className={`w-full h-screen overflow-y-auto flex flex-col justify-start items-center ${className}`}
    >
      <div className="flex items-center w-full justify-between">
        <div
          className="text-[#111928] text-base font-bold leading-normal"
          // onClick={handleClick}
        >
          {pageTitle.wallet.view}
        </div>
        {/* <Link
          to={"/wallet/new"}
          className="h-[49px] hover:scale-105 active:scale-100 transition-all px-4 gap-2 py-3 rounded-xl border border-[#FF7959] flex items-center justify-between"
        >
          <PlusRedIcon />
          <div className="text-right text-[#FF7959] text-base font-bold">{`${pageTitle.wallet.view} جدید`}</div>
        </Link> */}
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <DynamicTable
          rowKey="id"
          className={"mt-[24px]"}
          headers={[
            { key: "id", label: "ID", hidden: true },
            { key: "brand", label: "نام  برند", sortable: true },
            { key: "walletType", label: "نوع کیف پول", sortable: false },
          ]}
          data={transformedData}
          selectionMode={"single"}
          onRowSelect={handleRowClick}
        />
      )}
    </div>
  );
}

export default ListView;