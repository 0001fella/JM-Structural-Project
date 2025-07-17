import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Color Palette (Further Refined for Ultimate Depth and Professionalism) ---
const primaryGreen = '#006d7e'; // Your specific vibrant green
const darkBackground = '#0F172A'; // NEW: A very dark desaturated blue-gray (Tailwind Slate 900)
const lightTextOnDark = '#EAF0F6'; // Very soft off-white for text on dark backgrounds
const whiteContainer = '#FFFFFF'; // Sleek white for cards and containers
const darkTextOnWhite = '#1A202C'; // Dark charcoal for text on white backgrounds (Gray 900)
const lightBorder = '#D1D5DB'; // Slightly more prominent light border for crispness (Gray 300)

// Blue Colors - DIRECTLY FROM TESTIMONIALS PAGE - Adjusted for harmony
const mediumBlueAccent = '#254CBA'; // Used for primary accents
const lightBlueHighlight = '#93C5FD'; // Softer, more vibrant light blue for highlights
const evenLighterBlue = '#BFDBFE'; // Even lighter blue, for subtle background elements

// --- Inline SVG Icons for pricing features ---
const FiCheckCircle = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M22 11.08V12a10 10 0 1 1-5.93-8.5"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>);
const FiUsers = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>);
const FiHardDrive = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" y1="16" x2="6.01" y2="16"></line><line x1="10" y1="16" x2="10.01" y2="16"></line></svg>);
const FiCloud = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>);
const FiDownload = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>);
const FiTool = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-2.01 2.01a3 3 0 0 1-3.75 3.75L3 21l3-3a3 3 0 0 1 3.75-3.75l2.01-2.01a6 6 0 0 1 7.94-7.94l-3.77 3.77z"></path><path d="M21 12l-2 2"></path></svg>);
const FiArrowRight = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>);
const FiCreditCard = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>);
const FiDollarSign = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>);
const FiBank = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><rect x="3" y="10" width="18" height="12" rx="2" ry="2"></rect><path d="M12 10V2l7 4-7 4z"></path><path d="M12 10V2L5 6l7 4z"></path><line x1="2" y1="22" x2="22" y2="22"></line></svg>);
const FiSmartphone = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>);


// --- Line Glow Animation Component (Even more subtle and atmospheric) ---
const LineGlowEffect = ({ count = 10, color = lightBlueHighlight }) => {
    const lines = useRef([]);

    useEffect(() => {
        lines.current = Array.from({ length: count }).map(() => ({
            id: Math.random(),
            duration: Math.random() * 12 + 10, // 10 to 22 seconds for very slow, subtle movement
            delay: Math.random() * 12, // 0 to 12 seconds delay
            width: Math.random() * 1 + 0.5, // 0.5 to 1.5px width for extreme subtlety
            length: Math.random() * 20 + 10, // 10% to 30% of container height
            x: Math.random() * 100, // 0 to 100%
            y: Math.random() * 100, // 0 to 100%
            rotation: Math.random() * 360, // 0 to 360 degrees
            opacity: Math.random() * 0.1 + 0.01, // 0.01 to 0.11 opacity for a very faint glow
            translateX: (Math.random() - 0.5) * 40, // -20 to 20px horizontal drift
            translateY: (Math.random() - 0.5) * 40, // -20 to 20px vertical drift
        }));
    }, [count]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {lines.current.map((line) => (
                <motion.div
                    key={line.id}
                    className="absolute rounded-none" // Sharp edges
                    style={{
                        backgroundColor: color,
                        filter: 'blur(3px)', // Increased blur for maximum softness
                        width: line.width,
                        height: line.length + '%',
                        left: line.x + '%',
                        top: line.y + '%',
                        transform: `rotate(${line.rotation}deg) translateX(-50%)`,
                        transformOrigin: 'center center',
                    }}
                    initial={{ opacity: 0, scaleY: 0, x: 0, y: 0 }}
                    animate={{
                        opacity: [0, line.opacity, line.opacity, 0],
                        scaleY: [0, 1, 1, 0],
                        x: [0, line.translateX, line.translateX, 0], // Subtle horizontal drift
                        y: [0, line.translateY, line.translateY, 0], // Subtle vertical drift
                    }}
                    transition={{
                        duration: line.duration,
                        delay: line.delay,
                        repeat: Infinity,
                        repeatType: 'loop',
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
};

// New: Subtle Grid Background Component
const GridBackground = ({ color = '#2C3E50', gridSize = 50 }) => {
    return (
        <div
            className="absolute inset-0 z-0 opacity-10"
            style={{
                backgroundSize: `${gridSize}px ${gridSize}px`,
                backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px),
                                 linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
                maskImage: 'radial-gradient(ellipse at center, white 0%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, white 0%, transparent 70%)',
            }}
        ></div>
    );
};


const Pricing = () => {
    // State to manage hover for each pricing card and Payment Methods section
    const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
    const [paymentHovered, setPaymentHovered] = useState(false); // New state for payment section hover

    const pricingPlans = [
        {
            name: "Basic",
            price: "KES 5,000",
            frequency: "per month",
            features: [
                { text: "Up to 5 projects", icon: <FiUsers /> },
                { text: "AI Sketch Recognition", icon: <FiCheckCircle /> },
                { text: "Automated Quantity Takeoff", icon: <FiCheckCircle /> },
                { text: "1GB Cloud Storage", icon: <FiHardDrive /> },
                { text: "Standard Report Generation", icon: <FiDownload /> },
                { text: "Email Support", icon: <FiTool /> },
            ],
            buttonText: "Start Basic",
            isPopular: false,
        },
        {
            name: "Pro",
            price: "KES 15,000",
            frequency: "per month",
            features: [
                { text: "Unlimited Projects", icon: <FiUsers /> },
                { text: "All Basic Features", icon: <FiCheckCircle /> },
                { text: "Site Analysis AI", icon: <FiCheckCircle /> },
                { text: "BIM Integration (Revit, ArchiCAD)", icon: <FiCheckCircle /> },
                { text: "10GB Cloud Storage", icon: <FiHardDrive /> },
                { text: "Advanced Analytics & Reports", icon: <FiDownload /> },
                { text: "Priority Email & Chat Support", icon: <FiTool /> },
            ],
            buttonText: "Go Pro",
            isPopular: true,
        },
        {
            name: "Enterprise",
            price: "Custom",
            frequency: "contact us",
            // Removed the extraneous 'C' here that was causing the error
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
            isPopular: false,
        },
    ];

    const paymentMethods = [
        { name: "Credit/Debit Card", icon: <FiCreditCard />, description: "Secure payments via Visa, Mastercard, and American Express." },
        { name: "M-Pesa", icon: <FiSmartphone />, description: "Convenient mobile payments for Kenyan users." },
        { name: "Bank Transfer", icon: <FiBank />, description: "Direct bank transfers for larger enterprise payments." },
        { name: "PayPal", icon: <FiDollarSign />, description: "International payments processed securely through PayPal." },
    ];


    return (
        <section id="pricing" className="relative py-24 md:py-48 overflow-hidden font-inter" style={{ backgroundColor: darkBackground }}>
            {/* Background Radial Gradient Overlay - More intense, central focus */}
            <div
                className="absolute inset-0 z-0 opacity-25"
                style={{
                    background: `radial-gradient(circle at 50% 50%, ${primaryGreen}2A 0%, transparent 40%),
                                 radial-gradient(circle at 10% 90%, ${mediumBlueAccent}2A 0%, transparent 40%)`,
                }}
            ></div>

            {/* Subtle Grid Background */}
            <GridBackground color='#334155' gridSize={60} /> {/* Adjusted grid color for new background */}

            {/* Background Line Glow Effect - Increased count, even subtler glow, with gentle drift */}
            <LineGlowEffect count={70} color={lightBlueHighlight} />

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-center mb-28 md:mb-40"
                >
                    <h2 className="text-4xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight" style={{ color: lightTextOnDark }}>
                        Flexible <span className="relative inline-block">
                            {/* Restored to original primaryGreen color */}
                            <span style={{ color: primaryGreen }}>Pricing</span>
                            {/* Underline effect for "Pricing" on hover - more refined */}
                            <motion.span
                                className="absolute left-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primaryGreen to-transparent rounded-none" // Sharp edges
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                                viewport={{ once: true }}
                            />
                        </span> for Every Scale
                    </h2>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed" style={{ color: lightTextOnDark, opacity: 0.9 }}>
                        Choose the plan that best fits your civil engineering needs, from individual projects to large enterprises. Our solutions are crafted to boost your efficiency and accuracy.
                    </p>
                </motion.div>

                {/* Pricing Cards Grid */}
                <div className="grid md:grid-cols-3 gap-8 lg:gap-16 mb-24 md:mb-40">
                    {pricingPlans.map((plan, index) => (
                        <motion.div
                            key={index}
                            className={`relative rounded-none p-8 lg:p-10 shadow-xl flex flex-col h-full overflow-hidden
                                ${plan.isPopular ? `border-2 border-[${primaryGreen}]` : `border border-[${lightBorder}]`}
                                group transition-all duration-300 ease-in-out`}
                            style={{
                                backgroundColor: whiteContainer,
                                boxShadow: plan.isPopular ? `0 0 90px ${primaryGreen}66` : '0 25px 50px rgba(0,0,0,0.15)',
                                transformStyle: "preserve-3d", // For 3D transforms
                            }}
                            initial={{ opacity: 0, y: 100, scale: 0.88 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.9, delay: index * 0.22, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.3 }}
                            onHoverStart={() => setHoveredCardIndex(index)}
                            onHoverEnd={() => setHoveredCardIndex(null)}
                            whileHover={{
                                y: -20, // Increased lift effect
                                boxShadow: plan.isPopular ? `0 40px 80px ${primaryGreen}AA` : '0 40px 80px rgba(0,0,0,0.35)', // More pronounced shadow
                                rotateX: 3, // Subtle 3D rotation
                                rotateY: -3, // Subtle 3D rotation
                                z: 10, // Bring forward in 3D space
                                transition: { duration: 0.5, ease: "easeOut" }
                            }}
                        >
                            {/* Animated Radiance Border on Hover (More prominent and responsive) */}
                            <AnimatePresence>
                                {hoveredCardIndex === index && (
                                    <motion.div
                                        className="absolute -inset-0.5 rounded-none z-0" // Sharp edges
                                        style={{ background: `linear-gradient(45deg, ${mediumBlueAccent}, ${primaryGreen}, ${lightBlueHighlight}, ${mediumBlueAccent})` }}
                                        initial={{ opacity: 0, filter: 'blur(0px)' }}
                                        animate={{ opacity: 1, filter: 'blur(5px)' }} // Increased blur for a softer, wider glow
                                        exit={{ opacity: 0, filter: 'blur(0px)' }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <div className="absolute inset-px rounded-none" style={{ backgroundColor: whiteContainer }}></div> {/* Sharp edges */}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Inner Glow on Hover (New) */}
                            <AnimatePresence>
                                {hoveredCardIndex === index && (
                                    <motion.div
                                        className="absolute inset-0 z-0 pointer-events-none"
                                        style={{
                                            background: `radial-gradient(circle at center, ${primaryGreen}1A 0%, transparent 70%)`,
                                            filter: 'blur(15px)',
                                        }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                    />
                                )}
                            </AnimatePresence>

                            {plan.isPopular && (
                                <motion.div
                                    className="absolute top-0 right-0 -mt-4 -mr-4 px-6 py-2 rounded-none text-sm font-semibold shadow-xl uppercase tracking-wider" // Sharp edges, increased padding
                                    style={{ backgroundColor: mediumBlueAccent, color: whiteContainer, zIndex: 10 }}
                                    initial={{ opacity: 0, x: 50, scale: 0.6 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
                                    whileHover={{ scale: 1.12 }} // More pronounced pop on hover
                                >
                                    Most Popular
                                </motion.div>
                            )}

                            <h3 className="text-3xl font-bold mb-3 relative z-10" style={{ color: darkTextOnWhite }}>{plan.name}</h3>
                            <div className="text-5xl font-extrabold mb-2 relative z-10" style={{ color: darkTextOnWhite }}>{plan.price}</div> {/* Reduced font size to text-5xl */}
                            <p className="text-lg mb-8 relative z-10 font-medium" style={{ color: darkTextOnWhite, opacity: 0.75 }}>{plan.frequency}</p>

                            <ul className="space-y-4 mb-10 flex-grow relative z-10">
                                {plan.features.map((feature, featureIndex) => (
                                    <motion.li
                                        key={featureIndex}
                                        className="flex items-start text-lg"
                                        style={{ color: darkTextOnWhite }}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.22 + featureIndex * 0.06 }}
                                        viewport={{ once: true, amount: 0.1 }}
                                        whileHover={{
                                            color: primaryGreen,
                                            x: 8, // More pronounced horizontal shift on hover
                                            transition: { duration: 0.3 }
                                        }}
                                    >
                                        <motion.span
                                            className="mr-3 flex-shrink-0 mt-1"
                                            style={{ color: (index === 0 && featureIndex >= 3) || (index === 2 && featureIndex >= 2) ? mediumBlueAccent : primaryGreen }}
                                            whileHover={{ scale: 1.3, rotate: 15 }} // Even more pronounced scale and rotate on icon hover
                                            transition={{ duration: 0.2 }}
                                        >
                                            {feature.icon}
                                        </motion.span>
                                        <span className="leading-relaxed">{feature.text}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            <motion.button
                                className="w-full px-8 py-4 rounded-none text-xl font-bold transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 relative z-10
                                    group-hover:scale-[1.01] group-hover:shadow-xl transform-gpu overflow-hidden" // Sharp edges
                                style={{
                                    backgroundColor: plan.isPopular ? primaryGreen : mediumBlueAccent,
                                    color: whiteContainer,
                                    // Complex gradient on button, more pronounced on hover
                                    background: plan.isPopular
                                        ? `linear-gradient(90deg, ${primaryGreen} 0%, ${primaryGreen} 100%)`
                                        : `linear-gradient(90deg, ${mediumBlueAccent} 0%, ${mediumBlueAccent} 100%)`,
                                }}
                                whileHover={{
                                    scale: 1.05, // More scale on hover
                                    boxShadow: `0 20px 40px ${plan.isPopular ? primaryGreen : mediumBlueAccent}99`, // Stronger shadow
                                    background: `linear-gradient(90deg, ${primaryGreen} 0%, ${mediumBlueAccent} 50%, ${primaryGreen} 100%)`, // Dynamic gradient
                                    backgroundSize: '200% auto',
                                    backgroundPosition: 'right center', // Start from right for animation
                                }}
                                whileTap={{ scale: 0.95 }} // More pronounced tap effect
                            >
                                <span>{plan.buttonText}</span>
                                <FiArrowRight className="w-6 h-6 transform group-hover:translate-x-4 transition-transform duration-300 ease-out" /> {/* Increased translate-x */}
                            </motion.button>
                        </motion.div>
                    ))}
                </div>

                {/* Methods of Payment Section */}
                <motion.div
                    className="rounded-none p-8 md:p-12 shadow-2xl border relative overflow-hidden group" // Sharp edges
                    style={{ backgroundColor: whiteContainer, borderColor: lightBorder, boxShadow: '0 35px 70px rgba(0,0,0,0.25)' }} // Stronger shadow
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                    onHoverStart={() => setPaymentHovered(true)}
                    onHoverEnd={() => setPaymentHovered(null)} // Corrected to null
                >
                    {/* Animated Radiance Border for Payment Methods on Hover */}
                    <AnimatePresence>
                        {paymentHovered && (
                            <motion.div
                                className="absolute -inset-0.5 rounded-none z-0" // Sharp edges
                                style={{ background: `linear-gradient(45deg, ${mediumBlueAccent}, ${lightBlueHighlight}, ${mediumBlueAccent})` }}
                                initial={{ opacity: 0, filter: 'blur(0px)' }}
                                animate={{ opacity: 1, filter: 'blur(5px)' }} // Increased blur
                                exit={{ opacity: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="absolute inset-px rounded-none" style={{ backgroundColor: whiteContainer }}></div> {/* Sharp edges */}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Inner Glow on Hover (New) */}
                    <AnimatePresence>
                        {paymentHovered && (
                            <motion.div
                                className="absolute inset-0 z-0 pointer-events-none"
                                style={{
                                    background: `radial-gradient(circle at center, ${mediumBlueAccent}1A 0%, transparent 70%)`,
                                    filter: 'blur(15px)',
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            />
                        )}
                    </AnimatePresence>

                    <h3 className="text-3xl md:text-4xl font-extrabold text-center mb-10 relative z-10" style={{ color: darkTextOnWhite }}>
                        Accepted Payment Methods
                    </h3>
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 relative z-10"> {/* Increased gaps */}
                        {paymentMethods.map((method, index) => (
                            <motion.div
                                key={index}
                                className="flex items-start p-6 border border-transparent transition-colors duration-300 relative overflow-hidden" // Increased padding, added overflow hidden
                                style={{ backgroundColor: whiteContainer }}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
                                viewport={{ once: true, amount: 0.2 }}
                                whileHover={{
                                    backgroundColor: evenLighterBlue,
                                    borderColor: mediumBlueAccent, // Border color change on hover
                                    scale: 1.03, // Slight scale on hover
                                    boxShadow: `0 10px 20px ${mediumBlueAccent}33`, // Subtle shadow on hover
                                    z: 5, // Bring forward in 3D space
                                    transition: { duration: 0.4 }
                                }}
                            >
                                {/* Subtle gradient overlay on hover for payment methods */}
                                <AnimatePresence>
                                    {paymentHovered && ( // Changed from individual item hover to section hover
                                        <motion.div
                                            className="absolute inset-0 z-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300" // Increased opacity
                                            style={{ background: `linear-gradient(45deg, ${mediumBlueAccent}08, ${primaryGreen}08)` }}
                                        ></motion.div>
                                    )}
                                </AnimatePresence>

                                <motion.span
                                    className="mr-6 flex-shrink-0 mt-1" // Increased margin
                                    style={{ color: mediumBlueAccent }}
                                    whileHover={{ scale: 1.3, rotate: 8 }} // More pronounced scale and rotate on icon hover
                                    transition={{ duration: 0.2 }}
                                >
                                    {method.icon}
                                </motion.span>
                                <div>
                                    <h4 className="text-xl font-semibold mb-1" style={{ color: darkTextOnWhite }}>{method.name}</h4>
                                    <p className="text-base leading-relaxed" style={{ color: darkTextOnWhite, opacity: 0.9 }}>{method.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Pricing;