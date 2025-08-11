import React from "react";
import ViewLayout from "../../../components/layout/view/ViewLayout";
import {Helmet} from "react-helmet";
import {baseTitle, pageTitle} from "../../../assets/information/pageTitle";
import ListView from "../components/form/ListView";
import {ReactComponent as PersonnelListSvg} from "../../../components/icons/svg/personnelListSvg.svg";
import NewForm from "../components/form/NewForm";

const New: React.FC = () => {

    return (
        <>
            <Helmet>
                <title>{baseTitle} | {pageTitle.personnel.new}</title>
            </Helmet>
            <ViewLayout
                mapComponent={
                    <div className={'w-full h-full flex flex-col items-center justify-center gap-[34px]'}>
                        <PersonnelListSvg/>
                        <div className="text-center text-[#111928] text-base font-bold w-1/2 leading-normal">لطفا همه‌ی اطلاعات پرسنل را وارد کنید و در آخر رویدکمه‌ی «تایید و ایجاد پرسنل» کلیک کنید.</div>
                    </div>
                }
                formComponent={
                    <div className={'w-full h-screen overflow-y-auto px-8 py-16'}>
                        <NewForm />
                    </div>
                }
                formComponentResponsive={<NewForm/>}
            />
        </>
    );
};

export default New;