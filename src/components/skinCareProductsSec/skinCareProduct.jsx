import { useNavigate } from 'react-router-dom';

import TitleComponent from '../titleComponent/titleComponent';
import ThemeButton from '../themeButton/themeButton';

const SkinCareProduct = ({ props }) => {
    const navigation = useNavigate();

    return (
        <div className="skin_product_card relative max-h-[700px] before:content-[''] before:absolute before:inset-0 before:bg-black/30 before:z-10 overflow-hidden">
            <div>
                <img className='skin_product_img w-full h-auto' src={props.img} alt="img" />
            </div>
            <div className="content absolute z-10 w-max bottom-6 left-1/2 transform -translate-x-1/2 text-center">
                <TitleComponent type='h3' className='skin_product_title text-white'>{props.heading}</TitleComponent>
                <TitleComponent size='base-medium' className='skin_product_desc md:my-4 my-3 text-white'>{props.desc}</TitleComponent>
                <ThemeButton variant='secondary' className='skin_product_action_btn font-light' onClick={() => { navigation("/services") }}>Book Now</ThemeButton>
            </div>
        </div>
    )
}

export default SkinCareProduct;
