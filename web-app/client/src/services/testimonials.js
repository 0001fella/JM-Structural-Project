import api from './api';

export const getTestimonials = async () => {
  try {
    const response = await api.get('/testimonials');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch testimonials');
  }
};

// Admin functions would go here in the future