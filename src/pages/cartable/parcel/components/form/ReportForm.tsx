import React from "react";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import { useRef } from "react";
import {ReactComponent as ImageIcon} from "../../../../../components/icons/svg/imageIcon.svg"
import {ReactComponent as UploadIcon} from "../../../../../components/icons/svg/uploadIcon.svg"
import {ReactComponent as NoteIcon} from "../../../../../components/icons/svg/noteIcon.svg";
import TextArea from "../../../../../components/tools/textArea/TextArea";

function ReportForm(id:any) {
  const [files, setFiles] = useState<File[]>([]); // State to store all uploaded files
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles) {
      setFiles((prevFiles) => [...prevFiles, ...Array.from(uploadedFiles)]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles?.filter((_, i) => i !== index));
  };
   
  return (
    <div>
      <div className="absolute left-[16px] flex items-center gap-2 top-[16px] h-8">
        <button className="border-[1px] border-[#FF7959] flex items-center gap-1 rounded-[8px] px-3 py-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
          >
            <g id="elements">
              <path
                id="Vector"
                d="M5 1L5 9M9 5L1 5"
                stroke="#FF7959"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
          <span className="text-[#FF7959] font-bold">گزارش مشکل</span>
        </button>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-1">
          <span className="font-bold">تی نکست | کد باندل MH۶۵۸۹</span>
          <span className="text-[#FF7959]">۸۷۵۶۲۱۳۵-۲</span>
        </div>

        <div className="flex items-center gap-2">
          <div
            className="h-6 px-3 py-1 rounded-lg border justify-center items-center cursor-pointer"
            style={{ backgroundColor: "#E1EFFE", borderColor: "#A4CAFE" }}
          >
            <div
              className="text-right text-xs font-bold leading-none"
              style={{ color: "#1A56DB" }}
            >
              <span>ون</span>
            </div>
          </div>
          <div
            className="h-6 px-3 py-1 rounded-lg border justify-center items-center cursor-pointer"
            style={{ backgroundColor: "#E1EFFE", borderColor: "#A4CAFE" }}
          >
            <div
              className="text-right text-xs font-bold leading-none"
              style={{ color: "#1A56DB" }}
            >
              <span>ثبت سفارش</span>
            </div>
          </div>
        </div>
      </div>
      <Formik
        initialValues={{ report: "", file: null }}
        onSubmit={(values) => {
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="space-y-4">
            <div className="my-4">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                multiple
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={files.length >= 4}
                className={`w-full mt-2 px-4 py-2 border border-[2px] text-black rounded-lg flex items-center justify-center space-x-2 
    ${
      files.length >= 4 ? "opacity-50 cursor-not-allowed" : "hover:bg-[#F3F4F6]"
    }`}
              >
                <UploadIcon />
                <span className="p-[10px]">بارگذاری فایل</span>
              </button>

              {files.length > 0 && (
                <div className="mt-2 text-gray-700 flex flex-wrap gap-4">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="border border-gray-300 flex items-center gap-2 rounded-lg p-2 w-[49%] justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <ImageIcon />
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ❌
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ReportForm;
