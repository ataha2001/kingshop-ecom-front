import React from "react";

const StatisticCard = ({ icon, color, title, value }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center">
      <div className={`text-2xl text-${color}-500 mr-4`}>{icon}</div>
      <div>
        <p className="text-lg">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatisticCard;
