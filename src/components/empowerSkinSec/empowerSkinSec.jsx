import { Link } from 'react-router-dom';

import TitleComponent from '../titleComponent/titleComponent';

import mokoshButelka1 from '../../assets/hand-massage.webp';
import mokoshButelka2 from '../../assets/massage-setup.webp';
import mokoshButelka3 from '../../assets/women-massage.webp';

const EmpowerSkinSec = () => {
    return (
        <section className='empSkin_sec bg-grey1 py-[72px]'>
            <div className="container">
                <div className="flex flex-col justify-center items-center lg:gap-8 gap-4">
                    <TitleComponent size="base" className='empSkin_title_prefix text-black'>Empower Your Skin care</TitleComponent>
                    <h2 className='empSkin_highlight_heading text-center text-black md:text-[42px] text-3xl leading-[120%] leading-normal font-medium font-Merriwheather'>The harmony between expert massage <Link to='/'><img className='inr_img xl:w-20 xl:h-20 md:w-14 md:h-14 w-10 h-10 rounded-full align-middle object-cover duration-300 hover:scale-110' src={mokoshButelka1} alt="img" /></Link> and immersive rituals <Link to='/'><img className='inr_img xl:w-20 xl:h-20 md:w-14 md:h-14 w-10 h-10 rounded-full align-middle object-cover duration-300 hover:scale-110' src={mokoshButelka2} alt="img" /></Link> for full-body healing <Link to='/'><img className='inr_img xl:w-20 xl:h-20 md:w-14 md:h-14 w-10 h-10 rounded-full align-middle object-cover duration-300 hover:scale-110' src={mokoshButelka3} alt="img" /></Link> and deep inner relaxation.</h2>
                </div>
            </div>
        </section>
    )
}

export default EmpowerSkinSec;
