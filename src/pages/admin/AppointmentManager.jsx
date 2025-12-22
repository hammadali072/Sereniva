import { useState } from 'react';
import { appointments as initialAppointments, services, therapists } from '../../data/admin-data';
import { MagnifyingGlass, CalendarCheck, CheckCircle, XCircle, NotePencil, Trash } from 'phosphor-react';
import clsx from 'clsx';
import Modal from '../../components/Modal/Modal';
import { useToast } from '../../context/toast-context';

const AppointmentManager = () => {
    const [appointments, setAppointments] = useState(initialAppointments);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [dateFilter, setDateFilter] = useState('');
    const { showToast } = useToast();

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingApt, setEditingApt] = useState(null);
    const [formData, setFormData] = useState({
        customer: '',
        phone: '',
        service: '',
        therapist: '',
        date: '',
        time: '',
        notes: '',
        status: 'Pending'
    });

    const handleStatusChange = (id, newStatus) => {
        setAppointments(prev => prev.map(apt => apt.id === id ? { ...apt, status: newStatus } : apt));
        showToast(`Appointment marked as ${newStatus}`, 'info');
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this appointment?")) {
            setAppointments(prev => prev.filter(a => a.id !== id));
            showToast("Appointment deleted successfully", 'error');
        }
    };

    const openModal = (apt = null) => {
        if (apt) {
            setEditingApt(apt);
            setFormData(apt);
        } else {
            setEditingApt(null);
            setFormData({
                customer: '',
                phone: '',
                service: services[0]?.name || '',
                therapist: therapists[0]?.name || '',
                date: new Date().toISOString().split('T')[0],
                time: '10:00',
                notes: '',
                status: 'Pending'
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = () => {
        // Basic Validation
        if (!formData.customer || !formData.date || !formData.time) {
            showToast("Please fill in all required fields", 'error');
            return;
        }

        if (editingApt) {
            setAppointments(prev => prev.map(a => a.id === editingApt.id ? { ...formData, id: a.id } : a));
            showToast("Appointment updated successfully", 'success');
        } else {
            const newId = Math.max(...appointments.map(a => a.id)) + 1;
            setAppointments(prev => [{ ...formData, id: newId }, ...prev]);
            showToast("New appointment created", 'success');
        }
        setIsModalOpen(false);
    };

    const filteredAppointments = appointments.filter(apt => {
        const matchesSearch =
            apt.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            apt.service.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
        const matchesDate = !dateFilter || apt.date === dateFilter;
        return matchesSearch && matchesStatus && matchesDate;
    });

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in-down">
            {/* Header & Toolbar */}
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Appointments</h2>
                    <p className="text-sm text-gray-500">Manage bookings and schedules</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primaryDark flex items-center gap-2 transition-colors"
                >
                    <CalendarCheck size={18} /> New Booking
                </button>
            </div>

            <div className="p-4 bg-gray-50 border-b border-gray-100 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search customer or service..."
                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                    <select
                        className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-primary cursor-pointer"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    <input
                        type="date"
                        className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-primary cursor-pointer"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Service</th>
                            <th className="px-6 py-4">Date & Time</th>
                            <th className="px-6 py-4">Therapist</th>
                            <th className="px-6 py-4">Notes</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredAppointments.map((apt) => (
                            <tr key={apt.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <p className="font-medium text-gray-900">{apt.customer}</p>
                                    <p className="text-xs text-gray-500">{apt.phone}</p>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{apt.service}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{apt.date}<br /><span className="text-xs text-gray-400">{apt.time}</span></td>
                                <td className="px-6 py-4 text-sm text-gray-600">{apt.therapist}</td>
                                <td className="px-6 py-4 text-sm text-gray-500 italic max-w-xs truncate" title={apt.notes}>{apt.notes || '-'}</td>
                                <td className="px-6 py-4">
                                    <span className={clsx(
                                        "px-2 py-1 rounded-full text-xs font-medium border",
                                        apt.status === 'Confirmed' ? "bg-green-50 text-green-700 border-green-100" :
                                            apt.status === 'Pending' ? "bg-amber-50 text-amber-700 border-amber-100" :
                                                apt.status === 'Completed' ? "bg-blue-50 text-blue-700 border-blue-100" :
                                                    "bg-red-50 text-red-700 border-red-100"
                                    )}>
                                        {apt.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        {apt.status === 'Pending' && (
                                            <>
                                                <button
                                                    onClick={() => handleStatusChange(apt.id, 'Confirmed')}
                                                    className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                                                    title="Confirm"
                                                >
                                                    <CheckCircle size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleStatusChange(apt.id, 'Cancelled')}
                                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                                                    title="Cancel"
                                                >
                                                    <XCircle size={18} />
                                                </button>
                                            </>
                                        )}
                                        <button
                                            onClick={() => openModal(apt)}
                                            className="p-1.5 text-gray-400 hover:text-primary hover:bg-gray-100 rounded"
                                            title="Edit"
                                        >
                                            <NotePencil size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(apt.id)}
                                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded"
                                            title="Delete"
                                        >
                                            <Trash size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredAppointments.length === 0 && (
                    <div className="p-8 text-center text-gray-500">No appointments found matching your filters.</div>
                )}
            </div>

            {/* Create/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingApt ? "Edit Booking" : "New Booking"}
                footer={
                    <>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primaryDark transition-colors"
                        >
                            {editingApt ? "Save Changes" : "Create Booking"}
                        </button>
                    </>
                }
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Customer Name *</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                            value={formData.customer}
                            onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Phone Number *</label>
                        <input
                            type="tel"
                            className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Service *</label>
                        <select
                            className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary bg-white"
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        >
                            {services.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Therapist</label>
                        <select
                            className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary bg-white"
                            value={formData.therapist}
                            onChange={(e) => setFormData({ ...formData, therapist: e.target.value })}
                        >
                            <option value="">Any Available</option>
                            {therapists.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Date *</label>
                        <input
                            type="date"
                            className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Time *</label>
                        <input
                            type="time"
                            className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        />
                    </div>
                    <div className="col-span-full space-y-1">
                        <label className="text-sm font-medium text-gray-700">Notes</label>
                        <textarea
                            rows="3"
                            className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary resize-none"
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            placeholder="Special requests, allergies, etc."
                        ></textarea>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Status</label>
                        <select
                            className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary bg-white"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AppointmentManager;
