'use client'
import React from "react";
import { Line } from "react-chartjs-2";
import { FaChartBar } from "react-icons/fa";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesChart = ({data}) => {
    ;
    
    const salesData  = [1673.20, 55.77]
    const data1 = {
        labels: Array.from({ length: 31 }, (_, i) => i + 1), // Days of the month
        datasets: [
            {
                label: "Sales",
                // data: [100, 120, 130, 90, 160, 140, 110, 200, 250, 190, 170, 220, 180, 230, 200, 240, 260, 220, 210, 300, 320, 310, 400, 350, 330, 370, 360, 340, 300, 280, 250],
                data: Array.from({length: 31 }, (_, i)=>{
                    const sale = data?.dailySales.find( s => s._id === i + 1)
                    return sale ? sale.total : 0
                }) ,
                
                borderColor: "#1D4ED8",
                backgroundColor: "rgba(29, 78, 216, 0.2)",
                pointBackgroundColor: "#1D4ED8",
                tension: 0.4,
                // fill:true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Day of the Month",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Sales (₹)",
                },
            },
        },
    };

    return (
        <div className="w-full bg-white md:h-[60%] md:mt-0">
            <div className="flex justify-between items-center mb-6 p-2">
                <div className="text-center flex flex-col md:flex-row items-center gap-2">
                    <FaChartBar className="text-sm md:text-xl text-blue-500 mx-auto mb-2" />
                    <div className="text-sm md:text-2xl font-bold">${data?.totalSales}</div>
                    <div className="text-sm md:text-normal text-gray-500">Total Sales</div>
                </div>
                <div className="text-center flex flex-col md:flex-row items-center gap-2 p-2">
                    <FaChartBar className="text-sm md:text-xl text-blue-500 mx-auto mb-2" />
                    <div className="text-sm md:text-2xl font-bold">₹{data?.avgSalesPerDay}</div>
                    <div className="text-sm md:text-normal   text-gray-500">Avg Sales Per Day</div>
                </div>
            </div>
            <div className="w-full ">
                {/*<h2 className="text-xl font-semibold mb-4 text-gray-700">Sales Overview</h2>*/}
                <Line data={data1} options={options} />
            </div>
        </div>
    );
};

export default SalesChart;
