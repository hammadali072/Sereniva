import { useRef, useEffect } from 'react';
import { adminStats, appointments } from '../../data/admin-data';
import { TrendUp, Users, CalendarCheck, Money, Envelope } from 'phosphor-react';
import { useState } from 'react';
import clsx from 'clsx';
import { useAuth } from '../../context/auth-context';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ title, value, subtext, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between hover:shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer">
        <div>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
            <p className="text-gray-400 text-xs mt-2">{subtext}</p>
        </div>
        <div className={clsx("p-3 rounded-lg", color)}>
            <Icon size={24} weight="fill" className="text-white" />
        </div>
    </div>
);

const DashboardOverview = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [timeRange, setTimeRange] = useState('Week');

    // Chart Component (Simulated Bar Chart)
    const ChartBar = ({ height, label, color = "bg-primary" }) => (
        <div className="flex flex-col items-center gap-2 group cursor-pointer flex-1">
            <div className="relative w-full max-w-[40px] bg-gray-50 rounded-t-sm h-48 flex items-end overflow-hidden group-hover:bg-gray-100 transition-colors">
                <div className={`w-full ${color} rounded-t-sm transition-all duration-1000 ease-out`} style={{ height: height }}></div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                    {height}
                </div>
            </div>
            <span className="text-xs text-gray-400 font-medium">{label}</span>
        </div>
    );

    return (
        <div className="space-y-6 animate-fade-in-down">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
                    <p className="text-gray-500 text-sm">Welcome back, {currentUser?.name?.split(' ')[0]}</p>
                </div>
                <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-gray-100 shadow-sm">
                    {['Day', 'Week', 'Month'].map(range => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={clsx(
                                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                                timeRange === range ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                            )}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <StatCard
                    title="Appointments"
                    value={adminStats.appointments.total}
                    subtext={`${adminStats.appointments.today} today`}
                    icon={CalendarCheck}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Revenue"
                    value={`$${adminStats.revenue.total.toLocaleString()}`}
                    subtext={`+$${adminStats.revenue.month} this month`}
                    icon={Money}
                    color="bg-green-500"
                />
                <StatCard
                    title="New Users"
                    value={adminStats.users.total}
                    subtext={`+${adminStats.users.new} new`}
                    icon={Users}
                    color="bg-purple-500"
                />
                <StatCard
                    title="Messages"
                    value={adminStats.messages.total}
                    subtext={`${adminStats.messages.unread} unread`}
                    icon={Envelope} // Assuming Envelope imported
                    color="bg-orange-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue/Booking Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="font-bold text-gray-800">Booking Trends</h3>
                            <p className="text-xs text-gray-400">Number of appointments per day</p>
                        </div>
                    </div>

                    <div className="flex items-end justify-between gap-2 md:gap-4 h-56 pb-2">
                        <ChartBar height="40%" label="Mon" color="bg-blue-400" />
                        <ChartBar height="65%" label="Tue" color="bg-blue-400" />
                        <ChartBar height="50%" label="Wed" color="bg-blue-400" />
                        <ChartBar height="85%" label="Thu" color="bg-blue-500" />
                        <ChartBar height="95%" label="Fri" color="bg-blue-600" />
                        <ChartBar height="30%" label="Sat" color="bg-blue-400" />
                        <ChartBar height="20%" label="Sun" color="bg-blue-300" />
                    </div>
                </div>

                {/* Popular Services or Therapist Load */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                    <h3 className="font-bold text-gray-800 mb-6">Top Services</h3>
                    <div className="space-y-6 flex-1">
                        {[
                            { name: 'Swedish Massage', progress: '85%', color: 'bg-teal-500' },
                            { name: 'Deep Tissue', progress: '65%', color: 'bg-indigo-500' },
                            { name: 'Hot Stone', progress: '45%', color: 'bg-rose-500' },
                            { name: 'Basic Facial', progress: '30%', color: 'bg-amber-500' },
                        ].map((service, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-700 font-medium">{service.name}</span>
                                    <span className="text-gray-500">{service.progress}</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div className={`h-full ${service.color}`} style={{ width: service.progress }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => navigate('/admin/services')}
                        className="mt-6 w-full py-2 text-sm text-gray-600 hover:text-primary font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        View Service Report
                    </button>
                </div>
            </div>

            {/* Recent Appointments Table (Better than list) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-gray-800">Recent Appointments</h3>
                    <button
                        onClick={() => navigate('/admin/appointments')}
                        className="text-sm text-primary hover:underline"
                    >
                        View All
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
                            <tr>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Service</th>
                                <th className="px-6 py-4">Date & Time</th>
                                <th className="px-6 py-4">Therapist</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {appointments.slice(0, 5).map((apt) => (
                                <tr key={apt.id} className="hover:bg-gray-50/50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{apt.customer}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{apt.service}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{apt.date} <span className="text-gray-300">|</span> {apt.time}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{apt.therapist}</td>
                                    <td className="px-6 py-4">
                                        <span className={clsx(
                                            "px-2.5 py-1 rounded-full text-xs font-medium border",
                                            apt.status === 'Confirmed' ? "bg-green-50 text-green-700 border-green-100" :
                                                apt.status === 'Pending' ? "bg-amber-50 text-amber-700 border-amber-100" :
                                                    "bg-red-50 text-red-700 border-red-100"
                                        )}>
                                            {apt.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
