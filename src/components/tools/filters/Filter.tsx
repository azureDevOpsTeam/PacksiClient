import React, { useState, useEffect, useRef } from "react";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DropdownFilter from "./DropdownFilter";

interface OptionType {
  value: string | number | boolean;
  label: string;
}

type FilterType = "normal" | "dropDown" | "date";

interface FilterItem {
  multiSelect?: boolean;
  value?: number;
  label?: string;
  icon?: React.ReactNode;
  category?: string;
  type: FilterType;
  options?: OptionType[];
  url?: string | undefined;
}

interface FilterProps {
  filters: Record<string, FilterItem>;
  onChange?: (values: {
    dropdownSelections: Record<string, (string | number)[]>;
    selectedDateRange: any;
  }) => void;
}

const Filter: React.FC<FilterProps> = ({ filters, onChange }) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<any>(null);
  const [range, setRange] = useState<any>(null);
  const [dropdownSelections, setDropdownSelections] = useState<
    Record<string, (string | number)[]>
  >({});
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleNormalClick = (key: string, filter: FilterItem) => {
    if (key === "all") {
      setDropdownSelections({});
      setSelectedDateRange(null);
      setRange(null);
      setSelectedFilter(null);
      setOpenDropdownId(null);
      onChange?.({ dropdownSelections: {}, selectedDateRange: null });
    } else if (selectedFilter === key) {
      setSelectedFilter(null);
    } else {
      setSelectedFilter(key);
      setOpenDropdownId(null);
    }
  };

  const handleDropdownSelect =
    (filter: FilterItem) => (option: OptionType | OptionType[]) => {
      const getValue = (o: any) =>
        o && typeof o === "object" && "value" in o ? o.value : o;

      const newSelections = {
        ...dropdownSelections,
        [filter.category ?? ""]: Array.isArray(option)
          ? option.map(getValue)
          : [getValue(option)],
      };

      setDropdownSelections(newSelections);
      setOpenDropdownId(null);
      setSelectedFilter(null);

      onChange?.({
        dropdownSelections: newSelections,
        selectedDateRange,
      });
    };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpenDropdownId(null);
        setSelectedFilter(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="p-4 relative">
      <div className="flex flex-wrap gap-2">
        {Object.entries(filters).map(([key, filter]) => {
          if (filter.type === "dropDown") {
            return (
              <DropdownFilter
                key={key}
                id={key}
                label={filter.label ?? ""}
                options={filter.options}
                url={filter.url}
                category={filter.category}
                onSelect={handleDropdownSelect(filter)}
                open={openDropdownId === key}
                setOpenDropdownId={setOpenDropdownId}
                multiSelect={filter.multiSelect ?? true}
                selectedValues={dropdownSelections[filter.category ?? ""] ?? []}
                showSelectAll={filter.options && filter.options.length > 20}
                showSearch={filter.options && filter.options.length > 20}
                isActive={dropdownSelections[filter.category ?? ""]?.length > 0}
              />
            );
          } else if (filter.type === "date") {
            const isActiveDate =
              Array.isArray(selectedDateRange) &&
              selectedDateRange.length === 2 &&
              selectedDateRange[0] &&
              selectedDateRange[1];

            return (
              <div key={key} className="relative">
                <button
                  onClick={() => {
                    if (selectedFilter === key || isActiveDate) {
                      setSelectedDateRange(null);
                      setRange(null);
                      setSelectedFilter(null);
                      onChange?.({
                        dropdownSelections,
                        selectedDateRange: null,
                      });
                    } else {
                      setSelectedFilter(key);
                    }
                  }}
                  className={`px-3 py-[6px] bg-[#E5E7EB] rounded-[28px] text-black ${
                    selectedFilter === key || isActiveDate
                      ? "bg-[#FF7959] text-white"
                      : ""
                  }`}
                >
                  {filter.label}
                </button>

                {selectedFilter === key && (
                  <Calendar
                    calendar={persian}
                    locale={persian_fa}
                    value={range}
                    onChange={(value) => {
                      setRange(value);

                      if (
                        Array.isArray(value) &&
                        value.length === 2 &&
                        value[0] &&
                        value[1]
                      ) {
                        const dateFrom = value[0].toDate().toISOString();
                        const dateTo = value[1].toDate().toISOString();

                        const dateRangeObject = {
                          dateFrom,
                          dateTo,
                        };

                        setSelectedDateRange(dateRangeObject);

                        onChange?.({
                          dropdownSelections,
                          selectedDateRange: dateRangeObject,
                        });

                        setTimeout(() => {
                          setSelectedFilter(null);
                        }, 1000);
                      } else {
                        setSelectedDateRange(null);
                        onChange?.({
                          dropdownSelections,
                          selectedDateRange: null,
                        });
                      }
                    }}
                    range
                    numberOfMonths={1}
                    className="absolute z-50"
                  />
                )}
              </div>
            );
          } else {
            const isAllActive =
              key === "all" &&
              Object.values(dropdownSelections).every(
                (arr) => arr.length === 0
              ) &&
              !selectedDateRange;

            const isActive = selectedFilter === key || isAllActive;

            return (
              <button
                key={key}
                className={`px-3 py-[6px] bg-[#E5E7EB] rounded-[28px] text-black ${
                  isActive ? "bg-[#FF7959] text-white" : ""
                }`}
                onClick={() => handleNormalClick(key, filter)}
              >
                {filter.label}
              </button>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Filter;
