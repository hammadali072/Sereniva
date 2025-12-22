import { useState, useRef } from 'react';
import { services as initialServices } from '../../data/admin-data';
import { Plus, PencilSimple, Trash, Image as ImageIcon, Check, Star } from 'phosphor-react';
import clsx from 'clsx';
import { useToast } from '../../context/toast-context';
import TitleComponent from '../../components/titleComponent/titleComponent';
import ThemeButton from '../../components/themeButton/themeButton';

const ServiceManager = () => {
    const [services, setServices] = useState(initialServices);
    const { showToast } = useToast();
    const formRef = useRef(null);

    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        category: 'Massage',
        price: '',
        duration: '60 min',
        description: '',
        image: '',
        altText: '',
        featured: false,
        status: 'Active'
    });

    const resetForm = () => {
        setFormData({
            name: '',
            category: 'Massage',
            price: '',
            duration: '60 min',
            description: '',
            image: '',
            altText: '',
            featured: false,
            status: 'Active'
        });
        setEditingId(null);
    };

    const handleEdit = (service) => {
        setEditingId(service.id);
        setFormData({ ...service, altText: service.altText || '' });
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this service?")) {
            setServices(prev => prev.filter(s => s.id !== id));
            showToast("Service deleted", 'success');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.price || !formData.duration) {
            showToast("Please fill in required fields", 'error');
            return;
        }

        if (editingId) {
            setServices(prev => prev.map(s => s.id === editingId ? { ...formData, id: editingId } : s));
            showToast("Service updated successfully", 'success');
            setEditingId(null);
            resetForm();
        } else {
            const newId = Math.max(...services.map(s => s.id), 0) + 1;
            setServices(prev => [...prev, { ...formData, id: newId }]);
            showToast("New service created", 'success');
            resetForm();
        }
    };

    return (
        <div className="space-y-8 animate-fade-in-down pb-20">
            {/* Page Header */}
            <div>
                <TitleComponent type="h2">Service Management</TitleComponent>
                <TitleComponent type="p" size="base" className="text-gray-500 mt-2">
                    Add, edit, and organize your spa treatments with premium presentation.
                </TitleComponent>
            </div>

            {/* Input Form Section */}
            <div ref={formRef} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                <div className="mb-8 border-b border-gray-100 pb-4">
                    <TitleComponent type="h4" className="flex items-center gap-2 text-primary">
                        {editingId ? <PencilSimple size={24} /> : <Plus size={24} />}
                        {editingId ? 'Edit Service' : 'Add New Service'}
                    </TitleComponent>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
                    {/* Left Col - Basic Info */}
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700 tracking-wide">SERVICE TITLE *</label>
                            <input
                                type="text"
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                placeholder="e.g. Deep Tissue Massage"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 tracking-wide">CATEGORY *</label>
                            <select
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-primary outline-none"
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option>Massage</option>
                                <option>Facial</option>
                                <option>Hydrotherapy</option>
                                <option>Beauty</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 tracking-wide">STATUS</label>
                            <select
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-primary outline-none"
                                value={formData.status}
                                onChange={e => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 tracking-wide">PRICE ($) *</label>
                            <input
                                type="number"
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-primary outline-none"
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 tracking-wide">DURATION *</label>
                            <input
                                type="text"
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-primary outline-none"
                                placeholder="e.g. 60 min"
                                value={formData.duration}
                                onChange={e => setFormData({ ...formData, duration: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700 tracking-wide">DESCRIPTION</label>
                            <textarea
                                rows="3"
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-primary outline-none resize-none"
                                placeholder="Brief description of the service..."
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            ></textarea>
                        </div>
                    </div>

                    {/* Right Col - Image & Featured */}
                    <div className="lg:col-span-4 space-y-5">
                        {/* Image Upload */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 tracking-wide">IMAGE UPLOAD</label>
                            <div className="flex items-center gap-3">
                                <label className="flex-1 cursor-pointer">
                                    <div className="w-full p-2.5 bg-gray-50 border border-gray-200 border-dashed rounded-lg text-sm text-gray-500 hover:bg-gray-100 hover:border-primary transition-colors flex items-center justify-center gap-2">
                                        <ImageIcon size={18} />
                                        <span>{formData.image ? 'Change Image' : 'Choose File'}</span>
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
                                placeholder="Descriptive text for image..."
                                value={formData.altText}
                                onChange={e => setFormData({ ...formData, altText: e.target.value })}
                            />
                        </div>

                        {/* Image Preview */}
                        <div className="aspect-video w-full rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center relative shadow-inner">
                            {formData.image ? (
                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-gray-400 flex flex-col items-center">
                                    <ImageIcon size={32} weight="light" />
                                    <span className="text-xs mt-1">Image Preview</span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <input
                                type="checkbox"
                                id="featured-check"
                                checked={formData.featured}
                                onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                                className="w-4 h-4 text-primary rounded focus:ring-primary cursor-pointer"
                            />
                            <label htmlFor="featured-check" className="text-sm text-gray-700 cursor-pointer select-none font-medium">Mark as Featured Service</label>
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
                            {editingId ? 'Update Service' : 'Add Service'}
                        </ThemeButton>
                    </div>
                </form>
            </div>

            {/* Grid List Section */}
            <div>
                <div className="flex items-center justify-between mb-6 px-1">
                    <TitleComponent type="h3" size="large-bold" className="text-gray-800">
                        All Services
                        <span className="ml-2 text-sm font-normal text-gray-500 font-sans tracking-normal">({services.length} Total)</span>
                    </TitleComponent>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div key={service.id} className="group bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 ease-out flex flex-col relative border border-gray-100">
                            {/* Service Image with Premium Hover */}
                            <div className="h-64 relative overflow-hidden bg-gray-200">
                                {service.image ? (
                                    <img
                                        src={service.image}
                                        alt={service.altText || service.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                        <ImageIcon size={48} weight="thin" />
                                    </div>
                                )}

                                {/* Glass/Overlay Effect on Hover */}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px] z-10"></div>

                                {/* Status Badge */}
                                <div className="absolute top-4 right-4 z-20">
                                    <span className={clsx(
                                        "px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-lg backdrop-blur-md",
                                        service.status === 'Active' ? "bg-white/90 text-green-700" : "bg-gray-800/90 text-white"
                                    )}>
                                        {service.status}
                                    </span>
                                </div>

                                {/* Featured Tag - Premium Look */}
                                {service.featured && (
                                    <div className="absolute top-4 left-4 z-20">
                                        <div className="bg-primary text-white text-xs px-3 py-1.5 font-Merriwheather font-bold flex items-center gap-1.5 shadow-xl rounded-sm">
                                            <Star weight="fill" size={12} className="text-white" />
                                            <span>FEATURED</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Service Info */}
                            <div className="p-6 flex-1 flex flex-col relative z-20 bg-white">
                                <div className="flex justify-between items-start mb-3">
                                    <span className="text-xs font-bold text-primary tracking-widest uppercase">{service.category}</span>
                                    <div className="text-right">
                                        <span className="block font-serif text-xl text-gray-900">${service.price}</span>
                                    </div>
                                </div>

                                <h3 className="font-Merriwheather font-bold text-gray-900 text-xl mb-2 group-hover:text-primary transition-colors">{service.name}</h3>

                                <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                                    {service.description || "No description provided."}
                                </p>

                                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                                    <span className="text-xs font-semibold text-gray-400 flex items-center gap-1">
                                        ⏱ {service.duration}
                                    </span>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleEdit(service)}
                                            className="p-2 text-gray-500 hover:text-primary hover:bg-primaryLight rounded-full transition-all"
                                            title="Edit Service"
                                        >
                                            <PencilSimple size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(service.id)}
                                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                                            title="Delete Service"
                                        >
                                            <Trash size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServiceManager;
