import { useState } from "react";
import { Formik } from "formik";
import MultiDatePicker from "../../../../components/tools/datepicker/MultiDatePicker";
import TextArea from "../../../../components/tools/textArea/TextArea";
import ImageUploader from "../../../../components/tools/fileUpload/ImageUploader";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import { useReactMutation,useReactQuery } from "../../../../components/hooks/query/useReactQuery";
import { CreateRequest  ,TransportableItem ,GetCountries ,GetCities} from "../../../../setting/ApiUrl"
import TextField from "../../../../components/tools/textField/TextField";
import * as Yup from "yup";
import AutoComplete from "../../../../components/tools/autoComplete/AutoComplete";
import { ReactComponent as ChevronDownIcon } from "../../../../components/icons/svg/arrow-down.svg";
// import Button from "../ui/button/Button";
// import Label from "../form/Label";

const RequestType =[
   {
    value:1,
    label:'حمل کننده'
  },
   {
    value:2,
    label:'ارسال کننده'
  }
]
const NewRequsetForm = () => {
  const [selectedDestinationCountry, setSelectedDestinationCountry] = useState<Number>();
  const [originAvailable,setOriginAvailable]= useState<any[]>([]);
  const [destinationAvailable,setDestinationAvailable]=useState<any[]>([]);
  const [selectedOriginCountry, setSelectedOriginCountry] = useState<Number>();
  const [formFiles, setFormFiles] = useState<{ [key: string]: FileList }>({});
  const [isCargoInfoOpen, setIsCargoInfoOpen] = useState<boolean>(false);
  
  const apiDetails = {
    url:CreateRequest,
    method: HttpMethod.POST,
  };
  const {data:countryData } =useReactQuery({
    url:GetCountries,
    method: HttpMethod.GET,
  });

  const { data, isLoading, isError, error:itemError, refetch } = useReactQuery({
    url:TransportableItem,
    method: HttpMethod.GET,
    body: {},
  });


  const handleFileChange = (name: string, files: FileList) => {
    setFormFiles((prev) => ({ ...prev, [name]: files }));
  };
const { mutate, isSuccess, error } = useReactMutation(
    apiDetails,
    (res:any) => {
      console.log("✅ موفق بود:", res);
    },
    (err:any) => {
      console.log("❌ خطا:", err);
    }
  );
const handleSubmit = (values: any) => {

  const FinalData = {
    model: {
      originCityId: Number(values.originCityId) || 0,
      // destinationCityId: Number(values.destinationCityId) || 0,
      departureDate: values.departureDate,
      arrivalDate: values.arrivalDate,
      requestType: Number(values.requestType) || 0,
      // suggestedPrice: Number(values.suggestedPrice) || 0,
      description: values.description,
      maxWeightKg: Number(values.maxWeightKg) || 0,
      maxLengthCm: Number(values.maxLengthCm) || 0,
      maxWidthCm: Number(values.maxWidthCm) || 0,
      maxHeightCm: Number(values.maxHeightCm) || 0,
      itemTypeIds: [Number(values.requestType)],
      // availableOrigins: originAvailable,
      // availableDestinations: destinationAvailable
    }
  };
 console.log('FinalData',FinalData)
  // اضافه کردن فایل‌ها به FormData
  // if (Object.keys(formFiles).length > 0) {
  //   const formData = new FormData();
  //   Object.entries(formFiles).forEach(([key, files]) => {
  //     for (let i = 0; i < files.length; i++) {
  //       formData.append(key, files[i]);
  //     }
  //   });
  //   // در اینجا می‌توانید formData را به همراه FinalData ارسال کنید
  //   // یا در صورت نیاز به endpoint جداگانه برای آپلود فایل استفاده کنید
  // }

  mutate(FinalData);
};

const ItemList =data?.data?.objectResult?.listItems.map((item:any)=>(
  {
    value:item.value,
    label:item.label
  }));
const countryList =countryData?.data?.objectResult?.listItems.map((item:any)=>(
{
    value:item.value,
    label:item.label
}));
console.log('selectedOriginCountry',selectedOriginCountry)
const { data: cityData } = useReactQuery({
  url: GetCities,
  method: HttpMethod.POST,
  body: {
    model: {
      id: selectedOriginCountry,
    },
  },
  enabled: !!selectedOriginCountry,
});



const cityList =cityData?.data?.objectResult?.listItems?.map((item:any)=>(
  {value:item.value,
    label:item.label
  }
));
const handleAddToList = (values: any, setFieldValue: any) => {

  const newItem = {
    cityId:Number(values.mainDestinationCityId),
   destinationDescription: values.destinationDescription
  };

  setDestinationAvailable((prev) => [...prev, newItem]);

  // Clear specific fields
  setFieldValue("mainDestinationCityId", null);
  setFieldValue("destinationDescription", "");
};
  const handleRemove =(idToRemove:string)=>{
   setDestinationAvailable((prev) =>
     prev.filter((item) => item.cityId !== idToRemove)
   );
  }

const handleAddToOriginList =(values: any ,setFieldValue:any) =>{

  const newItem ={
    cityId :Number(values.mainOriginCityId),
    originDescription: values.originDescription
  }
  setOriginAvailable((prev) => [...prev, newItem]);
  setFieldValue("mainOriginCityId", null);
  setFieldValue("originDescription", "");
}

const validationSchema = Yup.object().shape({
  originCityId: Yup.number().required('شهر مبدا الزامی است'),
  destinationCityId: Yup.number().required('شهر مقصد الزامی است'),
  departureDate: Yup.string().required('تاریخ حرکت الزامی است'),
  arrivalDate: Yup.string().required('تاریخ رسیدن الزامی است'),
  requestType: Yup.number().required('نوع درخواست الزامی است'),
  suggestedPrice: Yup.number().required('مبلغ پیشنهادی الزامی است').min(0, 'مبلغ باید بزرگتر از صفر باشد'),
  description: Yup.string().required('توضیحات الزامی است'),
  maxWeightKg: Yup.number().required('وزن الزامی است').min(0, 'وزن باید بزرگتر از صفر باشد'),
  maxLengthCm: Yup.number().required('طول الزامی است').min(0, 'طول باید بزرگتر از صفر باشد'),
  maxWidthCm: Yup.number().required('عرض الزامی است').min(0, 'عرض باید بزرگتر از صفر باشد'),
  maxHeightCm: Yup.number().required('ارتفاع الزامی است').min(0, 'ارتفاع باید بزرگتر از صفر باشد'),
  itemTypeIds: Yup.array().min(1, 'حداقل یک نوع بسته باید انتخاب شود')
});
console.log('countryList',countryList)
return (
  <Formik
    initialValues={{
      originCityId: '',
      destinationCityId: '',
      departureDate: '',
      arrivalDate: '',
      requestType: '',
      suggestedPrice: '',
      description: '',
      maxWeightKg: '',
      maxLengthCm: '',
      maxWidthCm: '',
      maxHeightCm: '',
      itemTypeIds: [],
      mainOriginCityId: '',
      originDescription: '',
      mainDestinationCityId: '',
      destinationDescription: ''
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
          onChange={(values :any)=>setSelectedOriginCountry(values)}
          placeholder="کشور مبدا"
          label="کشور مبدا"
        />
        <AutoComplete
          inputClassName="rounded-lg border border-gray-300 text-right w-full"
          className="w-full"
          name="originCityId"
          options={cityList}
          placeholder="شهر مبدا"
          label="شهر مبدا"
        />
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AutoComplete
          inputClassName="rounded-lg border border-gray-300 text-right w-full"
          className="w-full"
          name="destinationCountryId"
          options={countryList}
          onChange={(values :any)=>setSelectedDestinationCountry(Number(values.value))}
          placeholder="کشور مقصد"
          label="کشور مقصد"
        />
        <AutoComplete
          inputClassName="rounded-lg border border-gray-300 text-right w-full"
          className="w-full"
          name="destinationCityId"
          options={destinationCityList}
          placeholder="شهر مقصد"
          label="شهر مقصد"
        />
      </div> */}

      {/* <div className="border rounded-[16px] p-4 space-y-4">
        <span className="block text-lg font-medium">اطلاعات مبدا شما</span>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr,1fr,auto] gap-4 items-start">
          <AutoComplete
            inputClassName="rounded-lg border border-gray-300 text-right w-full"
            className="w-full"
            name="mainOriginCityId"
            options={cityList}
            placeholder="پرواز از"
          />
          <TextField
             innerClassName="rounded-lg border border-gray-300 text-right w-full"
            className="w-full"
            placeholder="توضیحات"
            name="originDescription"
          />
          <button 
            type="button"
            onClick={()=>handleAddToOriginList(values,setFieldValue)}
            className="bg-white border rounded-[13px] w-10 h-10 flex items-center justify-center flex-shrink-0 hover:bg-gray-50">
            +
          </button>
        </div>
        <div className="space-y-2">
          {originAvailable.map((item: any, index: number) => (
            <div key={index} className="flex justify-between items-center p-3 border rounded-lg bg-white">
              <div className="flex justify-between items-center w-full gap-2">
                <span className="font-medium text-gray-600">
                  {cityList?.find((city:any) => city.value === item.cityId)?.label || item.cityId} :
                </span>
                <span className="font-medium">{item.originDescription}</span>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(item.cityId)}
                className="text-gray-400 hover:text-gray-700 font-bold px-2"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div> */}

      {/* Similar structure for destination info */}
      {/* <div className="border rounded-[16px] p-4 space-y-4">
        <span className="block text-lg font-medium">اطلاعات مقصد شما</span>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr,1fr,auto] gap-4 items-start">
          <AutoComplete
            inputClassName="rounded-lg border border-gray-300 text-right w-full"
            className="w-full"
            name="mainDestinationCityId"
            options={destinationCityList}
            placeholder="پرواز به"
          />
          <TextField
            innerClassName="rounded-lg border border-gray-300 text-right w-full"
            className="w-full"
            placeholder="توضیحات"
            name="destinationDescription"
          />
          <button
            type="button"
            onClick={() => handleAddToList(values, setFieldValue)}
            className="bg-white border rounded-[13px] w-10 h-10 flex items-center justify-center flex-shrink-0 hover:bg-gray-50"
          >
            +
          </button>
        </div>
        <div className="space-y-2">
          {destinationAvailable.map((item: any, index: number) => (
            <div key={index} className="flex justify-between items-center p-3 border rounded-lg bg-white">
              <div className="flex justify-between items-center w-full gap-2">
                <span className="font-medium text-gray-600">{item.cityId} :</span>
                <span className="font-medium">{item.destinationDescription}</span>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(item.cityId)}
                className="text-gray-400 hover:text-gray-700 font-bold px-2"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div> */}

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
        {/* <TextField
          name="suggestedPrice"
          innerClassName="rounded-lg border border-gray-300 text-right w-full"
          className="w-full"
          label="مبلغ پیشنهادی"
          placeholder="هزینه پیشنهادی خود را وارد کنید"
        /> */}
      </div>

      <div className="w-full">
        <AutoComplete
          inputClassName="rounded-lg border border-gray-300 text-right w-full"
          className="w-full"
          name="itemTypeIds"
          options={ItemList}
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
            // Convert File[] to FileList
            const dataTransfer = new DataTransfer();
            files.forEach(file => dataTransfer.items.add(file));
            handleFileChange(name, dataTransfer.files);
          }} 
        />
        {/* <ImageUploader name="file2" label="آپلود تصویر بار"  onChange={(name: string, files: File[]) => {
            // Convert File[] to FileList
            const dataTransfer = new DataTransfer();
            files.forEach(file => dataTransfer.items.add(file));
            handleFileChange(name, dataTransfer.files);
          }}  /> */}
      </div>

      <div>
        <div 
          className="flex items-center justify-between cursor-pointer   p-3 border border-gray-200 bg-white rounded-lg mb-4"
          onClick={() => setIsCargoInfoOpen(!isCargoInfoOpen)}
        >
          <p className="text-lg font-medium">اطلاعات بار</p>
          <div className={`transform transition-transform duration-300 ${isCargoInfoOpen ? 'rotate-180' : ''}`}>
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
