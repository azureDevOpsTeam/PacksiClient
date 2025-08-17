// import React from 'react'

// function View() {
//   return (
//     <div>View</div>
//   )
// }

// export default View
import EcommerceMetrics from "./Components/EcommerceMetrics";
import MonthlySalesChart from "./Components/MonthlySalesChart";
import StatisticsChart from "./Components/StatisticsChart";
import MonthlyTarget from "./Components/MonthlyTarget";
import RecentOrders from "./Components/RecentOrders";
import DemographicCard from "./Components/DemographicCard";


export default function DashboardView() {
  return (
    <>

      <div className="grid grid-cols-12 gap-4 md:gap-6  px-9 py-5 ">
        <div className="col-span-12 space-y-6 xl:col-span-8 ">
          <EcommerceMetrics />

        
        </div>

        <div className="col-span-12 xl:col-span-4 ">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}
