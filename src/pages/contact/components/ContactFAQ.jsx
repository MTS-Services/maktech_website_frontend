import { useState } from 'react';
import {
    FAQS as faqs,
    FAQ_HEADING,
    FAQ_SUBHEADING,
} from '../../../components/faqData';

const FAQItem = ({ faq, isOpen, onToggle }) => {
    return (
        <div className="bg-[#F4F4F4] rounded-xl overflow-hidden transition-all duration-300">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-4 md:p-6 text-left transition-colors duration-200"
            >
                <span className="text-[#2B2B2B] text-base  font-normal pr-4 leading-snug">
                    {faq.question}
                </span>
                <div className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6 9L12 15L18 9"
                            stroke="#2B2B2B"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-4 md:px-6 pb-4 md:pb-6 pt-0">
                    <p className="text-[#666666] text-base leading-relaxed max-w-3xl">
                        {faq.answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

const ContactFAQ = () => {
    const [openId, setOpenId] = useState(1);
    const linePositions = [12, 30, 50, 68, 88];

    const toggleFAQ = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section className="w-full relative py-16 overflow-hidden bg-white">
            {/* Animated Lines Background */}
            <div className="pointer-events-none absolute inset-0 z-1">
                {linePositions.map((position, index) => (
                    <div
                        key={index}
                        className="absolute top-0 bottom-0 w-px bg-linear-to-b from-transparent via-black/20 to-transparent"
                        style={{ left: `${position}%` }}
                    >
                        <div
                            className="absolute w-0.5 h-12 rounded-full opacity-60 animate-dropFall"
                            style={{
                                left: "50%",
                                transform: "translateX(-50%)",
                                background:
                                    "linear-gradient(to bottom, rgba(255,255,255,0.1), #FF6533)",
                                animationDelay: `${index * 2}s`,
                            }}
                        />
                        <div
                            className="absolute w-0.5 h-10 rounded-full opacity-45 animate-dropFall"
                            style={{
                                left: "50%",
                                transform: "translateX(-50%)",
                                background:
                                    "linear-gradient(to bottom, rgba(255,255,255,0.1), #FF6533)",
                                animationDelay: `${index * 2 + 4}s`,
                            }}
                        />
                    </div>
                ))}
            </div>
            <div
                className="absolute -top-44 -left-24 w-[360px] h-[360px] md:w-[520px] md:h-[520px] rounded-full pointer-events-none"
                style={{
                    background: "rgba(255, 101, 51, 0.35)",
                    filter: "blur(120px)",
                    transform: "rotate(27deg)",
                }}
            />
            <div
                className="absolute -bottom-40 -right-20 w-[280px] h-[280px] md:w-[420px] md:h-[420px] rounded-full pointer-events-none"
                style={{
                    background: "rgba(255, 101, 51, 0.35)",
                    filter: "blur(120px)",
                }}
            />

            <div className="max-w-6xl mx-auto px-5 md:px-8 xl:px-10 relative z-10">
                {/* Header */}
                <div className="mb-10 md:mb-14 text-center">
                    {/* Badge */}
                    <div
                        className="inline-flex items-center gap-2.5 px-2 py-2 pr-4 rounded-lg mb-6 md:mb-8"
                        style={{
                            background: "linear-gradient(93deg, rgba(255, 101, 51, 0) 0%, #E4E4E4 100%)",
                            outline: "1px rgba(255, 255, 255, 0.25) solid",
                        }}
                    >
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ background: "#DAB8AC" }}
                        >
                            <span
                                className="w-[18px] h-[18px] rounded-full"
                                style={{
                                    background:
                                        "radial-gradient(ellipse 86.93% 86.93% at 14.58% 10.42%, #FFBEA9 0%, #FA6332 100%)",
                                    boxShadow: "2.25px 3.37px 4.5px rgba(68, 18, 0, 0.36)",
                                }}
                            />
                        </div>
                        <span className="text-sm md:text-lg font-normal text-[#666666]">Need Help?</span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl md:text-4xl  font-medium mb-3 leading-tight text-[#7D7D7D]">
                        {FAQ_HEADING}
                    </h2>

                    {/* Subheading */}
                    <p className="text-[#AAAAAA] text-base  max-w-3xl mx-auto leading-relaxed">
                        {FAQ_SUBHEADING}
                    </p>
                </div>

                {/* FAQ List */}
                <div className="max-w-4xl mx-auto flex flex-col gap-4 md:gap-6">
                    {faqs.map((faq) => (
                        <FAQItem
                            key={faq.id}
                            faq={faq}
                            isOpen={openId === faq.id}
                            onToggle={() => toggleFAQ(faq.id)}
                        />
                    ))}
                </div>


            </div>
        </section>
    );
};

export default ContactFAQ;
