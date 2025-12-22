import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { List, X, CaretDown, User, List as ListIcon, SignOut, ShoppingBag, SquaresFour, Bell } from 'phosphor-react';
import { menuData } from '../../Data';
import { useAuth } from '../../context/auth-context';
import { messages as allMessages } from '../../data/admin-data';

import ThemeButton from '../themeButton/themeButton';

import brandDarkLogo from '../../assets/sereniva-dark-logo.svg';
import brandLightLogo from '../../assets/sereniva-light-logo.svg';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);

    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const notificationRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setUserDropdownOpen(false);
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setNotificationDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
        setUserDropdownOpen(false);
        navigate('/');
    };

    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen((prev) => !prev);
    const logoRef = useRef(null)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500) {
                setIsScrolled(true);
                if (location.pathname === '/') {
                    logoRef.current.src = brandDarkLogo;
                } else {
                    logoRef.current.src = brandDarkLogo;
                }
            } else {
                setIsScrolled(false);
                if (location.pathname === '/') {
                    logoRef.current.src = brandLightLogo;
                } else {
                    logoRef.current.src = brandDarkLogo;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location.pathname]);

    const textColor = (item) => {
        if (location.pathname === item.to) {
            return 'text-primary font-semibold'
        } else if (location.pathname === '/' && !isScrolled) {
            return 'text-white hover:text-primary'
        }
        else {
            return 'text-black hover:text-primary'
        }
    }

    const mobileIconColor = () => {
        if (location.pathname === '/' && !isScrolled) {
            return 'text-white';
        }
        return 'text-black';
    }

    return (
        <>
            {/*Menu OverLay */}
            <div className={`fixed top-0 bottom-0 z-50 w-[400px] max-w-full h-screen bg-white dark:bg-blackShade200 px-4 shadow-shadow2 origin-left duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`} >
                <div className="flex justify-between items-center py-5">
                    <Link to='/'>
                        <img className='xl:w-48 w-32 h-auto object-contain' src={brandDarkLogo} alt='Sereniva' />
                    </Link>
                    <X className="text-textColor cursor-pointer duration-300 hover:text-primary" size={24} weight="bold" onClick={toggleMenu} />
                </div>
                <ul className="flex flex-col gap-y-3 my-4">
                    {menuData.map((item, index) => (
                        <li className="relative group" key={index}>
                            <Link
                                className={clsx(
                                    "relative text-base font-normal duration-300",
                                    "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:duration-300",
                                    location.pathname === item.to ? "text-primary after:w-full" : "text-textColor hover:after:w-full"
                                )}
                                to={item.to}
                                onClick={toggleMenu}
                            >
                                {item.text}
                            </Link>
                        </li>
                    ))}
                </ul>
                {currentUser ? (
                    <div className='flex flex-col gap-3'>
                        <div className="flex items-center gap-3 mb-2">
                            <img src={currentUser.avatar} alt="User" className="w-10 h-10 rounded-full border border-gray-200" />
                            <span className="font-semibold text-gray-800">{currentUser.name}</span>
                        </div>
                        <ThemeButton variant="secondary" onClick={handleLogout} className='w-full'>Logout</ThemeButton>
                    </div>
                ) : (
                    <ThemeButton variant="primary" onClick={() => { navigate("/signin"); toggleMenu(); }} className='w-full'>Login</ThemeButton>
                )}
            </div>
            <div className='alert_otr overflow-hidden'>
                <div className='flex gap-x-16 flex-nowrap items-center bg-lightPink10 group'>
                    <div className='flex gap-x-16 flex-nowrap items-center my-2 animate-slide group-hover:[animation-play-state:paused]'>
                        {[...Array(5)].map((_, i) => (
                            <p key={i} size='small' className='text-black text-nowrap lg:text-sm text-xs font-normal tracking-[0.5px]'>Free Shipping over $50! Return are always on us</p>
                        ))}
                    </div>
                    <div className='flex gap-x-16 flex-nowrap items-center my-2 animate-slide group-hover:[animation-play-state:paused]'>
                        {[...Array(5)].map((_, i) => (
                            <p key={i} size='small' className='text-black text-nowrap lg:text-sm text-xs font-normal tracking-[0.5px]'>Free Shipping over $50! Return are always on us</p>
                        ))}
                    </div>
                </div>
            </div>
            <header className={clsx(
                "header w-full z-40 duration-300",
                isScrolled
                    ? "sticky top-0 left-0 bg-white shadow-md"
                    : "absolute top-10 left-0"
            )}>
                <div className="container">
                    <div className="flex items-center justify-between py-4">
                        <Link to='/' className="relative z-10">
                            <img
                                ref={logoRef}
                                className='xl:w-48 w-32 h-auto'
                                src={location.pathname === "/" ? brandLightLogo : brandDarkLogo}
                                alt="Sereniva"
                            />
                        </Link>
                        <nav className='hidden lg:flex items-center gap-10'>
                            <ul className='flex items-center gap-10'>
                                {menuData.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            className={clsx(
                                                "relative lg:text-base text-sm font-normal duration-300",
                                                "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:duration-300",
                                                textColor(item),
                                                location.pathname === item.to ? "after:w-full" : "hover:after:w-full"
                                            )}
                                            to={item.to}
                                        >
                                            {item.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            {currentUser ? (
                                <>
                                    {/* Notification Bell */}
                                    <div className="relative" ref={notificationRef}>
                                        <button
                                            onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
                                            className="relative p-2 rounded-full hover:bg-gray-100/50 transition-colors focus:outline-none"
                                        >
                                            <Bell
                                                size={24}
                                                weight="regular"
                                                className={clsx(isScrolled || location.pathname !== '/' ? 'text-black' : 'text-white')}
                                            />
                                            {(() => {
                                                const userMessages = allMessages.filter(m => m.email === currentUser?.email);
                                                const unreadCount = userMessages.filter(m => m.reply && !m.replyRead).length;
                                                if (unreadCount > 0) {
                                                    return (
                                                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                                                            {unreadCount}
                                                        </span>
                                                    );
                                                }
                                                return null;
                                            })()}
                                        </button>

                                        {/* Notification Dropdown */}
                                        {notificationDropdownOpen && (
                                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl py-2 z-50 ring-1 ring-black ring-opacity-5 animate-fade-in-down origin-top-right max-h-96 overflow-y-auto">
                                                <div className="px-4 py-3 border-b border-gray-100">
                                                    <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
                                                </div>

                                                {(() => {
                                                    const userMessages = allMessages.filter(m => m.email === currentUser?.email && m.reply);
                                                    if (userMessages.length === 0) {
                                                        return (
                                                            <div className="px-4 py-8 text-center text-gray-400 text-sm">
                                                                <Bell size={32} className="mx-auto mb-2 opacity-30" />
                                                                <p>No notifications yet</p>
                                                            </div>
                                                        );
                                                    }
                                                    return userMessages.slice(0, 5).map((msg) => (
                                                        <div
                                                            key={msg.id}
                                                            className="px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                                                        >
                                                            <div className="flex items-start gap-3">
                                                                <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-sm font-semibold text-gray-900 mb-1">Message Reply Received</p>
                                                                    <p className="text-xs text-gray-600 line-clamp-2 mb-1">
                                                                        Admin replied to your query: "{msg.subject}"
                                                                    </p>
                                                                    <p className="text-xs text-gray-400">{msg.date}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ));
                                                })()}

                                                <div className="px-4 py-3 border-t border-gray-100">
                                                    <button
                                                        onClick={() => {
                                                            navigate('/profile?tab=messages');
                                                            setNotificationDropdownOpen(false);
                                                        }}
                                                        className="w-full text-sm font-semibold text-primary hover:text-primaryDark transition-colors text-center"
                                                    >
                                                        View All Messages
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="relative" ref={dropdownRef}>
                                        <div className="relative" ref={dropdownRef}>
                                            <button
                                                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                                className="flex items-center gap-3 focus:outline-none"
                                            >
                                                <img
                                                    src={currentUser.avatar}
                                                    alt={currentUser.name}
                                                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
                                                />
                                                <span className={clsx("font-medium hidden xl:block", isScrolled || location.pathname !== '/' ? 'text-black' : 'text-white')}>{currentUser.name}</span>
                                            </button>

                                            {/* Dropdown Menu */}
                                            {userDropdownOpen && (
                                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5 animate-fade-in-down origin-top-right">
                                                    <div className="px-4 py-3 border-b border-gray-100">
                                                        <p className="text-sm font-medium text-gray-900 truncate">
                                                            {currentUser.email}
                                                        </p>
                                                    </div>

                                                    <a href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                        <User size={18} /> My Profile
                                                    </a>

                                                    {(currentUser.role === 'admin' || currentUser.role === 'therapist') && (
                                                        <Link to="/admin" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                            <SquaresFour size={18} /> Admin Dashboard
                                                        </Link>
                                                    )}

                                                    <div className="border-t border-gray-100 my-1"></div>

                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
                                                    >
                                                        <SignOut size={18} /> Logout
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <ThemeButton variant="primary" onClick={() => { navigate("/signin") }}>Login</ThemeButton>
                            )}
                        </nav>
                        <div className='flex lg:hidden'>
                            <List
                                size={24}
                                weight='bold'
                                className={clsx(mobileIconColor(), "duration-300 hover:text-primary")}
                                onClick={toggleMenu}
                            />
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;