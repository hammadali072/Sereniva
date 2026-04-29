import { ServiceData } from "../../Data";
import ServiceCard from "./ServiceCard";

const ServiceSec = () => {
    return (
        <section className="lg:pt-32 md:pt-24 pt-14">
            <div className="container-fluid">
                <div className="grid md:grid-cols-4 grid-cols-2 gap-1">
                    {ServiceData.map((data, index) => (
                        <ServiceCard data={data} key={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ServiceSec;

