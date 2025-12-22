import { useState, useEffect } from 'react';
import { useAuth } from '../context/auth-context';
import { useNavigate } from 'react-router-dom';
import { User, CalendarCheck, Lock, Heart, SignOut, Trash, Eye, EyeSlash, CaretRight, ChatCircleDots, ArrowBendUpLeft, UserCircle } from 'phosphor-react';
import clsx from 'clsx';
import ThemeButton from '../components/themeButton/themeButton';
import { myAppointments as initialAppointments } from '../data/profile-data';
import { messages as allMessages } from '../data/admin-data';

const ProfilePage = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('personal');
    const [isEditing, setIsEditing] = useState(false);
    const [appointments, setAppointments] = useState(initialAppointments);

    // Read URL param for initial tab
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tab = params.get('tab');
        if (tab) setActiveTab(tab);
    }, [location.search]);

    // Form State (initialized with mock user data if available)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        age: '',
        gender: 'prefer-not-to-say',
        email: '',
        profilePhoto: ''
    });

    useEffect(() => {
        if (currentUser) {
            const [first, ...last] = (currentUser.name || "").split(" ");
            setFormData({
                firstName: first || "",
                lastName: last.join(" ") || "",
                phone: currentUser.phone || "555-000-0000",
                age: currentUser.age || "28",
                gender: currentUser.gender || "Female",
                email: currentUser.email || "",
                profilePhoto: currentUser.avatar || ""
            });
        } else {
            // Redirect if not logged in (basic protection)
            navigate('/signin');
        }
    }, [currentUser, navigate]);

    // Notification State
    const [toast, setToast] = useState(null);
    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        // Simulate API call
        setIsEditing(false);
        showToast("Profile updated successfully!");
    };

    const handleCancelAppointment = (id) => {
        if (confirm("Are you sure you want to cancel this appointment?")) {
            setAppointments(prev => prev.map(apt => apt.id === id ? { ...apt, status: 'Cancelled' } : apt));
            showToast("Appointment cancelled.", 'info');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, profilePhoto: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    // Sub-components for sections
    const SidebarItem = ({ id, icon: Icon, label }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={clsx(
                "w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                activeTab === id ? "bg-primary text-white shadow-md" : "text-gray-600 hover:bg-gray-50"
            )}
        >
            <div className="flex items-center gap-3">
                <Icon size={20} weight={activeTab === id ? "fill" : "regular"} />
                {label}
            </div>
            {activeTab === id && <CaretRight size={16} weight="bold" />}
        </button>
    );

    return (
        <div className="bg-gray-50 min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-4">

                {/* Header / Overview */}
                <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                    <div className="relative">
                        <img
                            src={currentUser?.avatar || "https://i.pravatar.cc/150"}
                            alt="Profile"
                            className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                        />
                        <button className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full shadow-sm hover:bg-primaryDark transition-colors">
                            <User size={16} weight="bold" />
                        </button>
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl font-bold text-gray-900">{currentUser?.name}</h1>
                        <p className="text-gray-500">{currentUser?.email}</p>
                        <div className="flex items-center gap-2 justify-center md:justify-start mt-2">
                            <span className="px-2 py-0.5 bg-white border border-gray-200 rounded text-xs font-medium text-gray-600 uppercase tracking-wide">
                                {currentUser?.role || "Member"}
                            </span>
                            <span className="text-xs text-gray-400">Member since Oct 2023</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-1 sticky top-24">
                            <SidebarItem id="personal" icon={User} label="Personal Information" />
                            <SidebarItem id="appointments" icon={CalendarCheck} label="My Appointments" />

                            {/* Spa Preferences only for Users (not therapists) */}
                            {currentUser?.role !== 'therapist' && (
                                <SidebarItem id="preferences" icon={Heart} label="Spa Preferences" />
                            )}

                            <SidebarItem id="security" icon={Lock} label="Security Settings" />
                            <SidebarItem id="messages" icon={ChatCircleDots} label="My Messages" />

                            <hr className="my-2 border-gray-100" />

                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <SignOut size={20} /> Logout
                            </button>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3">
                        {toast && (
                            <div className={clsx(
                                "fixed top-24 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white animate-fade-in-down",
                                toast.type === 'success' ? "bg-green-500" : "bg-blue-500"
                            )}>
                                {toast.message}
                            </div>
                        )}

                        {/* Personal Info Tab */}
                        {activeTab === 'personal' && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
                                    {!isEditing && (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="text-primary text-sm font-medium hover:underline"
                                        >
                                            Edit Details
                                        </button>
                                    )}
                                </div>

                                <form onSubmit={handleSaveProfile}>
                                    {/* Profile Photo Upload */}
                                    <div className="col-span-full mb-8 flex flex-col items-center">
                                        <div className="relative mb-4">
                                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-md">
                                                {formData.profilePhoto ? (
                                                    <img src={formData.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                                                        <UserCircle size={64} weight="duotone" />
                                                    </div>
                                                )}
                                            </div>
                                            {isEditing && (
                                                <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-md hover:bg-primaryDark cursor-pointer transition-colors">
                                                    <User size={18} weight="bold" />
                                                    <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                                                </label>
                                            )}
                                        </div>
                                        {isEditing && (
                                            <p className="text-xs text-gray-500">Click the icon to upload a new photo</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-gray-700">First Name</label>
                                            <input
                                                type="text"
                                                disabled={!isEditing}
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                className="w-full p-3 bg-gray-50 border border-transparent rounded-lg text-sm text-gray-900 focus:bg-white focus:border-primary focus:outline-none disabled:text-gray-500"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-gray-700">Last Name</label>
                                            <input
                                                type="text"
                                                disabled={!isEditing}
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                className="w-full p-3 bg-gray-50 border border-transparent rounded-lg text-sm text-gray-900 focus:bg-white focus:border-primary focus:outline-none disabled:text-gray-500"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-gray-700">Email Address</label>
                                            <input
                                                type="email"
                                                disabled
                                                value={formData.email}
                                                className="w-full p-3 bg-gray-100 border border-transparent rounded-lg text-sm text-gray-500 cursor-not-allowed"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-gray-700">Phone Number</label>
                                            <input
                                                type="tel"
                                                disabled={!isEditing}
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full p-3 bg-gray-50 border border-transparent rounded-lg text-sm text-gray-900 focus:bg-white focus:border-primary focus:outline-none disabled:text-gray-500"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-gray-700">Age</label>
                                            <input
                                                type="number"
                                                disabled={!isEditing}
                                                value={formData.age}
                                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                                className="w-full p-3 bg-gray-50 border border-transparent rounded-lg text-sm text-gray-900 focus:bg-white focus:border-primary focus:outline-none disabled:text-gray-500"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-gray-700">Gender</label>
                                            <select
                                                disabled={!isEditing}
                                                value={formData.gender}
                                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                                className="w-full p-3 bg-gray-50 border border-transparent rounded-lg text-sm text-gray-900 focus:bg-white focus:border-primary focus:outline-none disabled:text-gray-500"
                                            >
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                                <option value="prefer-not-to-say">Prefer not to say</option>
                                            </select>
                                        </div>
                                    </div>

                                    {isEditing && (
                                        <div className="mt-8 flex items-center gap-4 animate-fade-in-down">
                                            <ThemeButton type="submit" variant="primary">Save Changes</ThemeButton>
                                            <button
                                                type="button"
                                                onClick={() => setIsEditing(false)}
                                                className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </form>
                            </div>
                        )}

                        {/* Appointments Tab */}
                        {activeTab === 'appointments' && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                                <h2 className="text-xl font-bold text-gray-800 mb-6">My Appointments</h2>
                                <div className="space-y-4">
                                    {appointments.map((apt) => (
                                        <div key={apt.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-primary/30 transition-colors bg-gray-50/50">
                                            <div className="flex items-start gap-4 mb-4 md:mb-0">
                                                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm">
                                                    <CalendarCheck size={24} />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{apt.service}</h3>
                                                    <p className="text-sm text-gray-500">{apt.date} at {apt.time}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-xs text-gray-400">with {apt.therapist}</span>
                                                        <span className="text-xs text-gray-300">•</span>
                                                        <span className="text-xs text-gray-400">{apt.duration}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className={clsx(
                                                    "px-3 py-1 rounded-full text-xs font-medium",
                                                    apt.status === 'Confirmed' ? "bg-green-100 text-green-700" :
                                                        apt.status === 'Pending' ? "bg-yellow-100 text-yellow-700" :
                                                            apt.status === 'Cancelled' ? "bg-red-100 text-red-700" :
                                                                "bg-gray-100 text-gray-700"
                                                )}>
                                                    {apt.status}
                                                </span>
                                                {(apt.status === 'Pending' || apt.status === 'Confirmed') && (
                                                    <button
                                                        onClick={() => handleCancelAppointment(apt.id)}
                                                        className="text-sm text-red-500 hover:text-red-700 hover:underline"
                                                    >
                                                        Cancel
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {appointments.length === 0 && (
                                        <p className="text-gray-500 text-center py-8">No appointments found.</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Spa Preferences Tab */}
                        {activeTab === 'preferences' && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                                <h2 className="text-xl font-bold text-gray-800 mb-6">Spa Preferences</h2>
                                <form className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Skin Type</label>
                                        <div className="flex flex-wrap gap-2">
                                            {['Dry', 'Oily', 'Combination', 'Sensitive', 'Normal'].map(type => (
                                                <label key={type} className="cursor-pointer">
                                                    <input type="radio" name="skinType" className="peer sr-only" />
                                                    <span className="px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-600 peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-all hover:bg-gray-50">
                                                        {type}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Allergies or Sensitivities</label>
                                        <textarea
                                            className="w-full p-3 bg-gray-50 border border-transparent rounded-lg text-sm text-gray-900 focus:bg-white focus:border-primary focus:outline-none h-24 resize-none"
                                            placeholder="Please list any allergies (e.g., nuts, latex) or skin sensitivities..."
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Appointment Time</label>
                                        <div className="grid grid-cols-3 gap-4">
                                            {['Morning', 'Afternoon', 'Evening'].map(time => (
                                                <label key={time} className="cursor-pointer text-center">
                                                    <input type="checkbox" className="peer sr-only" />
                                                    <div className="p-3 rounded-lg border border-gray-200 text-sm text-gray-600 peer-checked:bg-primary/5 peer-checked:text-primary peer-checked:border-primary transition-all hover:border-gray-300">
                                                        {time}
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <ThemeButton variant="primary" onClick={(e) => { e.preventDefault(); showToast("Preferences saved!"); }}>Save Preferences</ThemeButton>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Security Tab */}
                        {activeTab === 'security' && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                                <h2 className="text-xl font-bold text-gray-800 mb-6">Security Settings</h2>
                                <form className="max-w-md space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-gray-700">Current Password</label>
                                        <div className="relative">
                                            <input type="password" className="w-full p-3 bg-gray-50 border border-transparent rounded-lg text-sm text-gray-900 focus:bg-white focus:border-primary focus:outline-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-gray-700">New Password</label>
                                        <input type="password" className="w-full p-3 bg-gray-50 border border-transparent rounded-lg text-sm text-gray-900 focus:bg-white focus:border-primary focus:outline-none" />

                                        {/* Simple Strength Indicator */}
                                        <div className="flex gap-1 h-1 mt-2">
                                            <div className="flex-1 bg-green-500 rounded-full"></div>
                                            <div className="flex-1 bg-green-500 rounded-full"></div>
                                            <div className="flex-1 bg-gray-200 rounded-full"></div>
                                        </div>
                                        <p className="text-xs text-green-600 mt-1">Strong password</p>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                                        <input type="password" className="w-full p-3 bg-gray-50 border border-transparent rounded-lg text-sm text-gray-900 focus:bg-white focus:border-primary focus:outline-none" />
                                    </div>

                                    <div className="pt-4">
                                        <ThemeButton variant="secondary" onClick={(e) => { e.preventDefault(); showToast("Password updated!"); }}>Update Password</ThemeButton>
                                    </div>
                                </form>

                                <hr className="my-8 border-gray-100" />

                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">Delete Account</h3>
                                    <p className="text-sm text-gray-500 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                                    <button className="px-4 py-2 border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2">
                                        <Trash size={18} /> Delete Account
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Messages Tab */}
                        {activeTab === 'messages' && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                                <h2 className="text-xl font-bold text-gray-800 mb-6">My Messages & Queries</h2>
                                <div className="space-y-6">
                                    {(() => {
                                        const userMessages = allMessages.filter(m => m.email === currentUser?.email);
                                        if (userMessages.length === 0) {
                                            return (
                                                <div className="text-center py-12 text-gray-400">
                                                    <ChatCircleDots size={64} className="mx-auto mb-4 opacity-30" />
                                                    <p>No messages found</p>
                                                    <p className="text-sm mt-2">Your contact form submissions will appear here</p>
                                                </div>
                                            );
                                        }
                                        return userMessages.map((msg) => (
                                            <div key={msg.id} className="border border-gray-100 rounded-xl overflow-hidden">
                                                {/* User Query */}
                                                <div className="p-5 bg-gray-50">
                                                    <div className="flex items-start gap-4">
                                                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold flex-shrink-0">
                                                            {currentUser.name.charAt(0)}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-start justify-between mb-2">
                                                                <div>
                                                                    <p className="font-semibold text-gray-900">{msg.sender} (You)</p>
                                                                    <p className="text-xs text-gray-500">{msg.date}</p>
                                                                </div>
                                                                <span className={clsx(
                                                                    "px-3 py-1 rounded-full text-xs font-medium",
                                                                    msg.reply
                                                                        ? "bg-green-100 text-green-700"
                                                                        : "bg-yellow-100 text-yellow-700"
                                                                )}>
                                                                    {msg.reply ? 'Replied' : 'Pending'}
                                                                </span>
                                                            </div>
                                                            <h4 className="font-bold text-gray-900 mb-2">{msg.subject}</h4>
                                                            <p className="text-sm text-gray-600 leading-relaxed">{msg.message}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Admin Reply */}
                                                {msg.reply && (
                                                    <div className="p-5 bg-white border-t border-gray-100">
                                                        <div className="flex items-start gap-4">
                                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                                                A
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <ArrowBendUpLeft size={16} className="text-primary" />
                                                                    <p className="font-semibold text-gray-900">Admin Response</p>
                                                                    <span className="text-xs text-gray-400">{msg.replyDate || msg.date}</span>
                                                                </div>
                                                                <p className="text-sm text-gray-700 leading-relaxed bg-blue-50/50 p-4 rounded-lg">
                                                                    {msg.reply}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ));
                                    })()}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
