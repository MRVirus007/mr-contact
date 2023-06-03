export interface CountryData {
  country: string;
  countryInfo: {
    lat: number;
    long: number;
    flag: string;
    iso2: string;
  };
  cases: number;
  deaths: number;
  recovered: number;
}
