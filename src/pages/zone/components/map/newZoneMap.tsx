import { useEffect } from "react";
import MapComponent from "../../../../components/tools/map/MapTest";
import useStore from "../../../../store/zustand/store";
import { NodeDropDown } from "../../../../setting/ApiUrl";
import { AuthApiHeader } from "../../../../services/api/ApiHeader";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import { useReactQuery } from "../../../../components/hooks/query/useReactQuery";
import NodeSvg from "../../../../components/icons/components/NodeSvg";

interface Marker {
  id: string;
  lat: number;
  lng: number;
  name?: string;
  popupContent: JSX.Element;
}

interface Region {
  coordinates: any;
  color?: string;
  fillColor?: string;
  fillOpacity?: number;
}
function NewZoneMap() {
  const zoneList = useStore((state) => state.zoneList);
  const selectedItem = useStore((state) => state.SelectedItem); 
  const apiDetails = {
    url: NodeDropDown,
    method: HttpMethod.GET,
    headers: AuthApiHeader,
  };

  const {
    data: NodeData,
    isLoading: NodeLoading,
    isError,
    error,
    refetch,
  } = useReactQuery(apiDetails);
  const popupContent = (title: string, id: string): JSX.Element => {
    return (
      <div className="relative flex items-center justify-center flex-col bg-[#FF7959] w-fit p-4 rounded-xl  shadow-md text-white">
        <h3 className={"whitespace-nowrap font-semibold"}>{title}</h3>
        <NodeSvg strokeColor={"#FFF"} className={"m-1"} />
      </div>
    );
  };

  const markers: Marker[] = NodeData?.data?.map((item: any, index: any) => ({
    id: item.id || `${index}`,
    lat: item?.latitude,
    lng: item?.longitude,
    name: item.label,
    popupContent: popupContent(item.label, item.id || `${index}`),
  }));
  const formattedRegions = zoneList
    ?.filter((region: any) => region.zonePolygons.length > 0)

    .map((region: any) => ({
      coordinates: region.zonePolygons?.map((point: any) => [
        point.latitude,
        point.longitude,
      ]),
      color: "red",
      fillColor: "pink",
      fillOpacity: 0.5,
    }));

  return (
    // <MapComponent
    //   markers={markers}
    //   // focusMarkerId={selectedItem?.id}
    //   className=" lg:relative fixed  z-0"
    //   center={[35.6892, 51.389]}
    //   zoom={15}
    //   // enableMarkers={true}
    //   enableRegions={true}
    //   // enableFullScreen={true}
    //   // enableMultiSelect={false}
    //   // enableLayerControl={true}
    //   enableRegionCreation={true}
    //   enableMapClick={true}
    //   onRegionCreated={(coordinates) => {
    //     const transformedCoordinates = coordinates.map(([lat, lng]: any) => ({
    //       latitude: lat,
    //       longitude: lng,
    //     }));
    //   }}
    //   loading={true}
    //   loadTime={1000}

    // />
    <MapComponent
      center={[35.6762, 51.4231]}
      zoom={15}
      markers={markers}
      className="lg:relative fixed z-0"
      enableRegions={true}
      focusMarkerId={selectedItem?.id}
         enableRegionCreation={true}
      loading={true}
      onRegionCreated={(coordinates) => {
        const transformedCoordinates = coordinates?.map(([lat, lng]: any) => ({
          latitude: lat,
          longitude: lng,
        }));
      }}
      loadTime={1000}
    />
  );
}

export default NewZoneMap;
