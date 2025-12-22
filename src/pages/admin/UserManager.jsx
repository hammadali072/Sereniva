import { useState } from 'react';
import { users as initialUsers } from '../../data/admin-data';
import { Trash, Prohibit, CheckCircle, PencilSimple, Plus, User, Envelope, Phone, MagnifyingGlass } from 'phosphor-react';
import clsx from 'clsx';
import Modal from '../../components/Modal/Modal';
import { useToast } from '../../context/toast-context';
import ThemeButton from '../../components/themeButton/themeButton';
import TitleComponent from '../../components/titleComponent/titleComponent';

const UserManager = () => {
    const [users, setUsers] = useState(initialUsers);
    const { showToast } = useToast();
    const [filterRole, setFilterRole] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: 'Customer',
        status: 'Active',
        image: '',
        altText: ''
    });

    // Computed Users
    const filteredUsers = users.filter(user => {
        const matchesRole = filterRole === 'All' || user.role === filterRole;
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesRole && matchesSearch;
    });

    const openModal = (user = null) => {
        if (user) {
            setEditingUser(user);
            setFormData({ ...user, altText: user.altText || '' });
        } else {
            setEditingUser(null);
            setFormData({
                name: '',
                email: '',
                phone: '',
                role: 'Customer',
                status: 'Active',
                image: '',
                altText: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (!formData.name || !formData.email) {
            showToast("Name and Email are required", 'error');
            return;
        }

        if (editingUser) {
            setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...formData, id: u.id } : u));
            showToast("User updated successfully", 'success');
        } else {
            const newId = Math.max(...users.map(u => u.id), 0) + 1;
            const newUser = {
                ...formData,
                id: newId,
                joinDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            };
            setUsers(prev => [...prev, newUser]);
            showToast("New user created", 'success');
        }
        setIsModalOpen(false);
    };

    const toggleStatus = (id) => {
        setUsers(prev => prev.map(u =>
            u.id === id ? { ...u, status: u.status === 'Active' ? 'Disabled' : 'Active' } : u
        ));
        showToast("User status updated", 'info');
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to permanently delete this user?")) {
            setUsers(prev => prev.filter(u => u.id !== id));
            showToast("User deleted", 'error');
        }
    }

    return (
        <div className="space-y-8 animate-fade-in-down pb-20">
            {/* Header Steps */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <TitleComponent type="h2">Users Directory</TitleComponent>
                    <TitleComponent type="p" size="base" className="text-gray-500 mt-2">
                        Manage system access, customer profiles and roles.
                    </TitleComponent>
                </div>
                <ThemeButton variant="primary" onClick={() => openModal()} className="flex items-center gap-2">
                    <Plus size={18} weight="bold" /> Add New User
                </ThemeButton>
            </div>

            {/* Toolbar: Filters & Search */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">

                {/* Search Bar */}
                <div className="relative w-full md:w-80">
                    <MagnifyingGlass size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Pill Tabs */}
                <div className="flex bg-gray-100/80 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
                    {['All', 'Customer', 'Admin', 'Therapist'].map(role => (
                        <button
                            key={role}
                            onClick={() => setFilterRole(role)}
                            className={clsx(
                                "px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap",
                                filterRole === role
                                    ? "bg-white text-primary shadow-sm scale-100"
                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                            )}
                        >
                            {role}
                        </button>
                    ))}
                </div>
            </div>

            {/* Premium Table Layout */}
            <div className="overflow-x-auto pb-4">
                <table className="w-full border-separate border-spacing-y-4">
                    <thead>
                        <tr className="text-gray-400 text-xs uppercase font-bold tracking-wider text-left">
                            <th className="px-6 pb-2 font-sans pl-8">User Profile</th>
                            <th className="px-6 pb-2 font-sans">Role & Status</th>
                            <th className="px-6 pb-2 font-sans">Contact Details</th>
                            <th className="px-6 pb-2 font-sans text-right pr-8">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                            <tr key={user.id} className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-sm bg-white rounded-2xl relative">
                                {/* Profile Column */}
                                <td className="px-6 py-5 rounded-l-2xl border-l border-y border-gray-100 group-hover:border-primary/20 bg-white">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-full border-2 border-white shadow-md overflow-hidden flex-shrink-0 bg-gray-100 relative group-hover:scale-105 transition-transform">
                                            {user.image ? (
                                                <img src={user.image} alt={user.altText || user.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-primaryLight text-primary font-bold text-xl">
                                                    {user.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-Merriwheather font-bold text-gray-900 text-lg leading-tight group-hover:text-primary transition-colors">{user.name}</h4>
                                            <p className="text-xs text-gray-400 mt-1 flex items-center gap-1 font-medium">
                                                Joined: {user.joinDate || 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Role & Status Column */}
                                <td className="px-6 py-5 border-y border-gray-100 group-hover:border-primary/20 bg-white">
                                    <div className="space-y-3">
                                        <span className={clsx(
                                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-sm",
                                            user.role === 'Admin' ? "bg-purple-50 text-purple-700 border-purple-200" :
                                                user.role === 'Therapist' ? "bg-blue-50 text-blue-700 border-blue-200" :
                                                    "bg-amber-50 text-amber-700 border-amber-200"
                                        )}>
                                            <span className={clsx("w-1.5 h-1.5 rounded-full",
                                                user.role === 'Admin' ? "bg-purple-500" :
                                                    user.role === 'Therapist' ? "bg-blue-500" : "bg-amber-500"
                                            )}></span>
                                            {user.role}
                                        </span>

                                        <div className="flex items-center gap-2">
                                            <div className={clsx("w-2 h-2 rounded-full", user.status === "Active" ? "bg-green-500 animate-pulse" : "bg-red-500")}></div>
                                            <span className={clsx("text-sm font-medium", user.status === "Active" ? "text-green-600" : "text-red-500")}>
                                                {user.status} Account
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                {/* Contact Column */}
                                <td className="px-6 py-5 border-y border-gray-100 group-hover:border-primary/20 bg-white">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                                            <Envelope size={16} className="text-primary" />
                                            <span className="truncate max-w-[180px] font-medium">{user.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                                            <Phone size={16} className="text-primary" />
                                            <span className="font-mono">{user.phone || 'N/A'}</span>
                                        </div>
                                    </div>
                                </td>

                                {/* Actions Column */}
                                <td className="px-6 py-5 rounded-r-2xl border-r border-y border-gray-100 group-hover:border-primary/20 bg-white text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => toggleStatus(user.id)}
                                            className={clsx(
                                                "p-2 rounded-lg transition-all",
                                                user.status === 'Active'
                                                    ? "text-orange-400 hover:text-orange-600 hover:bg-orange-50"
                                                    : "text-green-500 hover:text-green-700 hover:bg-green-50"
                                            )}
                                            title={user.status === 'Active' ? "Disable User" : "Activate User"}
                                        >
                                            {user.status === 'Active' ? <Prohibit size={20} weight="duotone" /> : <CheckCircle size={20} weight="duotone" />}
                                        </button>

                                        <div className="w-[1px] h-6 bg-gray-100 mx-1"></div>

                                        <button
                                            onClick={() => openModal(user)}
                                            className="p-2 text-gray-400 hover:text-primary hover:bg-primaryLight rounded-lg transition-colors"
                                            title="Edit Details"
                                        >
                                            <PencilSimple size={20} weight="duotone" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete User"
                                        >
                                            <Trash size={20} weight="duotone" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center text-gray-400 italic bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                    <div className="flex flex-col items-center gap-2">
                                        <MagnifyingGlass size={32} className="text-gray-300" />
                                        <p>No users found matching your criteria.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingUser ? "Edit User Profile" : "Create New User"}
                footer={
                    <>
                        <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium">Cancel</button>
                        <ThemeButton variant="primary" onClick={handleSave} className="!py-2 !px-6 text-sm">
                            {editingUser ? 'Save Changes' : 'Create User'}
                        </ThemeButton>
                    </>
                }
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-full flex justify-center mb-2">
                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 relative group cursor-pointer hover:border-primary transition-colors">
                            {formData.image ? (
                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <User size={32} className="text-gray-400" />
                            )}
                        </div>
                    </div>

                    <div className="space-y-1.5 col-span-full">
                        <label className="text-sm font-semibold text-gray-700">Profile Image</label>
                        <div className="flex items-center gap-3">
                            <label className="flex-1 cursor-pointer">
                                <div className="w-full p-2.5 bg-gray-50 border border-gray-200 border-dashed rounded-lg text-sm text-gray-500 hover:bg-gray-100 hover:border-primary transition-colors flex items-center justify-center gap-2">
                                    <User size={18} />
                                    <span>{formData.image ? 'Change Photo' : 'Upload Photo'}</span>
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setFormData({ ...formData, image: reader.result });
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                            </label>
                            {formData.image && (
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, image: '' })}
                                    className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                                >
                                    <Trash size={18} />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="space-y-1.5 col-span-full">
                        <label className="text-sm font-semibold text-gray-700">Full Name *</label>
                        <input
                            className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-shadow"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Email Address *</label>
                        <input
                            type="email"
                            className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-shadow"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                        <input
                            className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-shadow"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+1 (555) 000-0000"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">User Role</label>
                        <select
                            className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                            value={formData.role || 'Customer'}
                            onChange={e => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value="Customer">Customer</option>
                            <option value="Therapist">Therapist</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Account Status</label>
                        <select
                            className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                            value={formData.status}
                            onChange={e => setFormData({ ...formData, status: e.target.value })}
                        >
                            <option value="Active">Active</option>
                            <option value="Disabled">Disabled</option>
                        </select>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default UserManager;
