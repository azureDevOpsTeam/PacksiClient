import React, { useState, useEffect } from "react";
import {Form, Formik} from "formik";
import TextField from "../../../../components/tools/textField/TextField";
import ToggleSwitch from "../../../../components/tools/toggle-switch/ToggleSwitch";
import {ReactComponent as TraficJamIcon} from "../../../../components/icons/svg/traffic-jam.svg";
import {ReactComponent as DeleteIcon} from "../../../../components/icons/svg/deleteIcon.svg";
import {ReactComponent as EditIcon} from "../../../../components/icons/svg/editIcon.svg";
import {ReactComponent as NodeIcon} from "../../../../components/icons/svg/nodeIcon.svg";
import {ReactComponent as ZoneIcon} from "../../../../components/icons/svg/zoneIcon.svg";
import {ReactComponent as MicroHubIcon} from "../../../../components/icons/svg/microhubIcone.svg";
import useStore from "../../../../store/zustand/store";
import { CreateToast } from "../../../../components/tools/toast/CreateToast";
import { ToastType } from "../../../../models/enums/ToastType";
import { ReactComponent as TickIcon } from "../../../../components/icons/svg/tickIcon.svg";
import { AuthApiHeader } from "../../../../services/api/ApiHeader";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import { NodeDropDown, ZoneCreate } from "../../../../setting/ApiUrl";
import Loading from "../../../../components/tools/loading/Loading";
import AutoComplete from "../../../../components/tools/autoComplete/AutoComplete";
import { ReactComponent as MicrohubIcon } from "../../../../components/icons/svg/microhubIcone.svg";
import { GetZone, UpdateZone } from "../../../../setting/ApiUrl";
import {
  useReactQuery,
  useReactMutation,
} from "../../../../components/hooks/query/useReactQuery";

function InformationForm() {

  const [editable, setEditable] = useState(false);
  const { setToggledFalse } = useStore();
  const { SelectedItem } = useStore();
  const refetch = useStore((state) => state.refetch);
  const ZoneApiDetails = SelectedItem?.id
    ? {
        url: GetZone,
        method: HttpMethod.POST,
        body: { zoneId: SelectedItem.id },
      }
    : null;
    const {
      data: ZoneData,
      isLoading,
      //   isError,
      //   error,
    } = useReactQuery(ZoneApiDetails);
    const saveApiDetails = { url: UpdateZone, method: HttpMethod.PUT };
    const {
      mutate: editMutate,
      isLoading: editLoading,
      data: savedata,
    } = useReactMutation(saveApiDetails);

    const apiDetails = {
      url: NodeDropDown,
      method: HttpMethod.GET,
      headers: AuthApiHeader,
    };
    useEffect(() => {
      if (savedata?.status === 200) {
        CreateToast(ToastType.SUCCESS, "دیتا با موفقیت ویرایش شد");
        refetch?.();
        setEditable(false);
        setToggledFalse();
      } else if (savedata?.status !== 200 && savedata?.status !== undefined) {
        setEditable(false);
        CreateToast(ToastType.ERROR, "خطا در ویرایش رکورد");
      }
    }, [savedata?.status]);
    useEffect(() => {
      setEditable(false);
    }, [SelectedItem]);
     const submitHandler = (values: any) => {
        const nodeIds = values.nodes;

      const polygons = nodeIds
        ?.map((nodeId: any) => {
          const node = NodeData?.data.find((n: any) => n.id === nodeId);
          if (node) {
            return {
              latitude: node.latitude,
              longitude: node.longitude,
            };
          }
          return null;
        })?.filter((item: any) => item !== null);
      const finalData = {
        id:SelectedItem.id,
        isActive: values.isActive,
        name: values.name,
        nodeId: nodeIds,
        polygons: polygons,
      };
       editMutate(finalData);
     };

    const initialValues = {
      name: ZoneData?.data?.name,
      isActive: ZoneData?.data?.isActive,
      nodes: ZoneData?.data?.nodes?.map((item: any) => {
        return item.id
      }) ||0,
    };

    const {
      data: NodeData,
      isLoading: NodeLoading,
      isError,
      error,
    } = useReactQuery(apiDetails);
    return (
      <div>
        <Formik
          validateOnBlur={true}
          validateOnChange={true}
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={submitHandler}
        >
          {({ setFieldValue, values }) => (
            <Form className="w-full gap-[16px] flex flex-col">
              <div
                className={
                  " absolute left-[16px] flex items-center gap-2 top-[16px] h-8 "
                }
              >
                <DeleteIcon className="cursor-pointer" />
                {editable ? (
                  <button
                    type="submit"
                    className="bg-[#31C48D] flex items-center gap-1 text-white rounded-lg px-3 h-[30px]"
                  >
                    <TickIcon
                      className={`cursor-pointer ${
                        editLoading ? "hidden" : ""
                      }`}
                    />
                    <span className="text-[12px] font-semibold leading-[16px]">
                      {editLoading ? <Loading size="sm" /> : "ذخیره اطلاعات"}
                    </span>
                  </button>
                ) : (
                  <EditIcon
                    className="cursor-pointer"
                    onClick={() => setEditable(true)}
                  />
                )}
              </div>
              <div
                className={
                  "w-full flex-wrap flex items-center gap-4 justify-center"
                }
              >
                <div className={"min-w-[200px] flex-1"}>
                  <TextField
                    className={"border border-gray-300"}
                    name="name"
                    placeholder="نام زون"
                    icon={<NodeIcon className={"w-4 h-4 opacity-75"} />}
                    readonly={!editable}
                  />
                </div>
                <div className="min-w-[200px] flex-1">
                  <ToggleSwitch
                    className={"border border-gray-300 rounded-full"}
                    name="isActive"
                    readonly={!editable}
                  />
                </div>
              </div>
              <div
                className={
                  "w-full flex-wrap flex items-center gap-4 justify-center"
                }
              >
                <AutoComplete
                  name="nodes"
                  innerClassName={"border border-gray-300 rounded-[13px]"}
                  options={NodeData?.data || []}
                  value={values.nodes}
                  placeholder="نودها"
                  isMulty={true}
                  icon={<NodeIcon className={"w-4 h-4 opacity-75"} />}
                  readonly={!editable}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
}

export default InformationForm;