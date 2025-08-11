import { useTheme } from "../../../../components/hooks/theme/ThemeContext";
import { useMemo } from "react";
import DynamicTable from "../../../../components/tools/table/DynamicTable";
import Tag from "../../../../components/tools/tags/Tag";
import Badge from "../../../../components/tools/tags/Badge";
import TableCell from "../../../../components/tools/table/TableCell";
import NumberCounter from "../../../../components/tools/counter/NumberCounter";
import { useNavigate } from "react-router-dom";
import DetailButton from "../../../../components/tools/button/DetailButton";
import {
  Messages,
  ShippingDetails,
  TodayReport,
  TotalCapacity,
  GetBundles
} from "../../../../setting/ApiUrl";
import { useFetch } from "../../../../components/hooks/fetch/useFetch";
import { useReactQuery } from "../../../../components/hooks/query/useReactQuery";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import { AuthApiHeader } from "../../../../services/api/ApiHeader";
import SkeletonDiv from "../../../../components/tools/loading/SkeletonDiv";

const mockUserList = [
  {
    id: 1,
    firstName: "محمد",
    lastName: "رضایی",
    roleName: "ادمین",
    phoneNumber: "09123456789",
    createDate: "1402/11/25",
    isActive: true,
  },
  {
    id: 2,
    firstName: "زهرا",
    lastName: "کریمی",
    roleName: "کاربر",
    phoneNumber: "09121234567",
    createDate: "1402/10/15",
    isActive: false,
  },
  {
    id: 3,
    firstName: "علی",
    lastName: "محمدی",
    roleName: "سوپروایزر",
    phoneNumber: "09351234567",
    createDate: "1402/09/30",
    isActive: true,
  },
  {
    id: 4,
    firstName: "سارا",
    lastName: "احمدی",
    roleName: "ادمین",
    phoneNumber: "09129876543",
    createDate: "1402/08/12",
    isActive: false,
  },
];
function SectionZero({
  truckValue,
  TruckLoadSvg,
  ExtraRedIcon,
  MapRedIcon,
  PluseWhiteIcon,
  UserAvatarIcon,
  DownloadWhiteIcon,
  LeftArowIcon,
  BarIcon,
}: any) {
    const navigate = useNavigate();
  const shippingDetails = useFetch(
    {
      key: "shippingDetails",
      url: ShippingDetails,
      method: HttpMethod.GET,
      headers: AuthApiHeader,
    },
    null
  );

    const apiDetails = useMemo(
      () => ({
        url: GetBundles,
        method: HttpMethod.POST,
        body: {
          pageNumber: 1,
          pageSize: 5,
        },
      }),
      []
    );

    const { data, isLoading, isError, error, refetch } =
      useReactQuery(apiDetails);
      console.log("data", data?.data?.items);
  const transformedData =
    data?.data?.items.length > 0
      ? data?.data?.items.map((item: any) => ({
          id: item.id,
          barcode: <TableCell>{item.barcode}</TableCell>,
          orderId: <TableCell>{item.orderId}</TableCell>,
          customerName: <TableCell>{item.customerName}</TableCell>,
          serviceType: (
            <Tag categoryName="orderType" id={1} className="custom-class" />
          ),
          parcel: (
            <NumberCounter
              value1={item.totalParcelCount}
              value2={item.scannedCount}
            />
          ),

          timeWindow: <TableCell>{"12 تا 15"}</TableCell>,
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
        }))
      : [];
  const { colors } = useTheme();

  return (
    <div
      className={
        "w-full flex flex-col justify-center items-center lg:items-stretch"
      }
    >
      <div
        className={
          "md:flex md:flex-nowrap flex-wrap items-center justify-center"
        }
      >
        <SkeletonDiv
          loading={shippingDetails.isLoading}
          className={
            "items-center md:w-full w-[315px] shadow min-w-[315px] justify-between md:mr-[25px] flex p-6  rounded-[28px] flex-col mt-[25px]"
          }
          style={{ backgroundColor: colors.paper }}
        >
          <div className="flex items-center w-full justify-between">
            <div
              className=" text-sm font-bold"
              style={{ color: colors.text.primary }}
            >
              باندل های اخیر
            </div>
            <div
              className="text-right text-xs font-bold cursor-pointer underline"
              style={{ color: colors.text.secondary }}
              onClick={() => navigate(`/cartable/bundle`)}
            >
              مشاهده همه
            </div>
          </div>
          <DynamicTable
            rowKey="id"
            pagination={false}
            rowClassName={"border-2 border-solid border-[#E5E7EB]"}
            className={"mt-[24px]"}
            headers={[
              { key: "id", label: "ID", hidden: true },
              { key: "orderId", label: "کد باندل", sortable: true },
              { key: "orderId", label: "شماره سفارش", sortable: false },
              { key: "customerName", label: "مشتری", sortable: true },
              {
                key: "serviceType",
                label: "نوی سرویس",
                sortable: true,
              },
              { key: "parcel", label: "مرسوله ها", sortable: false },
              { key: "timeWindow", label: "پنجره زمانی", sortable: false },
              { key: "status", label: "وضعیت", sortable: false },
              { key: "button", label: "", sortable: false },
            ]}
            data={transformedData}
            selectionMode={"single"}
            // onRowSelect={handleRowClick}
          />
        </SkeletonDiv>
      </div>
    </div>
  );
}

export default SectionZero;
