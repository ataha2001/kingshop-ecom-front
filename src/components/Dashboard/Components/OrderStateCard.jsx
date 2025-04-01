import React from "react";

const OverviewCard = ({ icon, color, title, value }) => {
  return (
    <div className={`bg-${color}-500 text-white p-4 rounded-lg flex items-center`}>
      <div className="text-2xl mr-4">{icon}</div>
      <div>
        <p className="text-lg">{title}</p>
        <p className="text-2xl font-bold mt-5 text-center">{value}</p>
      </div>
    </div>
  );
};

export default OverviewCard;
