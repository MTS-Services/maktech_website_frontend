
import ApplyJobsHero from "./components/ApplyJobsHero";
import ApplyJobsRequirements from "./components/ApplyJobsRequirements";
import ApplyJobsResponsibilities from "./components/ApplyJobsResponsibilities";
import ApplyJobsBenefits from "./components/ApplyJobsBenefits";
import ApplyContact from "./components/ApplyContact";

const ApplyJobs = () => {


    return (
        <div className="min-h-screen text-white">
            <ApplyJobsHero />
            <ApplyJobsRequirements />
            <ApplyJobsResponsibilities />
            <ApplyJobsBenefits />
            <ApplyContact/>

        </div>
    );
};

export default ApplyJobs;
