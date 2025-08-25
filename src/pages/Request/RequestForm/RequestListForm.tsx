import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToggle } from "../../../components/hooks/toggle/useToggle";
import DetailButton from "../../../components/tools/button/DetailButton";
import DynamicTable from "../../../components/tools/table/DynamicTable";
import TableCell from "../../../components/tools/table/TableCell";
import FilterForm from "../RequestList/components/FilterForm";
import { UserRequests } from "../../../setting/ApiUrl";
import { GetUserToken } from "../../../services/api/ApiToken";

function RequestListForm() {
  const [filters, setFilters] = useState<any>(null);
  const [hasFilter, setHasFilter] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const toggle = useToggle();
  const navigate = useNavigate();

  const handleButtonClick = (id: string) => {
    navigate(`/RequestDetail/${id}`);
    toggle();
  };

  const handleFilterSubmit = (data: any) => {
    setFilters(data);
  };


const token = GetUserToken();
  // یا: const token = Cookies.get("access_token");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(UserRequests, {
          headers: {
             "Authorization": `Bearer ${token}`,
          },

        });

        console.log("API response:", response.data);

        setData(response.data?.objectResult || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters, token]);

  const transformedData =
    data.length > 0
      ? data.map((item: any) => ({
          original: item,
          id: item.requestId,
          // requestType: <TableCell>{item.requestType}</TableCell>,
          originCityName: <TableCell>{item.originCityName}</TableCell>,
          destinationCityName: <TableCell>{item.destinationCityName}</TableCell>,
          departureDate: <TableCell>{item.departureDate}</TableCell>,
          arrivalDate: <TableCell>{item.arrivalDate}</TableCell>,
          departurePersianDate: <TableCell>{item.departurePersianDate}</TableCell>,
          arrivalPersianDate: <TableCell>{item.arrivalPersianDate}</TableCell>,
          button: (
            <DetailButton
              onFirstClick={() => handleButtonClick(item.id)}
              firstText={"مشاهده جزئیات درخواست"}
            />
          ),
        }))
      : [];

  return (
    <>
      <div className="flex justify-end ">
        <button
          onClick={() => setHasFilter(!hasFilter)}
          className="py-3 px-4 border border-black font-semibold hover:bg-black hover:text-white rounded-[16px]"
        >
          انتخاب فیلتر
        </button>
      </div>

      {hasFilter && <FilterForm onSubmit={handleFilterSubmit} />}

      <DynamicTable
        rowKey="id"
        pagination={true}
        isLoading={loading}
        rowClassName={"border-2 border-solid border-[#E5E7EB]"}
        className={"mt-[24px]"}
        headers={[
          { key: "id", label: "شناسه", hidden: true },
          // { key: "requestType", label: "نوع درخواست" },
          { key: "originCityName", label: "شهر مبدا" },
          { key: "destinationCityName", label: "شهر مقصد" },
          { key: "departureDate", label: "تاریخ حرکت" },
          { key: "arrivalDate", label: "تاریخ رسیدن" },
          { key: "departurePersianDate", label: "تاریخ شمسی حرکت" },
          { key: "arrivalPersianDate", label: "تاریخ شمسی رسیدن" },
          { key: "button", label: "" },
        ]}
        data={transformedData}
        selectionMode={"single"}
      />
    </>
  );
}

export default RequestListForm;
