import { procedureData } from '../../Data';

import SectionTitle from '../sectionTitle/sectionTitle';
import TitleComponent from '../titleComponent/titleComponent';
import ProcedureCard from './procedureCard';

const ProcedureSec = () => {
    return (
        <div className='lg:py-32 md:py-24 py-14'>
            <div className="container">
                <SectionTitle
                    subtitle="Our Treatments" subtitleClass="procedure_subtitle"
                    title="Popular" titleClass="procedure_title"
                    headingLevel='h2' highlightedText="Procedures"
                    sectionStyle="text-center max-w-[800px] mx-auto mb-12"
                >
                    <TitleComponent size='base' className='procedure_desc text-grey8 mt-5 lg:mb-14 mb-10'>To doesn't his appear replenish together called he of mad place won't wherein blessed second every wherein were meat kind wherein and martcin</TitleComponent>
                </SectionTitle>
                <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6">
                    {procedureData.map((data, index) => (
                        <ProcedureCard data={data} key={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProcedureSec;
