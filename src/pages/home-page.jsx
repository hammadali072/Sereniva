import HeroSec from "../components/heroSec/heroSec";
import BenefitSec from "../components/benefitSec/benefitSec";
import AboutSec from "../components/aboutSec/aboutSec";
import CollectionSec from "../components/collectionSec/collectionSec";
import ProductSec from "../components/productSec/productSec";
import RitualSec from "../components/ritualSec/ritualSec";
import ArrivalSec from "../components/arrivalSec/arrivalSec";
import SkincareSec from "../components/skincareSec/skincareSec";
import ShowcaseSec from "../components/showcaseSec/showcaseSec";
import TeamSec from "../components/teamSec/teamSec";
import TestimonialSec from "../components/testimonialSec/testimonialSec";
import NewsletterSec from "../components/newsletterSec/newsletterSec";

const HomePage = () => {
    return (
        <>
            <HeroSec />
            <RitualSec />
            <AboutSec />
            <CollectionSec />
            <ProductSec />
            <div className="bg-primary/5">
                <SkincareSec />
            </div>
            <ArrivalSec />
            <ShowcaseSec />
            <TeamSec />
            <TestimonialSec />
            <BenefitSec />
            <NewsletterSec />
        </>
    )
}

export default HomePage;

