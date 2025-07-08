// src/components/dashboard/MaterialTable.jsx
import React, { useMemo, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel
} from '@tanstack/react-table';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Typography,
  Skeleton
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const MaterialTable = ({ 
  columns, 
  data, 
  isLoading = false,
  pageSizeOptions = [5, 10, 25],
  initialPageSize = 5
}) => {
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: initialPageSize
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false,
  });

  // Memoize rows to prevent unnecessary re-renders
  const rows = useMemo(() => {
    if (isLoading) {
      return Array(pagination.pageSize).fill({});
    }
    return table.getRowModel().rows;
  }, [isLoading, table, pagination.pageSize]);

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer 
        component={Paper} 
        elevation={3}
        sx={{ borderRadius: '12px', overflow: 'hidden' }}
      >
        <Table aria-label="material data table" size="medium">
          <TableHead sx={{ bgcolor: 'background.paper' }}>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableCell
                    key={header.id}
                    sx={{ 
                      fontWeight: 600,
                      color: 'text.secondary',
                      width: header.column.columnDef.meta?.width || 'auto'
                    }}
                  >
                    {header.column.getCanSort() ? (
                      <TableSortLabel
                        active={header.column.getIsSorted()}
                        direction={header.column.getIsSorted() || 'asc'}
                        onClick={header.column.getToggleSortingHandler()}
                        IconComponent={ArrowDropDownIcon}
                        sx={{ '&.Mui-active': { color: 'primary.main' } }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableSortLabel>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow 
                key={row.id || `skeleton-row-${rowIndex}`}
                hover={!isLoading}
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  opacity: isLoading ? 0.6 : 1
                }}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {isLoading ? (
                      <Skeleton 
                        animation="wave" 
                        height={24} 
                        width={Math.max(100, Math.random() * 200)} 
                      />
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {!isLoading && data.length === 0 && (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              No data available
            </Typography>
          </Box>
        )}
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={pageSizeOptions}
        component="div"
        count={table.getPageCount()}
        rowsPerPage={pagination.pageSize}
        page={pagination.pageIndex}
        onPageChange={(_, page) => table.setPageIndex(page)}
        onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
        sx={{ 
          mt: 2,
          '& .MuiTablePagination-toolbar': { paddingLeft: 0 }
        }}
      />
    </Box>
  );
};

export default MaterialTable;