import React, { useState } from "react";
import axios from "axios";

function UploadImage() {
  const [fileInfo, setFileInfo] = useState<{ name: string; size: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file: File) => {
    setLoading(true);
    try {
      const formData = new FormData();

      // مدل داده‌ای که گفتی
      const model = {
         "originCityId": 13,
        "destinationCityId": 3,
        "departureDate": "2025-08-19T06:53:03.573Z",
        "arrivalDate": "2025-08-25T06:53:05.191Z",
        "requestType": 1,
        "description": "یبقلیبل",
        "maxWeightKg": 12,
        "maxLengthCm": 24,
        "maxWidthCm": 5,
        "maxHeightCm": 12,
        "itemTypeIds": [
            3
        ],
        files: [] // بعدا فایل رو اضافه می‌کنیم
      };

      formData.append("model", JSON.stringify(model));
      formData.append("files", file); // آپلود عکس

      const response = await axios.post(
        "https://web.draton.io/api/Request/Create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization"  :'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Iis5ODkxOTA2OTM1MzAiLCJuYW1laWQiOiIxIiwianRpIjoiZDU1NTczNWYtNDQ4YS00ZjJlLTk5MmEtM2UwYmJjOTkxMjFiIiwiaWF0IjoxNzU1Nzc4OTcyLCJyb2xlIjpbIkFkbWluaXN0cmF0b3IiLCJNYW5hZ2VyIiwiVXNlciJdLCJuYmYiOjE3NTU3Nzg5NzIsImV4cCI6MTc1NTc3OTg3MiwiaXNzIjoiUGFja3NpV2ViQXBwIiwiYXVkIjoiUGFja3NpV2ViQXBwLlVzZXJzIn0.cZUzJM71L0WYmZVI_AczUl_0lTEscNeWKC7jC43Q7pY'
          },
        }
      );

      console.log("موفق:", response.data);
      alert("فایل با موفقیت آپلود شد ✅");
    } catch (err) {
      console.error("خطا در آپلود:", err);
      alert("مشکلی در آپلود فایل پیش آمد ❌");
    } finally {
      setLoading(false);
      setFileInfo(null);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setFileInfo({
              name: file.name,
              size: (file.size / 1024).toFixed(2) + " KB",
            });
            handleUpload(file);
          }
        }}
      />

      {fileInfo && (
        <div>
          <p>{fileInfo.name} - {fileInfo.size}</p>
        </div>
      )}

      {loading && <p>در حال آپلود...</p>}
    </div>
  );
}

export default UploadImage;
