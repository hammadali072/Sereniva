import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import {
    SquaresFour, CalendarCheck, Users, UserList,
    Article, Star, Envelope, Gear, SignOut, List as MenuIcon, X
} from 'phosphor-react';
import { useAuth } from '../../context/auth-context';

const AdminLayout = () => {
    const { currentUser, logout } = useAuth();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // If no user, redirect to signin
    if (!currentUser) {
        return <div className="flex flex-col items-center justify-center h-screen">
            <p className="mb-4">Please sign in to access the dashboard.</p>
            <Link to="/signin" className="px-4 py-2 bg-primary text-white rounded">Sign In</Link>
        </div>;
    }

    // If user but not authorized
    if (currentUser.role !== 'admin' && currentUser.role !== 'therapist') {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50 font-sans">
                <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md border border-gray-100">
                    <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <X size={32} weight="bold" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
                    <p className="text-gray-500 mb-6 text-sm">
                        You do not have permission to view the admin dashboard.
                        <br />
                        Current Role: <span className="font-mono font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded">{currentUser.role}</span>
                    </p>
                    <button
                        onClick={() => {
                            logout();
                            // Optional: navigate to signin immediately, though logout usually clears state
                        }}
                        className="w-full py-2.5 bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors font-medium"
                    >
                        Logout & Sign In as Admin
                    </button>
                    <p className="text-xs text-gray-400 mt-6 border-t border-gray-100 pt-4">
                        Tip: Sign in with an email containing "admin" (e.g., admin@sereniva.com) to access this area.
                    </p>
                    <Link to="/" className="block mt-4 text-sm text-gray-500 hover:text-primary">
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    const menuItems = [
        { icon: SquaresFour, label: 'Dashboard', path: '/admin' },
        { icon: CalendarCheck, label: 'Appointments', path: '/admin/appointments' },
        ...(currentUser.role === 'admin' ? [
            { icon: ListIcon, label: 'Services', path: '/admin/services' }, // Renamed import alias used below
            { icon: UserList, label: 'Therapists', path: '/admin/therapists' },
            { icon: Users, label: 'Users', path: '/admin/users' },
            { icon: Article, label: 'Manage Blogs', path: '/admin/content' },
            { icon: Star, label: 'Reviews', path: '/admin/reviews' },
            { icon: Envelope, label: 'Messages', path: '/admin/messages' },
            { icon: Gear, label: 'Settings', path: '/admin/settings' },
        ] : []),
    ];

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={clsx(
                "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:transform-none",
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="h-full flex flex-col">
                    <div className="h-16 flex items-center justify-center border-b border-gray-100">
                        <Link to="/" className="text-2xl font-bold font-Merriwheather text-primary">Sereniva<span className="text-sm font-sans text-gray-500 ml-1">Admin</span></Link>
                    </div>

                    <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={clsx(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                    location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path))
                                        ? "bg-primaryLight text-primary"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                <item.icon size={20} weight={location.pathname === item.path ? "fill" : "regular"} />
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="p-4 border-t border-gray-100">
                        <div className="flex items-center gap-3 mb-4 px-2">
                            <img src={currentUser.avatar} alt="" className="w-10 h-10 rounded-full bg-gray-200" />
                            <div className="overflow-hidden">
                                <p className="text-sm font-semibold text-gray-900 truncate">{currentUser.name}</p>
                                <p className="text-xs text-gray-500 capitalize">{currentUser.role}</p>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-red-100 text-red-600 rounded-lg hover:bg-red-50 text-sm font-medium transition-colors"
                        >
                            <SignOut size={18} /> Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Topbar */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 shrink-0">
                    <button
                        className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <MenuIcon size={24} />
                    </button>

                    <div className="flex-1 max-w-xl mx-4 lg:mx-0">
                        <h1 className="text-xl font-semibold text-gray-800">
                            {menuItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:block text-sm text-gray-500">
                            {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-gray-50 p-4 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

// Helper for icon
import { List as ListIcon } from 'phosphor-react';

export default AdminLayout;
