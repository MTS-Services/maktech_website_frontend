
import ApplyJobsHero from "./components/ApplyJobsHero";
import ApplyJobsRequirements from "./components/ApplyJobsRequirements";
import ApplyJobsResponsibilities from "./components/ApplyJobsResponsibilities";
import ApplyJobsBenefits from "./components/ApplyJobsBenefits";
import ApplyContact from "./components/ApplyContact";

const ApplyJobs = () => {


    return (
        <main
            id='about'
            aria-labelledby='about-heading'
            className='relative w-full overflow-hidden'>
            <ApplyJobsHero />
            <ApplyJobsRequirements />
            <ApplyJobsResponsibilities />
            <ApplyJobsBenefits />
            <ApplyContact/>

        </main>
    );
};

export default ApplyJobs;
