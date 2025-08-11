import React, { useState, useEffect, useMemo } from "react";
import TableCell from "../../../../../components/tools/table/TableCell";
import DetailButton from "../../../../../components/tools/button/DetailButton";
import Badge from "../../../../../components/tools/tags/Badge";
import { useNavigate } from "react-router-dom";
import NumberCounter from "../../../../../components/tools/counter/NumberCounter";
import { GetBundles } from "../../../../../setting/ApiUrl";
import { HttpMethod } from "../../../../../models/enums/HttpMethod";
import { useReactQuery } from "../../../../../components/hooks/query/useReactQuery";
import DynamicTable from "../../../../../components/tools/table/DynamicTable";
import Tag from "../../../../../components/tools/tags/Tag";
import { GetBundleParcels } from "../../../../../setting/ApiUrl";
import useStore from "../../../../../store/zustand/store";
import { useToggle } from "../../../../../components/hooks/toggle/useToggle";

function BundleParcelsList({
  id,
  externalRefetch,
  onSelectParcel,
}: {
  id: any;
  externalRefetch?: any;
  onSelectParcel?: (id: string | null) => void;
}) {
  const toggle = useToggle();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  const apiDetails = useMemo(
    () => ({
      url: GetBundleParcels,
      method: HttpMethod.POST,
      body: {
        pageNumber: currentPage,
        pageSize: 5,
        id: id,
      },
    }),
    [currentPage, id]
  );

  const { data, isLoading, refetch } = useReactQuery(apiDetails);

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  useEffect(() => {
    if (externalRefetch) refetch();
  }, [externalRefetch, refetch]);

  const handleButtonClick = (id: string) => {
    navigate(`/parcelDetail/${id}`);
    toggle();
  };


  const transformedData = useMemo(() => {
    if (!data?.data?.items[0]?.parcels) return [];
    return data.data.items[0]?.parcels.map((item: any) => ({
      id: item.id,
      customerName: <TableCell>{`${item.customerName}`}</TableCell>,
      barcode: <TableCell>{`${item.barcode}`}</TableCell>,
      driver: item.fleetName,
      vehicle: (
        <Tag
          categoryName="fleetType"
          id={item.fleetTypeId}
          className="custom-class"
        />
      ),
      createdDate: <TableCell>{`${item.createdDate}`}</TableCell>,
      lastNodeName: <TableCell>{`${item.lastNodeName}`}</TableCell>,
      deliverTimeWindow: <TableCell>{`${item.deliverTimeWindow}`}</TableCell>,
      status: (
        <Tag
          categoryName="parcelStatus"
          id={item.parcelStatusId}
          className="custom-class"
        />
      ),
      button: (
        <DetailButton
          onFirstClick={() => handleButtonClick(item.id)}
          firstText="مشاهده مرسوله"
        />
      ),
    }));
  }, [data]);

const handleRowClick = (value: any) => {
  const selected = value.length > 0 ? value[0].id : null;
  setSelectedId(selected);
  if (onSelectParcel) {
    onSelectParcel(selected);
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
            { key: "driver", label: "راننده", sortable: true },
            { key: "vehicle", label: "وسیله نقلیه", sortable: false },
            { key: "barcode", label: "شماره مرسوله", sortable: false },
            {
              key: "deliverTimeWindow",
              label: "تاریخ و بازه تحویل",
              sortable: false,
            },
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

export default BundleParcelsList;
