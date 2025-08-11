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
import { GetUserInfo ,UserDropDown } from '../../../../setting/ApiUrl';
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
    url: UserDropDown,
    method: HttpMethod.POST,
    body: selectedValues,
  };
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
     
      const extractedValues = values.map((item: any) => ({
        userId:item?.id,
        name: item?.name?.props?.children,
        createDate: item?.createDate?.props?.children,
        role: item?.role?.props?.text,
        phoneNumber: item?.phoneNumber?.props?.children,
        status: item?.status?.props?.text,
      }));
      
    toggle();
    SelectedItem(extractedValues)
  };
  useEffect(() => {
    if (data?.data) {
      const userListArray = Array.isArray(data.data)
        ? [...data.data]
        : [data.data];
      setUserList(userListArray);
    }
  },[data]);

  const transformedData =
    userList.length > 0
      ? userList.map((item: any) => ({
          id: item.id,
          name: <TableCell>{`${item.firstName} ${item.lastName}`}</TableCell>,
          role: (
            <Badge
              text={item.roleName|| 'سوپروایزر'}
              bgColor={item.roleName === "ادمین" ? "#fdf6b2" : "#e2e8f0"}
              borderColor={item.roleName === "Admin" ? "#faca15" : "#cbd5e0"}
              textColor={item.roleName === "Admin" ? "#8e4b10" : "#4a5568"}
            />
          ),
          phoneNumber: <TableCell>{item.phoneNumber}</TableCell>,
          createDate: <TableCell>{item.createDate}</TableCell>,
          status: (
            <Badge
              text={item.isActive ? "فعال" : "غیرفعال"}
              bgColor={item.isActive ? "#def7ec" : "#fef2f2"}
              borderColor={item.isActive ? "#84e1bc" : "#fca5a5"}
              textColor={item.isActive ? "#046c4e" : "#9b1c1c"}
            />
          ),
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
          {pageTitle.personnel.view}
        </div>
        <Link
          to={"/personnel/new"}
          className="h-[49px] hover:scale-105 active:scale-100 transition-all px-4 gap-2 py-3 rounded-xl border border-[#FF7959] flex items-center justify-between"
        >
          <PlusRedIcon />
          <div className="text-right text-[#FF7959] text-base font-bold">{`${pageTitle.personnel.view} جدید`}</div>
        </Link>
      </div>


      {isLoading ? (
        <Loading />
      ) : (
        <DynamicTable
          rowKey='id'
          className={"mt-[24px]"}
          headers={[
            { key: "id", label: "ID", hidden: true },
            { key: "name", label: "نام پرسنل", sortable: true },
            { key: "role", label: "نقش", sortable: false },
            { key: "phoneNumber", label: "شماره تماس", sortable: true },
            { key: "createDate", label: "تاریخ ایجاد", sortable: true },
            { key: "status", label: "وضعیت", sortable: false },
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