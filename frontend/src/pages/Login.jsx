import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { setToken } from '../services/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await API.post('/auth/login', { email, password });
      setToken(data.token);
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed. Check credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#748873] px-4">
      <div className="bg-[#E5E0D8] p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#748873] text-center mb-6">Login</h2>

        <div className="mb-4">
          <label className="block text-[#4b4453] mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D1A980]"
          />
        </div>

        <div className="mb-6">
          <label className="block text-[#4b4453] mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D1A980]"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-[#054602] text-white py-2 rounded-md hover:bg-[#041c01] transition duration-200"
        >
          Login
        </button>

        <p className="text-sm text-center text-[#4b4453] mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#054602] font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
