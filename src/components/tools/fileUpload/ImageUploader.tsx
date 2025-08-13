import React, { useState } from "react";

interface ImageUploaderProps {
  name: string;
  label?: string;
  onChange?: (name: string, files: File[]) => void;
}

interface PreviewImage {
  file: File;
  preview: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ name, label = "آپلود فایل", onChange }) => {
  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      
      setPreviewImages((prev) => [...prev, ...newImages]);
      if (onChange) onChange(name, [...previewImages, ...newImages].map(img => img.file));
    }
  };

  const handleRemove = (index: number) => {
    setPreviewImages((prev) => {
      const newPreviews = prev.filter((_, idx) => idx !== index);
      if (onChange) onChange(name, newPreviews.map(img => img.file));
      return newPreviews;
    });
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 my-3">{label}</label>
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer bg-white hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M7 16V4a4 4 0 018 0v12m1 4H6a2 2 0 01-2-2V8a2 2 0 012-2h2l2-2h4l2 2h2a2 2 0 012 2v10a2 2 0 01-2 2z"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 text-center">
              <span className="font-semibold">فایلی را انتخاب کنید</span> یا آن را بکشید
            </p>
            <p className="text-xs text-gray-500">می‌توانید چند تصویر را همزمان انتخاب کنید</p>
          </div>
          <input type="file" name={name} className="hidden" multiple onChange={handleChange} accept="image/*" />
        </label>
      </div>

      {/* نمایش تصاویر انتخاب‌شده */}
      {previewImages.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {previewImages.map((image, idx) => (
            <div key={idx} className="relative group">
              <img
                src={image.preview}
                className="w-full h-24 object-cover rounded-lg border border-gray-200"
                alt={`preview-${idx}`}
              />
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
