import TitleComponent from '../titleComponent/titleComponent';
import ThemeButton from '../themeButton/themeButton';

const ArrivalItem = ({ props }) => {
    return (
        <div className='arrival-card pb-10'>
            <div className='overflow-hidden rounded-xl'>
                <img className='product_img' src={props.img} alt="img" />
            </div>
            <div className='px-6 py-4 text-center'>
                <h3 className='arrival-item-title text-black capitalize lg:text-3xl text-xl leading-[120%] font-Merriwheather font-medium'>{props.heading}</h3>
                <TitleComponent size='base' className='arrival-item-desc text-black sm:my-4 my-2.5'>{props.desc}</TitleComponent>
                <ThemeButton variant='underline' className='arrival-item-btn'>Check Now</ThemeButton>
            </div>
        </div>
    )
}

export default ArrivalItem;

