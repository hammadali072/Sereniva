import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/auth-context';
import ThemeButton from '../components/themeButton/themeButton';
import TitleComponent from '../components/titleComponent/titleComponent';

import sideImg from '../assets/service-img1.webp';
import brandLogo from '../assets/sereniva-dark-logo.svg';

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError('Failed to sign in. Please check your credentials.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row w-full bg-white">
            <div className="hidden lg:flex w-full lg:w-1/2 relative bg-primary/10">
                <img
                    src={sideImg}
                    alt="Spa Experience"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center p-12 lg:p-16">
                    <TitleComponent type="h2" className="text-white mb-6">Welcome back to tranquility.</TitleComponent>
                    <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Sign in to book your next rejuvenating experience and effortlessly manage your appointments. Your journey to wellness continues here.
                    </p>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 md:p-16 xl:p-24 relative min-h-screen lg:min-h-0">
                <div className="w-full max-w-md mx-auto">
                    <div className="text-center mb-8 md:mb-10">
                        <Link to="/" className="inline-block mb-8 md:mb-10">
                            <img src={brandLogo} alt="Sereniva" className="h-10 md:h-12 mx-auto" />
                        </Link>
                        <TitleComponent type="h2" className="text-black mb-3">Welcome Back</TitleComponent>
                        <p className="text-gray-500 text-sm md:text-base">Sign in to access your upcoming spa appointments and exclusive wellness offers.</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                className="w-full p-3 md:p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-black placeholder:text-gray-400 focus:border-primary focus:bg-white duration-300"
                                placeholder="jane@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <a href="#" className="text-xs text-primary hover:underline font-medium">Forgot password?</a>
                            </div>
                            <input
                                type="password"
                                className="w-full p-3 md:p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-black placeholder:text-gray-400 focus:border-primary focus:bg-white duration-300"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <ThemeButton type="submit" variant="primary" className="w-full justify-center py-3.5 md:py-4 mt-4">
                            Sign In
                        </ThemeButton>
                    </form>

                    <div className="mt-8 md:mt-10 pt-6 border-t border-gray-100 text-center">
                        <p className="text-sm md:text-base text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-primary font-semibold hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
