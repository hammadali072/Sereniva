import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/auth-context';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, CalendarCheck, Lock, ChatCircleDots, Bell } from 'phosphor-react';
import { database } from '../firebase';
import { ref, onValue, update, remove } from 'firebase/database';

// Import Modular Components
import ProfileOverviewCard from '../components/profile/ProfileOverviewCard';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import PersonalTab from '../components/profile/PersonalTab';
import AppointmentsTab from '../components/profile/AppointmentsTab';
import NotificationsTab from '../components/profile/NotificationsTab';
import MessagesTab from '../components/profile/MessagesTab';
import SecurityTab from '../components/profile/SecurityTab';
import Toast from '../components/profile/Toast';
import ReviewModal from '../components/modal/ReviewModal';

/**
 * RBAC Tab Configuration
 * roles: array of roles allowed to see this tab
 */
const TABS = [
    { id: 'personal', label: 'My Profile', icon: User, roles: ['admin', 'therapist', 'customer'] },
    { id: 'appointments', label: 'Appointments', icon: CalendarCheck, roles: ['therapist', 'customer'] },
    { id: 'notifications', label: 'Notifications', icon: Bell, roles: ['therapist', 'customer'] },
    { id: 'messages', label: 'Messages', icon: ChatCircleDots, roles: ['admin', 'therapist', 'customer'] },
    { id: 'security', label: 'Security', icon: Lock, roles: ['admin', 'therapist', 'customer'] },
];

const ProfilePage = () => {
    const { currentUser, logout, updateUserProfile, changePassword } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [activeTab, setActiveTab] = useState('personal');
    const [isEditing, setIsEditing] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    // Data States
    const [appointments, setAppointments] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [userMessages, setUserMessages] = useState([]);
    const [loading, setLoading] = useState({
        appointments: true,
        notifications: true,
        messages: false
    });

    // Modal & Toast States
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [selectedApt, setSelectedApt] = useState(null);
    const [reviewMode, setReviewMode] = useState('add');
    const [toast, setToast] = useState(null);

    const [formData, setFormData] = useState({
        firstName: '', lastName: '', phone: '', age: '', gender: 'prefer-not-to-say', email: '', profilePhoto: ''
    });

    const [passwordData, setPasswordData] = useState({ newPassword: '', confirmPassword: '' });

    // Toast Helper
    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // FILTER TABS BY ROLE
    const filteredTabs = useMemo(() => 
        TABS.filter(tab => tab.roles.includes(currentUser?.role?.toLowerCase() || 'customer')),
    [currentUser?.role]);

    // INITIAL LOAD & AUTH CHECK
    useEffect(() => {
        if (!currentUser) {
            navigate('/signin');
            return;
        }

        const params = new URLSearchParams(location.search);
        const tab = params.get('tab');
        if (tab && filteredTabs.some(t => t.id === tab)) {
            setActiveTab(tab);
        } else if (!filteredTabs.some(t => t.id === activeTab)) {
            setActiveTab(filteredTabs[0].id);
        }

        if (!isEditing) {
            setFormData({
                firstName: currentUser.firstName || "",
                lastName: currentUser.lastName || "",
                phone: currentUser.phone || "",
                age: currentUser.age || "",
                gender: currentUser.gender || "prefer-not-to-say",
                email: currentUser.email || "",
                profilePhoto: currentUser.photoURL || ""
            });
        }

        // Stripe Payment Return Handling
        const sessionId = params.get('session_id');
        const aptId = params.get('apt_id');
        if (sessionId && aptId) {
            const handlePaymentSuccess = async () => {
                try {
                    await update(ref(database, `appointments/${aptId}`), {
                        paymentStatus: 'paid', status: 'confirmed', stripeSessionId: sessionId
                    });
                    showToast("Payment Successful! ✨ Your appointment is now confirmed.", "success");
                    window.history.replaceState({}, document.title, window.location.pathname);
                } catch (error) {
                    showToast("Payment record update failed. Please contact support.", "error");
                }
            };
            handlePaymentSuccess();
        }
    }, [currentUser, navigate, location.search, currentUser?.role, filteredTabs]);

    // REAL-TIME DATA FETCHING
    useEffect(() => {
        if (!currentUser) return;

        // Appointments
        const aptsRef = ref(database, 'appointments');
        const aptsUnsub = onValue(aptsRef, (snapshot) => {
            if (snapshot.exists()) {
                const list = Object.entries(snapshot.val())
                    .map(([id, val]) => ({ id, ...val }))
                    .filter(a => {
                        const isOwner = a.userId === currentUser.uid;
                        const isAssigned = currentUser.role?.toLowerCase() === 'therapist' && a.therapistEmail?.toLowerCase() === currentUser.email?.toLowerCase();
                        return isOwner || (isAssigned && a.status === 'confirmed');
                    })
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setAppointments(list);
            } else setAppointments([]);
            setLoading(prev => ({ ...prev, appointments: false }));
        });

        // Notifications
        const notifRef = ref(database, `notifications/${currentUser.uid}`);
        const notifUnsub = onValue(notifRef, (snapshot) => {
            if (snapshot.exists()) {
                const list = Object.entries(snapshot.val())
                    .map(([id, val]) => ({ id, ...val }))
                    .sort((a, b) => new Date(b.date) - new Date(a.date));
                setNotifications(list);
            } else setNotifications([]);
            setLoading(prev => ({ ...prev, notifications: false }));
        });

        // Messages
        const messagesRef = ref(database, 'messages');
        const msgUnsub = onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const list = Object.keys(data)
                    .map(key => ({ id: key, ...data[key] }))
                    .filter(msg => msg.userId === currentUser.uid || msg.email === currentUser.email)
                    .sort((a, b) => new Date(b.date) - new Date(a.date));
                setUserMessages(list);
            } else setUserMessages([]);
            setLoading(prev => ({ ...prev, messages: false }));
        });

        return () => { aptsUnsub(); notifUnsub(); msgUnsub(); };
    }, [currentUser]);

    // HANDLERS
    const handleSaveProfile = async (e) => {
        e.preventDefault();
        try {
            await updateUserProfile({
                firstName: formData.firstName, lastName: formData.lastName,
                phone: formData.phone, age: formData.age, gender: formData.gender
            }, selectedFile);
            setIsEditing(false);
            setSelectedFile(null);
            showToast("Profile updated successfully!");
        } catch (error) {
            showToast(error.message, 'error');
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) return showToast("Passwords do not match", 'error');
        try {
            await changePassword(passwordData.newPassword);
            showToast("Password updated successfully!");
            setPasswordData({ newPassword: '', confirmPassword: '' });
        } catch (error) {
            showToast(error.message, 'error');
        }
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) return showToast('Image must be less than 2MB', 'error');
            setSelectedFile(file);
            setFormData({ ...formData, profilePhoto: URL.createObjectURL(file) });
        }
    };

    const markRead = (id) => update(ref(database, `notifications/${currentUser.uid}/${id}`), { read: true });
    const deleteNotif = (id) => remove(ref(database, `notifications/${currentUser.uid}/${id}`));
    const handleCancelApt = (id) => {
        if (window.confirm("Cancel this request?")) update(ref(database, `appointments/${id}`), { status: 'Cancelled' });
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="bg-gray-50 min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-4">
                
                <ProfileOverviewCard 
                    user={currentUser} 
                    logout={logout} 
                    onNavigate={navigate} 
                />

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <ProfileSidebar 
                        tabs={filteredTabs} 
                        activeTab={activeTab} 
                        onTabChange={setActiveTab} 
                        badgeCounts={{
                            appointments: appointments.filter(a => a.status === 'Pending').length,
                            notifications: unreadCount
                        }}
                    />

                    <div className="lg:col-span-3 relative">
                        <Toast notification={toast} />

                        {activeTab === 'personal' && (
                            <PersonalTab 
                                formData={formData} 
                                setFormData={setFormData} 
                                isEditing={isEditing} 
                                setIsEditing={setIsEditing}
                                onSubmit={handleSaveProfile}
                                onPhotoUpload={handlePhotoUpload}
                                user={currentUser}
                                setSelectedFile={setSelectedFile}
                            />
                        )}

                        {activeTab === 'appointments' && (
                            <AppointmentsTab 
                                appointments={appointments} 
                                loading={loading.appointments} 
                                role={currentUser.role}
                                onCancel={handleCancelApt}
                                onReview={(apt) => { setSelectedApt(apt); setReviewMode('add'); setIsReviewOpen(true); }}
                                onNavigate={navigate}
                            />
                        )}

                        {activeTab === 'notifications' && (
                            <NotificationsTab 
                                notifications={notifications} 
                                unreadCount={unreadCount}
                                onMarkRead={markRead}
                                onDelete={deleteNotif}
                            />
                        )}

                        {activeTab === 'messages' && (
                            <MessagesTab 
                                messages={userMessages} 
                                loading={loading.messages} 
                                role={currentUser.role} 
                            />
                        )}

                        {activeTab === 'security' && (
                            <SecurityTab 
                                data={passwordData} 
                                setData={setPasswordData} 
                                onSubmit={handlePasswordChange} 
                            />
                        )}
                    </div>
                </div>
            </div>

            <ReviewModal 
                isOpen={isReviewOpen} 
                onClose={() => setIsReviewOpen(false)} 
                appointment={selectedApt} 
                mode={reviewMode}
                onSubmit={() => showToast("Review submitted!")}
            />
        </div>
    );
};

export default ProfilePage;
