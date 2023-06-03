import React, { useEffect, useState } from 'react'
import { WorldData } from '../../api/models/worlddata';
import numeral from 'numeral';
import { fetchWorldData } from '../../api/apiservice';

function TotalCases() {
    const [worldData, setWorldData] = useState<WorldData | null>(null);
    //Fetch world data and set it to show in map
    const fetchData = async () => {
        try {
            const countryDataResponse = await fetchWorldData();
            setWorldData(countryDataResponse);
        }catch (error: any) {
            console.error("Error:", error.message);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
  return (
      <>
        <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
            <h1 className="text-2xl font-semibold whitespace-nowrap">
              Dashboard
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
              <div className="flex items-start justify-between">
                <div className="flex flex-col space-y-2">
                  <span className="text-gray-400">Cases Today</span>
                  <span className="text-lg font-semibold text-yellow-500">
                    {worldData
                      ? "+" + numeral(worldData.todayCases).format("0.0a")
                      : "+0"}
                  </span>
                </div>
              </div>
              <div>
                <span className="inline-block px-2 text-md text-white bg-yellow-500 rounded">
                  {worldData ? numeral(worldData.cases).format("0.0a") : "+0"}
                </span>
                <span> till now</span>
              </div>
            </div>
            <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
              <div className="flex items-start justify-between">
                <div className="flex flex-col space-y-2">
                  <span className="text-gray-400">Deaths Today</span>
                  <span className="text-lg font-semibold text-red-500">
                    {worldData
                      ? "+" + numeral(worldData.todayDeaths).format("0.0a")
                      : "+0"}
                  </span>
                </div>
              </div>
              <div>
                <span className="inline-block px-2 text-md text-white bg-red-500 rounded">
                  {worldData ? numeral(worldData.deaths).format("0.0a") : "+0"}
                </span>
                <span> till now</span>
              </div>
            </div>
            <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
              <div className="flex items-start justify-between">
                <div className="flex flex-col space-y-2">
                  <span className="text-gray-400">Recovered Today</span>
                  <span className="text-lg font-semibold text-green-500">
                    {worldData
                      ? "+" + numeral(worldData.todayRecovered).format("0.0a")
                      : "+0"}
                  </span>
                </div>
              </div>
              <div>
                <span className="inline-block px-2 text-md text-white bg-green-500 rounded">
                  {worldData
                    ? numeral(worldData.recovered).format("0.0a")
                    : "+0"}
                </span>
                <span> till now</span>
              </div>
            </div>
          </div>
      </>
  )
}

export default TotalCases