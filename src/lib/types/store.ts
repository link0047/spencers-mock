type DayHours = {
  dayName: string;
  openTime: string;
  closeTime: string;
};

export type Store = {
  storeNumber: string;
  storeName: string;
  addressLine1: string;
  addressLine2: string;
  country: string;
  city: string;
  state: string;
  TimeZone: string;
  SDDEnabled: "Y" | "N";
  zipcode: string;
  phone: string;
  storeEmail: string;
  latitude: string;
  longitude: string;
  storestatus: "OP" | "CL";
  localname: string;
  SiteId: string | number;
  storeOpenDate: string;
  activeFlag: "Y" | "N";
  BOSSEnableFlag: "Y" | "N";
  BOPUSEnableFlag: "Y" | "N";
  storeHours?: DayHours[];
  openDayArea?: Record<string, unknown>;
};