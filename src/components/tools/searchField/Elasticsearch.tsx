import React, { useState, useRef, useEffect } from "react";
import { ReactComponent as SearchIcon } from "../../../components/icons/svg/searchIcon.svg";
import { ReactComponent as SearchResult } from "../../../components/icons/svg/searchResultIcon.svg";
import {ReactComponent as EmptySearchIcon} from "../../../components/icons/svg/emptySearchIcon.svg";
import Loading from "../loading/Loading";
import { useNavigate } from "react-router-dom";
import { useToggle } from "../../../components/hooks/toggle/useToggle";
import { useReactMutation } from "../../hooks/query/useReactQuery";
import { Search } from "../../../setting/ApiUrl";
import { HttpMethod } from "../../../models/enums/HttpMethod";

type SearchProps = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClick?: () => void;
};

type SearchHistoryItem = {
  barcode: string;
  description: string;
  searchedAt: string;
};

function Elasticsearch({ value = "", onChange, onSearchClick }: SearchProps) {
    const toggle = useToggle();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const scanApiDetail = {
    url: Search,
    method: HttpMethod.POST,
  };

  const { mutate: searchMutate, data: searchdata  ,isLoading} =
    useReactMutation(scanApiDetail);

useEffect(() => {
  const trimmed = searchValue.trim();

  if (trimmed.length < 3) return;

  const timeout = setTimeout(() => {
    searchMutate({ barcode: trimmed });
  }, 300); // 300ms delay

  return () => clearTimeout(timeout); // cleanup on retype
}, [searchValue]);

  const getRelativeTime = (isoTime: string) => {
    const now = new Date();
    const past = new Date(isoTime);
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    if (diffMins < 1) return "لحظاتی پیش";
    if (diffMins < 60) return `${diffMins} دقیقه پیش`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours} ساعت پیش`;
  };


  const removeFromHistory = (barcodeToRemove: string) => {
    const history: SearchHistoryItem[] = JSON.parse(
      localStorage.getItem("search-history") || "[]"
    );

    const updated = history.filter((item) => item.barcode !== barcodeToRemove);
    localStorage.setItem("search-history", JSON.stringify(updated));

    // اگر در حالت تاریخچه هستی، dropdown را به‌روزرسانی کن
    if (searchValue.trim() === "") {
      setIsDropdownOpen(false);
      setTimeout(() => setIsDropdownOpen(true), 0); // فورس ری‌رن شدن
    }
  };


  const saveToHistory = (item: { barcode: string; description: string }) => {
    if (!item.barcode) return;
    const history: SearchHistoryItem[] = JSON.parse(
      localStorage.getItem("search-history") || "[]"
    );

    const updated: SearchHistoryItem[] = [
      { ...item, searchedAt: new Date().toISOString() },
      ...history.filter((i) => i.barcode !== item.barcode),
    ].slice(0, 10);

    localStorage.setItem("search-history", JSON.stringify(updated));
  };

  const showHistory = searchValue.trim() === "";

  const history: SearchHistoryItem[] = JSON.parse(
    localStorage.getItem("search-history") || "[]"
  );

  const listToShow = showHistory
    ? history
    : (searchdata?.data || []).filter((item: any) => item.barcode);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-[500px]" ref={containerRef}>
      <div className="flex justify-center items-center transition-all bg-white w-full h-[56px] rounded-[12px] border border-gray-300">
        <button
          type="button"
          onClick={onSearchClick}
          className="w-[50px] transition-all flex items-center justify-center"
        >
          <SearchIcon />
        </button>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange?.(e);
            setSearchValue(e.target.value);
            setIsDropdownOpen(true);
          }}
          onFocus={() => setIsDropdownOpen(true)}
          placeholder="جستجو"
          className="w-full text-sm pr-0 bg-transparent focus:outline-none"
        />
      </div>

      {isDropdownOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-[200px] overflow-y-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-6">
              <Loading />
            </div>
          ) : listToShow.length > 0 ? (
            listToShow.map((item: any, index: any) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex justify-between items-start gap-2"
              >
                <div
                  onClick={() => {
                    const barcode = item.barcode || item.description;
                    onChange?.({
                      target: { value: barcode },
                    } as React.ChangeEvent<HTMLInputElement>);
                    setIsDropdownOpen(false);
                    saveToHistory(item);

                    switch (item.resultType) {
                      case 1: {
                        const id = Number(item.parcelId);
                        if (!isNaN(id)) {
                          navigate(`/parcelDetail/${id}`);
                          toggle();
                        }
                        break;
                      }
                      case 2: {
                        const id = Number(item.bundleId);
                        if (!isNaN(id)) {
                          navigate(`/bundleDetail/${id}`, {
                            state: { showButton: false },
                          });
                        }
                        break;
                      }
                      case 3: {
                        const id = Number(item.orderId);
                        if (!isNaN(id)) navigate(`/orders/${id}`);
                        break;
                      }
                      default:
                        break;
                    }
                  }}
                  className="flex-1"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <SearchResult />
                      <span>{item.barcode}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 pr-6">
                      {item.description && <span>{item.description}</span>}
                      {item.searchedAt && (
                        <span>{getRelativeTime(item.searchedAt)}</span>
                      )}
                    </div>
                  </div>
                </div>

                {showHistory && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromHistory(item.barcode);
                    }}
                    className="text-gray-400 hover:text-red-500 text-lg px-2 mt-[38px]"
                    title="حذف از تاریخچه"
                  >
                    ×
                  </button>
                )}
              </div>
            ))
          ) : showHistory ? (
            <div className="flex flex-col items-center justify-center py-6 text-gray-400">
              <EmptySearchIcon />
              <span className="text-sm mt-2">تاریخچه‌ای وجود ندارد</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-gray-400">
              <EmptySearchIcon />
              <span className="text-sm mt-2">موردی یافت نشد</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Elasticsearch;
