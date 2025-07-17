// src/services/quotationService.js
import API from './api';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// Create a cache storage
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache

// Create a map for cancel tokens
const cancelTokenMap = new Map();

/**
 * Enhanced API service for quotation operations with advanced features
 */
const quotationService = {
  /**
   * Generates a quotation based on project data
   * @param {Object} projectData - Project data for quotation generation
   * @param {Object} [config] - Additional axios configuration
   * @param {number} [retries=2] - Number of retry attempts
   * @returns {Promise<Object>} Generated quotation data
   */
  generateQuotation: async (projectData, config = {}, retries = 2) => {
    const requestId = uuidv4();
    const cancelToken = axios.CancelToken.source();
    cancelTokenMap.set(requestId, cancelToken);
    
    const requestConfig = {
      cancelToken: cancelToken.token,
      timeout: 30000, // 30 seconds timeout
      headers: {
        'X-Request-ID': requestId,
        'X-Quotation-Version': '2.0',
        ...config.headers
      },
      ...config
    };
    
    try {
      const response = await this.retryableRequest(
        () => API.post('/quotations/generate', projectData, requestConfig),
        retries
      );
      return response.data;
    } catch (error) {
      throw this.handleApiError(error, 'Failed to generate quotation');
    } finally {
      cancelTokenMap.delete(requestId);
    }
  },

  /**
   * Saves a quotation to the server
   * @param {Object} quotationData - Quotation data to save
   * @param {Object} [config] - Additional axios configuration
   * @param {number} [retries=1] - Number of retry attempts
   * @returns {Promise<Object>} Saved quotation data
   */
  saveQuotation: async (quotationData, config = {}, retries = 1) => {
    const requestId = uuidv4();
    const cancelToken = axios.CancelToken.source();
    cancelTokenMap.set(requestId, cancelToken);
    
    const requestConfig = {
      cancelToken: cancelToken.token,
      timeout: 20000, // 20 seconds timeout
      headers: {
        'X-Request-ID': requestId,
        'X-Quotation-Version': '2.0',
        ...config.headers
      },
      ...config
    };
    
    try {
      const response = await this.retryableRequest(
        () => API.post('/quotations/save', quotationData, requestConfig),
        retries
      );
      return response.data;
    } catch (error) {
      throw this.handleApiError(error, 'Failed to save quotation');
    } finally {
      cancelTokenMap.delete(requestId);
    }
  },

  /**
   * Exports a quotation in specified format
   * @param {string} format - Export format (pdf, csv, xlsx)
   * @param {string} quotationId - ID of quotation to export
   * @param {Object} [config] - Additional axios configuration
   * @param {number} [retries=3] - Number of retry attempts
   * @returns {Promise<Blob>} Exported file blob
   */
  exportQuotation: async (format, quotationId, config = {}, retries = 3) => {
    const cacheKey = `export-${format}-${quotationId}`;
    
    // Check cache first
    const cached = cache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
      return cached.data;
    }
    
    const requestId = uuidv4();
    const cancelToken = axios.CancelToken.source();
    cancelTokenMap.set(requestId, cancelToken);
    
    const requestConfig = {
      responseType: 'blob',
      cancelToken: cancelToken.token,
      timeout: 60000, // 60 seconds timeout for exports
      headers: {
        'X-Request-ID': requestId,
        'X-Quotation-Version': '2.0',
        ...config.headers
      },
      ...config
    };
    
    try {
      const response = await this.retryableRequest(
        () => API.get(`/quotations/export/${format}/${quotationId}`, requestConfig),
        retries
      );
      
      // Cache the response
      cache.set(cacheKey, {
        data: response.data,
        timestamp: Date.now()
      });
      
      return response.data;
    } catch (error) {
      throw this.handleApiError(error, 'Failed to export quotation');
    } finally {
      cancelTokenMap.delete(requestId);
    }
  },

  /**
   * Retryable request with exponential backoff
   * @param {Function} requestFn - Function that returns the axios request
   * @param {number} retries - Number of retry attempts
   * @param {number} delay - Initial delay in ms
   * @returns {Promise} Axios response
   */
  retryableRequest: async (requestFn, retries, delay = 1000) => {
    try {
      return await requestFn();
    } catch (error) {
      // Don't retry if cancelled or client error
      if (axios.isCancel(error) || 
          (error.response && error.response.status >= 400 && error.response.status < 500)) {
        throw error;
      }
      
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.retryableRequest(requestFn, retries - 1, delay * 2);
      }
      throw error;
    }
  },

  /**
   * Cancels a specific request by ID
   * @param {string} requestId - The request ID to cancel
   * @param {string} [reason='Request cancelled by user'] - Cancellation reason
   */
  cancelRequest: (requestId, reason = 'Request cancelled by user') => {
    if (cancelTokenMap.has(requestId)) {
      cancelTokenMap.get(requestId).cancel(reason);
      cancelTokenMap.delete(requestId);
    }
  },

  /**
   * Cancels all pending requests
   * @param {string} [reason='Operation cancelled by user'] - Cancellation reason
   */
  cancelAllRequests: (reason = 'Operation cancelled by user') => {
    cancelTokenMap.forEach((cancelToken, requestId) => {
      cancelToken.cancel(reason);
      cancelTokenMap.delete(requestId);
    });
  },

  /**
   * Clears the export cache
   */
  clearExportCache: () => {
    cache.clear();
  },

  /**
   * Handles API errors consistently with enhanced information
   * @param {Error} error - Original error object
   * @param {string} defaultMessage - Default error message
   * @returns {Object} Standardized error object
   */
  handleApiError: (error, defaultMessage = 'API request failed') => {
    // Enhanced error codes
    const errorCodes = {
      400: 'INVALID_REQUEST',
      401: 'UNAUTHORIZED',
      403: 'FORBIDDEN',
      404: 'RESOURCE_NOT_FOUND',
      408: 'TIMEOUT_ERROR',
      429: 'RATE_LIMITED',
      500: 'SERVER_ERROR',
      502: 'BAD_GATEWAY',
      503: 'SERVICE_UNAVAILABLE',
      504: 'GATEWAY_TIMEOUT'
    };
    
    // Handle cancellation
    if (axios.isCancel(error)) {
      return {
        name: 'RequestCancelled',
        message: error.message || 'Request was cancelled',
        code: 'REQUEST_CANCELLED',
        isCancelled: true,
        isNetworkError: false,
        isTimeout: false
      };
    }
    
    // Axios error structure
    if (error.response) {
      const status = error.response.status;
      const errorCode = errorCodes[status] || 'UNKNOWN_SERVER_ERROR';
      
      return {
        name: 'ApiError',
        message: error.response.data?.message || defaultMessage,
        status,
        data: error.response.data,
        code: error.response.data?.code || errorCode,
        isNetworkError: false,
        isTimeout: status === 408 || error.code === 'ECONNABORTED'
      };
    } 
    
    if (error.request) {
      // Check for timeout
      if (error.code === 'ECONNABORTED') {
        return {
          name: 'TimeoutError',
          message: 'Request timed out',
          code: 'REQUEST_TIMEOUT',
          isNetworkError: true,
          isTimeout: true
        };
      }
      
      // Network errors
      return {
        name: 'NetworkError',
        message: error.message || 'Network error: Unable to connect to server',
        code: 'NETWORK_FAILURE',
        isNetworkError: true,
        isTimeout: false
      };
    }
    
    // Request setup errors
    return {
      name: 'RequestError',
      message: error.message || defaultMessage,
      code: 'REQUEST_SETUP_FAILED',
      isNetworkError: false,
      isTimeout: false
    };
  },

  /**
   * Logs request information for debugging and analytics
   * @param {Object} config - Axios request config
   * @param {Object} [response] - Axios response
   * @param {Object} [error] - Error object
   */
  logRequest: (config, response = null, error = null) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      method: config.method?.toUpperCase(),
      url: config.url,
      headers: config.headers,
      requestId: config.headers['X-Request-ID'],
      status: response?.status || error?.response?.status || null,
      duration: response?.config?.transitional?.requestEndTime 
        ? Date.now() - response.config.transitional.requestEndTime
        : null,
      error: error ? {
        message: error.message,
        code: error.code
      } : null
    };
    
    console.log('[Quotation Service]', logEntry);
    // In real app, send to logging service
  }
};

export default quotationService;