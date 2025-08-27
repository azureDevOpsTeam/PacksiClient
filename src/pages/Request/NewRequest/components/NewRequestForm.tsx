import { useState } from "react";
import { Formik } from "formik";
import MultiDatePicker from "../../../../components/tools/datepicker/MultiDatePicker";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import { useReactQuery } from "../../../../components/hooks/query/useReactQuery";
import TextArea from "../../../../components/tools/textArea/TextArea";
import ImageUploader from "../../../../components/tools/fileUpload/ImageUploader";
import {
  CreateRequest,
  TransportableItem,
  GetCountries,
  GetCities,
} from "../../../../setting/ApiUrl";
import TextField from "../../../../components/tools/textField/TextField";
import AutoComplete from "../../../../components/tools/autoComplete/AutoComplete";
import { ReactComponent as ChevronDownIcon } from "../../../../components/icons/svg/arrow-down.svg";
import { GetUserToken } from "../../../../services/api/ApiToken";

const RequestType = [
  { value: 1, label: "حمل کننده" },
  { value: 2, label: "ارسال کننده" },
];

const NewRequsetForm = () => {
  const [selectedDestinationCountry, setSelectedDestinationCountry] =
    useState<number>();
  const [selectedOriginCountry, setSelectedOriginCountry] = useState<number>();
  const [formFiles, setFormFiles] = useState<File[]>([]);
  const [isCargoInfoOpen, setIsCargoInfoOpen] = useState<boolean>(false);
  const [countryList, setCountryList] = useState<any[]>([]);
  const [cityList, setCityList] = useState<any[]>([]);
  const [selectedCountry, setDestinationCityList] = useState<any[]>([]);
  const [itemList, setItemList] = useState<any[]>([]);

  const token = GetUserToken();

  const customerWallet = {
    url: GetCities,
    method: HttpMethod.POST,
    body: {
      model: {
        id: selectedOriginCountry,
      },
    },
  };
  const destinationCityApiDetail = {
    url: GetCities,
    method: HttpMethod.POST,
    body: {
      model: {
        id: selectedDestinationCountry,
      },
    },
  };
  const { data: destinationCityData, isLoading: destinationCountryLoading } =
    useReactQuery(destinationCityApiDetail, {
      enabled: !!selectedDestinationCountry,
    });
  const {
    data: originCityData,
    isLoading: selectedOriginCountryLoading,
  } = useReactQuery(customerWallet, {
    enabled: !!selectedDestinationCountry,
  });
  
  const fetchCountries = async () => {
    const res = await fetch(GetCountries, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await res.json();
    
    setCountryList(
      result?.objectResult?.listItems.map((i: any) => ({
        value: i.value,
        label: i.label,
      }))
    );
  };


 const OriginCityList = originCityData?.data?.objectResult?.listItems?.map(
  (item: any) => ({
    value: item.value,
    label: item.label,
  })
);
const DestinationCityList =
  destinationCityData?.data?.objectResult?.listItems?.map((item: any) => ({
    value: item.value,
    label: item.label,
  }));
console.log('OriginCityList',OriginCityList)
  const fetchItems = async () => {
    const res = await fetch(TransportableItem, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await res.json();
    setItemList(
      result?.data?.objectResult?.listItems.map((i: any) => ({
        value: i.value,
        label: i.label,
      }))
    );
  };
  const handleSubmit = async (values: any) => {
    const formData = new FormData();

    formData.append("model.originCityId", String(values.originCityId || 0));
    formData.append(
      "model.destinationCityId",
      String(values.destinationCityId || 0)
    );
    formData.append("model.departureDate", values.departureDate || "");
    formData.append("model.arrivalDate", values.arrivalDate || "");
    formData.append("model.requestType", String(values.requestType || 0));
    formData.append("model.description", values.description || "");
    formData.append("model.maxWeightKg", String(values.maxWeightKg || 0));
    formData.append("model.maxLengthCm", String(values.maxLengthCm || 0));
    formData.append("model.maxWidthCm", String(values.maxWidthCm || 0));
    formData.append("model.maxHeightCm", String(values.maxHeightCm || 0));

    if (Array.isArray(values.itemTypeIds)) {
      values.itemTypeIds.forEach((id: any, index: number) => {
        formData.append(`model.itemTypeIds[${index}]`, String(id));
      });
    }

    if (formFiles.length > 0) {
      formFiles.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });
    }

    try {
      const res = await fetch(CreateRequest, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // 👈 فقط اینو بذار
        },
        body: formData, // 👈 بدون JSON.stringify
      });

      const result = await res.json();
      console.log("✅ موفق بود:", result);
    } catch (err) {
      console.error("❌ خطا:", err);
    }
  };

  useState(() => {
    fetchCountries();
    fetchItems();
  });
  
  return (
    <Formik
      initialValues={{
        originCityId: "",
        destinationCityId: "",
        departureDate: "",
        arrivalDate: "",
        requestType: "",
        suggestedPrice: "",
        description: "",
        maxWeightKg: "",
        maxLengthCm: "",
        maxWidthCm: "",
        maxHeightCm: "",
        itemTypeIds: [],
        mainOriginCityId: "",
        originDescription: "",
        mainDestinationCityId: "",
        destinationDescription: "",
      }}
      // validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
        errors,
        setFieldValue,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8 "
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[500px]">
            <div className="bg-gray-100 p-6 rounded-[16px] border border-gray-300 shadow-initial space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AutoComplete
                  inputClassName="rounded-lg border border-gray-300 text-right w-full"
                  className="w-full"
                  name="originCountryId"
                  options={countryList}
                  onChange={(values: any) => setSelectedOriginCountry(values)}
                  placeholder="کشور مبدا"
                  label="کشور مبدا"
                />
                <AutoComplete
                  inputClassName="rounded-lg border border-gray-300 text-right w-full"
                  className="w-full"
                  name="originCityId"
                  options={OriginCityList}
                  placeholder="شهر مبدا"
                  label="شهر مبدا"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AutoComplete
                  inputClassName="rounded-lg border border-gray-300 text-right w-full"
                  className="w-full"
                  name="destinationCountryId"
                  options={countryList}
                  onChange={(values: any) =>
                    setSelectedDestinationCountry(values)
                  }
                  placeholder="کشور مقصد"
                  label="کشور مقصد"
                />
                <AutoComplete
                  inputClassName="rounded-lg border border-gray-300 text-right w-full"
                  className="w-full"
                  name="destinationCityId"
                  options={DestinationCityList}
                  placeholder="شهر مقصد"
                  label="شهر مقصد"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MultiDatePicker
                  placeholder="زمان حرکت از مبدا"
                  label="حرکت از مبدا"
                  name="departureDate"
                  value={values.departureDate}
                  setFieldValue={setFieldValue}
                />
                <MultiDatePicker
                  placeholder="زمان رسیدن به مقصد"
                  label="رسیدن به مقصد"
                  name="arrivalDate"
                  value={values.arrivalDate}
                  setFieldValue={setFieldValue}
                />
              </div>

              <div className="w-full">
                <AutoComplete
                  inputClassName="rounded-lg border border-gray-300 text-right w-full"
                  className="w-full"
                  name="requestType"
                  options={RequestType}
                  placeholder="نوع درخواست"
                  label="نوع درخواست"
                />
              </div>

              <div className="w-full">
                <AutoComplete
                  inputClassName="rounded-lg border border-gray-300 text-right w-full"
                  className="w-full"
                  name="itemTypeIds"
                  options={itemList}
                  placeholder="دسته بندی بسته"
                  label="دسته بندی بسته را انتخاب کنید"
                />
              </div>

              <div className="w-full">
                <TextArea
                  innerClassName="bg-white rounded-[13px] border border-gray-300 w-full min-h-[120px]"
                  className="w-full"
                  placeholder="توضیحات"
                  name="description"
                  label="توضیحات"
                />
              </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-[16px] border border-gray-300 shadow-initial space-y-6">
              <div className="space-y-4">
                <ImageUploader
                  name="file1"
                  label="آپلود تصویر بلیط"
                  onChange={(name: string, files: File[]) => {
                    setFormFiles(files);
                  }}
                />
              </div>
              <div>
                <div
                  className="flex items-center justify-between cursor-pointer   p-3 border border-gray-200 bg-white rounded-lg mb-4"
                  onClick={() => setIsCargoInfoOpen(!isCargoInfoOpen)}
                >
                  <p className="text-lg font-medium">اطلاعات بار</p>
                  <div
                    className={`transform transition-transform duration-300 ${
                      isCargoInfoOpen ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDownIcon className="w-5 h-5" />
                  </div>
                </div>
                {isCargoInfoOpen && (
                  <div className="bg-white rounded-[16px] p-6 space-y-6 animate-slideDown">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <TextField
                        name="maxWeightKg"
                        innerClassName="rounded-lg border border-gray-300 text-right w-full"
                        className="w-full"
                        label="حداکثر وزن (kg)"
                        placeholder="حداکثر وزن را به کیلوگرم وارد کنید"
                      />
                      <TextField
                        name="maxLengthCm"
                        innerClassName="rounded-lg border border-gray-300 text-right w-full"
                        className="w-full"
                        label="حداکثر طول (cm)"
                        placeholder="حداکثر طول را وارد کنید"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <TextField
                        name="maxWidthCm"
                        innerClassName="rounded-lg border border-gray-300 text-right w-full"
                        className="w-full"
                        label="حداکثر عرض (cm)"
                        placeholder="حداکثر عرض را وارد کنید"
                      />
                      <TextField
                        name="maxHeightCm"
                        innerClassName="rounded-lg border border-gray-300 text-right w-full"
                        className="w-full"
                        label="حداکثر ارتفاع (cm)"
                        placeholder="حداکثر ارتفاع را وارد کنید"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8 ">
            <button
              type="submit"
              className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              ارسال فرم
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default NewRequsetForm;
