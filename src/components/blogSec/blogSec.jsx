import { blogData } from "../../Data";

import SectionTitle from '../sectionTitle/sectionTitle';
import TitleComponent from "../titleComponent/titleComponent";
import BlogCard from './blogCard';

const BlogSec = () => {
    return (
        <section className='lg:py-20 py-14'>
            <div className="container">
                <SectionTitle
                    subtitle="SPA Insights" subtitleClass="about_subtitle"
                    title="Read Our Latest" titleClass="about_title"
                    headingLevel='h2' highlightedText="Blog"
                    sectionStyle="text-center max-w-[900px] mx-auto mb-12"
                >
                    <TitleComponent size='base' className='mt-5 text-textColor'>
                        To doesn't his appear replenish together called he of mad place won't wherein blessed second every wherein were meat kind wherein and martcin
                    </TitleComponent>
                </SectionTitle>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                    {blogData.map((data, index) => (
                        <BlogCard key={index} data={data} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default BlogSec;
