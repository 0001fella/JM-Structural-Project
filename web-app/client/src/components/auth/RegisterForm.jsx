import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/auth';
import { useAuth } from '../../context/AuthContext';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaHardHat } from 'react-icons/fa';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '',
    confirmPassword: '',
    role: 'engineer' 
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  // Real-time field validation
  useEffect(() => {
    const validateField = (name, value) => {
      switch (name) {
        case 'email':
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address';
        case 'password':
          return validatePassword(value);
        case 'confirmPassword':
          return value === formData.password ? '' : 'Passwords do not match';
        case 'name':
          return value.trim() ? '' : 'Name is required';
        default:
          return '';
      }
    };

    const newErrors = {};
    Object.keys(touched).forEach(name => {
      if (touched[name]) {
        const error = validateField(name, formData[name]);
        if (error) newErrors[name] = error;
      }
    });
    setErrors(newErrors);
  }, [formData, touched]);

  const validatePassword = (password) => {
    if (password.length < 8) return 'Must be 8+ characters';
    if (!/[A-Z]/.test(password)) return 'Must contain uppercase';
    if (!/[a-z]/.test(password)) return 'Must contain lowercase';
    if (!/[0-9]/.test(password)) return 'Must contain number';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      let error = '';
      if (name === 'email') {
        error = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address';
      } else if (name === 'password') {
        error = validatePassword(value);
      } else if (name === 'confirmPassword') {
        error = value === formData.password ? '' : 'Passwords do not match';
      }
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address';
    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      // Remove confirmPassword before submission
      const { confirmPassword, ...userData } = formData;
      const newUser = await register(userData);
      authLogin(newUser);
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err.response?.data?.message 
        || err.message 
        || 'Registration failed. Please try again.';
      setServerError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = Object.keys(errors).length === 0 && 
    formData.name && 
    formData.email && 
    formData.password && 
    formData.confirmPassword;
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-10">
        <div className="mx-auto bg-gradient-to-br from-blue-600 to-cyan-500 w-20 h-20 rounded-full flex items-center justify-center mb-4">
          <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center">
            <FaHardHat className="text-blue-600 text-3xl" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
        <p className="text-gray-600 mt-2">Join thousands of construction professionals</p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {serverError && (
            <div className="text-red-500 p-4 bg-red-50 rounded-lg text-center font-medium">
              {serverError}
            </div>
          )}

          <div className="relative">
            <label className="block text-gray-700 mb-2 font-medium">Full Name</label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                name="name"
                type="text"
                className={`w-full pl-12 pr-4 py-3 border ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="name"
                placeholder="John Doe"
                required
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="relative">
            <label className="block text-gray-700 mb-2 font-medium">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                name="email"
                type="email"
                className={`w-full pl-12 pr-4 py-3 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="email"
                placeholder="john@example.com"
                required
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="relative">
            <label className="block text-gray-700 mb-2 font-medium">Password</label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className={`w-full pl-12 pr-12 py-3 border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="new-password"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <PasswordStrengthIndicator password={formData.password} />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div className="relative">
            <label className="block text-gray-700 mb-2 font-medium">Confirm Password</label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className={`w-full pl-12 pr-12 py-3 border ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="new-password"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Role</label>
            <div className="relative">
              <select
                name="role"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="engineer">Civil Engineer</option>
                <option value="surveyor">Quantity Surveyor</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4 text-gray-700">
                <FaUser />
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className={`w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex justify-center items-center ${
              !isFormValid || loading ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-700 hover:to-cyan-700'
            }`}
            disabled={!isFormValid || loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
      
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>By creating an account, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a></p>
      </div>
    </div>
  );
};

export default RegisterForm;