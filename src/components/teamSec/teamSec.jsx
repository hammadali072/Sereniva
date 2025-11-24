import { teamData } from "../../Data";

import SectionTitle from '../sectionTitle/sectionTitle';
import TitleComponent from "../titleComponent/titleComponent";
import TeamCart from "./teamCart";

const TeamSec = () => {
    return (
        <div className='lg:py-32 md:py-24 py-14'>
            <div className="container">
                <SectionTitle
                    subtitle="Meet Our Experts" subtitleClass="team_subtitle"
                    title="Experienced" titleClass="team_title"
                    headingLevel='h2' highlightedText="Team"
                    sectionStyle="text-center max-w-[800px] mx-auto mb-12"
                >
                    <TitleComponent size='base' className='team_desc mt-5 text-textColor'>To doesn't his appear replenish together called he of mad place won't wherein blessed second every wherein were meat kind wherein and martcin</TitleComponent>
                </SectionTitle>

                <div className="grid md:grid-cols-3 sm:grid-cols-2 lg:gap-6 gap-4">
                    {teamData.map((data, index) => (
                        <TeamCart data={data} key={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TeamSec;
