import ThemeButton from '../themeButton/themeButton';

const ProfileOverviewCard = ({ user, logout, onNavigate }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8 mb-8 flex flex-col md:flex-row items-center gap-6 lg:gap-8 animate-fade-in text-center md:text-left">
        <div className="relative">
            <div className="size-24 lg:size-28 rounded-full overflow-hidden border-4 border-primary/10 shadow-inner mx-auto md:mx-0">
                <img key={user?.photoURL} src={user?.photoURL || "https://i.pravatar.cc/150"} alt="Avatar" className="w-full h-full object-cover object-top" />
            </div>
        </div>
        <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">Howdy, {user?.firstName || 'User'}!</h1>
            <p className="text-sm lg:text-base text-gray-500 font-medium">{user?.email}</p>
            <div className="mt-3 lg:mt-4 flex justify-center md:justify-start">
                <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-semibold capitalize tracking-widest rounded-full border border-primary/20">{user?.role || "Member"}</span>
            </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <ThemeButton variant="primary" className="w-full sm:w-auto" onClick={() => onNavigate('/appointment')}>Book Massage</ThemeButton>
            <ThemeButton variant="secondary" className="w-full sm:w-auto" onClick={logout}>Logout</ThemeButton>
        </div>
    </div>
);

export default ProfileOverviewCard;
