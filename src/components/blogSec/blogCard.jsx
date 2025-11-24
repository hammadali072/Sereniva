import { Link } from 'react-router-dom';
import { User, CalendarCheck } from 'phosphor-react';

import TitleComponent from '../titleComponent/titleComponent';
import ThemeButton from '../themeButton/themeButton';

const BlogCard = ({ data }) => {
    return (
        <div className='blog-card relative rounded-2xl overflow-hidden bg-white shadow-lg border-2 border-grey100/50 duration-500 group hover:border-primary/50 hover:shadow-xl hover:-translate-y-2'>
            <Link to='/' className='relative block overflow-hidden before:absolute before:w-[150%] before:h-[150%] before:z-10 before:inset-0 before:-rotate-45 before:bg-gradient-to-t before:from-primary/50 before:to-transparent before:scale-x-0 before:duration-500 group-hover:before:scale-x-100'>
                <img
                    className='w-full h-auto aspect-[16/10] object-cover duration-700 group-hover:scale-110'
                    src={data.image}
                    alt={data.heading + data.description}
                />
            </Link>

            <div className='p-6'>
                <ul className="flex items-center gap-6 mb-4">
                    <li className="flex items-center gap-2">
                        <div className="flex justify-center items-center">
                            <User className='text-primary' size={18} weight='bold' />
                        </div>
                        <Link to="#" className="text-textColor text-sm font-medium duration-300 hover:text-primary">{data.user}</Link>
                    </li>
                    <li className="flex items-center gap-2">
                        <div className="flex justify-center items-center">
                            <CalendarCheck className='text-primary' size={18} weight='bold' />
                        </div>
                        <TitleComponent size='small-medium' className="text-textColor text-sm">{data.datePosted}</TitleComponent>
                    </li>
                </ul>

                <Link to='/' className='mb-4 md:text-2xl sm:text-xl text-lg leading-[120%] font-Merriwheather tracking-[0.5px] text-black line-clamp-2 duration-300 group-hover:text-primary'>{data.heading}</Link>

                <TitleComponent size='base' className='text-textColor leading-relaxed mb-6 line-clamp-3'>{data.description}</TitleComponent>

                <div className="pt-4 border-t border-gray-100">
                    <ThemeButton variant='underline'>Read More</ThemeButton>
                </div>
            </div>
        </div>
    )
}

export default BlogCard;