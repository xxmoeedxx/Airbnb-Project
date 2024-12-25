import { useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) throw new Error('Signup failed');
            setMessage('Signup successful! You can now log in.');

        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className='p-6 bg-gray-100'>
             <BackButton className="mb-4" />
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md mx-auto px-6 py-8 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
                <form onSubmit={handleSignup} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border rounded-md"
                        required
                    />
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
                        Sign Up
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p>
                        Already have an account?{' '}
                        <Link to="/login" className="text-red-500 hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
                {message && <p className="text-green-500 mt-4 text-center">{message}</p>}
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            </div>
        </div>
        </div>
    );
};

export default SignupPage;
