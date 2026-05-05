import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { CircleNotch, User } from 'phosphor-react';

import { useAuth } from '../context/auth-context';
import ThemeButton from '../components/themeButton/themeButton';
import TitleComponent from '../components/titleComponent/titleComponent';

import sideImg from '../assets/women-massage.webp';
import brandLogo from '../assets/sereniva-dark-logo.svg';

const InputField = ({ label, type, value, onChange, placeholder, required = false, errorText, min }) => (
    <div className="space-y-1.5 w-full">
        <label className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            className={clsx(
                "p-3 md:p-3.5 bg-gray-50 border rounded-lg text-sm text-black w-full placeholder:text-gray-400 focus:outline-none duration-300 focus:bg-white",
                errorText ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-primary"
            )}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            min={min}
            required={required}
        />
        {errorText && <p className="text-xs text-red-500 mt-1">{errorText}</p>}
    </div>
);

const SignUpPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('prefer-not-to-say');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePicturePreview, setProfilePicturePreview] = useState(null);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('');
    const [formValid, setFormValid] = useState(false);

    const { signup } = useAuth();
    const navigate = useNavigate();

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone) => /^\d{10,}$/.test(phone);
    const validateAge = (age) => parseInt(age) >= 18;

    useEffect(() => {
        let strength = "";
        if (password.length > 0) {
            if (password.length < 8) strength = "Too Short";
            else if (!/\d|[^a-zA-Z0-9]/.test(password)) strength = "Weak";
            else strength = "Strong";
        }
        setPasswordStrength(strength);
    }, [password]);

    useEffect(() => {
        const isValid =
            firstName.trim() !== '' &&
            lastName.trim() !== '' &&
            validateEmail(email) &&
            password.length >= 8 &&
            (password === confirmPassword) &&
            (phone === '' || validatePhone(phone)) &&
            (age === '' || validateAge(age));

        setFormValid(isValid);
    }, [firstName, lastName, email, phone, age, password, confirmPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!formValid) {
            setError("Please correct the errors in the form.");
            setLoading(false);
            return;
        }

        try {
            await signup(
                { firstName, lastName, email, phone, age: age || null, gender },
                password,
                profilePicture
            );
            navigate('/');
        } catch (err) {
            setError(err.message || 'Failed to create an account.');
        } finally {
            setLoading(false);
        }
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError('Profile picture must be less than 5MB');
                return;
            }
            if (!file.type.startsWith('image/')) {
                setError('Please upload an image file');
                return;
            }
            setProfilePicture(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicturePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row w-full bg-white">
            <div className="hidden lg:flex w-full lg:w-[40%] xl:w-1/2 relative bg-primary/10 fixed lg:sticky lg:top-0 h-screen">
                <img
                    src={sideImg}
                    alt="Spa Experience"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center p-12 lg:p-16">
                    <TitleComponent type="h2" className="text-white mb-6">Begin your journey.</TitleComponent>
                    <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Join Sereniva today to seamlessly book appointments, track your wellness journey, and experience true relaxation tailored just for you.
                    </p>
                </div>
            </div>

            <div className="w-full lg:w-[60%] xl:w-1/2 flex flex-col p-6 sm:p-10 md:p-12 xl:p-16 relative">
                <div className="w-full max-w-2xl mx-auto lg:mt-4">
                    <div className="text-center mb-8 md:mb-10 border-b border-gray-100 pb-6 md:pb-8">
                        <Link to="/" className="inline-block mb-8 md:mb-10 duration-300 hover:scale-105">
                            <img src={brandLogo} alt="Sereniva" className="h-10 md:h-12 mx-auto" />
                        </Link>
                        <TitleComponent type="h2" className="text-black mb-3">Join Sereniva</TitleComponent>
                        <p className="text-gray-500 text-sm md:text-base">Create an account to easily book appointments, track your wellness journey, and access exclusive offers.</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-4 md:mb-6">
                            <div className="relative">
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-gray-50 shadow-sm bg-gray-100 flex-shrink-0">
                                    {profilePicturePreview ? (
                                        <img src={profilePicturePreview} alt="Profile Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <User size={36} weight="duotone" />
                                        </div>
                                    )}
                                </div>
                                <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-md cursor-pointer duration-300 hover:bg-primaryDark">
                                    <User size={16} weight="bold" />
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleProfilePictureChange}
                                    />
                                </label>
                            </div>
                            <div className="text-center sm:text-left mt-2 sm:mt-4">
                                <h4 className="text-sm md:text-base font-medium text-gray-900 mb-1">Profile Photo</h4>
                                <p className="text-xs text-gray-500">Upload an image (optional, max 5MB)</p>
                            </div>
                        </div>

                        <section>
                            <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                                Personal Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-4 md:mb-5">
                                <InputField
                                    label="First Name"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="Jane"
                                    required
                                />
                                <InputField
                                    label="Last Name"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Doe"
                                    required
                                />
                            </div>
                            <InputField
                                label="Email Address"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="jane@example.com"
                                required
                                errorText={email && !validateEmail(email) ? "Invalid email format" : ""}
                            />
                        </section>

                        <section>
                            <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                                Additional Details <span className="text-[10px] md:text-xs font-normal text-gray-400 uppercase tracking-wider ml-auto">Optional</span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-4 md:mb-5">
                                <InputField
                                    label="Phone Number"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, '');
                                        setPhone(val);
                                    }}
                                    placeholder="1234567890"
                                    errorText={phone && !validatePhone(phone) ? "Must be at least 10 digits" : ""}
                                />
                                <InputField
                                    label="Age"
                                    type="number"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    placeholder="18"
                                    min="18"
                                    errorText={age && !validateAge(age) ? "Must be 18 or older" : ""}
                                />
                            </div>
                            <div className="space-y-1.5 w-full">
                                <label className="block text-sm font-medium text-gray-700">Gender</label>
                                <div className="relative">
                                    <select
                                        className="w-full p-3 md:p-3.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-black appearance-none focus:outline-none focus:border-primary focus:bg-white duration-300"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                        <option value="prefer-not-to-say">Prefer not to say</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
                                Security
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                                <div>
                                    <InputField
                                        label="Password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Create a password"
                                        required
                                    />
                                    {password && (
                                        <div className="mt-2 flex items-center gap-2">
                                            <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className={clsx("h-full duration-300",
                                                        passwordStrength === "Too Short" ? "w-1/3 bg-red-400" :
                                                            passwordStrength === "Weak" ? "w-2/3 bg-yellow-400" :
                                                                "w-full bg-green-500"
                                                    )}
                                                ></div>
                                            </div>
                                            <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-500">{passwordStrength || "Min 8 chars"}</span>
                                        </div>
                                    )}
                                </div>

                                <InputField
                                    label="Confirm Password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm password"
                                    required
                                    errorText={confirmPassword && password !== confirmPassword ? "Passwords do not match" : ""}
                                />
                            </div>
                        </section>

                        <div className="pt-4 md:pt-6">
                            <ThemeButton
                                type="submit"
                                variant="primary"
                                className={clsx("w-full justify-center flex items-center gap-2 py-3.5 md:py-4", !formValid || loading ? "opacity-70 cursor-not-allowed" : "")}
                                disabled={!formValid || loading}
                            >
                                {loading && <CircleNotch className="animate-spin" size={20} />}
                                {loading ? "Creating Account..." : "Create Account"}
                            </ThemeButton>

                            <p className="mt-4 md:mt-6 text-xs text-center text-gray-500 leading-relaxed">
                                Your personal information is kept private and used only for appointment and service purposes.
                                By creating an account, you agree to our <a href="#" className="text-primary hover:underline">Privacy Policy</a> and <a href="#" className="text-primary hover:underline">Terms & Conditions</a>.
                            </p>
                        </div>
                    </form>

                    <div className="mt-8 pt-6 md:pt-8 border-t border-gray-100 text-center pb-8">
                        <p className="text-sm md:text-base text-gray-600">
                            Already have an account?{' '}
                            <Link to="/signin" className="text-primary font-semibold hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
