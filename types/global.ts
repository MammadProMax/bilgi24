export type Locale = "tr" | "en";

export type City = {
   id: number;
   latitude: string;
   longitude: string;
   zoom: number;
   name: string;
};

export type State = {
   id: number;
   name: string;
   polygon: any;
   cityId: number;
   latitude: string;
   longitude: string;
   zoom: number;
};

export type District = {
   id: number;
   name: string;
   polygon: any;
   stateId: number;
   latitude: string;
   longitude: string;
   zoom: number;
};
