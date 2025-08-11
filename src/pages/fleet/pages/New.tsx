import React, {useRef} from "react";
import ViewLayout from "../../../components/layout/view/ViewLayout";
import MapComponent from "../../../components/tools/map/MapTest";
import NewForm from "../components/form/NewForm";
import {Helmet} from "react-helmet";
import { baseTitle, pageTitle } from "../../../assets/information/pageTitle";

const New: React.FC = () => {
    const nodeLocationRef = useRef<any>(null);

    const handleMapClick = (latLng: any) => {
        nodeLocationRef.current = latLng;
     
    };
    return (
        <>
            <Helmet>
                <title>{baseTitle} | {pageTitle.fleet.new}</title>
            </Helmet>
            <ViewLayout
                mapComponent={
                    <MapComponent
                        className=' lg:relative fixed  z-0'
                        center={[35.6892, 51.3890]}
                        zoom={15}
                        enableMarkers={true}
                        enableRegions={true}
                        enableFullScreen={true}
                        enableMultiSelect={false}
                        enableLayerControl={true}
                        enableMapClick={true}
                        // markers={[
                        //     {
                        //         id: "1",
                        //         lat: 35.6892,
                        //         lng: 51.3890,
                        //         popupContent: <div className="relative bg-[#FF4B4B] w-fit p-4 rounded-xl shadow-md text-white">
                        //             <h3>مختصات انتخابی:</h3>
                        //             <button onClick={() => alert("Custom button clicked!")}>
                        //                 Click Me
                        //             </button>
                        //         </div>,
                        //     },
                        // ]}
                        // regions={regions}
                        onMapClick={handleMapClick}
                    />
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
        </>
    );
};

export default New;
