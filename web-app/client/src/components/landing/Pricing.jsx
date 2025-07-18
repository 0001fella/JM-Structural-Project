import React from 'react';
import {
  FiUsers, FiCheckCircle, FiHardDrive, FiDownload, FiTool,
  FiCloud, FiArrowRight, FiCreditCard, FiSmartphone,
  FiDollarSign, FiBriefcase
} from 'react-icons/fi';

// Updated Professional Color Palette
const colors = {
  bluePrimary: '#2563EB',    // Vibrant professional blue
  blueDark: '#1E40AF',       // Dark blue for accents
  greenPrimary: '#10B981',   // Professional green
  greenDark: '#047857',      // Dark green for hover states
  white: '#FFFFFF',
  black: '#111827',          // Deep black for text
  grayLight: '#F3F4F6',      // Light gray for backgrounds
};

// Pricing Card Component
const PricingCard = ({ plan, isFeatured = false }) => (
  <div className={`
    bg-white rounded-3xl p-8 shadow-lg border border-gray-200 transition-all duration-300
    hover:shadow-xl hover:scale-[1.02] hover:border-blue-200
    ${isFeatured ? 'ring-2 ring-green-primary shadow-xl relative' : ''}
  `}>
    {isFeatured && (
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-primary text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
        Most Popular
      </span>
    )}
    <h3 className="text-3xl font-extrabold mb-3 text-center" style={{ color: colors.black }}>{plan.name}</h3>
    <p className="text-4xl font-extrabold mb-6 text-center" style={{ color: colors.bluePrimary }}>{plan.price}</p>
    <ul className="mb-8 space-y-4">
      {plan.features.map((feature, i) => (
        <li key={i} className="flex items-center gap-3 text-base group" style={{ color: colors.black }}>
          <span className="text-xl transition-colors duration-300 group-hover:text-green-primary">
            {feature.icon}
          </span>
          <span className="transition-colors duration-300 group-hover:text-bluePrimary">
            {feature.text}
          </span>
        </li>
      ))}
    </ul>
    <button className={`
      w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center
      group overflow-hidden relative
      ${isFeatured 
        ? 'bg-gradient-to-r from-greenPrimary to-greenDark' 
        : 'bg-gradient-to-r from-bluePrimary to-blueDark'}
    `}>
      <span className="relative z-10 flex items-center">
        {plan.buttonText} 
        <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
    </button>
  </div>
);

// Payment Method Component
const PaymentMethod = ({ method }) => (
  <div className="bg-white border border-gray-200 p-7 rounded-2xl text-center shadow-sm 
                 transition-all duration-300 hover:shadow-md hover:border-blue-200 hover:translate-y-[-4px]">
    <div className="text-4xl mb-4 transition-colors duration-300 group-hover:text-green-primary" 
         style={{ color: colors.bluePrimary }}>
      {method.icon}
    </div>
    <h4 className="font-bold text-xl mb-2" style={{ color: colors.black }}>{method.name}</h4>
    <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-bluePrimary">
      {method.description}
    </p>
  </div>
);

// Main Pricing Component
const Pricing = () => {
  const pricingPlans = [
    {
      name: "Basic",
      price: "KES 5,000",
      features: [
        { text: "Up to 5 projects", icon: <FiUsers /> },
        { text: "AI Sketch Recognition", icon: <FiCheckCircle /> },
        { text: "Automated Quantity Takeoff", icon: <FiCheckCircle /> },
        { text: "1GB Cloud Storage", icon: <FiHardDrive /> },
        { text: "Standard Report Generation", icon: <FiDownload /> },
        { text: "Email Support", icon: <FiTool /> },
      ],
      buttonText: "Start Basic",
    },
    {
      name: "Professional",
      price: "KES 15,000",
      features: [
        { text: "Unlimited Projects", icon: <FiUsers /> },
        { text: "All Basic Features", icon: <FiCheckCircle /> },
        { text: "Site Analysis AI", icon: <FiCheckCircle /> },
        { text: "BIM Integration (Revit, ArchiCAD)", icon: <FiCheckCircle /> },
        { text: "10GB Cloud Storage", icon: <FiHardDrive /> },
        { text: "Advanced Analytics & Reports", icon: <FiDownload /> },
        { text: "Priority Email & Chat Support", icon: <FiTool /> },
      ],
      buttonText: "Get Professional",
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        { text: "Tailored Solutions for Large Firms", icon: <FiUsers /> },
        { text: "All Pro Features", icon: <FiCheckCircle /> },
        { text: "On-premise Deployment Options", icon: <FiCloud /> },
        { text: "Dedicated Account Manager", icon: <FiTool /> },
        { text: "Custom Integrations (SAP, ArcGIS)", icon: <FiCheckCircle /> },
        { text: "Unlimited Cloud Storage", icon: <FiHardDrive /> },
        { text: "24/7 Phone & On-site Support", icon: <FiTool /> },
      ],
      buttonText: "Contact Sales",
    }
  ];

  const paymentMethods = [
    {
      name: "Credit/Debit Card",
      icon: <FiCreditCard />,
      description: "Secure payments via Visa, Mastercard, and American Express.",
    },
    {
      name: "M-Pesa",
      icon: <FiSmartphone />,
      description: "Convenient mobile payments for Kenyan users.",
    },
    {
      name: "Bank Transfer",
      icon: <FiBriefcase />,
      description: "Direct bank transfers for enterprise payments.",
    },
    {
      name: "PayPal",
      icon: <FiDollarSign />,
      description: "International payments processed securely.",
    },
  ];

  return (
    <section id="pricing" className="bg-white py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold mb-5 leading-tight" style={{ color: colors.black }}>
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl max-w-2xl mx-auto text-gray-600">
            Unlock powerful features designed to elevate your business. Select the plan that aligns with your scale and needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 mb-28 items-start">
          {pricingPlans.map((plan, i) => (
            <PricingCard key={i} plan={plan} isFeatured={plan.name === "Professional"} />
          ))}
        </div>

        <div className="text-center mb-14">
          <h3 className="text-4xl font-extrabold mb-5" style={{ color: colors.black }}>
            Flexible Payment Options
          </h3>
          <p className="text-lg max-w-xl mx-auto text-gray-600">
            We provide a variety of secure and convenient ways to pay, ensuring a smooth transaction experience.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {paymentMethods.map((method, i) => (
            <PaymentMethod key={i} method={method} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;