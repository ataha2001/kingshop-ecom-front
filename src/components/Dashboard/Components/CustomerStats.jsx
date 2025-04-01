import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const CustomerStats = ({data}) => {
    const [hourly , setHourly] = useState([])  
    const [hourlyData , setHourlyData] = useState([])  
    
    // Data for the Bar Chart
    useEffect(() => {
        if (data?.length) {
            setHourly(data.map((item) => item?._id));
            setHourlyData(data.map((item) => item?.count));
        }
    }, [data]); // Run effect when `data` updates

    const HourLabels = [
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
    ]
    const chartData = {
        labels: hourly, // Hour labels
        datasets: [
            {
                label: "Orders",
                // data: [0, 0, 0, 20, 0, 0, 0, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Sample data
                data: hourlyData, // Sample data
                backgroundColor: "rgba(54, 162, 235, 0.6)", // Bar color
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Hide legend
            },
            tooltip: {
                enabled: true, // Enable tooltips
            },
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 10, // Adjust font size
                    },
                    color: "#6b7280", // Tailwind gray-500
                },
                grid: {
                    display: false, // Hide gridlines on X-axis
                },
            },
            y: {
                ticks: {
                    font: {
                        size: 10,
                    },
                    color: "#6b7280", // Tailwind gray-500
                    stepSize: 5, // Increment steps
                },
                grid: {
                    color: "#e5e7eb", // Tailwind gray-300
                },
            },
        },
    };

    return (
        <div className="bg-white w-full">
           
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default CustomerStats;
