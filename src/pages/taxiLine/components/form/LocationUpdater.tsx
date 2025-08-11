import React, { useEffect } from "react";
import { useFormikContext } from "formik";
import useStore from "../../../../store/zustand/store";

interface FormValues {
  name: string;
  isActive: boolean;
  latitude: number; 
  longitude: number;
  address: string;
  zoneId: number;
}

const LocationUpdater: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<FormValues>();
  const location = useStore((state) => state.location);

  useEffect(() => {
    if (
      location &&
      (parseFloat(location.lat || "0") !== values.latitude ||
        parseFloat(location.lng || "0") !== values.longitude)
    ) {
   
      setFieldValue("latitude", parseFloat(location.lat || "0"));
      setFieldValue("longitude", parseFloat(location.lng || "0"));
    }
  }, [location, setFieldValue, values.latitude, values.longitude]);

  return null; 
};

export default LocationUpdater;
