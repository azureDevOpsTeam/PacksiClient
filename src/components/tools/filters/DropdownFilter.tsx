import React, { useState, useEffect } from "react";

interface OptionType {
  value: string | number | boolean;
  label: string;
}

interface DropdownFilterProps {
  id: string;
  isActive?: boolean;
  label: string;
  options?: OptionType[];
  category?: string;
  onSelect: (option: OptionType | OptionType[]) => void;
  open: boolean;
  setOpenDropdownId: (id: string | null) => void;
  multiSelect?: boolean;
  selectedValues?: (string | number | boolean)[];
  showSelectAll?: boolean;
  showSearch?: boolean; // ✅ جدید
  url?: string;
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({
  id,
  isActive = false,
  label,
  options = [],
  onSelect,
  open,
  setOpenDropdownId,
  multiSelect = false,
  selectedValues = [],
  showSelectAll = false,
  showSearch = false, // ✅ مقدار پیش‌فرض
}) => {
  const [localSelected, setLocalSelected] =
    useState<(string | number | boolean)[]>(selectedValues);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ جستجو

  useEffect(() => {
    setLocalSelected(selectedValues);
  }, [selectedValues]);

  const toggleOption = (value: string | number | boolean) => {
    if (multiSelect) {
      if (localSelected.includes(value)) {
        setLocalSelected(localSelected.filter((v) => v !== value));
      } else {
        setLocalSelected([...localSelected, value]);
      }
    } else {
      setLocalSelected([value]);
      const option = options.find((o) => o.value === value);
      if (option) onSelect(option);
      setOpenDropdownId(null);
    }
  };

  const selectAll = () => {
    const allValues = options.map((o) => o.value);
    setLocalSelected(allValues);
  };

  const deselectAll = () => {
    setLocalSelected([]);
  };

  const applySelection = () => {
    const selectedOptions = options.filter((o) =>
      localSelected.includes(o.value)
    );
    onSelect(selectedOptions);
    setOpenDropdownId(null);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => {
          if (open && isActive) {
            deselectAll();
            onSelect([]);
            setOpenDropdownId(null);
          } else {
            setOpenDropdownId(id);
          }
        }}
        className={`px-3 py-[6px] rounded-[28px] text-black transition-all duration-150 ${
          isActive ? "bg-[#FF7959] text-white" : "bg-[#E5E7EB]"
        }`}
      >
        {label}
      </button>

      {open && (
        <div className="absolute mt-1 bg-white border rounded-[14px] max-h-60 w-48 z-50 overflow-y-auto">
          {(showSearch || (showSelectAll && multiSelect)) && (
            <div className="sticky top-0 bg-white z-10 p-2 border-b">
              {showSearch && (
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="جستجو..."
                  className="w-full px-2 py-1 border rounded text-sm mb-1"
                />
              )}
              {showSelectAll && multiSelect && (
                <div className="flex justify-between text-xs">
                  <button
                    onClick={selectAll}
                    className="text-blue-600 hover:underline"
                  >
                    انتخاب همه
                  </button>
                  <button
                    onClick={deselectAll}
                    className="text-red-600 hover:underline"
                  >
                    لغو همه
                  </button>
                </div>
              )}
            </div>
          )}

          {options
            .filter((option) =>
              option.label
                .toString()
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map((option) => {
              const isSelected = localSelected.includes(option.value);

              return (
                <div
                  key={String(option.value)}
                  onClick={() => toggleOption(option.value)}
                  className={`flex items-center p-2 justify-between cursor-pointer select-none  hover:bg-gray-100 ${
                    isSelected ? "text-customGreen font-black" : ""
                  }`}
                >
                  <span className="font-semibold text-right px-2 text-sm">
                    {option.label}
                  </span>
                  {isSelected && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2 text-[#0E9F6E] flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 5.707 10.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              );
            })}

          {multiSelect && (
            <div className="p-2 border-t text-right">
              <button
                onClick={applySelection}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                تایید
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownFilter;
