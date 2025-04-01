import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const OrderChart = ({OrderData}) => {
    // console.log('ordersdata',OrderData?.orderStatusSummary?.Delivered);
    
    // Data for the Doughnut chart
    const totalOrders = OrderData?.totalOrders
    const delivered = OrderData?.orderStatusSummary?.Delivered || 0
    const cancelled = OrderData?.orderStatusSummary?.Cancelled || 0
    const rejected = OrderData?.orderStatusSummary?.Rejected  || 0 
   const data = {
        labels: ["Delivered", "Cancelled", "Rejected"],
        datasets: [
            {
                // data: [70, 40, 30], // Adjust percentages
                data: [delivered, cancelled, rejected], // Adjust percentages
                backgroundColor: ["#FF5722", "#8E44AD", "#E74C3C"], // Colors for each category
                borderWidth: 0,
            },
        ],
    };

    const options = {
        cutout: "80%", // Inner circle size
        plugins: {
            tooltip: {
                enabled: true,
            },
            legend: {
                display: false, // Disable default legend
            },
        },
    };
    const deliveredPercentage = totalOrders ? (delivered / totalOrders) * 100 : 0;
    const cancelledPercentage = totalOrders ? (cancelled / totalOrders) * 100 : 0;
    const rejectedPercentage = totalOrders ? (rejected / totalOrders) * 100 : 0;
    
    return (
        <div className="flex items-center flex-col md:flex-row justify-center space-x-8  w-full h-[100%] ">
            {/* Doughnut Chart */}
            <div className="relative w-1/2 h-[80%] ">
                <Doughnut data={data} options={options} className="text-center " />
                <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center">
                    <p className="text-sm text-gray-500 ">Total</p>
                    <p className="text-lg font-bold">{totalOrders}</p>
                </div>
            </div>

            {/* Labels */}
            <div className="space-y-4 w-full md:w-1/2 p-12">
                <div className="flex items-center j space-x-2">
                    <div className={`w-4 h-1 bg-[${data.datasets[0].backgroundColor[0]}] `}></div>
                    <span className="text-sm text-gray-700">
                        {/*Delivered (<b>{data.datasets[0].data[0]}%</b>) */}
                        Delivered (<b>{deliveredPercentage.toFixed(2)}%</b>)
                    </span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className={`w-4 h-1 bg-[${data.datasets[0].backgroundColor[1]}] `}></div>
                    <span className="text-sm text-gray-700">
                    Cancelled (<b>{cancelledPercentage.toFixed(2)}%</b>)
                    </span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className={`w-4 h-1 bg-[${data.datasets[0].backgroundColor[2]}]`}></div>
                    <span className="text-sm text-gray-700">
                    Rejected (<b>{rejectedPercentage.toFixed(2)}%</b>)
                    </span>
                </div>
            </div>
        </div>
    );
};

export default OrderChart;
