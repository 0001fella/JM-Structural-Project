import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const insights = [
  { id: 1, title: "AI Insight 1", description: "Increase in material efficiency by 12%." },
  { id: 2, title: "AI Insight 2", description: "Estimated cost savings of ₹1.2M this quarter." },
  { id: 3, title: "AI Insight 3", description: "Project delays reduced by 3 days on average." },
  { id: 4, title: "AI Insight 4", description: "Quality improvement rate up by 15%." },
  { id: 5, title: "AI Insight 5", description: "Energy consumption reduced by 8% monthly." },
  { id: 6, title: "AI Insight 6", description: "Customer satisfaction increased to 92%." },
];

const InsightsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(insights.length / itemsPerPage);

  const prev = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? insights.length - itemsPerPage : prevIndex - itemsPerPage
    );
  };

  const next = () => {
    setCurrentIndex(prevIndex => 
      (prevIndex + itemsPerPage) % insights.length
    );
  };

  const goToPage = (pageIndex) => {
    setCurrentIndex(pageIndex * itemsPerPage);
  };

  const visibleInsights = insights.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        AI-Powered Insights
      </h2>
      
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={prev}
          aria-label="Previous"
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>
        
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 mx-4">
          {visibleInsights.map((insight) => (
            <div 
              key={insight.id}
              className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl shadow-sm transition-all hover:shadow-md"
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                {insight.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {insight.description}
              </p>
            </div>
          ))}
        </div>
        
        <button 
          onClick={next}
          aria-label="Next"
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>
      </div>
      
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index)}
            aria-label={`Go to page ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentIndex === index * itemsPerPage 
                ? 'bg-blue-600 dark:bg-blue-500' 
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default InsightsCarousel;