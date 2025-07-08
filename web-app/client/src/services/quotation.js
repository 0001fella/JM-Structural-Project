// src/services/quotationService.js
import API from './api';
import axios from 'axios';

// Create a cancel token source for request cancellation
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

/**
 * Enhanced API service for quotation operations
 */
const quotationService = {
  /**
   * Generates a quotation based on project data
   * @param {Object} projectData - Project data for quotation generation
   * @param {Object} [config] - Additional axios configuration
   * @returns {Promise<Object>} Generated quotation data
   */
  generateQuotation: async (projectData, config = {}) => {
    try {
      const response = await API.post('/quotations/generate', projectData, {
        cancelToken: source.token,
        ...config
      });
      return response.data;
    } catch (error) {
      // Handle cancellation differently
      if (axios.isCancel(error)) {
        throw { 
          name: 'RequestCancelled', 
          message: 'Quotation generation request was cancelled',
          isCancelled: true
        };
      }
      throw this.handleApiError(error, 'Failed to generate quotation');
    }
  },

  /**
   * Saves a quotation to the server
   * @param {Object} quotationData - Quotation data to save
   * @param {Object} [config] - Additional axios configuration
   * @returns {Promise<Object>} Saved quotation data
   */
  saveQuotation: async (quotationData, config = {}) => {
    try {
      const response = await API.post('/quotations/save', quotationData, {
        cancelToken: source.token,
        ...config
      });
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        throw { 
          name: 'RequestCancelled', 
          message: 'Quotation save request was cancelled',
          isCancelled: true
        };
      }
      throw this.handleApiError(error, 'Failed to save quotation');
    }
  },

  /**
   * Exports a quotation in specified format
   * @param {string} format - Export format (pdf, csv, xlsx)
   * @param {string} quotationId - ID of quotation to export
   * @param {Object} [config] - Additional axios configuration
   * @returns {Promise<Blob>} Exported file blob
   */
  exportQuotation: async (format, quotationId, config = {}) => {
    try {
      const response = await API.get(
        `/quotations/export/${format}/${quotationId}`, 
        {
          responseType: 'blob',
          cancelToken: source.token,
          ...config
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        throw { 
          name: 'RequestCancelled', 
          message: 'Export request was cancelled',
          isCancelled: true
        };
      }
      throw this.handleApiError(error, 'Failed to export quotation');
    }
  },

  /**
   * Cancels all pending requests
   */
  cancelRequests: () => {
    source.cancel('Operation cancelled by user');
  },

  /**
   * Handles API errors consistently
   * @param {Error} error - Original error object
   * @param {string} defaultMessage - Default error message
   * @returns {Object} Standardized error object
   */
  handleApiError: (error, defaultMessage = 'API request failed') => {
    // Axios error structure
    if (error.response) {
      // Server responded with non-2xx status
      return {
        name: 'ApiError',
        message: error.response.data?.message || defaultMessage,
        status: error.response.status,
        data: error.response.data,
        code: error.response.data?.code || 'SERVER_ERROR',
        isNetworkError: false
      };
    } else if (error.request) {
      // No response received
      return {
        name: 'NetworkError',
        message: 'Network error: No response from server',
        status: null,
        data: null,
        code: 'NETWORK_FAILURE',
        isNetworkError: true
      };
    } else {
      // Request setup error
      return {
        name: 'RequestError',
        message: error.message || defaultMessage,
        status: null,
        data: null,
        code: 'REQUEST_SETUP_FAILED',
        isNetworkError: false
      };
    }
  }
};

export default quotationService;