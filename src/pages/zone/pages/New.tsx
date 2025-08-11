import React, {useRef} from "react";
import ViewLayout from "../../../components/layout/view/ViewLayout";
import {markers} from "../../../assets/mock/mockData";
import NewForm from "../components/form/NewForm";
import MapComponent from "../../../components/tools/map/MapTest";
import ZoneMap from "../components/map/newZoneMap";

const New: React.FC = () => {

    return (
        <ViewLayout
            mapComponent={
               <ZoneMap/>
            }
            formComponent={
                <div className={"w-full h-screen overflow-y-auto px-8 py-16"}>
                    <NewForm/>
                </div>
            }
            formComponentResponsive={
                <div className={"w-full h-screen overflow-y-auto px-8"}>
                    <NewForm/>
                </div>
            }
        />
    );
};

export default New;
