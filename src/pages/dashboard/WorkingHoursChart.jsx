import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
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
const transformData = (data) => {
  const lastSixDays = getLastSixDays(); // Get the last 6 days
  const transformedData = [];

  // Loop over each device and filter the data for the last 6 days
  lastSixDays.forEach((date) => {
    const rowData = { date };

    data.forEach(([device, hours]) => {
      rowData[device] = hours[date] || 0; // Set 0 if there's no data for that date
    });

    transformedData.push(rowData);
  });

  return transformedData;
};

// Function to generate random colors, avoiding those too similar to the background color
const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  
  // Ensure contrast by checking the lightness of generated color
  while (true) {
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    
    // Check if the color is too close to the background color
    if (isColorContrasting(color, "#063c91")) {
      break;
    } else {
      color = "#"; // reset and try again
    }
  }
  
  return color;
};

// Helper function to check if two colors have good contrast
const isColorContrasting = (color1, color2) => {
  const getColorLuminance = (hex) => {
    const rgb = hex.match(/[a-f0-9]{2}/gi).map(x => parseInt(x, 16));
    const lum = rgb.map(function (x) {
      x /= 255;
      return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    });
    return lum[0] * 0.2126 + lum[1] * 0.7152 + lum[2] * 0.0722;
  };

  const luminance1 = getColorLuminance(color1);
  const luminance2 = getColorLuminance(color2);
  return Math.abs(luminance1 - luminance2) > 0.5; // Simple threshold for good contrast
};

const WorkingHoursChart = ({ data }) => {
  const [chartData, setChartData] = useState([]);
  const [deviceColors, setDeviceColors] = useState({});

  useEffect(() => {
    if (data) {
      // Transform the data into the required format (only for the last 6 days)
      const formattedData = transformData(data);
      setChartData(formattedData);

      // Generate random colors for each device
      const colors = {};
      data.forEach(([device]) => {
        colors[device] = generateRandomColor(); // Assign a random color to each device
      });
      setDeviceColors(colors);
    }
  }, [data]);

  // If no data or loading, show a "No Data" BarChart
  if (!data || data.length === 0 || chartData.length === 0) {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={[{ date: "No Data", value: 0 }]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
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
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <div className="chart-container">
      <ResponsiveContainer width="80%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fill: '#fff' }} />
          <YAxis tick={{ fill: '#fff' }} />
          <Tooltip contentStyle={{ color: '#fff', backgroundColor: '#333' }} />
          <Legend />
          {/* Dynamically render Bar components based on the data */}
          {data.map(([device]) => (
            <Bar
              key={device}
              dataKey={device}
              fill={deviceColors[device] || "#8884d8"} // Assign the generated color or fallback to a default color
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WorkingHoursChart;

