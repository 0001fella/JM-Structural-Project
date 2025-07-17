import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const KenyanSupplierNetwork = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suppliers] = useState([
    { id: 1, name: 'Steel Suppliers Ltd', location: 'Nairobi', rating: '4.5/5' },
    { id: 2, name: 'Construction Materials Kenya', location: 'Mombasa', rating: '4.2/5' },
    { id: 3, name: 'National Hardware', location: 'Kisumu', rating: '4.7/5' },
    { id: 4, name: 'East African Steel', location: 'Nakuru', rating: '4.0/5' },
  ]);

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        Kenyan Supplier Network
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          label="Search Suppliers"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '300px' }}
        />
        <Button variant="contained" color="primary">
          Add New Supplier
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="supplier table">
          <TableHead sx={{ bgcolor: 'primary.main' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>ID</TableCell>
              <TableCell sx={{ color: 'white' }}>Supplier Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Location</TableCell>
              <TableCell sx={{ color: 'white' }}>Rating</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSuppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell>{supplier.id}</TableCell>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.location}</TableCell>
                <TableCell>{supplier.rating}</TableCell>
                <TableCell>
                  <Button size="small" variant="outlined" sx={{ mr: 1 }}>
                    View
                  </Button>
                  <Button size="small" variant="outlined" color="secondary">
                    Contact
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredSuppliers.length === 0 && (
        <Typography variant="body1" sx={{ textAlign: 'center', p: 3 }}>
          No suppliers found matching your search criteria
        </Typography>
      )}
    </Paper>
  );
};

export default KenyanSupplierNetwork;