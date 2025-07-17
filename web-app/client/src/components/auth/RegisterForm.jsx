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
    role: 'engineer',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  // --- Validation Rules ---
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim() ? '' : 'Name is required';
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address';
      case 'password':
        return validatePassword(value);
      case 'confirmPassword':
        return value === formData.password ? '' : 'Passwords do not match';
      default:
        return '';
    }
  };

  const validatePassword = (password) => {
    if (password.length < 8) return 'Must be 8+ characters';
    if (!/[A-Z]/.test(password)) return 'Must contain uppercase';
    if (!/[a-z]/.test(password)) return 'Must contain lowercase';
    if (!/[0-9]/.test(password)) return 'Must contain number';
    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    for (const field in formData) {
      if (field !== 'confirmPassword' || formData.password) {
        const error = validateField(field, formData[field]);
        if (error) newErrors[field] = error;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Realtime Validation Effect ---
  useEffect(() => {
    const updatedErrors = {};
    for (const field in touched) {
      if (touched[field]) {
        const error = validateField(field, formData[field]);
        if (error) updatedErrors[field] = error;
      }
    }
    setErrors(updatedErrors);
  }, [formData, touched]);

  // --- Input Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  // --- Submit Handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validateForm()) return;

    setLoading(true);
    try {
      const { confirmPassword, ...payload } = formData;
      const newUser = await register(payload);
      authLogin(newUser);
      navigate('/dashboard');
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Registration failed. Please try again.';
      setServerError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = Object.keys(errors).length === 0 &&
    Object.values(formData).every(val => val.trim() !== '');

  // --- UI JSX ---
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="mx-auto bg-gradient-to-br from-blue-600 to-cyan-500 w-20 h-20 rounded-full flex items-center justify-center mb-4">
          <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center">
            <FaHardHat className="text-blue-600 text-3xl" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
        <p className="text-gray-600 mt-2">Join thousands of construction professionals</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Server error */}
          {serverError && (
            <div className="text-red-500 p-4 bg-red-50 rounded-lg text-center font-medium">
              {serverError}
            </div>
          )}

          {/* Name */}
          <InputField
            label="Full Name"
            name="name"
            type="text"
            icon={<FaUser />}
            value={formData.name}
            error={errors.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="John Doe"
            autoComplete="name"
          />

          {/* Email */}
          <InputField
            label="Email"
            name="email"
            type="email"
            icon={<FaEnvelope />}
            value={formData.email}
            error={errors.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="john@example.com"
            autoComplete="email"
          />

          {/* Password */}
          <PasswordField
            label="Password"
            name="password"
            value={formData.password}
            error={errors.password}
            show={showPassword}
            onToggle={() => setShowPassword(!showPassword)}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <PasswordStrengthIndicator password={formData.password} />

          {/* Confirm Password */}
          <PasswordField
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            error={errors.confirmPassword}
            show={showConfirmPassword}
            onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          {/* Role */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Role</label>
            <div className="relative">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="engineer">Civil Engineer</option>
                <option value="surveyor">Quantity Surveyor</option>
              </select>
              <div className="absolute left-0 inset-y-0 flex items-center px-4 text-gray-700 pointer-events-none">
                <FaUser />
              </div>
              <div className="absolute right-0 inset-y-0 flex items-center px-4 text-gray-700 pointer-events-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex justify-center items-center ${
              !isFormValid || loading ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-700 hover:to-cyan-700'
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>

          {/* Link to login */}
          <p className="text-center text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
              Sign in
            </a>
          </p>
        </form>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>
          By creating an account, you agree to our{' '}
          <a href="#" className="text-blue-600 hover:underline">Terms</a> and{' '}
          <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

// --- Reusable Form Components ---
const InputField = ({ label, name, type, icon, value, error, onChange, onBlur, placeholder, autoComplete }) => (
  <div>
    <label className="block text-gray-700 mb-2 font-medium">{label}</label>
    <div className="relative">
      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`w-full pl-12 pr-4 py-3 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
        required
      />
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const PasswordField = ({ label, name, value, error, show, onToggle, onChange, onBlur }) => (
  <div>
    <label className="block text-gray-700 mb-2 font-medium">{label}</label>
    <div className="relative">
      <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        name={name}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="••••••••"
        className={`w-full pl-12 pr-12 py-3 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
        required
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        {show ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default RegisterForm;
