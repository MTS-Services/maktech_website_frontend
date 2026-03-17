
import ContactForm from "./components/ContactForm";
import ContactFAQ from "./components/ContactFAQ";
import ContactHero from "./components/ContactHero";

const Contact = () => {
    return (
        <main
            id='about'
            aria-labelledby='about-heading'
            className='relative w-full overflow-hidden'
        >
            <ContactHero />
            <ContactForm />
            <ContactFAQ />
        </main>
    );
};

export default Contact;
