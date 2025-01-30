import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from "chart.js";

// Register the required elements
ChartJS.register(ArcElement);

const DoughnutChart = React.memo(({ value, max }) => {
  const maxValue = max; // Dynamic max value
  const adjustedValue = Math.min(Math.max(value, 0), maxValue);
  const remainingValue = maxValue - adjustedValue;

  // Memoize the chart data to avoid unnecessary recalculations
  const doughnutChartData = useMemo(() => ({
    labels: ["Current", "Remaining"],
    datasets: [
      {
        data: [adjustedValue, remainingValue],
        backgroundColor: ["rgba(255, 69, 0, 1)", "rgba(0, 128, 0, 1)"],
        borderColor: ["rgba(255, 69, 0, 1)", "rgba(0, 128, 0, 1)"],
        borderWidth: 1,
      },
    ],
  }), [adjustedValue]); // ✅ Only updates when value changes

  // Memoize the chart options
  const options = useMemo(() => ({
    rotation: -90, // Start from the bottom
    circumference: 180, // Half-pie effect
    cutout: "60%", // Adjust for a gauge look
    plugins: {
      legend: { display: true }, // Show legend
      tooltip: { enabled: true }, // Enable tooltips
    },
    animation: {
      animateRotate: true, // Enable rotation animation
      animateScale: true, // Enable scaling animation
    },
  }), []);

  return (
    <div style={{ textAlign: "center" }}>
      {/* Text above the chart */}
      <p style={{ marginBottom: "7px", fontSize: "18px", fontWeight: "bold" }}>
        Current value: {adjustedValue} / {maxValue}
      </p>

      {/* Doughnut Chart */}
      <Doughnut data={doughnutChartData} options={options} />

      {/* Text below the chart */}
      <p style={{ marginTop: "10px", fontSize: "15px", color: "#333" }}>
        Remaining: {parseFloat(remainingValue).toFixed(2)}
      </p>
    </div>
  );
});

export default DoughnutChart;