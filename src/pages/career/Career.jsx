
import CareerHero from "./components/CareerHero";
import CareerShowcase from "./components/CareerShowcase";
import CareerOpenings from "./components/CareerOpenings";

const Career = () => {
    return (
        <main
            id='about'
            aria-labelledby='about-heading'
            className='relative w-full overflow-hidden'
        >
            <CareerHero />
            <CareerShowcase />
            <CareerOpenings />
        </main>
    );
};

export default Career;
