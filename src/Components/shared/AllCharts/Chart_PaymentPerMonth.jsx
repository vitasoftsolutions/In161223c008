import React from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Page A", uv: 333, pv: 400 },
  { name: "Page B", uv: 120, pv: 300 },
  { name: "Page C", uv: 210, pv: 333 },
  { name: "Page D", uv: 222, pv: 222 },
  { name: "Page E", uv: 201, pv: 56 },
  { name: "Page F", uv: 102, pv: 160 },
  { name: "Page G", uv: 141, pv: 354 },
];

const MyBarChart = () => {
  return (
    <ResponsiveContainer>
      <BarChart width="100%" height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MyBarChart;
