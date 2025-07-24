// src/components/dashboard/StatsWidget.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { cn } from '../../lib/utils'; // Assuming you have a cn utility for class names

const StatsWidget = ({
  stat,
  darkMode,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="shadow-sm card-hover gradient-card">
        {/* Gradient top bar */}
        <div className={`absolute top-0 left-0 w-full h-1 gradient-card`}></div>

        <CardContent className="p-5 pt-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                {stat.title}
              </p>
              <p className="text-xl font-bold mt-1">
                {stat.value}
              </p>
            </div>
            <div className={`p-2 rounded-lg ${stat.color}`}>
              <stat.icon className="h-5 w-5 text-white" />
            </div>
          </div>

          <div className="flex items-center mt-4">
            <span className={`text-xs font-medium ${
              stat.change.startsWith('+')
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
            } py-1 px-2 rounded-full`}>
              {stat.change}
            </span>
            <span className="text-xs ml-2 text-muted-foreground">last 30 days</span>
          </div>

          {/* Animated progress bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
          ></motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatsWidget;