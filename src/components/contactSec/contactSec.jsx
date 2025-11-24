import clsx from "clsx";
import { Link } from "react-router-dom";
import { contactData } from "../../Data";

import SectionTitle from "../sectionTitle/sectionTitle";
import TitleComponent from "../titleComponent/titleComponent";
import ThemeButton from "../themeButton/themeButton";
import FormInput from "../formInput/formInput";

const ContactSec = () => {
    const inputStyles = "p-4 bg-greyShade rounded lg:text-base text-sm text-black w-full placeholder:text-greyDark focus:outline-none"

    return (
        <>
            <section className="lg:py-32 md:py-24 py-14">
                <div className="container">
                    <div className="flex lg:flex-row flex-col lg:gap-20 gap-5 mx-auto">
                        <div className="lg:w-1/2">
                            <SectionTitle
                                subtitle="Contact Us" subtitleClass="contact_subtitle"
                                title="Get in" titleClass="contact_title"
                                headingLevel='h2' highlightedText="Touch"
                            >
                                <TitleComponent size='base' className='contact_desc mt-5 text-textColor'>To doesn't his appear replenish together called he of mad place won't wherein blessed second every wherein were meat kind wherein and martcin</TitleComponent>
                            </SectionTitle>
                            <ul className='md:mt-12 mt-8 flex flex-col lg:gap-6 gap-4'>
                                {contactData.map((item, index) => (
                                    <li key={index}>
                                        <Link to={item.path} className='grid grid-cols-[auto_1fr] items-center gap-x-4 group'>
                                            <div className='flex justify-center items-center size-14 rounded-lg bg-primaryLight duration-300 group-hover:bg-primary'>
                                                <item.icon className='text-primary duration-300 group-hover:text-primaryLight' size={26} weight='fill' />
                                            </div>
                                            <div className='flex flex-col xl:gap-0.5 gap-1.5'>
                                                <TitleComponent size='base-medium' className='text-grey8/80'>{item.label}</TitleComponent>
                                                <TitleComponent size='large-medium' className='text-black duration-300 group-hover:text-primary'>{item.title}</TitleComponent>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="lg:w-2/3 bg-white shadow-shadow2 p-5 rounded-md">
                            <form className='grid gap-y-6'>
                                <div className="grid md:grid-cols-2 gap-x-3 gap-y-6">
                                    <FormInput labelText="First Name *" labelfor="name" type='text' name='firstName' placeholder='John Doe' />
                                    <FormInput labelText="Email Address *" labelfor="email" type='email' name='email' placeholder='john@example.com' />
                                </div>
                                <div className="grid md:grid-cols-2 gap-x-3 gap-y-6">
                                    <FormInput labelText="Phone Number *" labelfor="phoneNo" type='tel' name='phoneNo' placeholder='Phone Number' />
                                    <div className="space-y-1.5">
                                        <label for="subject" className="block text-sm font-medium text-black mb-2">Subject *</label>
                                        <select
                                            className={clsx(inputStyles, "appearance-none")}
                                            id="subject"
                                            name="subject"
                                        >
                                            <option value="" className="text-greyDark">Select a subject</option>
                                            <option value="General" className="text-greyDark">General Inquiry</option>
                                            <option value="Booking" className="text-greyDark">Booking Question</option>
                                            <option value="Services" className="text-greyDark">About Our Services</option>
                                            <option value="Feedback" className="text-greyDark">Feedback</option>
                                            <option value="other" className="text-greyDark">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div className="space-y-1 5">
                                        <label for="message" className="block text-sm font-medium text-black mb-2">Your Message *</label>
                                    </div>
                                    <textarea className={clsx(inputStyles, "h-[150px] resize-y")} id="message" name="message" placeholder="Your notes" />
                                </div>
                                <div className="flex justify-start items-center">
                                    <ThemeButton variant="primary">Send Message</ThemeButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <iframe
                className="w-full 2xl:h-[500px] md:h-[400px] sm:h-[300px] h-52 -mb-1"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24196.22093656893!2d-111.91936604612816!3d40.70640020197386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87528ace2b0246f5%3A0x492b0c437e9cceb8!2sSouth%20Salt%20Lake%2C%20UT%2C%20USA!5e0!3m2!1sen!2sbd!4v1724093902757!5m2!1sen!2sbd"
            />
        </>
    )
}

export default ContactSec;
