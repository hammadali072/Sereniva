import { CalendarCheck } from 'phosphor-react';
import ThemeButton from '../themeButton/themeButton';
import StatusBadge from './StatusBadge';

const AppointmentsTab = ({ appointments, loading, role, onCancel, onReview, onNavigate }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-12 animate-fade-in">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-8">Appointments</h2>
        <div className="space-y-4">
            {loading ? (
                <div className="py-20 text-center animate-pulse text-gray-400">Syncing your schedule...</div>
            ) : appointments.length === 0 ? (
                <div className="py-20 text-center text-gray-400">
                    <p>No experiences found.</p>
                    {role !== 'therapist' && <ThemeButton variant="outline" className="mt-4" onClick={() => onNavigate('/appointment')}>Start Journey</ThemeButton>}
                </div>
            ) : (
                appointments.map(apt => (
                    <div key={apt.id} className="p-5 lg:p-6 border border-gray-100 rounded-2xl lg:rounded-3xl bg-gray-50/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:shadow-lg transition-all">
                        <div className="flex gap-4 lg:gap-5 flex-1">
                            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white rounded-xl lg:rounded-2xl flex items-center justify-center text-primary shadow-sm flex-shrink-0"><CalendarCheck size={28} className="lg:hidden" /><CalendarCheck size={32} className="hidden lg:block" /></div>
                            <div>
                                <h3 className="text-base lg:text-lg font-bold text-gray-900">{apt.serviceName}</h3>
                                <p className="text-xs lg:text-sm text-gray-500 mt-1">{apt.date} at {apt.time}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto border-t md:border-0 pt-4 md:pt-0 border-gray-100">
                            <div className="flex flex-wrap gap-2">
                                <StatusBadge status={apt.status} />
                                <StatusBadge status={apt.paymentStatus || 'unpaid'} isPayment />
                            </div>
                            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                                {apt.status === 'requested' && <button onClick={() => onCancel(apt.id)} className="text-xs font-bold text-red-400 hover:text-red-600 transition-colors">Cancel</button>}
                                {apt.status === 'completed' && !apt.reviewed && <ThemeButton variant="primary" className="!py-2 !px-4 !text-xs w-full md:w-auto" onClick={() => onReview(apt)}>Review</ThemeButton>}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
);

export default AppointmentsTab;
