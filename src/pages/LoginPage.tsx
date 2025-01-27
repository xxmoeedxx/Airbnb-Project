import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../components/useAuth';
import BackButton from '../components/BackButton';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { setUser } = useAuth(); // Access context
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('https://airbnb-backend-dz76.onrender.com/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) throw new Error('Invalid credentials');
            const data = await response.json();

            // Store token and update context
            localStorage.setItem('token', data.token);
            const decoded = JSON.parse(atob(data.token.split('.')[1])); // Decode JWT
            setUser({ id: decoded.id, email: decoded.email, role: decoded.role });

            const previousPage = localStorage.getItem('previousPage') || '/';
            navigate(previousPage); // Redirect to the previous page after login
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className='pt-6 px-6 bg-gray-100'>
            <div className="flex justify-between items-center mb-4">
                <BackButton />
                <Link to="/admin" className="text-red-500 hover:underline">
                    Admin Login
                </Link>
            </div>

            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="max-w-md mx-auto px-6 py-8 bg-white shadow-md rounded-md">
                    <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border rounded-md"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border rounded-md"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600"
                        >
                            Log In
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <p>
                            New to our website?{' '}
                            <Link
                                to="/signup"
                                className="text-red-500 hover:underline"
                            >
                                Sign up here
                            </Link>
                        </p>
                    </div>
                    {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
