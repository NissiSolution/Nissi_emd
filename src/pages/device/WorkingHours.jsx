import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Text
} from "recharts";

// Helper function to get the last 6 days
const getLastSixDays = () => {
  const today = new Date();
  const lastSixDays = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    lastSixDays.push(date.toISOString().split('T')[0]); // Format to 'YYYY-MM-DD'
  }
  return lastSixDays;
};

// Sample data transformation function (only for the last 6 days)
const transformData = (data, deviceName) => {
  const lastSixDays = getLastSixDays(); // Get the last 6 days
  const transformedData = [];

  // Loop over each date and only include the hours for the chosen device
  lastSixDays.forEach((date) => {
    const rowData = { date };
    
    // Find the data for the specified device and date
    const deviceData = data.find(([device]) => device === deviceName);
    if (deviceData) {
      rowData[deviceName] = deviceData[1][date] || 0; // Get hours for the device or 0 if no data
    }

    transformedData.push(rowData);
  });

  return transformedData;
};

const WorkingHours = ({ data, deviceName }) => {
  const [chartData, setChartData] = useState([]);
  
  useEffect(() => {
    if (data && deviceName) {
      // Transform the data into the required format for the selected device
      const formattedData = transformData(data, deviceName);
      setChartData(formattedData);
    }
  }, [data, deviceName]);

  // If no data or loading, show a "No Data" LineChart
  if (!data || data.length === 0 || chartData.length === 0) {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={[{ date: "No Data", value: 0 }]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
          <Text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="20"
            fill="#333"
          >
            No Data Available
          </Text>
        </LineChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fill: '#000' }} />
        <YAxis tick={{ fill: '#000' }} />
        <Tooltip contentStyle={{ color: '#000', backgroundColor: '#fff' }} />
        <Legend />
        <Line 
          type="monotone" 
          dataKey={deviceName} 
          stroke="green" // Choose the color for the line
          activeDot={{ r: 8 }} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WorkingHours;
