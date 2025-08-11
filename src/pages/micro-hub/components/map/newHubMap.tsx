import React,{useRef,useState} from 'react';
import useStore from '../../../../store/zustand/store';
import MapComponent from "../../../../components/tools/map/MapTest";
import NodeSvg from "../../../../components/icons/components/NodeSvg";

interface Marker {
  id: string;
  lat: number;
  lng: number;
  name?: string;
  popupContent: JSX.Element;
}

const NewHubMap: React.FC = () => {
  const [focusId,setFocudId]=useState(null)
  const currentLocation = useStore((state) => state.currentLocation);
  const setLocation = useStore((state) => state.setLocation);
  const nodeLocationRef = useRef<any>(null);
  // const handleMapClick = (latLng: any) => {
  //   nodeLocationRef.current = latLng;
  //   setLocation(nodeLocationRef.current);
  // };
    const popupContent = (title: string, id: string): JSX.Element => (
      <div className="relative flex items-center justify-center flex-col bg-[#FF7959] w-fit p-4 rounded-xl shadow-md text-white">
        <h3 className="whitespace-nowrap font-semibold">{title}</h3>
        <NodeSvg strokeColor="#FFF" className="m-1" />
      </div>
    );

    const markers: Marker[] =
      currentLocation &&
      Array.isArray(currentLocation) &&
      currentLocation.length > 0
        ? 
        currentLocation.map((item, index) => ({
            id: item.id || `${index}`,
            lat: item.latitude,
            lng: item.longitude,
            name: item.name,
            popupContent: popupContent(item.name, item.id || `${index}`),
          }))
        : [];
  return (
    <MapComponent
      focusMarkerId={markers[0]?.id}
      markers={markers}
      className=" lg:relative fixed  z-0"
      center={[35.6892, 51.389]}
      zoom={15}
      enableMarkers={true}
      enableRegions={true}
      enableFullScreen={true}
      enableMultiSelect={false}
      enableLayerControl={true}
      enableMapClick={true}
      // onMapClick={handleMapClick}
    />
  );
};

export default NewHubMap
