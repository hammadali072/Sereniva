import clsx from 'clsx';

import SectionTitle from '../sectionTitle/sectionTitle';
import TitleComponent from '../titleComponent/titleComponent';
import ThemeButton from '../themeButton/themeButton';
import FormInput2 from '../formInput/formInput2';

import ContactImage from '../../assets/cta-img.webp';

const AppointmentSec = () => {
    const inputStyles = "py-3 px-4 border border-grey100 rounded-md bg-white lg:text-base text-sm text-black w-full focus:outline-none focus:border-primary transition-colors duration-300"

    return (
        <div className="relative flex items-center bg-primaryLight md:mb-12">
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 lg:w-2/5 h-full overflow-hidden lg:block hidden">
                <img className='w-full h-full object-cover' src={ContactImage} alt="contact image" />
            </div>
            <div className="container">
                <div className="lg:flex lg:justify-end xl:pl-[100px] lg:pl-16 xl:py-32 md:py-24 py-14">
                    <div className='lg:w-3/5'>
                        <SectionTitle
                            subtitle="Book Your Session" subtitleClass="contact_subtitle"
                            title="Make an" titleClass="contact_title"
                            headingLevel='h2' highlightedText="Appointment"
                            sectionStyle="mb-8"
                        >
                            <TitleComponent size='base' className='contact_desc mt-5 text-textColor'>Schedule your relaxation session with our expert therapists</TitleComponent>
                        </SectionTitle>

                        <form className='flex flex-col lg:gap-6 gap-3.5'>
                            <div className='flex sm:flex-row flex-col lg:gap-6 gap-3.5'>
                                <FormInput2 type='text' name='name' placeholder='Name' />
                                <FormInput2 type='email' name='email' placeholder='Email Address' />
                            </div>
                            <div className='flex sm:flex-row flex-col lg:gap-6 gap-3.5'>
                                <select
                                    className={clsx(inputStyles, "appearance-none")}
                                    name="service"
                                >
                                    <option value="">Select service</option>
                                    <option value="Service 1">Swedish Massage</option>
                                    <option value="Service 2">Deep Tissue Massage</option>
                                    <option value="Service 3">Hot Stone Therapy</option>
                                </select>
                                <FormInput2 type='tel' name='phone' placeholder='Phone Number' />
                            </div>
                            <div className='flex sm:flex-row flex-col lg:gap-6 gap-3.5'>
                                <FormInput2 type='date' name='date' placeholder='mm/dd/yyyy' />
                                <FormInput2 type='time' name='time' placeholder='--:-- --' />
                            </div>
                            <textarea
                                className={inputStyles}
                                name="notes"
                                rows="4"
                                placeholder="Your notes"
                            />
                            <div className="col-span-2">
                                <ThemeButton variant='primary' type="submit">Make an Appointment</ThemeButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppointmentSec;