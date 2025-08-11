import React, {useState} from 'react';
import {Form, Formik} from "formik";
import TextField from "../../../../components/tools/textField/TextField";
import {ReactComponent as DeleteIcon} from "../../../../components/icons/svg/deleteIcon.svg";
import {ReactComponent as EditIcon} from "../../../../components/icons/svg/editIcon.svg";
import {ReactComponent as NodeIcon} from "../../../../components/icons/svg/nodeIcon.svg";
import {ReactComponent as Address} from "../../../../components/icons/svg/elements.svg";
import TextArea from "../../../../components/tools/textArea/TextArea";

function LocationForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const submitHandler = () => {
    };
    return (
        <div>
            <Formik
                initialValues={{}}
                onSubmit={(values) => console.log(values)}
            >
                <Form className="w-full gap-[16px] flex flex-col">
                    <div className={' absolute left-[16px] flex items-center gap-2 top-[16px] h-8 '}>
                        <DeleteIcon className={'cursor-pointer'}/>
                        <EditIcon className={'cursor-pointer'}/>

                    </div>
                    <div className={'w-full flex-wrap flex items-center gap-4 justify-center'}>
                        <div className={'min-w-[200px] flex-1'}>
                            <TextArea
                                className={'border border-gray-300 rounded-[13px]'}
                                placeholder="ادرس"
                                name="address"
                                icon={<Address/>}
                            />
                        </div>
                    </div>
                    <div className={'w-full flex-wrap flex items-center gap-4 justify-center'}>
                        <div className={'min-w-[200px] flex-1'}>
                            <TextField
                                className={'border border-gray-300'}
                                name="type"
                                placeholder="طول"
                                icon={<NodeIcon className={'w-4 h-4 opacity-75'}/>}
                            />
                        </div>
                        <div className={'min-w-[200px] flex-1'}>
                            <TextField
                                className={'border border-gray-300'}
                                name="allocation"
                                placeholder="عرض"
                                icon={<NodeIcon className={'w-4 h-4 opacity-75'}/>}
                            />
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

export default LocationForm;