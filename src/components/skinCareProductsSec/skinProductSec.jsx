import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { skinProductsData } from '../../Data';

import SkinCareProduct from './skinCareProduct';

const SkinProductSec = () => {
    return (
        <section className='skin_product_sec'>
            <Swiper
                spaceBetween={0}
                loop={true}
                autoplay={true}
                modules={[Autoplay]}
                breakpoints={{
                    0: {
                        slidesPerView: 1
                    },
                    640: {
                        slidesPerView: 2
                    },
                    1024: {
                        slidesPerView: 3
                    },
                }}
            >
                {skinProductsData.map((product, index) => (
                    <SwiperSlide key={index}>
                        <SkinCareProduct props={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}

export default SkinProductSec;
