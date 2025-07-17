import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaFileInvoice, FaRobot, FaFilePdf, FaTrash,
  FaArrowRight
} from 'react-icons/fa';

const AIPoweredQuotation = () => {
  const [quotationData, setQuotationData] = useState({
    projectName: 'New Residential Building',
    clientName: '',
    projectType: 'Residential',
    buildingClass: 'Class B (Standard)',
    size: 1200,
    location: 'Nairobi',
    foundationType: 'Strip Foundation',
    duration: 6,
    materials: [],
    labor: [],
    overheads: 15, // percentage
    profit: 20, // percentage
    vat: 16, // VAT percentage
    contingencies: 5 // percentage
  });
  
  const [generatedQuotation, setGeneratedQuotation] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiAssistantVisible, setAiAssistantVisible] = useState(false);
  const [aiMessages, setAiMessages] = useState([]);
  
  // Quotation options
  const projectTypes = ['Residential', 'Commercial', 'Industrial', 'Infrastructure'];
  const locations = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Other'];
  const buildingClasses = ['Class A (Luxury)', 'Class B (Standard)', 'Class C (Economy)'];
  const foundationTypes = ['Strip Foundation', 'Raft Foundation', 'Pile Foundation', 'Pad Foundation'];
  const materialOptions = [
    { name: 'Concrete', unit: 'm³', rates: { Nairobi: 15000, Mombasa: 16000, Kisumu: 14500 } },
    { name: 'Steel', unit: 'kg', rates: { Nairobi: 350, Mombasa: 370, Kisumu: 340 } },
    { name: 'Timber', unit: 'm', rates: { Nairobi: 1200, Mombasa: 1300, Kisumu: 1150 } },
    { name: 'Bricks', unit: 'piece', rates: { Nairobi: 25, Mombasa: 28, Kisumu: 23 } },
    { name: 'Glass', unit: 'm²', rates: { Nairobi: 4500, Mombasa: 4800, Kisumu: 4300 } }
  ];
  
  const laborOptions = [
    { name: 'Mason', dailyRate: { Nairobi: 2500, Mombasa: 2700, Kisumu: 2400 } },
    { name: 'Carpenter', dailyRate: { Nairobi: 2200, Mombasa: 2400, Kisumu: 2100 } },
    { name: 'Electrician', dailyRate: { Nairobi: 2800, Mombasa: 3000, Kisumu: 2600 } },
    { name: 'Plumber', dailyRate: { Nairobi: 2600, Mombasa: 2800, Kisumu: 2400 } }
  ];

  const handleQuotationChange = (field, value) => {
    setQuotationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addMaterial = (material) => {
    setQuotationData(prev => ({
      ...prev,
      materials: [...prev.materials, { name: material, quantity: 1 }]
    }));
  };

  const addLabor = (labor) => {
    setQuotationData(prev => ({
      ...prev,
      labor: [...prev.labor, { name: labor, quantity: 1 }]
    }));
  };

  const updateMaterialQuantity = (index, quantity) => {
    setQuotationData(prev => {
      const materials = [...prev.materials];
      if (materials[index]) {
        materials[index] = { ...materials[index], quantity: Math.max(1, quantity) };
      }
      return { ...prev, materials };
    });
  };

  const updateLaborQuantity = (index, quantity) => {
    setQuotationData(prev => {
      const labor = [...prev.labor];
      if (labor[index]) {
        labor[index] = { ...labor[index], quantity: Math.max(1, quantity) };
      }
      return { ...prev, labor };
    });
  };

  const removeMaterial = (index) => {
    setQuotationData(prev => {
      const materials = [...prev.materials];
      materials.splice(index, 1);
      return { ...prev, materials };
    });
  };

  const removeLabor = (index) => {
    setQuotationData(prev => {
      const labor = [...prev.labor];
      labor.splice(index, 1);
      return { ...prev, labor };
    });
  };

  const generateQuotation = () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // Material costs calculation
      const materialCost = quotationData.materials.reduce((total, item) => {
        const rate = materialOptions.find(m => m.name === item.name)?.rates[quotationData.location] || 0;
        return total + (item.quantity * rate);
      }, 0);
      
      // Labor costs calculation
      const laborCost = quotationData.labor.reduce((total, item) => {
        const dailyRate = laborOptions.find(l => l.name === item.name)?.dailyRate[quotationData.location] || 0;
        const days = item.quantity * quotationData.duration * 0.3; // Simplified estimation
        return total + (days * dailyRate);
      }, 0);
      
      // Foundation cost based on type
      const foundationCostMap = {
        'Strip Foundation': 2500 * quotationData.size,
        'Raft Foundation': 3800 * quotationData.size,
        'Pile Foundation': 5500 * quotationData.size,
        'Pad Foundation': 3200 * quotationData.size
      };
      const foundationCost = foundationCostMap[quotationData.foundationType] || 3000 * quotationData.size;
      
      // Building class multiplier
      const classMultiplier = {
        'Class A (Luxury)': 1.4,
        'Class B (Standard)': 1.0,
        'Class C (Economy)': 0.8
      }[quotationData.buildingClass] || 1.0;
      
      // Location adjustment
      const locationFactor = {
        'Nairobi': 1.25,
        'Mombasa': 1.3,
        'Kisumu': 1.15,
        'Nakuru': 1.1,
        'Eldoret': 1.1,
        'Other': 1.0
      }[quotationData.location] || 1.0;
      
      // Base construction cost
      const baseCost = (foundationCost + materialCost + laborCost) * classMultiplier * locationFactor;
      
      // Additional costs
      const overheads = baseCost * (quotationData.overheads / 100);
      const profit = baseCost * (quotationData.profit / 100);
      const contingencies = baseCost * (quotationData.contingencies / 100);
      
      // Subtotal
      const subtotal = baseCost + overheads + profit + contingencies;
      
      // VAT
      const vatAmount = subtotal * (quotationData.vat / 100);
      
      // Total cost
      const totalCost = subtotal + vatAmount;
      
      // Generate detailed breakdown
      const materialsBreakdown = quotationData.materials.map(item => {
        const material = materialOptions.find(m => m.name === item.name);
        const rate = material?.rates[quotationData.location] || 0;
        return {
          item: `${item.name} (${material?.unit})`,
          quantity: item.quantity,
          unitRate: rate.toLocaleString('en-KE', { style: 'currency', currency: 'KES' }),
          total: (item.quantity * rate).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })
        };
      });
      
      const laborBreakdown = quotationData.labor.map(item => {
        const labor = laborOptions.find(l => l.name === item.name);
        const dailyRate = labor?.dailyRate[quotationData.location] || 0;
        const days = item.quantity * quotationData.duration * 0.3;
        return {
          item: `${item.name} (${item.quantity} workers)`,
          days: days.toFixed(1),
          dailyRate: dailyRate.toLocaleString('en-KE', { style: 'currency', currency: 'KES' }),
          total: (days * dailyRate).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })
        };
      });
      
      setGeneratedQuotation({
        projectId: `QUO-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toLocaleDateString('en-KE', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        totalCost: totalCost.toLocaleString('en-KE', { style: 'currency', currency: 'KES' }),
        breakdown: {
          materials: materialsBreakdown,
          labor: laborBreakdown,
          foundation: foundationCost.toLocaleString('en-KE', { style: 'currency', currency: 'KES' }),
          baseCost: baseCost.toLocaleString('en-KE', { style: 'currency', currency: 'KES' }),
          overheads: overheads.toLocaleString('en-KE', { style: 'currency', currency: 'KES' }),
          profit: profit.toLocaleString('en-KE', { style: 'currency', currency: 'KES' }),
          contingencies: contingencies.toLocaleString('en-KE', { style: 'currency', currency: 'KES' }),
          subtotal: subtotal.toLocaleString('en-KE', { style: 'currency', currency: 'KES' }),
          vat: vatAmount.toLocaleString('en-KE', { style: 'currency', currency: 'KES' }),
          total: totalCost.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })
        },
        details: quotationData
      });
      
      setIsGenerating(false);
    }, 2500); // Simulate AI processing time
  };

  const askAI = (question) => {
    const messages = [...aiMessages];
    messages.push({ text: question, sender: 'user' });
    
    setAiMessages(messages);
    setAiAssistantVisible(true);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your project parameters, I recommend using reinforced concrete for the main structure. This material is cost-effective and readily available in Kenya.",
        "For a project of this size in Nairobi, you should budget approximately 15 million KES for materials and labor.",
        "Our AI has detected potential soil instability at your site location. I recommend a deeper foundation with pile supports.",
        "Based on current market trends, steel prices are expected to rise by 8% in the next quarter. I suggest locking in your material orders soon.",
        "Your design meets 92% of Kenyan building regulations. The main issue is insufficient parking space - you'll need to allocate an additional 100 sq meters."
      ];
      
      const response = responses[Math.floor(Math.random() * responses.length)];
      
      setAiMessages(prev => [
        ...prev,
        { text: response, sender: 'ai' }
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-5 py-2 rounded-full mb-6">
            <span className="text-white font-medium tracking-wide text-sm">
              <span className="mr-2">✦</span> AI-Powered Construction Intelligence
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            <span className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent">AI-Powered</span> Quotation Generator
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Professional BOQ generation for Kenyan quantity surveyors - Save 80% time on quotations
          </p>
        </div>
        
        {/* Quotation Generator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Input Form */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
            <h4 className="text-xl font-bold mb-6 text-white">Project Details</h4>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-2">Project Name</label>
                <input 
                  type="text" 
                  value={quotationData.projectName}
                  onChange={(e) => handleQuotationChange('projectName', e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                  placeholder="Enter project name"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Client Name</label>
                <input 
                  type="text" 
                  value={quotationData.clientName}
                  onChange={(e) => handleQuotationChange('clientName', e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                  placeholder="Enter client name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2">Project Type</label>
                  <select 
                    value={quotationData.projectType}
                    onChange={(e) => handleQuotationChange('projectType', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                  >
                    {projectTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-400 mb-2">Building Class</label>
                  <select 
                    value={quotationData.buildingClass}
                    onChange={(e) => handleQuotationChange('buildingClass', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                  >
                    {buildingClasses.map(cls => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2">Size (sq ft)</label>
                  <div className="relative">
                    <input 
                      type="range" 
                      min="500" 
                      max="5000" 
                      step="100"
                      value={quotationData.size}
                      onChange={(e) => handleQuotationChange('size', parseInt(e.target.value))}
                      className="w-full accent-[#6366f1]"
                    />
                    <div className="flex justify-between text-gray-400 text-sm mt-1">
                      <span>500</span>
                      <span className="text-white font-medium">{quotationData.size} sq ft</span>
                      <span>5000</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-400 mb-2">Duration (months)</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="36"
                    value={quotationData.duration}
                    onChange={(e) => handleQuotationChange('duration', parseInt(e.target.value))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2">Location</label>
                  <select 
                    value={quotationData.location}
                    onChange={(e) => handleQuotationChange('location', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                  >
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-400 mb-2">Foundation Type</label>
                  <select 
                    value={quotationData.foundationType}
                    onChange={(e) => handleQuotationChange('foundationType', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                  >
                    {foundationTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Material Selection */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-400">Materials</label>
                  <div className="relative">
                    <select 
                      onChange={(e) => addMaterial(e.target.value)}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#6366f1]"
                      defaultValue=""
                    >
                      <option value="" disabled>Add Material</option>
                      {materialOptions.map(material => (
                        <option key={material.name} value={material.name}>{material.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 max-h-48 overflow-y-auto">
                  {quotationData.materials.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No materials added</p>
                  ) : (
                    quotationData.materials.map((material, index) => (
                      <div key={index} className="flex items-center justify-between mb-3 last:mb-0">
                        <div>
                          <span className="text-white">{material.name}</span>
                          <div className="flex items-center mt-1">
                            <button 
                              className="w-6 h-6 bg-gray-700 rounded-l flex items-center justify-center text-gray-300 hover:bg-gray-600"
                              onClick={() => updateMaterialQuantity(index, material.quantity - 1)}
                            >
                              -
                            </button>
                            <input 
                              type="number" 
                              min="1"
                              value={material.quantity}
                              onChange={(e) => updateMaterialQuantity(index, parseInt(e.target.value))}
                              className="w-12 bg-gray-900 border-y border-gray-700 text-center text-white py-0.5"
                            />
                            <button 
                              className="w-6 h-6 bg-gray-700 rounded-r flex items-center justify-center text-gray-300 hover:bg-gray-600"
                              onClick={() => updateMaterialQuantity(index, material.quantity + 1)}
                            >
                              +
                            </button>
                            <span className="text-gray-500 text-sm ml-2">
                              {materialOptions.find(m => m.name === material.name)?.unit}
                            </span>
                          </div>
                        </div>
                        <button 
                          className="text-red-500 hover:text-red-400"
                          onClick={() => removeMaterial(index)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              {/* Labor Selection */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-400">Labor</label>
                  <div className="relative">
                    <select 
                      onChange={(e) => addLabor(e.target.value)}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#6366f1]"
                      defaultValue=""
                    >
                      <option value="" disabled>Add Labor</option>
                      {laborOptions.map(labor => (
                        <option key={labor.name} value={labor.name}>{labor.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 max-h-48 overflow-y-auto">
                  {quotationData.labor.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No labor added</p>
                  ) : (
                    quotationData.labor.map((labor, index) => (
                      <div key={index} className="flex items-center justify-between mb-3 last:mb-0">
                        <div>
                          <span className="text-white">{labor.name}</span>
                          <div className="flex items-center mt-1">
                            <button 
                              className="w-6 h-6 bg-gray-700 rounded-l flex items-center justify-center text-gray-300 hover:bg-gray-600"
                              onClick={() => updateLaborQuantity(index, labor.quantity - 1)}
                            >
                              -
                            </button>
                            <input 
                              type="number" 
                              min="1"
                              value={labor.quantity}
                              onChange={(e) => updateLaborQuantity(index, parseInt(e.target.value))}
                              className="w-12 bg-gray-900 border-y border-gray-700 text-center text-white py-0.5"
                            />
                            <button 
                              className="w-6 h-6 bg-gray-700 rounded-r flex items-center justify-center text-gray-300 hover:bg-gray-600"
                              onClick={() => updateLaborQuantity(index, labor.quantity + 1)}
                            >
                              +
                            </button>
                            <span className="text-gray-500 text-sm ml-2">workers</span>
                          </div>
                        </div>
                        <button 
                          className="text-red-500 hover:text-red-400"
                          onClick={() => removeLabor(index)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2">Overheads (%)</label>
                  <input 
                    type="number" 
                    min="0" 
                    max="50"
                    value={quotationData.overheads}
                    onChange={(e) => handleQuotationChange('overheads', parseInt(e.target.value))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 mb-2">Profit Margin (%)</label>
                  <input 
                    type="number" 
                    min="0" 
                    max="50"
                    value={quotationData.profit}
                    onChange={(e) => handleQuotationChange('profit', parseInt(e.target.value))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                  />
                </div>
              </div>
              
              <motion.button
                className="w-full py-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-bold rounded-xl flex items-center justify-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={generateQuotation}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating BOQ...
                  </>
                ) : (
                  "Generate Professional Quotation"
                )}
              </motion.button>
            </div>
          </div>
          
          {/* Output Preview */}
          <div className="relative">
            <div className={`bg-gray-800 border border-gray-700 rounded-2xl p-6 h-full transition-opacity ${generatedQuotation ? 'opacity-100' : 'opacity-70'}`}>
              <h4 className="text-xl font-bold mb-6 text-white">AI-Generated Quotation</h4>
              
              {generatedQuotation ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Quotation Header */}
                  <div className="border-b border-gray-700 pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold text-white">{generatedQuotation.details.projectName}</h2>
                        <div className="text-gray-400 text-sm">Quotation ID: {generatedQuotation.projectId}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-400">Date</div>
                        <div className="text-white">{generatedQuotation.date}</div>
                      </div>
                    </div>
                    
                    {generatedQuotation.details.clientName && (
                      <div className="mt-4">
                        <div className="text-gray-400">Prepared for:</div>
                        <div className="text-white">{generatedQuotation.details.clientName}</div>
                      </div>
                    )}
                  </div>
                  
                  {/* Project Summary */}
                  <div>
                    <h3 className="text-lg font-bold mb-3 text-white">Project Summary</h3>
                    <div className="bg-gray-700 rounded-xl p-4 grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-gray-400 text-sm">Project Type</div>
                        <div className="text-white">{generatedQuotation.details.projectType}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Building Class</div>
                        <div className="text-white">{generatedQuotation.details.buildingClass}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Size</div>
                        <div className="text-white">{generatedQuotation.details.size} sq ft</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Location</div>
                        <div className="text-white">{generatedQuotation.details.location}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Foundation</div>
                        <div className="text-white">{generatedQuotation.details.foundationType}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Duration</div>
                        <div className="text-white">{generatedQuotation.details.duration} months</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Cost Breakdown */}
                  <div>
                    <h3 className="text-lg font-bold mb-3 text-white">Cost Breakdown</h3>
                    
                    {/* Materials */}
                    {generatedQuotation.breakdown.materials.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold mb-2 text-gray-300">Materials</h4>
                        <div className="bg-gray-700 rounded-xl p-4">
                          {generatedQuotation.breakdown.materials.map((item, index) => (
                            <div key={index} className="flex justify-between mb-2 last:mb-0">
                              <div className="text-gray-400">{item.item}</div>
                              <div className="text-right">
                                <div>{item.quantity} × {item.unitRate} = {item.total}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Labor */}
                    {generatedQuotation.breakdown.labor.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold mb-2 text-gray-300">Labor</h4>
                        <div className="bg-gray-700 rounded-xl p-4">
                          {generatedQuotation.breakdown.labor.map((item, index) => (
                            <div key={index} className="flex justify-between mb-2 last:mb-0">
                              <div className="text-gray-400">{item.item}</div>
                              <div className="text-right">
                                <div>{item.days} days × {item.dailyRate} = {item.total}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Summary */}
                    <div className="bg-gray-700 rounded-xl p-4">
                      <div className="flex justify-between mb-2">
                        <div className="text-gray-400">Foundation Cost:</div>
                        <div className="text-white">{generatedQuotation.breakdown.foundation}</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="text-gray-400">Base Construction Cost:</div>
                        <div className="text-white">{generatedQuotation.breakdown.baseCost}</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="text-gray-400">Overheads ({generatedQuotation.details.overheads}%):</div>
                        <div className="text-white">{generatedQuotation.breakdown.overheads}</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="text-gray-400">Profit Margin ({generatedQuotation.details.profit}%):</div>
                        <div className="text-white">{generatedQuotation.breakdown.profit}</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="text-gray-400">Contingencies (5%):</div>
                        <div className="text-white">{generatedQuotation.breakdown.contingencies}</div>
                      </div>
                      <div className="flex justify-between mb-2 pt-2 border-t border-gray-600">
                        <div className="text-gray-400">Subtotal:</div>
                        <div className="text-white font-semibold">{generatedQuotation.breakdown.subtotal}</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="text-gray-400">VAT ({generatedQuotation.details.vat}%):</div>
                        <div className="text-white">{generatedQuotation.breakdown.vat}</div>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-600">
                        <div className="text-xl text-gray-300 font-bold">Total Estimated Cost:</div>
                        <div className="text-2xl font-bold text-white">{generatedQuotation.totalCost}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <motion.button
                      className="flex-1 py-3 bg-[#6366f1] text-white rounded-xl font-medium flex items-center justify-center"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaFilePdf className="mr-2" />
                      Download PDF
                    </motion.button>
                    <motion.button
                      className="flex-1 py-3 bg-gray-700 text-white rounded-xl font-medium flex items-center justify-center"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => askAI("How can I optimize this quotation for cost savings?")}
                    >
                      <FaRobot className="mr-2" />
                      Optimize with AI
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center py-10 text-center">
                  <div className="mb-6">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-r from-[#6366f1]/10 to-[#8b5cf6]/10 rounded-full flex items-center justify-center">
                      <FaFileInvoice className="text-4xl text-[#6366f1]" />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-white">Generate Professional BOQ</h4>
                  <p className="text-gray-400 max-w-md">
                    Enter your project details to instantly generate a Kenya-standard Bill of Quantities with accurate pricing for materials and labor.
                  </p>
                  <div className="mt-6 flex items-center justify-center">
                    <div className="flex">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-6 bg-[#6366f1] mx-1 rounded-full"
                          animate={{ 
                            height: [6, 20, 6],
                          }}
                          transition={{ 
                            duration: 1 + i * 0.3,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        />
                      ))}
                    </div>
                    <span className="ml-3 text-[#6366f1]">AI Processing Ready</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* AI Optimization Tips */}
            {generatedQuotation && (
              <motion.div 
                className="absolute -bottom-6 left-0 right-0 bg-gradient-to-r from-[#0d9488] to-[#115e59] rounded-xl p-4 text-white text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-start">
                  <FaRobot className="text-lg mr-2 mt-0.5" />
                  <div>
                    <strong>AI Recommendation:</strong> Using locally sourced timber from Kakamega could reduce material costs by ~18% while maintaining quality. Consider negotiating bulk rates with Bamburi Cement for additional 7% savings.
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      {/* Floating AI Assistant */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.div
          className="w-16 h-16 rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-xl cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setAiAssistantVisible(!aiAssistantVisible)}
        >
          <FaRobot className="text-2xl text-white" />
        </motion.div>
        
        <AnimatePresence>
          {aiAssistantVisible && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="absolute bottom-full right-0 mb-4 w-80 bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] p-4 text-white">
                <div className="flex items-center">
                  <FaRobot className="text-xl mr-2" />
                  <h3 className="font-bold">Construction AI Assistant</h3>
                </div>
              </div>
              
              <div className="p-4 max-h-80 overflow-y-auto">
                {aiMessages.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400">Hi! I'm your AI construction assistant.</p>
                    <p className="text-gray-400 mt-2">Ask me anything about your project!</p>
                  </div>
                ) : (
                  aiMessages.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
                    >
                      <div 
                        className={`inline-block p-3 rounded-xl max-w-[80%] ${
                          msg.sender === 'user' 
                            ? 'bg-[#6366f1] text-white' 
                            : 'bg-gray-700 text-gray-300'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="p-4 border-t border-gray-700">
                <div className="flex">
                  <input 
                    type="text" 
                    placeholder="Ask about your project..." 
                    className="flex-1 bg-gray-700 text-white rounded-l-lg px-4 py-2 focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        askAI(e.target.value.trim());
                        e.target.value = '';
                      }
                    }}
                  />
                  <button 
                    className="bg-[#6366f1] text-white px-4 rounded-r-lg"
                    onClick={(e) => {
                      const input = e.target.previousElementSibling;
                      if (input.value.trim()) {
                        askAI(input.value.trim());
                        input.value = '';
                      }
                    }}
                  >
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AIPoweredQuotation;