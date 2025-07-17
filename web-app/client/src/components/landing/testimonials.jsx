import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar, FaBuilding, FaTimes, FaPlus } from 'react-icons/fa'; // Added FaPlus for the "Share Your Experience" button

const Testimonials = () => {
  // State for managing active testimonial, autoplay, and form visibility
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Ref for the form modal to detect clicks outside
  const formRef = useRef(null);

  // Form state for new testimonial submission
  const [formData, setFormData] = useState({
    quote: '',
    name: '',
    title: '',
    company: '',
    rating: 5,
    results: [
      { value: '', label: 'Improvement' },
      { value: '', label: 'Benefit' }
    ]
  });

  // Testimonial data, loaded from localStorage or using defaults
  const [testimonials, setTestimonials] = useState(() => {
    try {
      const savedTestimonials = localStorage.getItem('testimonials');
      return savedTestimonials ? JSON.parse(savedTestimonials) : [
        {
          quote: "JTech AI reduced our estimation time by 70% and improved accuracy by 40%. The AI-powered insights have transformed how we approach project budgeting.",
          name: "Michael Johnson",
          title: "Senior Estimator",
          company: "ConstructCo Ltd",
          rating: 5,
          results: [
            { value: "70%", label: "Time Reduction" },
            { value: "40%", label: "Accuracy Improvement" }
          ]
        },
        {
          quote: "The AI-powered insights have transformed how we approach project budgeting. We're now able to bid on more projects with confidence in our cost projections.",
          name: "Sarah Williams",
          title: "Project Director",
          company: "UrbanBuild Group",
          rating: 5,
          results: [
            { value: "35%", label: "More Projects" },
            { value: "25%", label: "Team Productivity" }
          ]
        },
        {
          quote: "An essential tool for any modern construction firm. The ROI was immediate, and our team has embraced the platform wholeheartedly for all our estimation needs.",
          name: "David Chen",
          title: "CTO",
          company: "Skyline Developments",
          rating: 4,
          results: [
            { value: "90%", label: "ROI in 3 months" },
            { value: "100%", label: "Team Adoption" }
          ]
        },
        {
          quote: "We've cut our estimation errors to near zero and significantly improved our profit margins. The automated reporting features alone have saved us hundreds of hours.",
          name: "Amanda Rodriguez",
          title: "Operations Manager",
          company: "Tower Construction Group",
          rating: 5,
          results: [
            { value: "99%", label: "Accuracy Rate" },
            { value: "18%", label: "Profit Increase" }
          ]
        }
      ];
    } catch (error) {
      console.error("Failed to load testimonials from localStorage:", error);
      return []; // Return an empty array or default list if loading fails
    }
  });

  // Effect to save testimonials to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('testimonials', JSON.stringify(testimonials));
    } catch (error) {
      console.error("Failed to save testimonials to localStorage:", error);
    }
  }, [testimonials]);

  // List of example companies for the "Trusted by" section
  const companies = [
    "ConstructCo Ltd",
    "UrbanBuild Group",
    "Skyline Developments",
    "Tower Construction",
    "Prime Builders",
    "Metro Engineering",
    "InfraTech Solutions",
    "Global Constructors"
  ];

  // Handler to navigate to the next testimonial
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Handler to navigate to the previous testimonial
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Auto-play functionality for the carousel
  useEffect(() => {
    let interval;
    if (autoPlay) {
      interval = setInterval(() => {
        nextTestimonial();
      }, 5000); // Change testimonial every 5 seconds
    }
    return () => clearInterval(interval); // Clear interval on component unmount or if autoPlay changes
  }, [autoPlay, activeIndex, testimonials.length]); // Depend on testimonials.length for correct loop behavior

  // Get the current testimonial based on activeIndex
  const currentTestimonial = testimonials[activeIndex];

  // Handler for general form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handler for changes in the "Key Results" dynamic fields
  const handleResultChange = (index, field, value) => {
    const updatedResults = [...formData.results];
    updatedResults[index][field] = value;
    setFormData({ ...formData, results: updatedResults });
  };

  // Handler for adding a new result field to the form
  const addResultField = () => {
    setFormData({
      ...formData,
      results: [...formData.results, { value: '', label: '' }]
    });
  };

  // Handler for removing a result field from the form
  const removeResultField = (index) => {
    setFormData({
      ...formData,
      results: formData.results.filter((_, i) => i !== index)
    });
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new testimonial object from form data
    const newTestimonial = {
      ...formData,
      // Ensure results are clean (remove empty ones if needed, though current form design suggests they're always filled)
      results: formData.results.filter(result => result.value || result.label)
    };

    // Add the new testimonial to the existing list
    setTestimonials((prevTestimonials) => [...prevTestimonials, newTestimonial]);

    // Reset form and show submission confirmation
    setFormData({
      quote: '',
      name: '',
      title: '',
      company: '',
      rating: 5,
      results: [
        { value: '', label: 'Improvement' },
        { value: '', label: 'Benefit' }
      ]
    });

    setSubmitted(true);
    // Hide form and reset submitted state after a delay
    setTimeout(() => {
      setShowForm(false);
      setSubmitted(false);
      // Automatically show the newly added testimonial
      setActiveIndex(testimonials.length); // testimonials.length will be the index of the new item
    }, 2000);
  };

  // Effect to close the form modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false);
      }
    };

    if (showForm) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showForm]);

  return (
    <section id="testimonials" className="relative py-24 bg-white overflow-hidden">
      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              ref={formRef}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out" // Added transform for smooth closing
            >
              <div className="p-6 md:p-8"> {/* Increased padding for larger screens */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Share Your Experience</h3>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Close form"
                  >
                    <FaTimes className="text-xl" /> {/* Larger close icon */}
                  </button>
                </div>

                {submitted ? (
                  <div className="text-center py-10">
                    <div className="text-green-500 text-6xl mb-4 animate-bounce">✓</div> {/* Larger and animated checkmark */}
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h4>
                    <p className="text-gray-600 text-lg">Your testimonial has been submitted successfully and will appear shortly.</p> {/* More descriptive message */}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="quote" className="block text-gray-700 font-medium mb-2">Your Quote*</label>
                      <textarea
                        id="quote"
                        name="quote"
                        value={formData.quote}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        rows="4"
                        placeholder="Share your experience with our product and how it helped you..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name*</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Your Title*</label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Senior Estimator"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-gray-700 font-medium mb-2">Company*</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Your Company"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Rating*</label>
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setFormData({ ...formData, rating: star })}
                            className="focus:outline-none transition-transform transform hover:scale-110"
                            aria-label={`Rate ${star} stars`}
                          >
                            <FaStar
                              className={`text-3xl ${star <= formData.rating ? "text-yellow-400" : "text-gray-300"}`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-3">Key Results (Optional)</label>
                      <div className="space-y-4">
                        {formData.results.map((result, index) => (
                          <div key={index} className="flex flex-col md:flex-row gap-2">
                            <input
                              type="text"
                              value={result.value}
                              onChange={(e) => handleResultChange(index, 'value', e.target.value)}
                              className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="e.g. 40%"
                            />
                            <input
                              type="text"
                              value={result.label}
                              onChange={(e) => handleResultChange(index, 'label', e.target.value)}
                              className="w-full md:w-2/3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="Result description (e.g., Time Reduction)"
                            />
                            {formData.results.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeResultField(index)}
                                className="flex-shrink-0 p-3 text-red-500 hover:text-red-700 transition-colors rounded-lg border border-gray-300 md:border-none"
                                aria-label="Remove result field"
                              >
                                <FaTimes />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addResultField}
                          className="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors inline-flex items-center text-sm font-medium"
                        >
                          <FaPlus className="mr-2" /> Add Another Result
                        </button>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105"
                      >
                        Submit Testimonial
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Existing decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-50 to-transparent z-0"></div>
      <div className="absolute top-20 right-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="absolute inset-0 opacity-5 z-0">
        {/* Adjusted background image for better visual blending */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605106702734-205df224ecce?q=80&w=1935&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-75"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.5 }} // Added amount for better trigger
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-800 px-5 py-2 rounded-full mb-6 shadow-md"
          >
            <span className="text-white font-medium tracking-wide text-sm"> {/* Slightly smaller text */}
              <span className="mr-2">★</span> Client Testimonials
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight" // Added leading-tight for better line height
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
              Trusted by Industry Leaders
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto" // Adjusted text size for better balance
          >
            Hear from industry professionals who have transformed their estimation process with our solution.
          </motion.p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-5xl mx-auto relative mb-20">
          {/* Navigation Arrows */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevTestimonial}
            className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all border border-gray-200"
            aria-label="Previous testimonial"
            disabled={testimonials.length <= 1} // Disable if only one testimonial
          >
            <FaChevronLeft />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextTestimonial}
            className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all border border-gray-200"
            aria-label="Next testimonial"
            disabled={testimonials.length <= 1} // Disable if only one testimonial
          >
            <FaChevronRight />
          </motion.button>

          {/* Testimonial Content */}
          <div className="relative h-auto overflow-hidden">
            {testimonials.length > 0 ? ( // Conditionally render if testimonials exist
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3">
                    {/* Testimonial text and author info */}
                    <div className="lg:col-span-2 p-8 md:p-10">
                      <div className="text-blue-600 text-5xl mb-6"> {/* Larger quote icon */}
                        <FaQuoteLeft className="opacity-70" />
                      </div>

                      <p className="text-xl text-gray-800 mb-8 leading-relaxed italic"> {/* Added italic for quotes */}
                        "{currentTestimonial.quote}"
                      </p>

                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex items-center mb-4 md:mb-0">
                          <div className="bg-gradient-to-br from-blue-600 to-blue-800 w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                            {currentTestimonial.name.charAt(0).toUpperCase()} {/* Ensure uppercase initial */}
                          </div>
                          <div className="ml-4">
                            <h4 className="font-bold text-lg text-gray-900">{currentTestimonial.name}</h4>
                            <p className="text-gray-600 text-sm">{currentTestimonial.title}, {currentTestimonial.company}</p> {/* Smaller text for title/company */}
                          </div>
                        </div>

                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`text-xl ${i < currentTestimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Results panel */}
                    <div className="bg-gradient-to-br from-blue-50 to-white p-8 md:p-10 border-l-0 lg:border-l border-t lg:border-t-0 border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-6">Key Achievements</h3> {/* Renamed for better impact */}

                      <div className="grid grid-cols-2 gap-4">
                        {currentTestimonial.results.map((result, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center text-center" // Centered text and flex for alignment
                          >
                            <div className="text-3xl font-extrabold text-blue-700 mb-1">{result.value}</div> {/* Stronger emphasis */}
                            <div className="text-sm text-gray-600">{result.label}</div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-6 pt-5 border-t border-gray-200">
                        <div className="text-sm text-gray-600 mb-2">Project Type:</div>
                        <div className="inline-flex px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          Commercial Tower {/* This could also be dynamic if added to testimonial data */}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="text-center py-20 text-gray-500 text-xl">
                No testimonials to display yet. Be the first to share your experience!
              </div>
            )}
          </div>

          {/* Dot Indicators */}
          {testimonials.length > 1 && ( // Only show dots if more than one testimonial
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ scale: 1.2 }}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Trusted by companies section */}
        <div className="mt-16 pt-16 border-t border-gray-200">
          <motion.h3
            className="text-center text-xl font-semibold text-gray-700 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            Trusted by industry leaders worldwide
          </motion.h3>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {companies.map((company, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-5 flex items-center justify-center h-24 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }} // Added subtle shadow on hover
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 + 0.2 }} // Slightly adjusted delay
              >
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-800 w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">
                    <FaBuilding className="text-lg" />
                  </div>
                  <span className="text-gray-700 font-medium text-center">{company}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-16 text-center space-y-4 md:space-y-0 md:flex md:justify-center md:space-x-4"> {/* Responsive button layout */}
            <motion.button
              className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 inline-flex items-center justify-center" // Added justify-center
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Customer Stories
              <svg className="ml-3 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </motion.button>

            <motion.button
              onClick={() => setShowForm(true)}
              className="px-8 py-3.5 bg-gradient-to-r from-green-600 to-green-800 text-white font-bold rounded-xl shadow-lg hover:from-green-700 hover:to-green-900 transition-all duration-300 inline-flex items-center justify-center" // Added justify-center
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Share Your Experience
              <FaPlus className="ml-3 w-4 h-4" /> {/* Changed icon for consistency */}
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;