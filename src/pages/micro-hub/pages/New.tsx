import React, {useRef} from "react";
import ViewLayout from "../../../components/layout/view/ViewLayout";
import MapComponent from "../../../components/tools/map/MapTest";
import NewForm from "../components/form/NewForm";
import {Helmet} from "react-helmet";
import NewHubMap from "../components/map/newHubMap";
import {baseTitle, pageTitle} from "../../../assets/information/pageTitle";

const New: React.FC = () => {

    return (
        <>
            <Helmet>
                <title>{baseTitle} | {pageTitle.microhub.new}</title>
            </Helmet>
            <ViewLayout
                mapComponent={
                  <NewHubMap/>
                }
                formComponent={
                    <div className={'w-full h-screen overflow-y-auto px-8 py-16'}>
                        <NewForm/>
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
