import React from "react";
import {Helmet} from "react-helmet";
import InformationForm from "../../zone/components/form/InformationForm";
import LocationForm from "../../zone/components/form/LocationForm";
import PersonnelForm from "../../zone/components/form/PersonnelForm";
import MapComponent from "../../../components/tools/map/MapTest";
import {regions} from "../../../assets/mock/mockData";
import DynamicTabs from "../../../components/tools/tab/DynamicTabs";
import {baseTitle, pageTitle} from "../../../assets/information/pageTitle";
import ViewLayout from "../../../components/layout/view/ViewLayout";
import FormView from "../components/form/FormView";
import FormResponsiveView from "../components/form/FormResponsiveView";
import ZoneMap from "../components/map/zoneMap";


const View: React.FC = () => {
    const tabData = [
        {
            label: 'اطلاعات',
            content: <InformationForm/>
        },
        {
            label: 'تاریخچه',
            content: <div>محتوای تاریخچه</div>
        }
    ];
    return (
        <>
            <Helmet>
                <title>{baseTitle} | {pageTitle.zone}</title>
            </Helmet>
            <ViewLayout
                mapComponent={
                   <ZoneMap/>
                }
                mapOverlay={
                    <DynamicTabs className={'bg-white shadow'} contentClassName={'mt-[16px]'} tabs={tabData}
                                 inputClassName={'w-[calc(100%-55px)]'}/>
                }
                formComponent={
                   <FormView/>
                }
                formComponentResponsive={
                   <FormResponsiveView/>
                }
            />
          
        
      </>
    );
};

export default View;
