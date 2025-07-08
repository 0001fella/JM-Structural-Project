// src/components/quotation/QuotationPreview.jsx
import React, { useState, useMemo } from 'react';
import { useQuotation } from '../../context/QuotationContext';
import { 
  Box, 
  Typography, 
  Button, 
  IconButton, 
  Paper, 
  Grid,
  Tabs, 
  Tab, 
  Card, 
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  LinearProgress,
  CircularProgress,
  Tooltip
} from '@mui/material';
import { 
  Download, 
  Expand, 
  Edit, 
  PieChart, 
  ChevronRight,
  Timeline,
  Summarize,
  Construction
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const QuotationPreview = () => {
  const { quotationData, aiResults } = useQuotation();
  const [expandedView, setExpandedView] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Memoize derived data for performance
  const costBreakdown = useMemo(() => {
    return aiResults?.costBreakdown || [
      { category: 'Materials', amount: 12500, color: '#3b82f6' },
      { category: 'Labor', amount: 8500, color: '#10b981' },
      { category: 'Equipment', amount: 4200, color: '#f59e0b' },
      { category: 'Permits', amount: 1800, color: '#8b5cf6' },
      { category: 'Contingency', amount: 3000, color: '#ec4899' },
    ];
  }, [aiResults]);

  const timeEstimate = useMemo(() => {
    return aiResults?.timeline || {
      weeks: 12,
      days: 3,
      phases: [
        { name: 'Planning', duration: '2 weeks', progress: 100 },
        { name: 'Foundation', duration: '3 weeks', progress: 0 },
        { name: 'Framing', duration: '2 weeks', progress: 0 },
        { name: 'Finishing', duration: '5 weeks', progress: 0 },
      ]
    };
  }, [aiResults]);

  const tabConfig = [
    { id: 'summary', label: 'Summary', icon: <Summarize fontSize="small" /> },
    { id: 'breakdown', label: 'Breakdown', icon: <PieChart fontSize="small" /> },
    { id: 'timeline', label: 'Timeline', icon: <Timeline fontSize="small" /> },
    { id: 'materials', label: 'Materials', icon: <Construction fontSize="small" /> }
  ];

  if (!aiResults) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Paper
        elevation={expandedView ? 6 : 3}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          position: expandedView ? 'fixed' : 'relative',
          top: expandedView ? 0 : 'auto',
          left: expandedView ? 0 : 'auto',
          width: expandedView ? '100vw' : '100%',
          height: expandedView ? '100vh' : 'auto',
          zIndex: expandedView ? 1300 : 1,
          m: expandedView ? 0 : undefined,
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '100%'
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%)',
            p: 3,
            borderBottom: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight={600} display="flex" alignItems="center" gap={1}>
              <PieChart color="primary" />
              Project Summary
            </Typography>
            <Typography variant="body2" color="text.secondary">
              AI-generated quotation preview
            </Typography>
          </Box>
          
          <Box display="flex" gap={1}>
            <Tooltip title={expandedView ? "Minimize" : "Expand"}>
              <IconButton 
                onClick={() => setExpandedView(!expandedView)}
                color="default"
                sx={{ bgcolor: 'background.paper' }}
              >
                <Expand fontSize="small" />
              </IconButton>
            </Tooltip>
            
            <Button
              variant="contained"
              color="primary"
              startIcon={<Download />}
              sx={{
                boxShadow: '0 4px 6px rgba(11, 92, 214, 0.12)',
                '&:hover': {
                  boxShadow: '0 6px 8px rgba(11, 92, 214, 0.18)'
                }
              }}
            >
              Export
            </Button>
          </Box>
        </Box>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          variant="fullWidth"
          sx={{
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.default'
          }}
        >
          {tabConfig.map((tab, index) => (
            <Tab 
              key={tab.id}
              label={tab.label}
              icon={tab.icon}
              iconPosition="start"
              sx={{ 
                minHeight: 60,
                fontWeight: activeTab === index ? 600 : 500,
                color: activeTab === index ? 'primary.main' : 'text.secondary'
              }}
            />
          ))}
        </Tabs>

        {/* Content */}
        <Box sx={{ 
          p: 3, 
          overflowY: 'auto', 
          flex: 1,
          bgcolor: 'background.default'
        }}>
          {/* Summary Tab */}
          {activeTab === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <StatCard
                  title="Total Area"
                  value={`${aiResults.dimensions.area} sq ft`}
                  progress={85}
                  color="primary"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <StatCard
                  title="Rooms"
                  value={aiResults.dimensions.rooms}
                  progress={70}
                  color="success"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <StatCard
                  title="Base Cost"
                  value={`$${aiResults.costEstimate.toLocaleString()}`}
                  progress={60}
                  color="secondary"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" mb={2}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        Key Materials
                      </Typography>
                      <Button 
                        color="primary" 
                        size="small" 
                        endIcon={<ChevronRight />}
                      >
                        View all
                      </Button>
                    </Box>
                    
                    <List disablePadding>
                      {aiResults.dimensions.materials.slice(0, 3).map((material, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ y: -3 }}
                          style={{ width: '100%' }}
                        >
                          <ListItem 
                            sx={{
                              bgcolor: 'background.paper',
                              borderRadius: 2,
                              mb: 1,
                              boxShadow: 1,
                              '&:hover': {
                                bgcolor: 'action.hover'
                              }
                            }}
                          >
                            <ListItemIcon>
                              <Box
                                width={40}
                                height={40}
                                borderRadius={1}
                                bgcolor="primary.light"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Box 
                                  width={8} 
                                  height={8} 
                                  borderRadius="50%" 
                                  bgcolor="primary.main" 
                                />
                              </Box>
                            </ListItemIcon>
                            <ListItemText
                              primary={material.name}
                              secondary={material.category}
                              primaryTypographyProps={{ fontWeight: 500 }}
                            />
                            <Typography fontWeight={600}>
                              {material.quantity} {material.unit}
                            </Typography>
                          </ListItem>
                        </motion.div>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {/* Breakdown Tab */}
          {activeTab === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" mb={3}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        Cost Breakdown
                      </Typography>
                      <Button 
                        color="primary" 
                        size="small"
                        startIcon={<Edit fontSize="small" />}
                      >
                        Edit breakdown
                      </Button>
                    </Box>
                    
                    <Box height={300} position="relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={costBreakdown}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="amount"
                          >
                            {costBreakdown.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <Box
                        position="absolute"
                        top="50%"
                        left="50%"
                        sx={{ transform: 'translate(-50%, -50%)' }}
                        textAlign="center"
                      >
                        <Typography variant="body2" color="text.secondary">
                          Total
                        </Typography>
                        <Typography variant="h6" fontWeight={600}>
                          ${quotationData?.total?.toLocaleString() || '0'}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight={600} mb={3}>
                      Cost Distribution
                    </Typography>
                    
                    <List disablePadding>
                      {costBreakdown.map((item, index) => (
                        <React.Fragment key={index}>
                          <ListItem sx={{ py: 1.5 }}>
                            <ListItemIcon>
                              <Box 
                                width={12} 
                                height={12} 
                                borderRadius="50%" 
                                bgcolor={item.color} 
                              />
                            </ListItemIcon>
                            <ListItemText primary={item.category} />
                            <Box display="flex" gap={2} alignItems="center">
                              <Typography fontWeight={600}>
                                ${item.amount.toLocaleString()}
                              </Typography>
                              <Typography color="text.secondary">
                                {Math.round((item.amount / quotationData?.total) * 100)}%
                              </Typography>
                            </Box>
                          </ListItem>
                          {index < costBreakdown.length - 1 && <Divider />}
                        </React.Fragment>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {/* Timeline Tab */}
          {activeTab === 2 && (
            <Card variant="outlined">
              <CardContent>
                <Box 
                  display="flex" 
                  justifyContent="space-between" 
                  mb={3}
                  flexWrap="wrap"
                  gap={2}
                >
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      Project Timeline
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Estimated Duration
                    </Typography>
                    <Typography variant="h5" fontWeight={700}>
                      {timeEstimate.weeks} weeks, {timeEstimate.days} days
                    </Typography>
                  </Box>
                  <Button 
                    color="primary" 
                    size="small"
                    startIcon={<Edit fontSize="small" />}
                  >
                    Adjust timeline
                  </Button>
                </Box>
                
                <Box sx={{ width: '100%' }}>
                  {timeEstimate.phases.map((phase, index) => (
                    <Box key={index} mb={3}>
                      <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography fontWeight={500}>{phase.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {phase.duration}
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={phase.progress} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: 'action.disabledBackground',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 4,
                            backgroundColor: 'primary.main'
                          }
                        }} 
                      />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>

        {/* Footer */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #0d47a1 0%, #1976d2 100%)',
            p: 3,
            color: 'white'
          }}
        >
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="rgba(255, 255, 255, 0.8)">
                AI-Generated Quotation Total
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                ${quotationData?.total?.toLocaleString() || '0'}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button
                variant="outlined"
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Save Draft
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  bgcolor: 'white',
                  color: 'primary.dark',
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: 'grey.100'
                  }
                }}
              >
                View Full Details
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </motion.div>
  );
};

// Stat Card Sub-component
const StatCard = ({ title, value, progress, color = 'primary' }) => {
  const colorMap = {
    primary: { bg: 'primary.light', bar: 'primary.main' },
    success: { bg: 'success.light', bar: 'success.main' },
    secondary: { bg: 'secondary.light', bar: 'secondary.main' }
  };

  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="body2" color="text.secondary" mb={1}>
          {title}
        </Typography>
        <Typography variant="h5" fontWeight={700} mb={2}>
          {value}
        </Typography>
        <Box sx={{ width: '100%', bgcolor: 'action.disabledBackground', borderRadius: 4 }}>
          <Box 
            sx={{ 
              height: 8, 
              borderRadius: 4,
              width: `${progress}%`,
              bgcolor: colorMap[color].bar
            }} 
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuotationPreview;