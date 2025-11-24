import { Link } from 'react-router-dom';
import TitleComponent from '../titleComponent/titleComponent';
import ThemeButton from '../themeButton/themeButton';

const ProcedureCard = ({ data }) => {
    return (
        <div className='procedure-card relative rounded-2xl overflow-hidden bg-white shadow-lg border-2 border-grey100/50 duration-500 group hover:border-primary/50 hover:shadow-xl hover:-translate-y-2'>
            <Link to='/' className='relative block overflow-hidden before:absolute before:w-[150%] before:h-[150%] before:z-10 before:inset-0 before:-rotate-45 before:bg-gradient-to-t before:from-primary/50 before:to-transparent before:scale-x-0 before:duration-500 group-hover:before:scale-x-100'>
                <img
                    className='w-full h-auto aspect-[16/10] object-cover duration-700 group-hover:scale-110'
                    src={data.image}
                    alt={data.heading + data.description}
                />
            </Link>

            <div className='p-6'>
                <Link to='/' className='mb-3 text-2xl leading-tight font-bold font-Merriwheather tracking-[0.5px] text-black duration-300 group-hover:text-primary'>{data.heading}</Link>

                <div className="w-12 h-1 bg-gradient-to-r from-primary to-pink-300 mb-4 rounded-full origin-left duration-500 group-hover:scale-x-150" />
                <TitleComponent size='base' className='text-textColor leading-relaxed mb-6 line-clamp-3'>{data.description}</TitleComponent>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <ThemeButton variant='primary'>Read More</ThemeButton>
                </div>
            </div>
        </div>
    )
}

export default ProcedureCard;