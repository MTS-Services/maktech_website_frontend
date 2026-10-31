import ContactHero from "./components/ContactHero";
import ContactUs from "../../components/ContactUs";
import ReviewBadges from "../../components/ReviewBadges";
import ContactFAQ from "./components/ContactFAQ";

const Contact = () => {
    return (
        <main
            id='about'
            aria-labelledby='about-heading'
            className='relative w-full overflow-hidden'
        >
            <ContactHero />
            {/* <ContactForm /> */}
            <ContactUs/>
            <ReviewBadges />
            <ContactFAQ />
        </main>
    );
};

export default Contact;
