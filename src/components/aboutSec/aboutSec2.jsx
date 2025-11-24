import { useNavigate } from 'react-router-dom';
import { Check, Leaf, Heart, Users } from 'phosphor-react';

import SectionTitle from '../sectionTitle/sectionTitle';
import TitleComponent from '../titleComponent/titleComponent';
import ThemeButton from '../themeButton/themeButton';

import AboutImage1 from '../../assets/about-img1.webp';
import AboutImage2 from '../../assets/about-img2.webp';

const AboutSec2 = () => {
    const navigate = useNavigate();
    const keyFeatureData = ['Certified & Experienced Therapists', 'Luxury Organic Products', 'Personalized Treatment Plans', 'Serene & Private Environment']

    return (
        <section className="lg:py-32 md:py-24 py-14">
            <div className="container">
                <div className="flex lg:flex-row flex-col items-center gap-6 mb-20">
                    <div className="lg:w-1/2 md:w-4/5">
                        <div className="sm:w-4/5">
                            <img className="w-full h-full aspect-square object-cover rounded-2xl" src={AboutImage1} alt="Luxury spa treatment" />
                        </div>
                        <div className="flex justify-end sm:-mt-80 mt-4">
                            <img className="sm:w-3/5 h-full md:aspect-[4/5] aspect-square object-cover rounded-2xl border-4 border-white" src={AboutImage2} alt="Spa ambiance" />
                        </div>
                    </div>

                    <div className='lg:w-1/2 xl:pl-10'>
                        <SectionTitle
                            subtitle="About Sereniva" subtitleClass="about_subtitle2"
                            title="Your Sanctuary of" titleClass="about_title2"
                            headingLevel='h2' highlightedText="Wellness"
                            sectionStyle="mb-6"
                        />

                        <TitleComponent size='base' className='text-textColor'>At Sereniva, we believe that true beauty radiates from within. Since our establishment, we've been dedicated to providing transformative spa experiences that harmonize body, mind, and spirit through time-honored techniques and modern innovations.</TitleComponent>
                        <TitleComponent size='base' className='text-textColor mt-4 mb-6'>Our team of certified therapists brings years of expertise and genuine passion to every treatment. We use only premium, organic products carefully selected for their therapeutic benefits and environmental sustainability.</TitleComponent>

                        <div className="grid md:grid-cols-2 gap-y-3 mb-8">
                            {keyFeatureData.map((feature, index) => (
                                <div key={index} className="flex items-center gap-3 group">
                                    <div className="flex items-center justify-center size-8 rounded-full bg-primaryLight duration-300 group-hover:bg-primary">
                                        <Check className="text-primary duration-300 group-hover:text-primaryLight" size={16} weight='bold' />
                                    </div>
                                    <TitleComponent size='base' className='text-textColor'>{feature}</TitleComponent>
                                </div>
                            ))}
                        </div>

                        <ThemeButton variant='primary' onClick={() => navigate("/services")}>Discover Our Services</ThemeButton>
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div className="bg-primaryLight rounded-3xl p-8 lg:p-12 mb-20">
                    <div className="text-center mb-10">
                        <TitleComponent size='small-medium' className='text-primary uppercase tracking-wider mb-3'>
                            Why Choose Leospa
                        </TitleComponent>
                        <TitleComponent type='h3' className='text-black'>
                            Experience the <span className="text-primary">Difference</span>
                        </TitleComponent>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Leaf,
                                title: 'Natural & Organic',
                                description: 'We exclusively use certified organic products free from harmful chemicals, ensuring your skin receives only the purest ingredients nature has to offer.'
                            },
                            {
                                icon: Heart,
                                title: 'Holistic Approach',
                                description: 'Our treatments go beyond surface beauty. We focus on complete wellness, addressing your physical, emotional, and spiritual needs for lasting results.'
                            },
                            {
                                icon: Users,
                                title: 'Expert Care',
                                description: 'Our internationally certified therapists undergo continuous training to bring you the latest techniques combined with traditional healing wisdom.'
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                                <div className="w-16 h-16 rounded-xl bg-primaryLight flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-300">
                                    <item.icon size={32} weight='fill' className="text-primary group-hover:text-white transition-colors duration-300" />
                                </div>
                                <TitleComponent type='h4' className='text-black mb-3'>
                                    {item.title}
                                </TitleComponent>
                                <TitleComponent size='base' className='text-textColor leading-relaxed'>
                                    {item.description}
                                </TitleComponent>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Our Philosophy Section */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content First */}
                    <div className="lg:order-1 order-2">
                        <TitleComponent size='small-medium' className='text-primary uppercase tracking-wider mb-3'>
                            Our Philosophy
                        </TitleComponent>
                        <TitleComponent type='h3' className='text-black mb-5'>
                            Healing Through <span className="text-primary">Balance</span>
                        </TitleComponent>

                        <TitleComponent size='base' className='text-textColor leading-relaxed mb-6'>
                            We believe wellness is a journey, not a destination. Every individual is unique,
                            which is why we take time to understand your specific needs, concerns, and goals
                            before crafting a personalized treatment plan.
                        </TitleComponent>

                        <div className="bg-white border-l-4 border-primary rounded-r-xl p-6 shadow-md mb-6">
                            <TitleComponent size='large' className='text-black italic leading-relaxed'>
                                "True luxury is taking time for yourself. It's about creating moments of peace
                                in a busy world and nurturing your well-being from the inside out."
                            </TitleComponent>
                        </div>

                        <TitleComponent size='base' className='text-textColor leading-relaxed'>
                            From our carefully curated treatment menu to our tranquil environment, every element
                            is designed to transport you to a state of complete relaxation and rejuvenation.
                        </TitleComponent>
                    </div>

                    {/* Stats Grid */}
                    <div className="lg:order-2 order-1 grid grid-cols-2 gap-6">
                        {[
                            { number: '15+', label: 'Years of Excellence', color: 'bg-primary' },
                            { number: '10K+', label: 'Happy Clients', color: 'bg-black' },
                            { number: '50+', label: 'Spa Treatments', color: 'bg-pink-400' },
                            { number: '98%', label: 'Client Satisfaction', color: 'bg-primary' }
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className={`${stat.color} rounded-2xl p-6 text-white shadow-xl hover:scale-105 transition-transform duration-300`}
                            >
                                <TitleComponent type='h3' className='text-white text-4xl font-bold mb-2'>
                                    {stat.number}
                                </TitleComponent>
                                <TitleComponent size='base' className='text-white/90'>
                                    {stat.label}
                                </TitleComponent>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSec2;