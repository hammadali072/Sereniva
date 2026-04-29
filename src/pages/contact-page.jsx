import PageHeader from '../components/pageHeader/pageHeader';
import ContactSec from '../components/contactSec/contactSec';

const ContactPage = () => {
    return (
        <>
            <PageHeader
                heading="Contact Us"
                Link="/contact"
                pageText="Contact Us"
            />
            <ContactSec />
        </>
    )
}

export default ContactPage


