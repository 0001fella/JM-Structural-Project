import React from 'react';
import { motion } from 'framer-motion';

// --- Reusable SVG Icons (using currentColor for Tailwind integration) ---
const FiCheck = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"></polyline></svg>);
const FiBarChart2 = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>);
const FiShield = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>);
const FiArrowRight = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>);
const FiPlay = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>);
const FiCpu = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="15" x2="23" y2="15"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="15" x2="4" y2="15"></line></svg>);
const FiLayers = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>);
const FiTrendingUp = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>);
const FiZap = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>);
const AiBrain = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M7 13.7V17a5 5 0 0 0 10 0v-3.3"></path><path d="M12 22v-4"></path><path d="M12 6V2"></path><path d="M9 18h6"></path><path d="M6 10H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3"></path><path d="M18 10h3a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3"></path></svg>);

const FiFileUpload = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>);
const FiRobot = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 19V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z"></path><path d="M8 19V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2z"></path><path d="M16 17h2a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2"></path><path d="M8 17H6a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2"></path><path d="M12 2v2"></path><path d="M12 20v2"></path><circle cx="12" cy="12" r="2"></circle></svg>);
const FiMoneyBillWave = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 1V23"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>);
const FiShareAlt = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>);
const FiGlobeAfrica = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>);
const FiCalendarAlt = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>);
const FiLightbulb = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 18h6a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2z"></path><path d="M12 22v-4"></path><path d="M12 2a3 3 0 0 0-3 3v2a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path></svg>);
const FiRocket = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4.5 16.5L2 22l5.5-2.5L22 2 16.5 7.5z"></path><path d="M15 9l-4 4"></path></svg>);
const FiBullseye = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>);


// --- Reusable Components ---

// A reusable Section component for consistent styling and scroll animations
const Section = ({ children, className = '', id, background = false }) => {
    const sectionVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
    };

    return (
        <motion.section
            id={id}
            className={`relative py-28 md:py-36 px-4 overflow-hidden ${className}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
        >
            {background && (
                <div className="absolute inset-0 w-full h-full z-0"
                    style={{ backgroundImage: "url('const4.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
                    <div className="absolute inset-0 bg-black opacity-80"></div>
                </div>
            )}
            <div className="container mx-auto max-w-7xl relative z-10">
                {children}
            </div>
        </motion.section>
    );
};

// Framer Motion variants for common animations
const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, type: "spring", stiffness: 100, damping: 15 } },
};

const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const buttonHoverScale = {
    scale: 1.05,
    boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
    transition: { duration: 0.2 }
};
const buttonTapScale = {
    scale: 0.95
};

// --- New ProcessStep Component for alternating layout ---
const ProcessStep = ({ stepData, reverseOrder, tagColors }) => {
    const { step, title, description, icon, visual, details, tags } = stepData;

    return (
        // Adjusted padding to be consistent with Section, removing internal vertical padding
        <div className={`flex flex-col items-center justify-between gap-12 md:gap-20 relative z-10
            ${reverseOrder ? 'lg:flex-row-reverse' : 'lg:flex-row'}
        `}>
            <motion.div
                className="lg:w-1/2 w-full flex-shrink-0"
                variants={imageVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
            >
                <img src={visual} alt={title} className="rounded-3xl shadow-2xl border border-gray-700 w-full hover:scale-[1.02] transition-transform duration-500 ease-out" />
            </motion.div>

            <motion.div
                className="lg:w-1/2 w-full text-center lg:text-left"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ staggerChildren: 0.1 }}
            >
                <motion.h3
                    className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-3 flex items-center justify-center lg:justify-start"
                    variants={textVariants}
                >
                    <span className="text-2xl mr-2 text-teal-400">{icon}</span> STAGE {step}
                </motion.h3>
                <motion.h2
                    className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight drop-shadow-md"
                    variants={textVariants}
                >
                    {title}
                </motion.h2>
                <motion.p
                    className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed"
                    variants={textVariants}
                >
                    {description}
                </motion.p>
                <motion.ul
                    className="space-y-3 text-gray-300 text-base mb-8"
                    variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
                >
                    {details.map((detail, i) => (
                        <motion.li
                            key={i}
                            className="flex items-start"
                            variants={listItemVariants}
                        >
                            <FiCheck className="text-teal-500 mr-3 mt-1 flex-shrink-0" />
                            <span>{detail}</span>
                        </motion.li>
                    ))}
                </motion.ul>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    {tags.map(tag => (
                        <motion.span
                            key={tag}
                            className={`inline-flex items-center text-xs font-semibold px-4 py-2 rounded-full shadow-md border ${tagColors[tag]}`}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                            whileHover={{ scale: 1.08, boxShadow: "0px 10px 25px rgba(0,0,0,0.4)" }}
                            aria-label={tag}
                        >
                            {tag === "KENYA OPTIMIZED" && <FiGlobeAfrica className="mr-2" />}
                            {tag === "AI-POWERED" && <FiRobot className="mr-2" />}
                            {tag === "PRECISION" && <FiBullseye className="mr-2" />}
                            {tag === "TRANSPARENT PRICING" && <FiMoneyBillWave className="mr-2" />}
                            {tag === "COLLABORATION" && <FiShareAlt className="mr-2" />}
                            {tag === "EFFICIENT WORKFLOW" && <FiBarChart2 className="mr-2" />}
                            {tag}
                        </motion.span>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

// --- Main Component ---

const AdvancedProcessPage = () => {
    const steps = [
        {
            step: 1,
            title: "Effortless Design Upload",
            description: "Securely upload your architectural blueprints, CAD files, or even site photos. Our intelligent platform instantly recognizes diverse formats and precisely aligns with Kenyan construction standards.",
            icon: <FiFileUpload />,
            visual: "upload.jpg",
            details: [
                "Supports all industry-standard formats: PDF, DWG, RVT, IFC, and more for universal compatibility.",
                "Intelligent recognition engine specifically trained on Kenyan building codes and regulatory standards.",
                "Seamless mobile photo capture with AI-enhanced measurement for accurate site context."
            ],
            tags: ["KENYA OPTIMIZED", "AI-POWERED"],
        },
        {
            step: 2,
            title: "AI-Driven Precision Analysis",
            description: "Our proprietary AI meticulously analyzes every dimension, material specification, and current local market cost. This includes advanced material identification, automated quantity takeoff, and real-time KEBS compliance validation.",
            icon: <FiRobot />,
            visual: "analysis.jpg",
            details: [
                "Pinpoint material identification integrated with real-time, dynamic Kenyan supplier data for unparalleled accuracy.",
                "Fully automated Quantity Takeoff (QTO) ensuring comprehensive and detailed Kenyan Bill of Quantities (BOQ) generation.",
                "Instantaneous KEBS compliance validation, proactively ensuring adherence to national building codes and regulations."
            ],
            tags: ["AI-POWERED", "PRECISION"],
        },
        {
            step: 3,
            title: "Generate Actionable Estimates",
            description: "Receive detailed, transparent cost breakdowns and precise project timelines, all meticulously calculated in Kenyan Shillings. Our system provides dynamic local pricing updates and intelligently optimized labor calculations.",
            icon: <FiMoneyBillWave />,
            visual: "generate.jpg",
            details: [
                "Crystal-clear KES cost breakdowns empowered by dynamic, live local pricing updates to reflect market realities.",
                "Intelligently optimized labor calculations, specifically tailored for the Kenyan workforce market dynamics.",
                "Automatic inclusion of all county-specific taxes, levies, and statutory charges, eliminating hidden costs."
            ],
            tags: ["KENYA OPTIMIZED", "TRANSPARENT PRICING"],
        },
        {
            step: 4,
            title: "Seamless Collaboration & Export",
            description: "Effortlessly share estimates with stakeholders, foster real-time team collaboration, and export your data in all essential, compliant formats. Generate professional, NCA-compliant bid proposals with unprecedented ease.",
            icon: <FiShareAlt />,
            visual: "quontum.jpg",
            details: [
                "Robust team collaboration features with granular, role-based access controls for secure and efficient teamwork.",
                "Versatile export options including Excel, PDF, and standard Kenyan BOQ templates for maximum flexibility.",
                "Effortless generation of professional, National Construction Authority (NCA)-compliant bid proposals, saving valuable time."
            ],
            tags: ["COLLABORATION", "EFFICIENT WORKFLOW"],
        },
    ];

    const differentiators = [
        {
            title: "Kenyan Market Intelligence",
            description: "Our AI is specifically trained on local pricing, labor, and regulatory data, giving you an unmatched edge in the Kenyan construction landscape.",
            icon: <FiGlobeAfrica className="text-blue-400 text-4xl mb-4" />,
        },
        {
            title: "Unrivaled Speed & Accuracy",
            description: "Leverage cutting-edge AI to generate comprehensive BOQs in minutes, not days, drastically reducing human error and project delays.",
            icon: <FiRocket className="text-teal-400 text-4xl mb-4" />,
        },
        {
            title: "Guaranteed Compliance",
            description: "Automated checks against KEBS and NCA standards ensure every estimate is fully compliant, mitigating risks and building trust.",
            icon: <FiShield className="text-emerald-400 text-4xl mb-4" />,
        },
        {
            title: "Intuitive User Experience",
            description: "Designed with the professional in mind, our platform offers a streamlined, user-friendly interface that minimizes training and maximizes productivity.",
            icon: <FiLightbulb className="text-purple-400 text-4xl mb-4" />,
        },
    ];

    // Tailwind classes for tag colors (refined palette)
    const tagColors = {
        "KENYA OPTIMIZED": "bg-emerald-900 text-emerald-200 border-emerald-700",
        "AI-POWERED": "bg-indigo-900 text-indigo-200 border-indigo-700",
        "PRECISION": "bg-blue-900 text-blue-200 border-blue-700",
        "TRANSPARENT PRICING": "bg-purple-900 text-purple-200 border-purple-700",
        "COLLABORATION": "bg-red-900 text-red-200 border-red-700",
        "EFFICIENT WORKFLOW": "bg-cyan-900 text-cyan-200 border-cyan-700",
    };

    return (
        <div className="bg-gray-950 text-white font-sans antialiased">
            {/* Introduction to Process Section */}
            <Section id="process-intro" className="bg-gray-900 text-center py-20 md:py-32">
                <motion.h2
                    className="text-4xl md:text-6xl font-extrabold mb-6 text-white leading-tight drop-shadow-lg"
                    variants={textVariants}
                >
                    Your Project's Journey, <span className="text-blue-400">Brilliantly Simplified.</span>
                </motion.h2>
                <motion.p
                    className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
                    variants={textVariants} transition={{ delay: 0.2 }}
                >
                    From initial design upload to a fully compliant Kenyan Bill of Quantities, **QuantumTakeoff AI** guides you every step of the way with <strong className="text-blue-300">unparalleled precision</strong> and <strong className="text-blue-300">accelerated delivery</strong>.
                </motion.p>
                <motion.button
                    className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out flex items-center justify-center group"
                    variants={textVariants} initial="hidden" animate="visible" transition={{ delay: 0.5, duration: 0.8 }}
                    whileHover={buttonHoverScale} whileTap={buttonTapScale}
                    aria-label="Discover how QuantumTakeoff AI works"
                >
                    Explore Our Process
                    <FiBarChart2 className="ml-3 inline-block group-hover:rotate-6 transition-transform duration-300" />
                </motion.button>
            </Section>

            ---

            {/* Process Steps - Individual Sections with Alternating Layout */}
            <div className="relative">
                {steps.map((stepData, index) => (
                    <Section
                        key={stepData.step}
                        id={`step-${stepData.step}`}
                        className={`
                            ${index % 2 === 0 ? 'bg-gradient-to-br from-gray-900 to-gray-850' : 'bg-gradient-to-tl from-gray-900 to-gray-850'}
                            border-t border-gray-800
                        `}
                    >
                        <ProcessStep
                            stepData={stepData}
                            reverseOrder={index % 2 !== 0}
                            tagColors={tagColors}
                        />
                    </Section>
                ))}
            </div>

            ---

            {/* Why Choose Us / Key Differentiators Section */}
            <Section id="differentiators" className="bg-gray-900 text-center py-20 md:py-32 border-t border-gray-800">
                <motion.h2
                    className="text-4xl md:text-5xl font-extrabold mb-12 text-white leading-tight drop-shadow-lg"
                    variants={textVariants}
                >
                    Why Choose <span className="text-teal-400">QuantumTakeoff AI</span>?
                </motion.h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {differentiators.map((item, index) => (
                        <motion.div
                            key={index}
                            className="bg-gray-850 p-8 rounded-2xl shadow-xl border border-gray-700 flex flex-col items-center text-center hover:bg-gray-800 transition-colors duration-300 ease-in-out"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                            whileHover={{ translateY: -5, boxShadow: "0 15px 30px rgba(0,0,0,0.4)" }}
                        >
                            {item.icon}
                            <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                            <p className="text-gray-300 leading-relaxed">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </Section>

            ---

            {/* Dashboard / Live Demo Section */}
            <Section id="dashboard-showcase" className="bg-gray-900 text-center py-20 md:py-32 border-t border-gray-800">
                <motion.h2
                    className="text-4xl md:text-5xl font-extrabold mb-8 text-white leading-tight drop-shadow-lg"
                    variants={textVariants}
                >
                    Experience <span className="text-teal-400">QuantumTakeoff AI</span> in Action
                </motion.h2>
                <motion.p
                    className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
                    variants={textVariants} transition={{ delay: 0.2 }}
                >
                    Explore our intuitive dashboard, powerful analytics, and discover the simplicity of generating precise Bills of Quantities, perfectly tailored for the Kenyan construction landscape.
                </motion.p>
                <motion.div
                    className="w-full max-w-5xl mx-auto bg-gray-800 rounded-3xl overflow-hidden shadow-2xl border border-gray-700 aspect-video flex items-center justify-center p-4"
                    variants={imageVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
                >
                    <img src="const4.jpg" alt="QuantumTakeoff AI Dashboard Demo" className="w-full h-full object-cover rounded-2xl" />
                </motion.div>
                <motion.button
                    className="mt-16 px-10 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out flex items-center justify-center group"
                    variants={textVariants} initial="hidden" whileInView="visible" transition={{ delay: 0.4 }}
                    whileHover={buttonHoverScale} whileTap={buttonTapScale}
                    aria-label="Schedule a live demonstration of QuantumTakeoff AI"
                >
                    Schedule a Live Demo
                    <FiCalendarAlt className="ml-3 inline-block group-hover:scale-110 transition-transform duration-300" />
                </motion.button>
            </Section>

            ---

            {/* Final Call to Action Section */}
            <Section id="final-cta" className="bg-gray-950 text-center py-24 md:py-36 border-t border-gray-800">
                <motion.h2
                    className="text-4xl md:text-5xl font-extrabold mb-8 text-white leading-tight drop-shadow-lg"
                    variants={textVariants}
                >
                    Ready to <span className="text-blue-400">Revolutionize</span> Your Estimates?
                </motion.h2>
                <motion.p
                    className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
                    variants={textVariants} transition={{ delay: 0.2 }}
                >
                    Join a growing community of innovative Kenyan engineers and quantity surveyors who are already leveraging **QuantumTakeoff AI** for faster, more accurate, and fully compliant project estimates.
                </motion.p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <motion.button
                        className="px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out flex items-center justify-center group"
                        variants={textVariants} initial="hidden" whileInView="visible" transition={{ delay: 0.3 }}
                        whileHover={{ ...buttonHoverScale, background: "linear-gradient(to right, #075985, #1d4ed8)" }}
                        whileTap={buttonTapScale}
                        aria-label="Start your free trial today"
                    >
                        Start Your Free Trial Today
                        <FiBarChart2 className="ml-3 inline-block group-hover:rotate-6 transition-transform duration-300" />
                    </motion.button>
                    <motion.button
                        className="px-10 py-4 border-2 border-blue-600 text-blue-300 font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out flex items-center justify-center bg-transparent hover:bg-blue-900/30 group"
                        variants={textVariants} initial="hidden" whileInView="visible" transition={{ delay: 0.4 }}
                        whileHover={{ ...buttonHoverScale, borderColor: '#00BFFF', color: '#00BFFF' }}
                        whileTap={buttonTapScale}
                        aria-label="Request a personalized demo"
                    >
                        <FiCalendarAlt className="mr-3 inline-block group-hover:scale-110 transition-transform duration-300" />
                        Request a Personalized Demo
                    </motion.button>
                </div>
            </Section>
        </div>
    );
};

export default AdvancedProcessPage;
