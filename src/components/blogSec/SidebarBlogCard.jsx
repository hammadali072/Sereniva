import { Link } from 'react-router-dom';
import { CalendarCheck } from 'phosphor-react';

const sidebarBlogCard = ({ data, index }) => {
    return (
        <div className='sidebar-blog-card bg-white rounded-xl overflow-hidden shadow-md border border-grey100/50 duration-300 group hover:border-primary/50 hover:shadow-lg'>
            <Link to={`/blog/${index}`} className='relative block overflow-hidden'>
                <img
                    className='w-full h-auto aspect-[16/9] object-cover duration-500 group-hover:scale-105'
                    src={data.image}
                    alt={data.heading}
                />
            </Link>

            <div className='p-4'>
                <div className="flex items-center gap-2 mb-2">
                    <CalendarCheck className='text-primary' size={14} weight='bold' />
                    <span className="text-textColor text-xs font-medium">{data.datePosted}</span>
                </div>

                <Link
                    to={`/blog/${index}`}
                    className='block text-base leading-tight font-Merriwheather font-semibold text-black line-clamp-2 duration-300 group-hover:text-primary mb-2'
                >
                    {data.heading}
                </Link>

                <p className='text-textColor text-sm leading-relaxed line-clamp-2 mb-3'>
                    {data.description}
                </p>

                <Link
                    to={`/blog/${index}`}
                    className="inline-flex items-center text-sm font-semibold text-primary duration-300 hover:text-primary/80 "
                >
                    Read More
                    <svg className="size-4 ml-1 duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default sidebarBlogCard;

