import React, { useState } from "react";
import { Form, Formik } from "formik";
import TextField from "../../../../components/tools/textField/TextField";
import { ReactComponent as DeleteIcon } from "../../../../components/icons/svg/deleteIcon.svg";
import { ReactComponent as EditIcon } from "../../../../components/icons/svg/editIcon.svg";
import { ReactComponent as CallIcon } from "../../../../components/icons/svg/callIcon.svg";
import { ReactComponent as UserIcon } from "../../../../components/icons/svg/user.svg";
import useStore from "../../../../store/zustand/store";
import { ReactComponent as TickIcon } from "../../../../components/icons/svg/tickIcon.svg";


function PersonnelForm() {
    const [visible, setVisible] = useState(true);
    const { SelectedItem } = useStore();
    const docs = [
      {
        id: "1",
        info: "علی اشرفی",
        role: "مدیر زون",
        url: "",
        icon: <UserIcon className={"w-4 h-4 opacity-75"} />,
      },
      {
        id: "2",
        info: "+۹۸۹۱۱۵۶۴۷۵۴۲",
        url: "",
        icon: <CallIcon className={"w-4 h-4 opacity-75"} />,
      },
      {
        id: "3",
        info: "عرفان اختیاری",
        role: "سوپروایزر",
        url: "",
        icon: <UserIcon className={"w-4 h-4 opacity-75"} />,
      },
      {
        id: "4",
        info: "+۹۸۹۱۲۳۴۵۶۷۸۹",
        url: "",
        icon: <CallIcon className={"w-4 h-4 opacity-75"} />,
      },
    ];
  return (
    <div>
      {NodeList && (
        <div>
          <Formik initialValues={{}} onSubmit={(values) => console.log(values)}>
            <Form className="w-full gap-[16px] flex flex-col">
              <div
                className={
                  " absolute left-[16px] flex items-center gap-2 top-[16px] h-8 "
                }
              >
                <DeleteIcon className={"cursor-pointer"} />
                {visible ? (
                  <EditIcon
                    className="cursor-pointer"
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <button
                    className="bg-[#31C48D] flex items-center gap-1 text-white rounded-lg px-3 h-[30px]"
                    onClick={() => setVisible(true)}
                  >
                    <TickIcon className="cursor-pointer" />
                    <span className="hidden xl:block text-[12px] font-semibold leading-[16px] ">
                      ذخیره اطلاعات
                    </span>
                  </button>
                )}
              </div>
              <div
                className={
                  "w-full flex-wrap flex items-center gap-4 justify-center"
                }
              >
                {docs.map((doc) => (
                  <div className={"relative min-w-[200px] flex-1"}>
                    <TextField
                      className={"border border-gray-300"}
                      name="name"
                      placeholder={doc.info}
                      icon={doc.icon}
                      readonly={visible}
                    />
                    {doc.role && (
                      <div
                        className={`min-w-[70px] absolute top-3 left-3 h-6 px-3 py-1 rounded-lg border justify-center items-center gap-1 inline-flex`}
                        style={{
                          backgroundColor: "#FDF6B2",
                          borderColor: "#8e4b1090",
                        }}
                      >
                        <div
                          className="text-right text-xs font-bold leading-none"
                          style={{ color: "#8e4b10db" }}
                        >
                          {doc.role}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/*<FlexContainer className="justify-end">*/}
              {/*    <Button className="mt-2 width-auto" type="submit">*/}
              {/*        {isLoading ? <Loading size="sm" /> : "تایید و ایجاد ناوگان"}{" "}*/}
              {/*    </Button>*/}
              {/*</FlexContainer>*/}
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
}

export default PersonnelForm;
