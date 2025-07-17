import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Grid, 
  Card, 
  CardContent,
  CircularProgress,
  Alert,
  Divider,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import { CheckCircleOutline, ErrorOutline } from '@mui/icons-material';

const KenyanComplianceChecker = () => {
  const [supplierId, setSupplierId] = useState('');
  const [complianceStatus, setComplianceStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [standards, setStandards] = useState([
    { id: 'KEBS', name: 'KEBS Certification', required: true, compliant: false },
    { id: 'NEMA', name: 'NEMA Environmental Compliance', required: true, compliant: false },
    { id: 'EPRA', name: 'EPRA Energy Rating', required: false, compliant: false },
    { id: 'PPB', name: 'Pharmacy and Poisons Board', required: true, compliant: false },
    { id: 'KRA', name: 'KRA Tax Compliance', required: true, compliant: false },
  ]);
  const [selectedStandard, setSelectedStandard] = useState('');

  const mockComplianceCheck = () => {
    // Simulate API call
    setIsLoading(true);
    setError('');
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Random compliance status
        const isCompliant = Math.random() > 0.3;
        
        // Random standards compliance
        const updatedStandards = standards.map(standard => ({
          ...standard,
          compliant: Math.random() > 0.4
        }));
        
        setStandards(updatedStandards);
        setComplianceStatus(isCompliant);
        setIsLoading(false);
        
        if (!isCompliant) {
          setError('Supplier failed compliance checks. Review issues below.');
        }
        
        resolve();
      }, 1500);
    });
  };

  const handleCheckCompliance = () => {
    if (!supplierId.trim()) {
      setError('Please enter a valid supplier ID');
      return;
    }
    
    mockComplianceCheck();
  };

  const handleStandardChange = (id) => {
    setStandards(prev => 
      prev.map(standard => 
        standard.id === id 
          ? { ...standard, compliant: !standard.compliant } 
          : standard
      )
    );
  };

  const overallStatus = () => {
    if (complianceStatus === null) return 'Not Checked';
    return complianceStatus ? 'Compliant' : 'Non-Compliant';
  };

  const statusColor = complianceStatus ? 'success' : complianceStatus === false ? 'error' : 'info';

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
        Kenyan Compliance Checker
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Supplier Verification
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  label="Supplier ID"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={supplierId}
                  onChange={(e) => setSupplierId(e.target.value)}
                  placeholder="Enter supplier ID"
                />
                
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={handleCheckCompliance}
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} /> : 'Check Compliance'}
                </Button>
              </Box>
              
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="subtitle1">Overall Status:</Typography>
                {complianceStatus !== null && (
                  complianceStatus ? 
                    <CheckCircleOutline color="success" /> : 
                    <ErrorOutline color="error" />
                )}
                <Typography variant="body1" color={statusColor} sx={{ fontWeight: 'bold' }}>
                  {overallStatus()}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Compliance Standards
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Add Standard</InputLabel>
                  <Select
                    value={selectedStandard}
                    label="Add Standard"
                    onChange={(e) => setSelectedStandard(e.target.value)}
                  >
                    <MenuItem value=""><em>Select a standard</em></MenuItem>
                    <MenuItem value="OSHA">Occupational Safety (OSHA)</MenuItem>
                    <MenuItem value="KEPHIS">KEPHIS Agricultural</MenuItem>
                    <MenuItem value="CAK">CAK Communications</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
              <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
                {standards.map((standard) => (
                  <FormControlLabel
                    key={standard.id}
                    control={
                      <Checkbox
                        checked={standard.compliant}
                        onChange={() => handleStandardChange(standard.id)}
                        color={standard.compliant ? 'success' : 'error'}
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2">
                          {standard.name}
                        </Typography>
                        {standard.required && (
                          <Typography variant="caption" color="error" sx={{ ml: 1 }}>
                            (Required)
                          </Typography>
                        )}
                      </Box>
                    }
                    sx={{ 
                      display: 'block',
                      mb: 1,
                      backgroundColor: standard.compliant ? 'rgba(46, 125, 50, 0.1)' : 'rgba(211, 47, 47, 0.1)',
                      p: 1,
                      borderRadius: 1
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {complianceStatus === false && (
        <Alert severity="error" sx={{ mt: 2 }}>
          This supplier has failed critical compliance checks. Take corrective action before proceeding.
        </Alert>
      )}
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="outlined" sx={{ mr: 1 }}>
          Generate Report
        </Button>
        <Button variant="contained" color="secondary">
          Save Compliance Record
        </Button>
      </Box>
    </Paper>
  );
};

export default KenyanComplianceChecker;