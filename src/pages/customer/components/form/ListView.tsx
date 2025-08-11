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
import { GetCustomers} from '../../../../setting/ApiUrl';
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
  const [currentPage, setCurrentPage] = useState(1);
  const { setToggledFalse } = useStore();
  const setSelectedItem = useStore((state) => state.setSelectedItem);
  const [userList, setUserList] = useState<User[]>([]);
  const toggle = useToggle();
  const apiDetails = {
    url: GetCustomers,
    method: HttpMethod.POST,
    body: {
      pageNumber: currentPage,
      pageSize: 10,
    },
  };
  useEffect(() => {
    setRefetch(refetch);
    setToggledFalse();
  }, [setToggledFalse]);
  
  const { data, isLoading, isError, error, refetch } =
    useReactQuery(apiDetails);
        useEffect(() => {
          if (refetch) {
            setRefetch(refetch);
          }
        }, [refetch, setRefetch]);
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

  const handleRowClick = (item: any) => { 
            setSelectedItem(item[0]?.id);
    toggle();

  };

  useEffect(() => {
    if (data?.data) {
      const userListArray = Array.isArray(data.data?.items)
        ? [...data.data?.items]
        : [data.data?.items];
      setUserList(userListArray);
    }
  },[data]);

  const transformedData =
    userList.length > 0
      ? userList?.map((item: any) => ({
          original: item,
          id: item.id,
          brandName: <TableCell>{item.brandName}</TableCell>,
          contactNumber: <TableCell>{item.contactNumber}</TableCell>,
          registrationDate: <TableCell>{"۱۴۰۳/۰۱/۱۳"}</TableCell>,
          endDate: <TableCell>{"۱۴۰۵/۰۶/۱۹"}</TableCell>,
        }))
      : [];
  console.log("transformedData", transformedData);
  return (
    <div
      className={`w-full h-screen overflow-y-auto flex flex-col justify-start items-center ${className}`}
    >
      <div className="flex items-center w-full justify-between mb-2">
        <div
          className="text-[#111928] text-base font-bold leading-normal "
          // onClick={handleClick}
        >
          {pageTitle.customer.view}
        </div>
        <Link
          to={"/customer/new"}
          className="h-[49px] hover:scale-105 active:scale-100 transition-all px-4 gap-2 py-3 rounded-xl border border-[#FF7959] flex items-center justify-between"
        >
          <PlusRedIcon />
          <div className="text-right text-[#FF7959] text-base font-bold">{`${pageTitle.customer.view} جدید`}</div>
        </Link>
      </div>
      <FilterButtons
        buttons={buttons.personnel}
        onButtonClick={handleButtonClick}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <DynamicTable
          // showIndex={true}
          rowKey="id"
          onPageChange={setCurrentPage}
          currentPageNumber={currentPage}
          isLoading={isLoading}
          pagination={true}
          PageNumber={Math.ceil(data?.data?.totalCount / 10)}
          totalPage={data?.data?.totalCount}
          className={"mt-[24px]"}
          headers={[
            { key: "id", label: "ID", hidden: true },
            { key: "brandName", label: "نام برند", sortable: true },
            { key: "contactNumber", label: "شماره تماس", sortable: false },
            { key: "registrationDate", label: "تاریخ ایجاد", sortable: true },
            {
              key: "endDate",
              label: "انقضای قرار داد",
              sortable: true,
            },
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