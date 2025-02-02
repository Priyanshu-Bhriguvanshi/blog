import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import authservice from '../appwrite/auth';
import { useDispatch } from 'react-redux';
import Input from './Input';
import { useNavigate } from 'react-router-dom';
import { login as setUser } from '../store/authslice.js'; // Assuming your Redux slice has a login action

export const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogin = async (data) => {
        try {
            setError('');
            const session = await authservice.login(data);
            if (session) {
                const userData = await authservice.getUser();
                if (userData) {
                    dispatch(setUser(userData)); // Dispatch Redux login action
                    navigate('/');
                }
            }
        } catch (error) {
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center align-middle bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>

                {error && <p className="text-red-500 text-center mb-3">{error}</p>}

                <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
                    <div>
                        <Input
                            type="text"
                            placeholder="Enter your email"
                            label="Email"
                            className="w-full"
                            {...register('email', { 
                                required: 'Email is required', 
                                pattern: { 
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 
                                    message: 'Enter a valid email'
                                }
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
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
