// PowerChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { ClipLoader } from 'react-spinners';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend);

const PowerChart = ({ data, loading }) => {
    // Get today's date
    const today = new Date();
    // Get the date 30 days ago
    const last30Days = new Date(today);
    last30Days.setDate(today.getDate() - 31);

    // Filter the data to include only the last 30 days
    const filteredData = data.filter(item => new Date(item.date) >= last30Days);

    // Prepare the data for the chart
    const chartData = {
        labels: filteredData.map(item => item.date),
        datasets: [
            {
                label: 'Active Energy kwh ',
                data: filteredData.map(item => parseFloat(item.activePower)),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Allow height and width to be set independently
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Active Energy Last 30 Days',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div style={{ width: '100%', height: `${filteredData.length > 0 ? '400px' : '60px'}` }}>
            {loading ? (
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                       <ClipLoader color="#36d7b7" size={50} />
                    <h5>Loading...</h5>
                </div>
            ) : filteredData.length > 0 ? (
                <Line data={chartData} options={options} />
            ) : (
                <div style={{ textAlign: 'center', marginTop: '30px', width: '100%' }}>
                    <h5>No data available for the last 30 days.</h5>
                </div>
            )}
        </div>
    );
};

export default PowerChart;