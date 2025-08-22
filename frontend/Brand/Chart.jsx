// import React, { useState,useEffect } from 'react'
// import api from './Axios'
// import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
// import Navbar from './Navbar';

// const Chart = () => {
//   let user=JSON.parse(localStorage.getItem("user"))
//   let [brand,setBrand]=useState("")
//   let [data,setData]=useState([])
//   let [data1,setData1]=useState([])

//    const loadSentiments = async (brandName, setter) => {
//     let res = await api.get(`/comparasion/${brandName}`);

//     let sentiments = res.data;
//     let positive = 0;
//     let negative = 0;
//     console.log(sentiments)
//     sentiments.forEach((s) => {
//       if (s === "POSITIVE") positive++;
//       if (s === "NEGATIVE") negative++;
//     });
//     setter([
//       { name: "Positive", value: positive },
//       { name: "Negative", value: negative },
//     ]);
//   };


// useEffect(() => {
//     if (brand) {
//       loadSentiments(user.brand, setData);
//       loadSentiments(brand, setData1);
//     }
//   }, [brand]);
//   return (
//     <div>
//         <Navbar/>
//        <select onChange={(e) => {
//         setBrand(e.target.value)
//         }}>
//         <option value="">Select Brand</option>
//         {["Nike", "Adidas", "Apple"].filter((b) => b !== user.brand).map((b) => (
//           <option key={b} value={b}>{b}</option>
//         ))}
//       </select>
//        {brand && (
//         <>
//          <h2>{user['brand']}</h2>
//             <BarChart width={400} height={300} data={data}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="value" fill="#8884d8" />
//             </BarChart>
//             <h2>{brand}</h2>
//             <BarChart width={400} height={300} data={data1}>
//              <XAxis dataKey="name" />
//              <YAxis />
//              <Tooltip />
//              <Bar dataKey="value" fill="#8884d8" />
//             </BarChart>
//         </>
//        )}
//     </div>
//   )
// }

// export default Chart
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./comp";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell 
} from "recharts";
import api from "./Axios";
import Navbar from "./Navbar";

const Chart = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [brand, setBrand] = useState("");
  const [chartData, setChartData] = useState([]);

  const loadSentiments = async (brandName) => {
    const res = await api.get(`/comparasion/${brandName}`);
    const sentiments = res.data;

    let positive = 0;
    let negative = 0;

    sentiments.forEach((s) => {
      if (s === "POSITIVE") positive++;
      if (s === "NEGATIVE") negative++;
    });

    return { Positive: positive, Negative: negative };
  };

  useEffect(() => {
    if (brand) {
      Promise.all([loadSentiments(user.brand), loadSentiments(brand)]).then(
        ([userSentiment, selectedSentiment]) => {
          const merged = [
            {
              name: "Positive",
              brand: user.brand,
              value: userSentiment.Positive,
              fill: "#4A25E1"
            },
            {
              name: "Positive",
              brand: brand,
              value: selectedSentiment.Positive,
              fill: "#FF7A00"
            },
            {
              name: "Negative",
              brand: user.brand,
              value: userSentiment.Negative,
              fill: "#4A25E1"
            },
            {
              name: "Negative",
              brand: brand,
              value: selectedSentiment.Negative,
              fill: "#FF7A00"
            }
          ];
          setChartData(merged);
        }
      );
    }
  }, [brand]);

  return (
    <>
      <Navbar />
      <div className="px-6 mt-6">
        <div className="mb-4">
          <label className="text-lg font-medium mr-4">
            Select Brand to Compare:
          </label>
          <select
            onChange={(e) => setBrand(e.target.value)}
            className="border px-4 py-2 rounded-md shadow-sm"
          >
            <option value="">-- Choose Brand --</option>
            {["Nike", "Adidas", "Apple"]
              .filter((b) => b !== user.brand)
              .map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
          </select>
        </div>

        {brand && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Sentiment Comparison: {user.brand} vs {brand}
              </CardTitle>
            </CardHeader>
            <CardContent className="pl-4">
              <ResponsiveContainer width="100%" height={500}>
                <BarChart data={chartData} layout="vertical" barSize={30}>
                  <XAxis
                    type="number"
                    stroke="#888888"
                    fontSize={14}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    stroke="#888888"
                    fontSize={14}
                    tickLine={false}
                    axisLine={false}
                    width={100}
                  />
                  <Tooltip
                    formatter={(value, name, props) => [`${value}`, `Count`]}
                  />
                  <Bar
                    dataKey="value"
                    fill="#8884d8"
                    label={{ position: "right" }}
                    radius={[4, 4, 4, 4]}
                  >
                    <LabelList
                      dataKey="brand"
                      position="insideLeft"
                      fill="#ffffff"
                      fontSize={12}
                    />
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default Chart;
