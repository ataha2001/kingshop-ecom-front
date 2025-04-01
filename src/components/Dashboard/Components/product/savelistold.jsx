import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa";

const VariationList = () => {
  const [variations, setVariations] = useState([
    { sku: "SKU123", color: "White", size: "S", price: "100.00", quantity: "10" },
    { sku: "SKU124", color: "White", size: "M", price: "100.00", quantity: "15" },
    { sku: "SKU125", color: "White", size: "L", price: "100.00", quantity: "20" },
    { sku: "SKU126", color: "Black", size: "S", price: "100.00", quantity: "5" },
    { sku: "SKU127", color: "Black", size: "M", price: "100.00", quantity: "8" },
    { sku: "SKU128", color: "Black", size: "L", price: "100.00", quantity: "12" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newVariation, setNewVariation] = useState({ sku: "", color: "", size: "", price: "", quantity: "" });
  const [editVariation, setEditVariation] = useState(null);
  const [variationToDelete, setVariationToDelete] = useState(null);
  const [formError, setFormError] = useState("");

  const handleAddVariation = () => {
    if (!newVariation.sku || !newVariation.color || !newVariation.size || !newVariation.price || !newVariation.quantity) {
      setFormError("All fields are required.");
      return;
    }

    setVariations([...variations, newVariation]);
    setNewVariation({ sku: "", color: "", size: "", price: "", quantity: "" });
    setIsModalOpen(false);
    setFormError("");
  };

  const handleEditVariation = () => {
    if (!editVariation.sku || !editVariation.color || !editVariation.size || !editVariation.price || !editVariation.quantity) {
      setFormError("All fields are required.");
      return;
    }

    setVariations(
      variations.map((variation) =>
        variation.sku === editVariation.sku ? editVariation : variation
      )
    );
    setEditVariation(null);
    setIsEditModalOpen(false);
    setFormError("");
  };

  const handleDeleteVariation = () => {
    if (variationToDelete !== null) {
      setVariations(variations.filter((_, index) => index !== variationToDelete));
      setVariationToDelete(null);
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4 ">
      {/* Main List */}
      <div className="bg-white p-4 rounded">
        <div className="flex justify-between items-center mb-4 shadow-md p-4 mt-0">
          <h2 className="text-lg font-semibold">Variation</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 text-white px-4 py-2 rounded flex items-center shadow-md rounded-md"
          >
            <FaPlus className="mr-2" /> Add Variation
          </button>
        </div>
        <div className="space-y-2">
          {variations.map((variation, index) => (
            <div key={index} className="flex justify-between items-center p-2 border rounded">
              <span>
                <strong>SKU:</strong> {variation.sku} › <strong>Color:</strong> {variation.color} › <strong>Size:</strong> {variation.size} › <strong>Price:</strong> ${variation.price} › <strong>Quantity:</strong> {variation.quantity}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditVariation(variation);
                    setIsEditModalOpen(true);
                  }}
                  className="bg-green-100 text-green-600 p-2 rounded"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => {
                    setVariationToDelete(index);
                    setIsDeleteModalOpen(true);
                  }}
                  className="bg-red-100 text-red-600 p-2 rounded"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Variation Modal */}
      {isModalOpen && (
        <Modal
          title="Add New Variation"
          variation={newVariation}
          setVariation={setNewVariation}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddVariation}
          formError={formError}
        />
      )}

      {/* Edit Variation Modal */}
      {isEditModalOpen && editVariation && (
        <Modal
          title="Edit Variation"
          variation={editVariation}
          setVariation={setEditVariation}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditVariation}
          formError={formError}
          disableSKU={true}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm mx-auto">
            <div className="text-orange-400 text-6xl mb-4">
              <i className="fas fa-exclamation-circle"></i>
            </div>
            <h2 className="text-gray-800 text-2xl font-semibold mb-2">Are you sure?</h2>
            <p className="text-gray-600 mb-6">You will not be able to recover the deleted record!</p>
            <div className="flex space-x-4">
              <button
                onClick={handleDeleteVariation}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Yes, Delete it!
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                No, Cancel!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Modal Component for Add/Edit Variation
const Modal = ({ title, variation, setVariation, onClose, onSave, formError, disableSKU }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white w-full max-w-md p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <FaTimes />
        </button>
      </div>
      <div className="space-y-4">
        {formError && <p className="text-red-500 text-sm">{formError}</p>}
        <InputField
          label="SKU"
          type="text"
          value={variation.sku}
          onChange={(e) => setVariation({ ...variation, sku: e.target.value })}
          disabled={disableSKU}
        />
        <SelectField
          label="Color"
          value={variation.color}
          options={["White", "Black", "Gray", "Green"]}
          onChange={(e) => setVariation({ ...variation, color: e.target.value })}
        />
        <SelectField
          label="Size"
          value={variation.size}
          options={["S", "M", "L", "XL", "XXL"]}
          onChange={(e) => setVariation({ ...variation, size: e.target.value })}
        />
        <InputField
          label="Price"
          type="text"
          value={variation.price}
          onChange={(e) => setVariation({ ...variation, price: e.target.value })}
        />
        <InputField
          label="Quantity"
          type="number"
          value={variation.quantity}
          onChange={(e) => setVariation({ ...variation, quantity: e.target.value })}
        />
      </div>
      <div className="mt-6 flex justify-end space-x-4">
        <button onClick={onClose} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">
          Cancel
        </button>
        <button onClick={onSave} className="bg-red-500 text-white px-4 py-2 rounded">
          Save
        </button>
      </div>
    </div>
  </div>
);

// Input Field Component
const InputField = ({ label, type, value, onChange, disabled }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full border rounded p-2"
      disabled={disabled}
    />
  </div>
);

// Select Field Component
const SelectField = ({ label, value, options, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select value={value} onChange={onChange} className="mt-1 block w-full border rounded p-2">
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default VariationList;
