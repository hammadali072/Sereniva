import { useState, useRef } from 'react';
import { therapists as initialTherapists } from '../../data/admin-data';
import { Plus, PencilSimple, Trash, UserCircle, Envelope, Phone, Clock, Check, Image as ImageIcon } from 'phosphor-react';
import clsx from 'clsx';
import ThemeButton from '../../components/themeButton/themeButton';
import TitleComponent from '../../components/titleComponent/titleComponent';
import { useToast } from '../../context/toast-context';

const TherapistManager = () => {
    const [therapists, setTherapists] = useState(initialTherapists);
    const { showToast } = useToast();
    const formRef = useRef(null);

    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        specialty: '',
        shift: 'Morning',
        phone: '',
        status: 'Active',
        image: '',
        altText: ''
    });

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            specialty: '',
            shift: 'Morning',
            phone: '',
            status: 'Active',
            image: '',
            altText: ''
        });
        setEditingId(null);
    };

    const handleEdit = (therapist) => {
        setEditingId(therapist.id);
        setFormData({ ...therapist, altText: therapist.altText || '' });
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to remove this therapist?")) {
            setTherapists(prev => prev.filter(t => t.id !== id));
            showToast("Therapist removed", 'success');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.specialty) {
            showToast("Please fill in required fields", 'error');
            return;
        }

        if (editingId) {
            setTherapists(prev => prev.map(t => t.id === editingId ? { ...formData, id: editingId } : t));
            showToast("Therapist updated successfully", 'success');
            setEditingId(null);
            resetForm();
        } else {
            const newId = Math.max(...therapists.map(t => t.id), 0) + 1;
            setTherapists(prev => [...prev, { ...formData, id: newId }]);
            showToast("New therapist added", 'success');
            resetForm();
        }
    };

    return (
        <div className="space-y-8 animate-fade-in-down pb-20">
            {/* Page Header */}
            <div>
                <TitleComponent type="h2">Therapist Management</TitleComponent>
                <TitleComponent type="p" size="base" className="text-gray-500 mt-2">
                    Manage your professional team, schedules, and profiles.
                </TitleComponent>
            </div>

            {/* Input Form Section */}
            <div ref={formRef} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                <div className="mb-8 border-b border-gray-100 pb-4">
                    <TitleComponent type="h4" className="flex items-center gap-2 text-primary">
                        {editingId ? <PencilSimple size={24} /> : <Plus size={24} />}
                        {editingId ? 'Edit Therapist' : 'Add New Therapist'}
                    </TitleComponent>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
                    {/* Left Col - Personal Info */}
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700 tracking-wide">FULL NAME *</label>
                            <input
                                type="text"
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                placeholder="e.g. Dr. Sarah Jenkins"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 tracking-wide">EMAIL ADDRESS *</label>
                            <input
                                type="email"
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-primary outline-none"
                                placeholder="sarah@example.com"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 tracking-wide">CONTACT NO</label>
                            <input
                                type="text"
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-primary outline-none"
                                placeholder="+1 (555) 000-0000"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 tracking-wide">SPECIALTY *</label>
                            <input
                                type="text"
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-primary outline-none"
                                placeholder="e.g. Senior Massage Therapist"
                                value={formData.specialty}
                                onChange={e => setFormData({ ...formData, specialty: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 tracking-wide">AVAILABILITY (SHIFT)</label>
                            <select
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-primary outline-none"
                                value={formData.shift}
                                onChange={e => setFormData({ ...formData, shift: e.target.value })}
                            >
                                <option>Morning</option>
                                <option>Afternoon</option>
                                <option>Evening</option>
                                <option>Flexible</option>
                            </select>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700 tracking-wide">STATUS</label>
                            <select
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-primary outline-none"
                                value={formData.status}
                                onChange={e => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="Active">Active</option>
                                <option value="On Leave">On Leave</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    {/* Right Col - Image & Preview */}
                    <div className="lg:col-span-4 space-y-5">
                        {/* Image Upload */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 tracking-wide">PROFILE IMAGE</label>
                            <div className="flex items-center gap-3">
                                <label className="flex-1 cursor-pointer">
                                    <div className="w-full p-2.5 bg-gray-50 border border-gray-200 border-dashed rounded-lg text-sm text-gray-500 hover:bg-gray-100 hover:border-primary transition-colors flex items-center justify-center gap-2">
                                        <ImageIcon size={18} />
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

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 tracking-wide">IMAGE ALT TEXT</label>
                            <input
                                type="text"
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-primary outline-none"
                                placeholder="Description of therapist..."
                                value={formData.altText}
                                onChange={e => setFormData({ ...formData, altText: e.target.value })}
                            />
                        </div>

                        {/* Image Preview */}
                        <div className="aspect-square w-full max-w-[200px] mx-auto rounded-full bg-gray-100 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center relative">
                            {formData.image ? (
                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-gray-400 flex flex-col items-center">
                                    <UserCircle size={64} weight="thin" />
                                    <span className="text-xs mt-1">No Image</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="col-span-full flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-100">
                        {editingId && (
                            <ThemeButton
                                variant="outline"
                                onClick={resetForm}
                                className="!py-2 !px-6"
                            >
                                Cancel Edit
                            </ThemeButton>
                        )}
                        <ThemeButton
                            variant="primary"
                            type="submit"
                            className="!py-2 !px-8 flex items-center justify-center gap-2"
                        >
                            {editingId ? <Check size={20} weight="bold" /> : <Plus size={20} weight="bold" />}
                            {editingId ? 'Update Therapist' : 'Add Therapist'}
                        </ThemeButton>
                    </div>
                </form>
            </div>

            {/* Grid List Section */}
            <div>
                <div className="flex items-center justify-between mb-6 px-1">
                    <TitleComponent type="h3" size="large-bold" className="text-gray-800">
                        Our Therapists
                        <span className="ml-2 text-sm font-normal text-gray-500 font-sans tracking-normal">({therapists.length} Team Members)</span>
                    </TitleComponent>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {therapists.map((therapist) => (
                        <div key={therapist.id} className="group bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 ease-out flex flex-col border border-gray-100 relative">
                            {/* Background Decoration */}
                            <div className="h-24 bg-primaryLight/30 w-full absolute top-0 left-0 z-0"></div>

                            {/* Card Header / Image */}
                            <div className="pt-8 px-6 flex flex-col items-center relative z-10">
                                <div className="w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden relative group-hover:scale-105 transition-transform duration-500">
                                    {therapist.image ? (
                                        <img
                                            src={therapist.image}
                                            alt={therapist.altText || therapist.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                                            <UserCircle size={64} weight="light" />
                                        </div>
                                    )}
                                    {/* Glass Overlay on Hover */}
                                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[1px]"></div>
                                </div>

                                <h3 className="font-Merriwheather font-bold text-xl text-gray-900 mt-4 text-center">{therapist.name}</h3>
                                <p className="text-primary font-medium text-sm text-center uppercase tracking-wide">{therapist.specialty}</p>

                                <div className="mt-2">
                                    <span className={clsx(
                                        "px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase",
                                        therapist.status === 'Active' ? "bg-green-100 text-green-700" :
                                            therapist.status === 'On Leave' ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-600"
                                    )}>
                                        {therapist.status}
                                    </span>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="p-6 mt-2 space-y-3 relative z-10">
                                <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50/50 p-2 rounded-lg">
                                    <Envelope size={18} className="text-primary" />
                                    <span className="truncate">{therapist.email || 'No email provided'}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50/50 p-2 rounded-lg">
                                    <Phone size={18} className="text-primary" />
                                    <span>{therapist.phone || 'No phone number'}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50/50 p-2 rounded-lg">
                                    <Clock size={18} className="text-primary" />
                                    <span>{therapist.shift} Shift</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-auto p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
                                <button
                                    onClick={() => handleEdit(therapist)}
                                    className="flex-1 text-gray-600 hover:text-primary font-medium text-sm py-2 hover:bg-white rounded-lg transition-all flex items-center justify-center gap-2"
                                >
                                    <PencilSimple size={18} /> Edit Profile
                                </button>
                                <div className="w-[1px] h-6 bg-gray-200 mx-2"></div>
                                <button
                                    onClick={() => handleDelete(therapist.id)}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                    title="Delete Therapist"
                                >
                                    <Trash size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TherapistManager;
