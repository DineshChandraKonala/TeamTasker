import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await API.post('/auth/register', form);
      navigate('/');
    } catch (err) {
      alert('Registration failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#748873] px-4">
      <div className="bg-[#E5E0D8] p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#748873] text-center mb-6">Register</h2>

        <div className="mb-4">
          <label className="block text-[#4b4453] mb-1">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D1A980]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-[#4b4453] mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D1A980]"
          />
        </div>

        <div className="mb-6">
          <label className="block text-[#4b4453] mb-1">Password</label>
          <input
            type="password"
            placeholder="Create a password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D1A980]"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-[#054602] text-white py-2 rounded-md hover:bg-[#041c01] transition duration-200"
        >
          Register
        </button>
      </div>
    </div>
  );
}
