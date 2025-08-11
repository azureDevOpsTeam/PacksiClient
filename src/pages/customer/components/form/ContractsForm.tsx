import React, { useState ,useEffect } from "react";
import { GetCustomer } from "../../../../setting/ApiUrl";
import { useReactQuery } from "../../../../components/hooks/query/useReactQuery";
import useStore from "../../../../store/zustand/store";
import {ReactComponent as AddIcon} from "../../../../components/icons/svg/addIcon.svg";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import ContractDetailsModal from "../../../../components/tools/modal/contractDetails";
import CreateContractModal from "../../../../components/tools/modal/createContract";


function ContractsForm() {
  const [isModalOpen,setIsModalOpen]=useState(false);
  const refetchFn = useStore((state) => state.refetch);
  const [isCreateContactModalOpen, setIsCreateContactModalOpen]=useState(false)
  const [selectedContractId, setSelectedContractId] = useState<number | null>(
    null
  );

  const SelectedItem = useStore((state) => state.SelectedItem);
  const apiDetails = {
    url: GetCustomer,
    method: HttpMethod.POST,
    body: SelectedItem ? { customerId: SelectedItem } : {},
  };

  const {
    data: GetCustomerData,
    refetch,
    isLoading,
    isError,
    error,
  } = useReactQuery(apiDetails);

const contracts = GetCustomerData?.data?.customerContracts || [];
const customerId = GetCustomerData?.data?.id || 0;
const setRefetch =useStore((state)=>(state.setRefetch))
  useEffect(() => {
    if (refetch) {
      setRefetch(refetch);
    }
  }, [refetch, setRefetch]);
const handleContractDetailsButtonClick = (id: number) => {
  setSelectedContractId(id);
  setIsModalOpen(true);
};
  return (
    <>
      <div className="flex flex-col gap-4 max-h-[320px] overflow-y-auto pr-2">
        {contracts.map((contract: any, index: number) => (
          <div
            key={index}
            className="border border-[#E5E7EB] rounded-[16px] p-3 flex flex-col gap-4 my-3"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <span className="font-semibold text-base">
                قرارداد شماره {contract.id || index + 1}
              </span>
              <div className="flex flex-row  justify-center items-center gap-[10px]">
                {contract.isActive ? (
                  <div
                    className={` h-6 px-3 py-1 rounded-lg justify-center items-center gap-1 inline-flex border border-[#84E1BC] bg-[#DEF7EC]`}
                  >
                    <div className="text-right  font-semibold text-xs whitespace-nowrap leading-none text-[#046C4E]">
                      فعال
                    </div>
                  </div>
                ) : (
                  <div
                    className={` h-6 px-3 py-1 rounded-lg justify-center items-center gap-1 inline-flex border border-[#F8B4B4] bg-[#FDE8E8]`}
                  >
                    <div className="text-right  font-semibold text-xs whitespace-nowrap leading-none text-[#C81E1E]">
                      غیرفعال
                    </div>
                  </div>
                )}

                <button
                  onClick={() => handleContractDetailsButtonClick(contract.id)}
                  className="border border-[#FF7959] text-[#FF7959] rounded-[8px] font-semibold px-3 py-1 text-sm"
                >
                  جزئیات قرارداد
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="border border-[#E5E7EB] w-full md:w-1/2 px-4 py-3 rounded-[12px] flex justify-between">
                <span className="text-[#6B7280] font-semibold text-sm">
                  آغاز همکاری:
                </span>
                <span className="text-black font-semibold text-sm">
                  {contract.cooperationStartDate || "-"}
                </span>
              </div>
              <div className="border border-[#E5E7EB] w-full md:w-1/2 px-4 py-3 rounded-[12px] flex justify-between">
                <span className="text-[#6B7280] font-semibold text-sm">
                  پایان همکاری:
                </span>
                <span className="text-black font-semibold text-sm">
                  {contract.cooperationEndDate || "-"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => setIsCreateContactModalOpen(true)}
        className=" w-full rounded-[12px] text-[#FF7959] flex flex-row justify-center items-center gap-2 hover:bg-[#FFF2ED] py-3 px-4 mt-4"
      >
        <AddIcon />
        <span className="font-semibold">قرارداد جدید</span>
      </button>
      {isModalOpen &&
        selectedContractId !== null &&
        (() => {
          const selectedContract = contracts.find(
            (c: any) => c.id === selectedContractId
          );
          if (!selectedContract) return null;

          return (
            <ContractDetailsModal
              contractNumber={selectedContract.id}
              isActive={selectedContract.isActive}
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                setSelectedContractId(null);
                if (refetchFn) refetchFn(); // ← اینجا refetch دوباره انجام می‌شود
              }}
              contractId={selectedContractId}
              data={selectedContract.customerContractDetails}
              registrationDate={selectedContract.registrationDate}
              cooperationStartDate={selectedContract.cooperationStartDate}
              cooperationEndDate={selectedContract.cooperationEndDate}
            />
          );
        })()}
      {isCreateContactModalOpen && (
        <CreateContractModal
          customerId={customerId}
          isOpen={isCreateContactModalOpen}
          onClose={() => setIsCreateContactModalOpen(false)}
        />
      )}
    </>
  );
}

export default ContractsForm;
