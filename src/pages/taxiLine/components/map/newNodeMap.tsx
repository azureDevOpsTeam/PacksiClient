import React,{useRef} from 'react';
import useStore from '../../../../store/zustand/store';
import MapComponent from "../../../../components/tools/map/MapTest";

const NewNodeMap: React.FC = () => {
  const setLocation = useStore((state) => state.setLocation);
  const nodeLocationRef = useRef<any>(null);
  const handleMapClick = (latLng: any) => {
    nodeLocationRef.current = latLng;
    setLocation(nodeLocationRef.current);
 
  };
  return (
    <MapComponent
      className=" lg:relative fixed  z-0"
      center={[35.6892, 51.389]}
      zoom={15}
      enableMarkers={true}
      enableRegions={true}
      enableFullScreen={true}
      enableMultiSelect={false}
      enableLayerControl={true}
      enableMapClick={true}
      onMapClick={handleMapClick}
    />
  );
};

export default NewNodeMap
