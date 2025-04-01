import React from "react";

const InformationTab = ({ productInfo }) => {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Information</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700 border-collapse">
          <tbody>
            <tr className="border-b">
              <th className="py-2 px-4 font-medium text-gray-900 whitespace-nowrap">Name</th>
              <td className="py-2 px-4 whitespace-nowrap">{productInfo.name}</td>
              <th className="py-2 px-4 font-medium text-gray-900 whitespace-nowrap">SKU</th>
              <td className="py-2 px-4 whitespace-nowrap">{productInfo.sku}</td>
            </tr>
            <tr className="border-b">
              <th className="py-2 px-4 font-medium text-gray-900 whitespace-nowrap">Category</th>
              <td className="py-2 px-4 whitespace-nowrap">{productInfo.category}</td>
              <th className="py-2 px-4 font-medium text-gray-900 whitespace-nowrap">Barcode</th>
              <td className="py-2 px-4 whitespace-nowrap">{productInfo.barcode}</td>
            </tr>
            <tr className="border-b">
              <th className="py-2 px-4 font-medium text-gray-900 whitespace-nowrap">Brand</th>
              <td className="py-2 px-4 whitespace-nowrap">{productInfo.brand}</td>
              <th className="py-2 px-4 font-medium text-gray-900 whitespace-nowrap">Tax</th>
              <td className="py-2 px-4 whitespace-nowrap">{productInfo.tax}</td>
            </tr>
            <tr className="border-b">
              <th className="py-2 px-4 font-medium text-gray-900 whitespace-nowrap">Buying Price</th>
              <td className="py-2 px-4 whitespace-nowrap">{productInfo.buyingPrice}</td>
              <th className="py-2 px-4 font-medium text-gray-900 whitespace-nowrap">Selling Price</th>
              <td className="py-2 px-4 whitespace-nowrap">{productInfo.sellingPrice}</td>
            </tr>
            <tr className="border-b">
              <th className="py-2 px-4 font-medium text-gray-900 whitespace-nowrap">Max Purchase Quantity</th>
              <td className="py-2 px-4 whitespace-nowrap">{productInfo.maxPurchaseQuantity}</td>
              <th className="py-2 px-4 font-medium text-gray-900 whitespace-nowrap">Low Stock Warning</th>
              <td className="py-2 px-4 whitespace-nowrap">{productInfo.lowStockWarning}</td>
            </tr>
            <tr className="border-b">
              <th className="py-2 px-4 font-medium text-gray-900 whitespace-nowrap">Weight</th>
              <td className="py-2 px-4 whitespace-nowrap">{productInfo.weight}</td>
              <th className="py-2 px-4 font-medium text-gray-900 whitespace-nowrap">Unit</th>
              <td className="py-2 px-4 whitespace-nowrap">{productInfo.unit}</td>
            </tr>
            <tr className="border-b">
              <th className="py-2 px-4 font-medium text-gray-900 whitespace-nowrap">Purchasable</th>
              <td className="py-2 px-4 whitespace-nowrap">{productInfo.canPurchase}</td>
              <th className="py-2 px-4 font-medium text-gray-900 whitespace-nowrap">Show Stock Out</th>
              <td className="py-2 px-4 whitespace-nowrap">{productInfo.showStockOut }</td>
            </tr>
            <tr className="border-b">
              <th className="py-2 px-4 font-medium text-gray-900 whitespace-nowrap">Refundable</th>
              <td className="py-2 px-4 whitespace-nowrap">{productInfo.refundable}</td>
              <th className="py-2 px-4 font-medium text-gray-900 whitespace-nowrap">Status</th>
              <td className="py-2 px-4 whitespace-nowrap">{productInfo.status}</td>
            </tr>
            <tr className="border-b">
              <th className="py-2 px-4 font-medium text-gray-900 whitespace-nowrap">Tags</th>
              <td className="py-2 px-4" colSpan="3">
                {productInfo.tags}
              </td>
            </tr>
            <tr>
              <th className="py-2 px-4 font-medium text-gray-900 whitespace-nowrap">Description</th>
              <td className="py-2 px-4" colSpan="3">
                <div dangerouslySetInnerHTML={{ __html: productInfo.description }} />
              </td>
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InformationTab;
