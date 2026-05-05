import PageHeader from '../components/pageHeader/pageHeader';
import StorySec from '../components/storySec/storySec';
import ServiceSec from '../components/serviceSec/serviceSec';
import ProductSec from '../components/productSec/productSec';
import TestimonialSec from '../components/testimonialSec/testimonialSec';
import TeamSec from '../components/teamSec/teamSec';
import NewsletterSec from '../components/newsletterSec/newsletterSec';

const AboutPage = () => {
    return (
        <>
            <PageHeader
                heading="About Us"
                Link="/about"
                pageText="About Us"
            />
            <StorySec />
            <ServiceSec />
            <ProductSec />
            <TestimonialSec />
            <TeamSec />
            <NewsletterSec />
        </>
    )
}

export default AboutPage



