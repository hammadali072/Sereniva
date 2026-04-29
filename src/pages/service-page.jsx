import PageHeader from '../components/pageHeader/pageHeader';
import NewsletterSec from '../components/newsletterSec/newsletterSec';
import ProductSec from '../components/productSec/productSec';
import BenefitSec from '../components/benefitSec/benefitSec';
import TestimonialSec from '../components/testimonialSec/testimonialSec';

const ServicePage = () => {
    return (
        <>
            <PageHeader
                heading="Our Services"
                Link="/services"
                pageText="Services"
            />
            {/* Moved dynamicServiceSec to the top as requested, now replaced with ProductSec */}
            <ProductSec />
            <BenefitSec />
            <TestimonialSec />
            <NewsletterSec />
        </>
    )
}

export default ServicePage;



