import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSave, FaFilePdf, FaFileExcel } from 'react-icons/fa';

const EditableBOQ = ({ quotation, darkMode, cardBg, borderColor }) => {
  const [items, setItems] = useState([]);
  const [profitMargin, setProfitMargin] = useState(15);
  const [subtotal, setSubtotal] = useState(0);
  const [taxRate] = useState(16); // 16% tax rate
  const [taxAmount, setTaxAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [newItem, setNewItem] = useState({
    item: '',
    description: '',
    quantity: 1,
    unit: 'unit',
    unitPrice: 0
  });

  // Initialize when quotation changes
  useEffect(() => {
    if (quotation) {
      setItems(quotation.items);
      calculateTotals(quotation.items);
    } else {
      setItems([]);
      setSubtotal(0);
      setTaxAmount(0);
      setTotal(0);
    }
  }, [quotation]);

  // Calculate totals when items or profit margin change
  const calculateTotals = (itemsArray) => {
    const sub = itemsArray.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    setSubtotal(sub);
    
    const tax = sub * (taxRate / 100);
    setTaxAmount(tax);
    
    const totalWithProfit = (sub + tax) * (1 + profitMargin / 100);
    setTotal(totalWithProfit);
  };

  // Handle changes to items
  useEffect(() => {
    calculateTotals(items);
  }, [items, profitMargin]);

  // Handle field changes for editing
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    
    // Convert to number if quantity or price
    if (field === 'quantity' || field === 'unitPrice') {
      value = parseFloat(value) || 0;
    }
    
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setItems(updatedItems);
  };

  // Handle new item input changes
  const handleNewItemChange = (field, value) => {
    if (field === 'quantity' || field === 'unitPrice') {
      value = parseFloat(value) || 0;
    }
    
    setNewItem({ ...newItem, [field]: value });
  };

  // Add a new item to the BOQ
  const addNewItem = () => {
    if (!newItem.item || !newItem.description) return;
    
    const itemWithTotal = {
      ...newItem,
      total: newItem.quantity * newItem.unitPrice
    };
    
    setItems([...items, itemWithTotal]);
    setNewItem({
      item: '',
      description: '',
      quantity: 1,
      unit: 'unit',
      unitPrice: 0
    });
  };

  // Start editing an item
  const startEditing = (index) => {
    setIsEditing(true);
    setEditItem(index);
  };

  // Delete an item
  const deleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  // Save changes
  const saveChanges = () => {
    setIsEditing(false);
    setEditItem(null);
    // In a real app, you would save to backend here
  };

  // Export as PDF
  const exportAsPDF = () => {
    alert('PDF export functionality would be implemented here');
    // Actual implementation would use a PDF library
  };

  // Export as Excel
  const exportAsExcel = () => {
    alert('Excel export functionality would be implemented here');
    // Actual implementation would use an Excel library
  };

  // Container styling
  const containerClasses = `${cardBg} rounded-xl shadow-lg overflow-hidden border ${
    darkMode ? 'border-gray-700' : 'border-gray-200'
  }`;

  // Header styling
  const headerClasses = `p-4 border-b ${
    darkMode ? 'border-gray-700 bg-gray-850' : 'border-gray-200 bg-gray-50'
  }`;

  // Table row styling
  const rowClasses = `border-b ${
    darkMode ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-200 hover:bg-gray-50'
  }`;

  // Input styling
  const inputClasses = `w-full p-1 bg-transparent border ${
    darkMode ? 'border-gray-600 text-white' : 'border-gray-300 text-gray-800'
  } rounded`;

  return (
    <div className={containerClasses}>
      <div className={headerClasses}>
        <div className="flex justify-between items-center">
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Bill of Quantities
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={saveChanges}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg font-medium flex items-center hover:opacity-90"
            >
              <FaSave className="mr-2" /> Save
            </button>
            <button
              onClick={exportAsPDF}
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-lg font-medium flex items-center hover:opacity-90"
            >
              <FaFilePdf className="mr-2" /> PDF
            </button>
            <button
              onClick={exportAsExcel}
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg font-medium flex items-center hover:opacity-90"
            >
              <FaFileExcel className="mr-2" /> Excel
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className={rowClasses}>
              <th className={`py-3 px-4 text-left ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Item</th>
              <th className={`py-3 px-4 text-left ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Description</th>
              <th className={`py-3 px-4 text-left ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Quantity</th>
              <th className={`py-3 px-4 text-left ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Unit</th>
              <th className={`py-3 px-4 text-left ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Unit Price</th>
              <th className={`py-3 px-4 text-left ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total</th>
              <th className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className={rowClasses}>
                <td className="py-3 px-4">
                  {isEditing && editItem === index ? (
                    <input
                      type="text"
                      value={item.item}
                      onChange={(e) => handleItemChange(index, 'item', e.target.value)}
                      className={inputClasses}
                    />
                  ) : (
                    <span className={darkMode ? 'text-gray-200' : 'text-gray-800'}>
                      {item.item}
                    </span>
                  )}
                </td>
                <td className="py-3 px-4">
                  {isEditing && editItem === index ? (
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      className={inputClasses}
                    />
                  ) : (
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {item.description}
                    </span>
                  )}
                </td>
                <td className="py-3 px-4">
                  {isEditing && editItem === index ? (
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      className={inputClasses}
                      min="0"
                      step="0.01"
                    />
                  ) : (
                    <span className={darkMode ? 'text-gray-200' : 'text-gray-800'}>
                      {item.quantity}
                    </span>
                  )}
                </td>
                <td className="py-3 px-4">
                  {isEditing && editItem === index ? (
                    <select
                      value={item.unit}
                      onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                      className={inputClasses}
                    >
                      <option value="unit">Unit</option>
                      <option value="sq ft">Sq Ft</option>
                      <option value="sq m">Sq M</option>
                      <option value="kg">Kg</option>
                      <option value="ton">Ton</option>
                      <option value="m³">m³</option>
                      <option value="day">Day</option>
                      <option value="hour">Hour</option>
                    </select>
                  ) : (
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {item.unit}
                    </span>
                  )}
                </td>
                <td className="py-3 px-4">
                  {isEditing && editItem === index ? (
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                      className={inputClasses}
                      min="0"
                      step="0.01"
                    />
                  ) : (
                    <span className={darkMode ? 'text-gray-200' : 'text-gray-800'}>
                      {item.unitPrice.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      })}
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 font-medium">
                  <span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>
                    {(item.quantity * item.unitPrice).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    })}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => startEditing(index)}
                      className={`p-2 rounded-full ${
                        darkMode 
                          ? 'text-blue-400 hover:bg-gray-700' 
                          : 'text-blue-600 hover:bg-gray-200'
                      }`}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteItem(index)}
                      className={`p-2 rounded-full ${
                        darkMode 
                          ? 'text-red-400 hover:bg-gray-700' 
                          : 'text-red-600 hover:bg-gray-200'
                      }`}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            
            {/* Add new item row */}
            <tr className={rowClasses}>
              <td className="py-3 px-4">
                <input
                  type="text"
                  value={newItem.item}
                  onChange={(e) => handleNewItemChange('item', e.target.value)}
                  placeholder="Item"
                  className={inputClasses}
                />
              </td>
              <td className="py-3 px-4">
                <input
                  type="text"
                  value={newItem.description}
                  onChange={(e) => handleNewItemChange('description', e.target.value)}
                  placeholder="Description"
                  className={inputClasses}
                />
              </td>
              <td className="py-3 px-4">
                <input
                  type="number"
                  value={newItem.quantity}
                  onChange={(e) => handleNewItemChange('quantity', e.target.value)}
                  min="0"
                  step="0.01"
                  className={inputClasses}
                />
              </td>
              <td className="py-3 px-4">
                <select
                  value={newItem.unit}
                  onChange={(e) => handleNewItemChange('unit', e.target.value)}
                  className={inputClasses}
                >
                  <option value="unit">Unit</option>
                  <option value="sq ft">Sq Ft</option>
                  <option value="sq m">Sq M</option>
                  <option value="kg">Kg</option>
                  <option value="ton">Ton</option>
                  <option value="m³">m³</option>
                  <option value="day">Day</option>
                  <option value="hour">Hour</option>
                </select>
              </td>
              <td className="py-3 px-4">
                <input
                  type="number"
                  value={newItem.unitPrice}
                  onChange={(e) => handleNewItemChange('unitPrice', e.target.value)}
                  min="0"
                  step="0.01"
                  className={inputClasses}
                />
              </td>
              <td className="py-3 px-4 font-medium">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {(newItem.quantity * newItem.unitPrice).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  })}
                </span>
              </td>
              <td className="py-3 px-4 text-center">
                <button
                  onClick={addNewItem}
                  className={`p-2 rounded-full ${
                    darkMode 
                      ? 'text-green-400 hover:bg-gray-700' 
                      : 'text-green-600 hover:bg-gray-200'
                  }`}
                >
                  <FaPlus />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Profit Margin and Summary Section */}
      <div className={`p-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className={`font-bold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Profit Margin
            </h3>
            <div className="flex items-center">
              <input
                type="range"
                min="0"
                max="50"
                value={profitMargin}
                onChange={(e) => setProfitMargin(parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <span className="ml-4 w-20 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-center font-medium">
                {profitMargin}%
              </span>
            </div>
            <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              Adjust the profit margin to see how it affects your total quotation
            </p>
          </div>
          
          <div className={`rounded-lg p-4 ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
            <h3 className={`font-bold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Quotation Summary
            </h3>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Subtotal</span>
                <span className={darkMode ? 'text-gray-200' : 'text-gray-800'}>
                  {subtotal.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  })}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Tax ({taxRate}%)
                </span>
                <span className={darkMode ? 'text-gray-200' : 'text-gray-800'}>
                  {taxAmount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  })}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Profit Margin ({profitMargin}%)
                </span>
                <span className={darkMode ? 'text-gray-200' : 'text-gray-800'}>
                  {(subtotal * (profitMargin / 100)).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  })}
                </span>
              </div>
              
              <div className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                <span className={`font-bold ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Total</span>
                <span className={`text-xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                  {total.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditableBOQ;