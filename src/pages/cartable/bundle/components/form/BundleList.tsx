import React, { useState, useEffect, useMemo } from "react";
import TableCell from "../../../../../components/tools/table/TableCell";
import DetailButton from "../../../../../components/tools/button/DetailButton";
import Badge from "../../../../../components/tools/tags/Badge";
import Loading from "../../../../../components/tools/loading/Loading";
import { useNavigate } from "react-router-dom";
import NumberCounter from "../../../../../components/tools/counter/NumberCounter";
import { GetBundles } from "../../../../../setting/ApiUrl";
import { HttpMethod } from "../../../../../models/enums/HttpMethod";
import { useReactQuery } from "../../../../../components/hooks/query/useReactQuery";
import DynamicTable from "../../../../../components/tools/table/DynamicTable";
import Tag from "../../../../../components/tools/tags/Tag";

function BundleList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  const apiDetails = useMemo(
    () => ({
      url: GetBundles,
      method: HttpMethod.POST,
      body: {
        pageNumber: currentPage,
        pageSize: 5,
      },
    }),
    [currentPage]
  );

  const { data, isLoading, isError, error, refetch } =
    useReactQuery(apiDetails);
  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  const transformedData = useMemo(() => {
    if (!data?.data?.items) return [];
    return data.data.items?.map((item: any) => ({
      id: item.id,
      barcode: <TableCell>{item.barcode}</TableCell>,
      parcel: (
        <NumberCounter
          value1={item.totalParcelCount}
          value2={item.scannedCount}
        />
      ),
      customerName: <TableCell>{item.customerName}</TableCell>,
      OrderId: <TableCell>{item.orderId}</TableCell>,
      orderRegistration: <TableCell>{item.createdDate}</TableCell>,
      status: (
        <Tag
          categoryName="bundleStatus"
          id={item.bundleStatusId}
          className="custom-class"
        />
      ),
      button: (
        <DetailButton
          onFirstClick={() => navigate(`/bundleDetail/${item.id}`)} 
          firstText="مشاهده باندل"
        />
      ),
    }));
  }, [data]); 

const handleRowClick = (value: any) => {
  if (value && value.length > 0) {
    setSelectedId(value[0].id);
  } else {
    setSelectedId(null);
  }
};
  return (
    <div className="w-full p-6">
      <div className="mt-6">
        <DynamicTable
          rowKey="id"
          onRowSelect={handleRowClick}
          isLoading={isLoading}
          totalPage={data?.data?.totalPages}
          onPageChange={setCurrentPage}
          showIndex={true}
          rowClassName="border-2 border-solid border-[#E5E7EB]"
          className="mt-[24px]"
          headers={[
            { key: "id", label: "ID", hidden: true },
            { key: "barcode", label: "شماره باندل", sortable: true },
            { key: "customerName", label: "مشتری", sortable: true },
            { key: "OrderId", label: "شماره سفارش", sortable: false },
            { key: "orderRegistration", label: "ثبت سفارش", sortable: false },
            { key: "parcel", label: "مرسوله ها", sortable: false },
            { key: "status", label: "وضعیت", sortable: false },
            { key: "button", label: "", sortable: false },
          ]}
          data={transformedData}
          selectionMode="single"
        />
      </div>
    </div>
  );
}

export default BundleList;
