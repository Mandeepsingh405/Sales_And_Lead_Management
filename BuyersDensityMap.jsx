import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useState } from "react";
import worldMapData from "../../assets/world-110m.json"; 
import { scaleLinear } from "d3-scale";
import React from "react";


const buyersData = {
  "United States of America": 5000,
  India: 7000,
  Germany: 4000,
  Brazil: 3500,
  Australia: 2000,
  "United Kingdom": 4500,
  Canada: 3800,
  France: 4200,
  China: 6000,
  Japan: 4800,
  "South Africa": 2500, 
  Russia: 3800,
  Mexico: 3600,
  Argentina: 2900,
  Italy: 4100,
  Spain: 4000,
};


const colorScale = scaleLinear()
  .domain([2000, 7000]) 
  .range(["#93c5fd", "#1e40af"]); 

export default function BuyersDensityMap() {
  const [tooltipContent, setTooltipContent] = useState("");

  return (
    <div className="relative">
      <h2 className="text-lg font-semibold mb-4">Buyers' Density Map</h2>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 140 }}
        className="w-full h-[600px]"
      >
        <Geographies geography={worldMapData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryName = geo.properties.name;
              const sales = buyersData[countryName] || 0;
              const fillColor = sales ? colorScale(sales) : "#D1D5DB";

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() =>
                    setTooltipContent(
                      sales
                        ? `${countryName}: ${sales} Buyers`
                        : `${countryName}: No Data`
                    )
                  }
                  onMouseLeave={() => setTooltipContent("")}
                  style={{
                    default: { fill: fillColor, stroke: "#374151", strokeWidth: 0.5 },
                    hover: { fill: "#facc15", stroke: "#1E3A8A", strokeWidth: 1 },
                    pressed: { fill: "#1E40AF" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {tooltipContent && (
        <div className="absolute top-2 right-4 bg-gray-800 text-white px-3 py-1 rounded-md text-sm shadow-md">
          {tooltipContent}
        </div>
      )}
    </div>
  );
}
