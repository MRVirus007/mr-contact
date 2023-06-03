import React, { useEffect, useState } from 'react'
//Data Type and API Calls
import { CountryData } from '../../api/models/countrydata'
import { fetchCountryData } from '../../api/apiservice';
//for converting digits to specified format
import numeral from "numeral";
//leaflet imports for Map
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

function Map() {
    const [countryData, setCountryData] = useState<CountryData | null>(null);
    //Fetch country data and set it to show in map
    const fetchData = async () => {
        try {
            const countryDataResponse = await fetchCountryData();
            setCountryData(countryDataResponse);
        }catch (error: any) {
            console.error("Error:", error.message);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
  return (
      <>
        <h2 className="font-bold text-md my-2">Country Specific Cases</h2>
          <MapContainer style={{ height: "500px" }} center={[20, 0]} zoom={2}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="Map data &copy; OpenStreetMap contributors"
            />
            {countryData && Object.keys(countryData).length > 0 ? (
              Object.values(countryData).map((country: CountryData) => (
                <Marker
                  key={country.country}
                  position={[country.countryInfo.lat, country.countryInfo.long]}
                  icon={
                    new Icon({
                      iconUrl: markerIconPng,
                      iconSize: [25, 41],
                      iconAnchor: [12, 41],
                    })
                  }
                >
                  <Popup>
                    <div className="info-container">
                      <div className="flex justify-evenly m-1">
                        <img
                          src={country.countryInfo.flag}
                          alt="flag"
                          className="info-flag"
                        />
                        <div>{country.country}</div>
                      </div>

                      <div>
                        Active Cases: {numeral(country.cases).format("0.0a")}{" "}
                        <br />
                        Recovered Cases:{" "}
                        {numeral(country.recovered).format("0.0a")} <br />
                        Deaths: {numeral(country.deaths).format("0.0a")} <br />
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))
            ) : (
              <div>No country data available</div>
            )}
          </MapContainer>
      </>
  )
}

export default Map