import { Form, Formik } from "formik";
import TextField from "../../../../components/tools/textField/TextField";
import ToggleSwitch from "../../../../components/tools/toggle-switch/ToggleSwitch";
import { ReactComponent as TraficJamIcon } from "../../../../components/icons/svg/traffic-jam.svg";
import { ReactComponent as Address } from "../../../../components/icons/svg/elements.svg";
import { ReactComponent as MicrohubIcon } from "../../../../components/icons/svg/microhubIcone.svg";
import { ReactComponent as ZoneIcon } from "../../../../components/icons/svg/zoneIcon.svg";
import { ReactComponent as NodeIcon } from "../../../../components/icons/svg/nodeIcon.svg";
import TextArea from "../../../../components/tools/textArea/TextArea";
import { AuthApiHeader } from "../../../../services/api/ApiHeader";
import AutoComplete from "../../../../components/tools/autoComplete/AutoComplete";
import { IDropDown } from "../../../../models/viewModels/common/IDropDown";
import FlexContainer from "../../../../components/tools/grid/FlexContainer";
import Button from "../../../../components/tools/button/Button";
import Loading from "../../../../components/tools/loading/Loading";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import { useReactQuery ,useReactMutation } from "../../../../components/hooks/query/useReactQuery";
import { CreateToast } from "../../../../components/tools/toast/CreateToast";
import { ToastType } from "../../../../models/enums/ToastType";
import { NodeDropDown ,ZoneCreate} from "../../../../setting/ApiUrl";
import React, { useState,useEffect } from "react";
import { NewFormValidationSchema } from "../../../../components/validationSchema/zoneValidation/ZoneValidation";


const NewForm = () => {
 const saveApiDetails = { url: ZoneCreate, method: HttpMethod.POST };
  const {
    mutate: Mutate,
    isLoading: isLoading,
    data: savedata,
  } = useReactMutation(saveApiDetails);

  useEffect(() => {
    if (savedata?.data?.isSuccess === true) {
      CreateToast(ToastType.SUCCESS, "دیتا با موفقیت ثبت شد");
    } else{
      CreateToast(ToastType.ERROR, savedata?.data?.message);
    }
  }, [savedata?.status]);

      const apiDetails = {
        url: NodeDropDown,
        method: HttpMethod.GET,
        headers: AuthApiHeader,
      };
    
      const {
        data: NodeData,
        isLoading: NodeLoading,
        isError,
        error,
        refetch,
      } = useReactQuery(apiDetails);

const submitHandler = (values: any, { resetForm }: any) => {
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
    isActive: values.isActive,
    name: values.name,
    nodeId: nodeIds,
    polygons: polygons,
  };
  Mutate(finalData);
  resetForm();
};

    return (
      <div>
        <h2 className="text-xl text-gray-900 pb-16 font-bold">زون جدید</h2>
        <Formik
          initialValues={{
            name: "", // مقدار باید رشته خالی باشد نه null
            isActive: true,
            nodes: [], // مقدار باید آرایه خالی باشد نه undefined
          }}
          validationSchema={NewFormValidationSchema}
          onSubmit={submitHandler}
        >
          <Form className="w-full">
            <div className={"w-full flex items-center justify-between gap-2"}>
              <div className="min-w-[200px] flex-1 ">
                <TextField
                  name="name"
                  placeholder=""
                  label="نام زون"
                  icon={<NodeIcon className={"w-4 h-4 opacity-75"} />}
                />
              </div>

              <ToggleSwitch name="isActive" label="وضعیت فعالیت" />
            </div>
            <div className={"w-full flex items-center justify-between gap-2"}>
              <div className="min-w-[200px] flex-1 ">
                <AutoComplete
                  name="nodes"
                  options={NodeData?.data}
                  label="نودها"
                  isMulty={true}
                  icon={<MicrohubIcon className={"w-4 h-4 opacity-75"} />}
                />
              </div>
            </div>
            <FlexContainer className="justify-end mt-12 pb-12">
              <Button className="mt-2 width-auto" type="submit">
                {isLoading ? <Loading size="sm" /> : "تایید و ایجاد نود"}{" "}
              </Button>
            </FlexContainer>
          </Form>
        </Formik>
      </div>
    );
};
export default NewForm;