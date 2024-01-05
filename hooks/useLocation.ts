import { API_URL } from "@/lib/config";
import { useEffect, useState } from "react";

type ExtendedLocation = {
   value: string;
   label: string;
   id: number;
};

const extendLocation = (
   location: { id: number; name: string }[] | undefined
): ExtendedLocation[] =>
   location?.map((loc) => ({ value: loc.name, label: loc.name, id: loc.id })) ??
   [];

const getStates = async () => {
   // istanbul
   const request = await fetch(API_URL + `data/location?lang=tr&country_id=68`);
   const res = await request.json();
   return extendLocation(res.data);
};

const getDistrict = async (stateId: number) => {
   // bakırköy
   const request = await fetch(
      API_URL + `data/location?lang=tr&state_id=${stateId}`
   );
   const res = await request.json();
   return extendLocation(res.data);
};

const getNeighborhoods = async (districtId: number) => {
   const request = await fetch(
      API_URL + `data/location?lang=tr&city_id=${districtId}`
   );
   const res = await request.json();
   return extendLocation(res.data);
};

export const useLocation = ({
   stateId,
   districtId,
}: {
   stateId: number;
   districtId: number;
}) => {
   const [locations, setLocations] = useState<{
      stateList: ExtendedLocation[];
      districtList: ExtendedLocation[];
      neighborList: ExtendedLocation[];
   }>({
      stateList: [],
      districtList: [],
      neighborList: [],
   });

   useEffect(() => {
      //
      const asyncRequest = async () => {
         const list = await getStates();
         setLocations((prev) => ({ ...prev, stateList: list }));
      };
      asyncRequest();
   }, []);

   useEffect(() => {
      const asyncRequest = async () => {
         const list = await getDistrict(stateId);

         setLocations((prev) => ({ ...prev, districtList: list }));
      };
      asyncRequest();
   }, [stateId]);
   useEffect(() => {
      const asyncRequest = async () => {
         const list = await getNeighborhoods(districtId);
         setLocations((prev) => ({ ...prev, neighborList: list }));
      };
      asyncRequest();
   }, [districtId]);

   return {
      ...locations,
   };
};
