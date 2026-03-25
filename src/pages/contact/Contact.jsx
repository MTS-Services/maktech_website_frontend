
import ContactForm from "./components/ContactForm";
import ContactFAQ from "./components/ContactFAQ";
import ContactHero from "./components/ContactHero";
import ContactUs from "../../components/ContactUs";

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
            <ContactFAQ />
        </main>
    );
};

export default Contact;
