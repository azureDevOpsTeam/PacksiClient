import { useEffect } from "react";
import MapComponent from "../../../../../components/tools/map/MapTest";
import useStore from "../../../../../store/zustand/store";
import NodeSvg from "../../../../../components/icons/components/NodeSvg";

interface Marker {
  id: string;
  lat: number;
  lng: number;
  name?: string;
  popupContent: JSX.Element;
}

function NodeMap() {
  const datalist = useStore((state) => state.dataList);
  const clearSelectedItem = useStore((state) => state.clearSelectedItem);
  const selectedItem = useStore((state) => state.SelectedItem);

  useEffect(() => {
    clearSelectedItem();
  }, [datalist, clearSelectedItem]);

  const popupContent = (title: string, id: string): JSX.Element => (
    <div className="relative flex items-center justify-center flex-col bg-[#FF7959] w-fit p-4 rounded-xl shadow-md text-white">
      <h3 className="whitespace-nowrap font-semibold">{title}</h3>
      <NodeSvg strokeColor="#FFF" className="m-1" />
    </div>
  );

  const markers: Marker[] =
    datalist && Array.isArray(datalist) && datalist.length > 0
      ? datalist?.map((item, index) => ({
          id: item.id || `${index}`,
          lat: item.latitude,
          lng: item.longitude,
          name: item.name,
          popupContent: popupContent(item.name, item.id || `${index}`),
        }))
      : [];

  return (
    <MapComponent
      center={[35.6762, 51.4231]}
      zoom={15}
      markers={markers}
      className="lg:relative fixed z-0"
      focusMarkerId={selectedItem?.id}
      loading={true}
      loadTime={1000}
    />
  );
}

export default NodeMap;
