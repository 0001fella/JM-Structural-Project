import React, { useMemo, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel
} from '@tanstack/react-table';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSort, 
  FaSortUp, 
  FaSortDown, 
  FaChevronLeft, 
  FaChevronRight,
  FaSearch,
  FaFilter,
  FaDownload,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';

const MaterialTable = ({ 
  columns, 
  data, 
  isLoading = false,
  pageSizeOptions = [5, 10, 25, 50],
  initialPageSize = 10
}) => {
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: initialPageSize
  });
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [showColumnMenu, setShowColumnMenu] = useState(false);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
      globalFilter,
      columnVisibility,
      rowSelection
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    autoResetPageIndex: false,
  });

  // Memoize rows to prevent unnecessary re-renders
  const rows = useMemo(() => {
    if (isLoading) {
      return Array(pagination.pageSize).fill({});
    }
    return table.getRowModel().rows;
  }, [isLoading, table, pagination.pageSize]);

  const selectedRowsCount = Object.keys(rowSelection).length;

  return (
    <div className="w-full">
      {/* Table Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            value={globalFilter}
            onChange={e => setGlobalFilter(e.target.value)}
            placeholder="Search materials..."
            className="pl-10 pr-4 py-2.5 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors shadow-sm"
          />
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <button 
              onClick={() => setShowColumnMenu(!showColumnMenu)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              <FaFilter className="text-gray-600" />
              <span>Columns</span>
            </button>
            
            <AnimatePresence>
              {showColumnMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10 overflow-hidden"
                >
                  <div className="p-2 border-b border-gray-200">
                    <h4 className="font-medium text-gray-800">Toggle Columns</h4>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {table.getAllLeafColumns().map(column => (
                      <label 
                        key={column.id}
                        className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={column.getIsVisible()}
                          onChange={column.getToggleVisibilityHandler()}
                          className="mr-2 rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                          {column.columnDef.header || column.id}
                        </span>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            <FaDownload className="text-gray-600" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Summary Bar */}
      {selectedRowsCount > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg flex items-center justify-between"
        >
          <div className="flex items-center">
            <span className="text-blue-700 font-medium">
              {selectedRowsCount} {selectedRowsCount === 1 ? 'item' : 'items'} selected
            </span>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-sm bg-white border border-blue-500 text-blue-600 rounded hover:bg-blue-50 transition-colors">
              Export Selected
            </button>
            <button 
              onClick={() => setRowSelection({})}
              className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Clear
            </button>
          </div>
        </motion.div>
      )}

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  <th className="w-12 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={table.getIsAllPageRowsSelected()}
                      onChange={table.getToggleAllPageRowsSelectedHandler()}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  {headerGroup.headers.map(header => {
                    const isVisible = header.column.getIsVisible();
                    return (
                      <th
                        key={header.id}
                        className={`px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${
                          !isVisible ? 'hidden' : ''
                        }`}
                        style={{ 
                          width: header.column.columnDef.meta?.width || 'auto'
                        }}
                      >
                        {header.column.getCanSort() ? (
                          <button
                            className={`flex items-center space-x-1 group w-full ${
                              header.column.getIsSorted() ? 'text-blue-600' : ''
                            }`}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            <span>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                              {header.column.getIsSorted() === 'asc' ? (
                                <FaSortUp className="text-blue-600" />
                              ) : header.column.getIsSorted() === 'desc' ? (
                                <FaSortDown className="text-blue-600" />
                              ) : (
                                <FaSort className="text-gray-400" />
                              )}
                            </span>
                          </button>
                        ) : (
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )
                        )}
                      </th>
                    );
                  })}
                  <th className="w-12 px-4 py-3 text-right">
                    <FiMoreVertical className="text-gray-400 mx-auto" />
                  </th>
                </tr>
              ))}
            </thead>
            
            <tbody className="divide-y divide-gray-200">
              {rows.map((row, rowIndex) => (
                <motion.tr 
                  key={row.id || `skeleton-row-${rowIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: rowIndex * 0.02 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    {!isLoading && (
                      <input
                        type="checkbox"
                        checked={row.getIsSelected()}
                        onChange={row.getToggleSelectedHandler()}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                    )}
                  </td>
                  {row.getVisibleCells().map(cell => {
                    const isVisible = cell.column.getIsVisible();
                    return (
                      <td 
                        key={cell.id}
                        className={`px-4 py-3 text-sm ${!isVisible ? 'hidden' : ''}`}
                      >
                        {isLoading ? (
                          <div className="h-4 bg-gray-200 rounded animate-pulse" style={{ 
                            width: `${Math.max(60, Math.random() * 200)}px` 
                          }} />
                        ) : (
                          flexRender(cell.column.columnDef.cell, cell.getContext())
                        )}
                      </td>
                    );
                  })}
                  <td className="px-4 py-3">
                    {!isLoading && (
                      <button className="text-gray-400 hover:text-gray-700 transition-colors">
                        <FiMoreVertical />
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {!isLoading && data.length === 0 && (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <FaEyeSlash className="text-gray-400 text-xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No materials found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
      
      {/* Table Footer */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">
          Showing {table.getRowModel().rows.length} of {data.length} items
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <span className="mr-2 text-sm text-gray-600">Rows per page:</span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={e => table.setPageSize(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              {pageSizeOptions.map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className={`p-2 rounded-full ${
                table.getCanPreviousPage() 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              <FaChevronLeft />
            </button>
            
            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-700">Page</span>
              <span className="font-medium">{table.getState().pagination.pageIndex + 1}</span>
              <span className="text-sm text-gray-700">of</span>
              <span className="font-medium">{table.getPageCount()}</span>
            </div>
            
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className={`p-2 rounded-full ${
                table.getCanNextPage() 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialTable;