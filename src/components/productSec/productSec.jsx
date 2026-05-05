import { useState, useEffect } from 'react';
import { database } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import ProductItem from './ProductItem';
import SectionTitle from '../sectionTitle/sectionTitle';

const ProductSec = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const servicesRef = ref(database, 'services');
        const unsubscribe = onValue(servicesRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const servicesArray = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                })).filter(s => s.status === 'Active');
                setServices(servicesArray);
            } else {
                setServices([]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[400px] flex justify-center items-center">
                <div className="size-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    if (services.length === 0) {
        return null;
    }

    return (
        <section className='skin_product_sec md:pt-[72px] pt-14'>
            <div className="container">
                <SectionTitle
                    subtitle="Our Services"
                    title="Curated Wellness"
                    highlightedText="Experiences"
                    sectionStyle="text-center mb-10 md:mb-14"
                    headingLevel="h2"
                >
                    <p className="text-textColor leading-relaxed max-w-2xl mx-auto mt-4">
                        Explore our selection of premium treatments designed to restore balance and rejuvenate your spirit.
                    </p>
                </SectionTitle>
            </div>
            <Swiper
                spaceBetween={0}
                loop={services.length > 3}
                autoplay={services.length > 0}
                modules={[Autoplay]}
                breakpoints={{
                    0: {
                        slidesPerView: 1
                    },
                    768: {
                        slidesPerView: 2
                    },
                    1024: {
                        slidesPerView: 3
                    },
                }}
            >
                {services.map((service, index) => (
                    <SwiperSlide key={service.id || index}>
                        <ProductItem props={service} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}

export default ProductSec;
