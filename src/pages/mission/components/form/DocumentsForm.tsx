import React, {useState} from 'react';
import {Form, Formik} from "formik";
import TextField from "../../../../components/tools/textField/TextField";
import {ReactComponent as DocumentIcon} from "../../../../components/icons/svg/documentIcon.svg";
import {ReactComponent as ImageIcon} from "../../../../components/icons/svg/imageIcon.svg";
import {ReactComponent as DeleteIcon} from "../../../../components/icons/svg/deleteIcon.svg";
import {ReactComponent as EditIcon} from "../../../../components/icons/svg/editIcon.svg";

function DocumentsForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const submitHandler = () => {
    };
    const docs = [
        {
            id: "1",
            info: 'pdf.ndhb567kkshn8',
            url: '',
            icon:<ImageIcon />
        },
        {
            id: "2",
            info: 'jpg.HB76JN-098K',
            url: '',
            icon:<DocumentIcon />
        },
        {
            id: "3",
            info: 'jpg.A3F78702-FF2C',
            url: '',
            icon:<ImageIcon />
        },
        {
            id: "4",
            info: 'jpg.DFG78702-F3SL',
            url: '',
            icon:<ImageIcon />
        }
    ]
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
                        {docs?.map((doc) => (
                            <div className={'relative min-w-[200px] flex-1'}>
                                <TextField
                                    className={'border border-gray-300'}
                                    name="name"
                                    placeholder={doc.info}
                                    icon={doc.icon}
                                />
                                <div
                                    className={`min-w-[70px] absolute top-3 left-3 h-6 px-3 py-1 rounded-lg border justify-center items-center gap-1 inline-flex`}
                                    style={{backgroundColor: '#a4cafe', borderColor: '#1a56db90'}}
                                >
                                    <div className="text-right text-xs font-bold leading-none"
                                         style={{color: '#1a56db'}}>
                                        دانلود
                                    </div>
                                </div>
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
    );
}

export default DocumentsForm;