import React from "react";
import LineGraph from "./LineGraph";
import Map from "./Map";
import TotalCases from "./TotalCases";
function Dashboard() {
  return (
    <>
      <div>
        <main className="flex-1 max-h-full p-5 overflow-hidden">
          <TotalCases />
          <LineGraph />
          <Map />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
