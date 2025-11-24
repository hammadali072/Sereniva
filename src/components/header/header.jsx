import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { List, X } from 'phosphor-react';
import { menuData } from '../../Data';

import ThemeButton from '../themeButton/themeButton';

import brandDarkLogo from '../../assets/sereniva-dark-logo.svg';
import brandLightLogo from '../../assets/sereniva-light-logo.svg';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);

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
                    {menuData.slice(0, 4).map((item, index) => (
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
                <ThemeButton variant="primary" onClick={() => { navigate("/contact") }} className='w-full'>Contact Us</ThemeButton>
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
                                {menuData.slice(0, 4).map((item, index) => (
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
                            <ThemeButton variant="primary" onClick={() => { navigate("/contact") }}>Contact Us</ThemeButton>
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