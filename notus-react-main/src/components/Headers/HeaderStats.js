import React from "react";

// components

import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {
  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Electricity"
                  statTitle="100"
                  statDescripiron="Since last month"
                  statIconName="fas fa-bolt"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Water"
                  statTitle="2,356"
                  statDescripiron="Since last month"
                  statIconName="fas fa-tint"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Garbage"
                  statTitle="924"
                  statDescripiron="Since last Month"
                  statIconName="fas fa-recycle"
             
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="PERFORMANCE"
                  statTitle="500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-city"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
