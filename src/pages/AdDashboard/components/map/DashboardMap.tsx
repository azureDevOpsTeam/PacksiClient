import React from 'react';
import MapComponent from "../../../../components/tools/map/MapTest";
import { useReactQuery } from '../../../../components/hooks/query/useReactQuery';
import { HttpMethod } from '../../../../models/enums/HttpMethod';
import { ZoneList } from '../../../../setting/ApiUrl';


function DashboardMap() {
    // const fetchUsers = async (): Promise<any> => {
    //     const response = await fetch(GetLastLocation,
    //         {
    //             method: "GET",
    //             headers:AuthApiHeader
    //         });
    //
    //     if (!response.ok) throw new Error("خطا در دریافت داده");
    //     return response.json();
    // };
    //
    // const { data, isLoading, error, refetch } = useSignalRQuery<any>({
    //     key: "users",
    //     fetchFunction: fetchUsers,
    //     hubUrl: GpsFleetHub,
    //     eventName: "UserUpdated",
    // });
    // const { data, loading, error } = useSignalRQuery<any>({
    //     // fetchFunction:fetchUsers,
    //     hubUrl: GpsFleetHub,
    //     eventName: "locationUpdate",
    // });


    return (
      <>
        <MapComponent
          center={[35.6762, 51.4231]}
          zoom={11}
          markers={[
            {
              id: "1",
              lat: 35.6892,
              lng: 51.389,
              popupContent: (
                <div className="relative bg-[#FF7959] w-fit p-4 rounded-xl shadow-md text-white">
                  <h3>نقطه ۱:</h3>
                  <button onClick={() => alert("نقطه ۱ کلیک شد!")}>
                    Click Me 1
                  </button>
                </div>
              ),
            },
            {
              id: "2",
              lat: 35.72393889437902, // کمی بالاتر از تهران
              lng: 51.52016056771516,
              popupContent: (
                <div className="relative bg-[#FF7959] w-fit p-4 rounded-xl shadow-md text-white">
                  <h3>نقطه ۲:</h3>
                  <button onClick={() => alert("نقطه ۲ کلیک شد!")}>
                    Click Me 2
                  </button>
                </div>
              ),
            },
            {
              id: "3",
              lat: 35.73160340875959, // کمی پایین‌تر از تهران
              lng: 51.18064379622462,
              popupContent: (
                <div className="relative bg-[#FF4BFF79594B] w-fit p-4 rounded-xl shadow-md text-white">
                  <h3>نقطه ۳:</h3>
                  <button onClick={() => alert("نقطه ۳ کلیک شد!")}>
                    Click Me 3
                  </button>
                </div>
              ),
            },
            {
              id: "4",
              lat: 35.71393889437902, // کمی بالاتر از تهران
              lng: 51.52016056771516,
              popupContent: (
                <div className="relative bg-[#FF7959] w-fit p-4 rounded-xl shadow-md text-white">
                  <h3>نقطه 4:</h3>
                  <button onClick={() => alert("نقطه 4 کلیک شد!")}>
                    Click Me 4
                  </button>
                </div>
              ),
            },
          ]}
          // focusMarkerId={'4'}
          className="lg:relative fixed z-0 lg:rounded-[28px]"
          loading={true}
          loadTime={1000}
        />
      </>
    );
}

export default DashboardMap;