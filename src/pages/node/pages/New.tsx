import React, {useRef, useState} from "react";
import ViewLayout from "../../../components/layout/view/ViewLayout";
import MapComponent from "../../../components/tools/map/MapTest";
import NewForm from "../components/form/NewForm";
import {Helmet} from "react-helmet";
import NewNodeMap from "../components/map/newNodeMap";
import {baseTitle, pageTitle} from "../../../assets/information/pageTitle";
import useStore from "../../../store/zustand/store";
const New: React.FC = () => {
    const nodeLocationRef = useRef<any>(null);
    
    const handleMapClick = (latLng: any) => {
        nodeLocationRef.current = latLng;
       
    };
    return (
        <>
            <Helmet>
                <title>{baseTitle} | {pageTitle.node.new}</title>
            </Helmet>
            <ViewLayout
                mapComponent={
                   <NewNodeMap/>
                }
                formComponent={
                    <div className={'w-full h-screen overflow-y-auto px-8 py-16'}>
                        <NewForm />
                    </div>
                }
                formComponentResponsive={
                    <div className={'w-full h-screen overflow-y-auto px-8'}>
                        <NewForm/>
                    </div>
                }
            />
        </>
    );
};

export default New;
