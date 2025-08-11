import React, {useState} from 'react';
import {Form, Formik} from "formik";
import TextField from "../../../../components/tools/textField/TextField";
import {ReactComponent as TraficJamIcon} from "../../../../components/icons/svg/traffic-jam.svg";
import {ReactComponent as DeleteIcon} from "../../../../components/icons/svg/deleteIcon.svg";
import {ReactComponent as CallIcon} from "../../../../components/icons/svg/callIcon.svg";
import {ReactComponent as UserIcon} from "../../../../components/icons/svg/user.svg";
import {ReactComponent as EditIcon} from "../../../../components/icons/svg/editIcon.svg";

function PersonnelForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const submitHandler = () => {
    };
    return (
      <div>
        <Formik initialValues={{}} onSubmit={(values) => console.log(values)}>
          <Form className="w-full gap-[16px] flex flex-col">
            <div
              className={
                " absolute left-[16px] flex items-center gap-2 top-[16px] h-8 "
              }
            >
              <DeleteIcon className={"cursor-pointer"} />
              <EditIcon className={"cursor-pointer"} />
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
                  placeholder="سارا علیزاده"
                  icon={<UserIcon className={"w-4 h-4 opacity-75"} />}
                />
              </div>
              <div className={"min-w-[200px] flex-1"}>
                <TextField
                  className={"border border-gray-300"}
                  name="phone"
                  placeholder="شماره تلفن"
                  icon={<CallIcon className={"w-4 h-4 opacity-65"} />}
                />
              </div>
            </div>
            <div
              className={
                "w-full flex-wrap flex items-center gap-4 justify-center border rounded-lg p-2 border-gray-300 "
              }
            >
              <div
                className={
                  "flex-1 flex items-center justify-between flex-wrap gap-2"
                }
              >
                <div
                  className={
                    "flex flex-col items-center justify-center gap-[8px]"
                  }
                >
                  <div
                    className={
                      "flex items-center justify-start self-start px-1 gap-[6px]"
                    }
                  >
                    <div
                      className={
                        "w-10 h-10 rounded-full flex items-center  text-white font-bold justify-center bg-[#FF7959]"
                      }
                    >
                      S
                    </div>
                    <div
                      className={
                        "flex flex-col items-center gap-[5px] justify-center"
                      }
                    >
                      <div className="text-right self-start text-[#111928] text-sm font-bold leading-[21px]">
                        سارا علیزاده
                      </div>
                      <div className="text-right self-start text-[#FF7959] text-sm font-bold leading-[14px]">
                        سوپروایزر
                      </div>
                    </div>
                  </div>
                  <div className={"self-start"}>
                    <div className={"min-w-[200px] "}>
                      <TextField
                        name="username"
                        placeholder="نام کاربری"
                        icon={<UserIcon className={"w-4 h-4 opacity-75"} />}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center self-start justify-between gap-[8px]">
                  <div
                    className={`min-w-[70px] h-6 px-3 py-1 rounded-lg border justify-center items-center gap-1  inline-flex`}
                    style={{
                      backgroundColor: "#DEF7EC",
                      borderColor: "#046c4e90",
                    }}
                  >
                    <div
                      className="text-right text-xs font-bold leading-none"
                      style={{ color: "#046c4e" }}
                    >
                      فعال
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*<FlexContainer className="justify-end">*/}
            {/*    <Button className="mt-2 width-auto" type="submit">*/}
            {/*        {isLoading ? <Loading size="sm" /> : "تایید و ایجاد ناوگان"}{" "}*/}
            {/*    </Button>*/}
            {/*</FlexContainer>*/}
          </Form>
        </Formik>
      </div>
    );
}

export default PersonnelForm;