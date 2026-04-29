import { BenefitData } from '../../Data';

import BenefitItem from './BenefitItem';

const BenefitSec = () => {
    return (
        <section className='lg:py-32 md:py-24 py-14'>
            <div className="container">
                <div className='grid md:grid-cols-4 sm:grid-cols-2 gap-5 items-center'>
                    {BenefitData.map((item, index) => (
                        <BenefitItem key={index} props={item} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default BenefitSec;

