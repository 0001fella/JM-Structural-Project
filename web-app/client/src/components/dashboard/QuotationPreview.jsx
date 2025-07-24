// src/components/dashboard/QuotationPreview.jsx
import React, { useState, useContext } from 'react'; // Removed unused imports
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Download, Expand, ChartPie, ChevronLeft, ChevronRight,
  Clock, List, Building, FileText, Lightbulb, Eye, EyeOff
} from 'lucide-react';
import { ProjectContext } from '../../context/ProjectContext'; // Adjust path
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const QuotationPreview = () => {
  const { currentProject } = useContext(ProjectContext);
  const [expandedView, setExpandedView] = useState(false);
  const [activeTab, setActiveTab] = useState('summary'); // Default to summary

  // Mock data for visualization (replace with actual data from context/props)
  const costBreakdown = [
    { name: 'Materials', value: 1250000, color: '#3b82f6' },
    { name: 'Labor', value: 850000, color: '#10b981' },
    { name: 'Equipment', value: 420000, color: '#f59e0b' },
    { name: 'Permits', value: 180000, color: '#8b5cf6' },
    { name: 'Contingency', value: 300000, color: '#ec4899' },
  ];

  const timeEstimate = {
    phases: [
      { name: 'Planning', duration: '2 weeks', progress: 100 },
      { name: 'Design', duration: '4 weeks', progress: 75 },
      { name: 'Procurement', duration: '3 weeks', progress: 50 },
      { name: 'Construction', duration: '12 weeks', progress: 20 },
    ]
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const totalCost = costBreakdown.reduce((sum, item) => sum + item.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full"
    >
      <Card className="w-full shadow-sm border">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="flex items-center text-lg">
              <FileText className="mr-2 h-5 w-5" />
              Quotation Preview
              <Badge variant="secondary" className="ml-2 text-xs">Draft</Badge>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
              <Button variant="outline" size="icon" onClick={() => setExpandedView(!expandedView)}>
                {expandedView ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="costs">Cost Breakdown</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="recommendations">AI Recs</TabsTrigger>
            </TabsList>
            <TabsContent value="summary" className="mt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="shadow-sm">
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">Project</p>
                      <p className="font-medium">{currentProject?.name || 'Sample Project'}</p>
                    </CardContent>
                  </Card>
                  <Card className="shadow-sm">
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">Client</p>
                      <p className="font-medium">{currentProject?.client || 'ABC Corporation'}</p>
                    </CardContent>
                  </Card>
                  <Card className="shadow-sm">
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{currentProject?.location || 'Nairobi'}</p>
                    </CardContent>
                  </Card>
                </div>
                <Card className="shadow-sm">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-2">Total Estimated Cost</p>
                    <p className="text-2xl font-bold">{formatCurrency(totalCost)}</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="costs" className="mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center">
                      <ChartPie className="mr-2 h-4 w-4" />
                      Cost Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={costBreakdown}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {costBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card className="shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Detailed Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {costBreakdown.map((item, index) => (
                        <li key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                          <span className="font-medium">{item.name}</span>
                          <span>{formatCurrency(item.value)}</span>
                        </li>
                      ))}
                      <li className="flex justify-between items-center pt-3 font-bold text-lg">
                        <span>Total</span>
                        <span>{formatCurrency(totalCost)}</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="timeline" className="mt-4">
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    Project Timeline Estimate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {timeEstimate.phases.map((phase, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{phase.name}</span>
                          <span className="text-sm text-muted-foreground">{phase.duration}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${phase.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="recommendations" className="mt-4">
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center">
                    <Lightbulb className="mr-2 h-4 w-4 text-yellow-500" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <Lightbulb className="text-blue-500 dark:text-blue-400 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm">Material Cost Reduction</p>
                        <p className="text-xs text-muted-foreground">Use Bamburi cement for better durability in Nairobi's climate.</p>
                      </div>
                    </li>
                    <li className="flex items-start p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <Lightbulb className="text-green-500 dark:text-green-400 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm">Efficiency Boost</p>
                        <p className="text-xs text-muted-foreground">Consider precast concrete to reduce labor costs by 15%.</p>
                      </div>
                    </li>
                    <li className="flex items-start p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <Lightbulb className="text-purple-500 dark:text-purple-400 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm">Local Sourcing</p>
                        <p className="text-xs text-muted-foreground">Source timber from Kakamega for cost savings.</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuotationPreview;