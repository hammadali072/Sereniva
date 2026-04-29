import PageHeader from '../components/pageHeader/pageHeader';
import AppointmentSec from '../components/appointmentSec/appointmentSec';

const AppointmentPage = () => {
    return (
        <>
            <PageHeader
                heading="Book Appointment"
                Link="/appointment"
                pageText="Appointment"
            />
            <AppointmentSec />
        </>
    );
};

export default AppointmentPage;


