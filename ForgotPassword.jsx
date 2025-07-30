import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    // Fake delay simulating backend call
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative backdrop-blur-2xl"
      style={{ backgroundImage: "url('/login.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-md bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl p-10 border border-white/30"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Forgot Password?
        </h2>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-white/80 text-sm mb-2 text-center">
              Enter your registered email to receive reset instructions.
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 rounded-lg border border-white/30 text-white placeholder-white/70"
              required
            />

            {error && (
              <div className="text-sm text-red-200 bg-red-900/40 border border-red-400/40 p-2 rounded-lg">
                {error}
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 rounded-xl"
            >
              Send Reset Link
            </motion.button>

            <p className="text-sm text-white/70 text-center mt-4">
              <Link to="/login" className="text-blue-300 hover:underline">
                Return to Sign In
              </Link>
            </p>
          </form>
        ) : (
          <div className="text-center text-white space-y-4">
            <p className="text-lg">✅ If the email exists, reset instructions have been sent!</p>
            <Link to="/login" className="text-blue-300 hover:underline block">
              Back to Login
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;