import React, {useState, useEffect, useMemo } from "react";
import TableCell from '../../../../../components/tools/table/TableCell';
import DetailButton from '../../../../../components/tools/button/DetailButton';
import Badge from '../../../../../components/tools/tags/Badge';
import { useToggle } from "../../../../../components/hooks/toggle/useToggle";
import NumberCounter from '../../../../../components/tools/counter/NumberCounter';
import { useNavigate } from "react-router-dom";
import DynamicTable from '../../../../../components/tools/table/DynamicTable';
import { useReactQuery } from '../../../../../components/hooks/query/useReactQuery';
import { GetAllParcel } from "../../../../../setting/ApiUrl";
import useStore from "../../../../../store/zustand/store";
import Tag from "../../../../../components/tools/tags/Tag";
import { HttpMethod } from "../../../../../models/enums/HttpMethod";

function ParcelList() {
    const { setToggledFalse } = useStore();

    useEffect(() => {
      setToggledFalse();
    }, [setToggledFalse]);
  const [currentPage,setCurrentPage]=useState(1);
  const toggle = useToggle();
  const navigate = useNavigate();
  const apiDetails = useMemo(
    () =>({
      url: GetAllParcel,
      method : HttpMethod.POST,
      body:{
        pageNumber: currentPage,
        pageSize:5,
      },
    }),
    [currentPage]
  )
  const {data,isLoading,isError,error,refetch}=
  useReactQuery(apiDetails)
  useEffect(()=>{
    refetch();
  },[currentPage,refetch]);
const handleButtonClick = (id: string) => {
  navigate(`/parcelDetail/${id}`);
  toggle();
};

  
      const transformedData = useMemo(()=>{
            if (!data?.data?.items) return [];
            return data.data.items?.map((item: any) => ({
              id: item.id,
              driver: item.fleetName,
              vehicle: (
                <Tag
                  categoryName="fleetType"
                  id={item.fleetTypeId}
                  className="custom-class"
                />
              ),
              customer: <TableCell>{`${item.customerName}`}</TableCell>,
              barcode: <TableCell>{`${item.barcode}`}</TableCell>,
              createdDate: <TableCell>{`${item.createdDate}`}</TableCell>,
              lastNodeName: <TableCell>{`${item.lastNodeName}`}</TableCell>,
              deliverTimeWindow: (
                <TableCell>{`${item.deliverTimeWindow}`}</TableCell>
              ),
              status: (
                <Tag
                  categoryName="bundleStatus"
                  id={item.bundleStatusId}
                  className="custom-class"
                />
              ),
              button: (
                <DetailButton
                  onFirstClick={() => handleButtonClick(item.id)}
                  firstText={"مشاهده مرسوله"}
                />
              ),
            }));
      },[data]);

        return (
          <div className="w-full  p-6 ">
            <div className="mt-6">
              <DynamicTable
                rowKey="id"
                isLoading={isLoading}
                onPageChange={setCurrentPage}
                showIndex={true}
                totalPage={data?.data?.totalPages}
                rowClassName={"border-2 border-solid border-[#E5E7EB]"}
                className={"mt-[24px]"}
                headers={[
                  { key: "id", label: "ID", hidden: true },
                  { key: "customer", label: "مشتری", sortable: true },
                  { key: "barcode", label: "شماره مرسوله", sortable: false },
                  {
                    key: "createdDate",
                    label: "ثبت سفارش",
                    sortable: false,
                  },
                  {
                    key: "lastNodeName",
                    label: "میکروهاب مقصد",
                    sortable: true,
                  },
                  { key: "driver", label: "راننده", sortable: true },
                  { key: "vehicle", label: "وسیله نقلیه", sortable: false },
                  {
                    key: "deliverTimeWindow",
                    label: "تاریخ و بازه تحویل",
                    sortable: false,
                  },
                  { key: "status", label: "وضعیت", sortable: false },
                  { key: "button", label: "", sortable: false },
                ]}
                data={transformedData}
                selectionMode={"single"}
              />
            </div>
          </div>
        );
}

export default ParcelList
