import React, { useState, useEffect } from "react";
//Data Type and API Calls
import { GraphData } from "../../api/models/graphdata";
import { fetchGraphData } from "../../api/apiservice";
//for creating a line graph
import { Line } from "react-chartjs-2";
//for converting digits to specified format
import numeral from "numeral";
//import for date adapter used in Line graph options
import "chartjs-adapter-date-fns";
import { enUS } from "date-fns/locale";
//register all elements required by the chart
import "chart.js/auto";

const buildChartData = (data: GraphData) => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data['cases'][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data['cases'][date];
    }
    return chartData;
};

  
function LineGraph() {
    const [chartData, setChartData] = useState({});
    //Fetch chart data and set it to show in graph
    const fetchData = async () => {
        try {
            const graphDataResponse = await fetchGraphData();
            let chartData = buildChartData(graphDataResponse);
            setChartData(chartData);
        }catch (error: any) {
            console.error("Error:", error.message);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
  return (
      <>
        <h2 className="font-bold text-md my-2">Worldwide Cases</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Object.keys(chartData).length > 0 && (
              <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-3 xl:col-span-4">
                <Line
                  data={{
                    datasets: [
                      {
                        backgroundColor: "rgba(147, 125, 194, 0.5)",
                        borderColor: "#FF9494",
                        data: chartData,
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                      },
                      tooltip: {
                        callbacks: {
                          label: (context: any) =>
                            numeral(context.parsed.y).format("+0,0"),
                        },
                      },
                    },
                    elements: {
                      point: {
                        radius: 0,
                      },
                    },
                    maintainAspectRatio: false,
                    interaction: {
                      intersect: false,
                      mode: "index",
                    },
                    scales: {
                      x: {
                        type: "time",
                        adapters: {
                          date: {
                            locale: enUS,
                          },
                        },
                        time: {
                          parser: "MM/dd/yy",
                        },
                      },
                      y: {
                        grid: {
                          display: false,
                        },
                        ticks: {
                          callback: (value: any) => numeral(value).format("0a"),
                        },
                      },
                    },
                  }}
                />
              </div>
            )}
          </div>
      </>
  )
}

export default LineGraph