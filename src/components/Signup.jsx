import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import authservice from '../appwrite/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import { login as setUser } from '../store/authslice'; // Ensure this action exists

export const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const signup = async (data) => {
    try {
      setError('');
      const signupUser = await authservice.createaccount(data);
      if (signupUser) {
        const userData = await authservice.getUser();
        if (userData) {
          dispatch(setUser(userData));
          navigate('/');
        }
      }
    } catch (error) {
      setError(error.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex justify-center items-center align-middle bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-4">Sign Up</h1>

        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <form onSubmit={handleSubmit(signup)} className="space-y-4">
          <div>
            <Input
              type="text"
              label="Full Name"
              placeholder="Enter your name"
              className="w-full"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <Input
              type="email"
              placeholder="Enter your email"
              label="Email"
              className="w-full"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Enter a valid email',
                },
              })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Enter your password"
              label="Password"
              className="w-full"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
