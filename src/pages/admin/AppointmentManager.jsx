import { useState, useEffect } from 'react';
import { database } from '../../firebase';
import { ref, onValue, update, remove, push, set } from 'firebase/database';
import { MagnifyingGlass, CalendarCheck, CheckCircle, XCircle, NotePencil, Trash, User, ChatCircleText, Fingerprint, CreditCard, CheckSquare } from 'phosphor-react';
import clsx from 'clsx';
import Modal from '../../components/Modal/Modal';
import ThemeButton from '../../components/themeButton/themeButton';
import { useToast } from '../../context/toast-context';
import { massageServicesData as services } from '../../Data';

const AppointmentManager = () => {
    const [appointments, setAppointments] = useState([]);
    const [therapists, setTherapists] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [dateFilter, setDateFilter] = useState('');
    const [isFetching, setIsFetching] = useState(true);
    const { showToast } = useToast();

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingApt, setEditingApt] = useState(null);
    const [formData, setFormData] = useState({
        customerName: '',
        customerPhone: '',
        serviceName: '',
        therapistId: '',
        therapistName: '',
        date: '',
        time: '',
        notes: '',
        status: 'requested',
        paymentStatus: 'unpaid',
        servicePrice: '',
        statusUpdateMessage: '',
        therapistEmail: ''
    });

    useEffect(() => {
        // Fetch Appointments
        const appointmentsRef = ref(database, 'appointments');
        const unsubApts = onValue(appointmentsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const list = Object.entries(data).map(([id, val]) => ({ id, ...val }));
                // Sort by date (latest first)
                list.sort((a, b) => {
                    const dateA = new Date(a.createdAt || 0).getTime();
                    const dateB = new Date(b.createdAt || 0).getTime();
                    return dateB - dateA;
                });
                setAppointments(list);
            } else {
                setAppointments([]);
            }
            setIsFetching(false);
        });

        // Fetch Therapists
        const therapistsRef = ref(database, 'therapists');
        const unsubTherapists = onValue(therapistsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const list = Object.entries(data).map(([id, val]) => ({ id, ...val }));
                setTherapists(list);
            }
        });

        // Fetch Users (to find therapist UIDs)
        const usersRef = ref(database, 'users');
        const unsubUsers = onValue(usersRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const list = Object.entries(data).map(([id, val]) => ({ id, ...val }));
                setAllUsers(list);
            }
        });

        return () => {
            unsubApts();
            unsubTherapists();
            unsubUsers();
        };
    }, []);

    const sendNotification = async (userId, title, message) => {
        if (!userId || userId === 'manual-entry') return;
        try {
            const notificationRef = push(ref(database, `notifications/${userId}`));
            await set(notificationRef, {
                title,
                message,
                date: new Date().toISOString(),
                read: false,
                type: 'appointment_update'
            });
        } catch (error) {
            console.error("Error sending notification:", error);
        }
    };

    const handleStatusChange = async (apt, newStatus) => {
        try {
            await update(ref(database, `appointments/${apt.id}`), { status: newStatus });

            // Notify user
            const title = newStatus === 'Confirmed' ? 'Appointment Confirmed!' : 'Appointment Cancelled';
            const msg = newStatus === 'Confirmed'
                ? `Great news! Your appointment for ${apt.serviceName} has been confirmed.`
                : `We're sorry, your appointment for ${apt.serviceName} has been cancelled. Please contact us for details.`;

            await sendNotification(apt.userId, title, msg);

            showToast(`Appointment ${newStatus.toLowerCase()}`, 'info');
        } catch (error) {
            showToast("Failed to update status", 'error');
        }
    };

    const handleQuickAction = async (id, updates) => {
        try {
            // Get appointment data for notifications
            const apt = appointments.find(a => a.id === id);
            await update(ref(database, `appointments/${id}`), updates);

            if (apt && apt.userId && apt.userId !== 'guest' && apt.userId !== 'manual-entry') {
                const status = updates.status || apt.status;
                const title = `Appointment ${status.charAt(0).toUpperCase() + status.slice(1)}! ✨`;
                let paymentHint = '';
                if (status === 'confirmed' || status === 'approved') {
                    paymentHint = ` The total service amount is $${apt.servicePrice || '0'}.`;
                }
                const msg = `Your appointment for ${apt.serviceName} has been updated to ${status}.${updates.paymentStatus === 'paid' ? ' Thank you for your payment!' : paymentHint}`;
                await sendNotification(apt.userId, title, msg);
            }

            showToast(`Updated to ${updates.status || 'new status'}`, 'success');
        } catch (error) {
            showToast("Failed to update", 'error');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this record? This cannot be undone.")) {
            try {
                await remove(ref(database, `appointments/${id}`));
                showToast("Record deleted", 'error');
            } catch (error) {
                showToast("Failed to delete", 'error');
            }
        }
    };

    const openModal = (apt = null, initialStatus = null) => {
        if (apt) {
            setEditingApt(apt);

            // If therapistId exists but email is missing, find it
            let tEmail = apt.therapistEmail || '';
            if (!tEmail && apt.therapistId) {
                const t = therapists.find(x => x.id === apt.therapistId);
                if (t) tEmail = t.email;
            }

            setFormData({
                customerName: apt.customerName || '',
                customerPhone: apt.customerPhone || '',
                serviceName: apt.serviceName || (services && services[0]?.name) || '',
                therapistId: apt.therapistId || '',
                therapistName: apt.therapistName || '',
                date: apt.date || '',
                time: apt.time || '',
                notes: apt.notes || '',
                paymentStatus: apt.paymentStatus || 'unpaid',
                servicePrice: apt.servicePrice || (services.find(s => s.name === apt.serviceName)?.price) || '0',
                status: initialStatus || apt.status || 'requested',
                statusUpdateMessage: '',
                therapistEmail: tEmail
            });
        } else {
            const defaultService = (services && services[0]) || null;
            setEditingApt(null);
            setFormData({
                customerName: '',
                customerPhone: '',
                serviceName: defaultService?.name || '',
                servicePrice: defaultService?.price || '0',
                therapistId: '',
                therapistName: 'Not Assigned',
                therapistEmail: '',
                date: new Date().toISOString().split('T')[0],
                time: '10:00',
                notes: '',
                status: initialStatus || 'requested',
                paymentStatus: 'unpaid',
                statusUpdateMessage: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        if (!formData.customerName || !formData.date || !formData.time) {
            showToast("Please fill in required fields", 'error');
            return;
        }

        // Validation for confirmation
        if (formData.status === 'Confirmed' && (!formData.therapistId || formData.therapistId === '')) {
            showToast("Please assign a therapist before confirming.", 'error');
            return;
        }

        try {
            if (editingApt) {
                // Determine if notification is needed: status change, admin message, OR new therapist assignment
                const isStatusChanged = editingApt.status !== formData.status;
                const hasUpdateMsg = !!formData.statusUpdateMessage;
                const isTherapistChanged = formData.status === 'Confirmed' && editingApt.therapistId !== formData.therapistId;

                if (isStatusChanged || hasUpdateMsg || isTherapistChanged) {
                    let title = '';
                    let msg = '';

                    if (formData.status === 'confirmed' || formData.status === 'approved') {
                        title = `Appointment ${formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}! ✨`;
                        const price = formData.servicePrice || '0';
                        msg = `Your appointment for ${formData.serviceName} has been ${formData.status}. Total price: $${price}. ${formData.therapistName !== 'Not Assigned' ? `You will be served by ${formData.therapistName}.` : ''} ${formData.statusUpdateMessage ? `\n\nAdmin Message: ${formData.statusUpdateMessage}` : ''}`;
                    } else if (formData.status === 'cancelled' || formData.status === 'no-show') {
                        title = `Appointment ${formData.status === 'no-show' ? 'No-Show' : 'Cancelled'} ⚠️`;
                        msg = `Regarding your appointment for ${formData.serviceName}: Status updated to ${formData.status}. ${formData.statusUpdateMessage ? `\n\nNote: ${formData.statusUpdateMessage}` : ''}`;
                    } else {
                        title = 'Appointment Updated';
                        msg = `Your appointment status for ${formData.serviceName} has been updated to ${formData.status}. ${formData.statusUpdateMessage || ''}`;
                    }

                    await sendNotification(editingApt.userId, title, msg);

                    // ALSO: Notify Therapist if it's a new confirmation OR if therapist changed
                    if (formData.status === 'confirmed' && (editingApt.status !== 'confirmed' || editingApt.therapistId !== formData.therapistId)) {
                        if (formData.therapistEmail) {
                            const therapistUser = allUsers.find(u =>
                                u.email?.toLowerCase() === formData.therapistEmail.toLowerCase() &&
                                (u.role?.toLowerCase() === 'therapist')
                            );

                            if (therapistUser) {
                                const therapistTitle = 'New Assignment! 💆‍♂️';
                                const therapistMsg = `You have been assigned to an appointment: ${formData.serviceName} with ${formData.customerName} on ${formData.date} at ${formData.time}.`;
                                await sendNotification(therapistUser.id, therapistTitle, therapistMsg);
                            }
                        }
                    }
                }

                // Remove the temporary message before saving to database
                const { statusUpdateMessage, ...dataToSave } = formData;
                await update(ref(database, `appointments/${editingApt.id}`), dataToSave);
                showToast("Updated successfully", 'success');
            } else {
                const { statusUpdateMessage, ...dataToSave } = formData;
                const newRef = push(ref(database, 'appointments'));
                await set(newRef, {
                    ...dataToSave,
                    createdAt: new Date().toISOString(),
                    userId: 'manual-entry'
                });

                // Notify Therapist if status is Confirmed upon creation
                if (dataToSave.status === 'Confirmed' && dataToSave.therapistEmail) {
                    const therapistUser = allUsers.find(u =>
                        u.email?.toLowerCase() === dataToSave.therapistEmail.toLowerCase() &&
                        (u.role?.toLowerCase() === 'therapist')
                    );

                    if (therapistUser) {
                        const therapistTitle = 'New Assignment! 💆‍♂️';
                        const therapistMsg = `You have been assigned to a new appointment: ${formData.serviceName} with ${formData.customerName} on ${formData.date} at ${formData.time}.`;
                        await sendNotification(therapistUser.id, therapistTitle, therapistMsg);
                    }
                }

                showToast("Booking created", 'success');
            }
            setIsModalOpen(false);
        } catch (error) {
            showToast("Failed to save", 'error');
        }
    };

    const filteredAppointments = appointments.filter(apt => {
        const matchesSearch =
            (apt.customerName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (apt.serviceName || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
        const matchesDate = !dateFilter || apt.date === dateFilter;
        return matchesSearch && matchesStatus && matchesDate;
    });

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in-down min-h-[600px]">
            {/* Header & Toolbar */}
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Appointment Manager</h2>
                    <p className="text-sm text-gray-500">View and manage spa bookings</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primaryDark flex items-center gap-2 transition-colors"
                >
                    <CalendarCheck size={18} /> New Appointment
                </button>
            </div>

            <div className="p-4 bg-gray-50 border-b border-gray-100 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name or service..."
                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <select
                        className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-primary"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="requested">Requested</option>
                        <option value="approved">Approved</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="no-show">No-Show</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <input
                        type="date"
                        className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-primary"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 text-[10px] uppercase text-gray-400 font-bold tracking-widest">
                        <tr>
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Treatment</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Schedule</th>
                            <th className="px-6 py-4">Therapist</th>
                            <th className="px-6 py-4 text-center">Status</th>
                            <th className="px-6 py-4 text-center">Payment</th>
                            <th className="px-6 py-4 text-right pr-10">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                        {isFetching ? (
                            <tr><td colSpan="7" className="py-20 text-center text-gray-400">Loading appointments...</td></tr>
                        ) : filteredAppointments.length === 0 ? (
                            <tr><td colSpan="7" className="py-20 text-center text-gray-400">No appointments found.</td></tr>
                        ) : filteredAppointments.map((apt) => (
                            <tr key={apt.id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-none">
                                <td className="px-6 py-4">
                                    <p className="font-bold text-gray-900">{apt.customerName || 'N/A'}</p>
                                    <p className="text-xs text-gray-500">{apt.customerPhone || apt.customerEmail || ''}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="font-medium">{apt.serviceName}</span>
                                    <p className="text-[10px] text-gray-400">{apt.serviceDuration}</p>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className="font-bold text-gray-900">${apt.servicePrice || (services.find(s => s.name === apt.serviceName)?.price) || '-'}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="font-medium">{apt.date}</p>
                                    <p className="text-xs text-gray-400">{apt.time}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-primary">
                                            <User size={14} />
                                        </div>
                                        <span>{apt.therapistName || 'Not Assigned'}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={clsx(
                                        "inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm",
                                        apt.status === 'confirmed' ? "bg-green-50 text-green-700 border-green-100" :
                                            apt.status === 'requested' ? "bg-amber-50 text-amber-500 border-amber-100" :
                                                apt.status === 'approved' ? "bg-blue-50 text-blue-600 border-blue-100" :
                                                    apt.status === 'completed' ? "bg-teal-50 text-teal-700 border-teal-100" :
                                                        "bg-red-50 text-red-700 border-red-100"
                                    )}>
                                        {apt.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={clsx(
                                        "inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-tight border",
                                        apt.paymentStatus === 'paid' ? "bg-green-100 text-green-800 border-green-200" : "bg-gray-100 text-gray-600 border-gray-200"
                                    )}>
                                        {apt.paymentStatus || 'unpaid'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        {/* WhatsApp Chat */}
                                        <a
                                            href={`https://wa.me/${apt.customerPhone?.replace(/\D/g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 text-green-500 hover:bg-green-50 rounded-full transition-colors"
                                            title="Chat on WhatsApp"
                                        >
                                            <ChatCircleText size={20} weight="fill" />
                                        </a>

                                        {/* Workflow Actions */}
                                        {apt.status === 'requested' && (
                                            <button
                                                onClick={() => handleQuickAction(apt.id, { status: 'approved' })}
                                                className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                                                title="Approve"
                                            >
                                                <Fingerprint size={20} weight="bold" />
                                            </button>
                                        )}

                                        {apt.status === 'approved' && (
                                            <button
                                                onClick={() => handleQuickAction(apt.id, { status: 'confirmed', paymentStatus: 'paid' })}
                                                className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                                                title="Mark as Paid & Confirm"
                                            >
                                                <CreditCard size={20} weight="fill" />
                                            </button>
                                        )}

                                        {apt.status === 'confirmed' && (
                                            <>
                                                <button
                                                    onClick={() => handleQuickAction(apt.id, { status: 'completed' })}
                                                    className="p-2 text-teal-600 hover:bg-teal-50 rounded-full transition-colors"
                                                    title="Complete Session"
                                                >
                                                    <CheckSquare size={20} weight="fill" />
                                                </button>
                                                <button
                                                    onClick={() => handleQuickAction(apt.id, { status: 'no-show' })}
                                                    className="p-2 text-orange-500 hover:bg-orange-50 rounded-full transition-colors"
                                                    title="Mark as No-Show"
                                                >
                                                    <User size={20} weight="fill" />
                                                </button>
                                            </>
                                        )}

                                        <button
                                            onClick={() => openModal(apt)}
                                            className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-full transition-colors"
                                            title="Edit / View"
                                        >
                                            <NotePencil size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(apt.id)}
                                            className="p-2 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                            title="Delete"
                                        >
                                            <Trash size={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Create/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingApt ? "Manage Appointment" : "New Booking"}
                footer={
                    <div className="flex gap-3">
                        <ThemeButton variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</ThemeButton>
                        <ThemeButton variant="primary" onClick={handleSave}>
                            {editingApt ? "Update Appointment" : "Save Booking"}
                        </ThemeButton>
                    </div>
                }
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Customer Name *</label>
                        <input
                            type="text"
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-primary outline-none"
                            value={formData.customerName}
                            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone / Contact *</label>
                        <input
                            type="text"
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-primary outline-none"
                            value={formData.customerPhone}
                            onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Service Treatment *</label>
                        <select
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-primary outline-none"
                            value={formData.serviceName}
                            onChange={(e) => {
                                const sName = e.target.value;
                                const sObj = services.find(x => x.name === sName);
                                setFormData({ ...formData, serviceName: sName, servicePrice: sObj?.price || '0' });
                            }}
                        >
                            {(services || []).map((s, i) => <option key={i} value={s.name}>{s.name}</option>)}
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Service Price ($)</label>
                        <input
                            type="number"
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-primary outline-none font-bold text-gray-900"
                            value={formData.servicePrice}
                            onChange={(e) => setFormData({ ...formData, servicePrice: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Status</label>
                        <select
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-primary outline-none"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                            <option value="requested">Requested</option>
                            <option value="approved">Approved</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="no-show">No-Show</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Payment Status</label>
                        <select
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-primary outline-none"
                            value={formData.paymentStatus}
                            onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
                        >
                            <option value="unpaid">Unpaid</option>
                            <option value="paid">Paid</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Assign Therapist</label>
                        <select
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-primary outline-none"
                            value={formData.therapistId}
                            onChange={(e) => {
                                const id = e.target.value;
                                const t = therapists.find(x => x.id === id);
                                setFormData({
                                    ...formData,
                                    therapistId: id,
                                    therapistName: t ? t.name : 'Not Assigned',
                                    therapistEmail: t ? t.email : ''
                                });
                            }}
                        >
                            <option value="">Choose Specialist...</option>
                            {therapists.map(t => <option key={t.id} value={t.id}>{t.name} ({t.specialty})</option>)}
                        </select>
                        {formData.therapistEmail && (
                            <p className="text-[10px] text-gray-400 mt-1 ml-1 font-medium">Registered Email: {formData.therapistEmail}</p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Date *</label>
                        <input
                            type="date"
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-primary outline-none"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Time Slot *</label>
                        <input
                            type="time"
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-primary outline-none"
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        />
                    </div>
                    <div className="col-span-full space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                            {formData.status === 'Cancelled' ? 'Cancellation Reason' : 'Notification Message / Reason'}
                        </label>
                        <textarea
                            rows="2"
                            className="w-full p-2.5 bg-primary/5 border border-primary/20 rounded-lg text-sm focus:bg-white focus:border-primary outline-none resize-none"
                            value={formData.statusUpdateMessage}
                            onChange={(e) => setFormData({ ...formData, statusUpdateMessage: e.target.value })}
                            placeholder={formData.status === 'Cancelled' ? "Explain why the appointment is being cancelled..." : "This message will be included in the user's notification..."}
                        ></textarea>
                    </div>
                    <div className="col-span-full space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Internal Admin Notes</label>
                        <textarea
                            rows="2"
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-primary outline-none resize-none"
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            placeholder="Add private internal notes about this booking..."
                        ></textarea>
                    </div>
                    <div className="col-span-full space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Booking Status</label>
                        <div className="flex flex-wrap gap-2 pt-1">
                            {['Pending', 'Confirmed', 'Completed', 'Cancelled'].map(status => (
                                <button
                                    key={status}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, status })}
                                    className={clsx(
                                        "px-4 py-1.5 rounded-full text-xs font-bold border transition-all",
                                        formData.status === status
                                            ? "bg-primary text-white border-primary shadow-md"
                                            : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                                    )}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AppointmentManager;
