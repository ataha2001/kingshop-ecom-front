import React, { useState } from "react";
import DrilldownFilterForm from "./DrilldownFilterForm";
import { FaFilter } from "react-icons/fa";

const ProductTableWithFilter = () => {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="p-4">
      {/* Toolbar */}
      <div className="flex items-center justify-end gap-4 mb-4">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-1"
        >
          <FaFilter /> Filter
        </button>
      </div>

      {/* Filter Form */}
      {showFilter && (
        <DrilldownFilterForm
          onClose={() => setShowFilter(false)}
          onSearch={() => alert("Searching...")}
          onClear={() => alert("Clearing...")}
        />
      )}

      {/* Your Product Table Below */}
      <div>
        {/* Add your existing table component here */}
      </div>
    </div>
  );
};

export default ProductTableWithFilter;
