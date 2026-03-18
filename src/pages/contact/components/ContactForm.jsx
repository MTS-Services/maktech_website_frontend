import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        companyName: "",
        email: "",
        service: "",
        budget: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Contact form submitted:", formData);
    };

    return (
        <section className="w-full relative py-10 lg:py-16   overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url(/contact/Frame 2147226071.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.3,
                }}
            />

            <div className="container mx-auto max-w-7xl px-5 xl:px-8 2xl:px-12 relative z-10">
                {/* Header */}
                <div className="mb-12 xl:mb-16 text-center">


                </div>

                {/* Contact Form Container */}
                <div className="container mx-auto relative">
                    {/* Orange Gradient Background Glow */}
                    <div
                        className="absolute inset-0 -z-10"
                        style={{
                            background:
                                "radial-gradient(circle at center, rgba(254, 101, 51, 0.15), transparent 70%)",
                            filter: "blur(60px)",
                        }}
                    />

                    {/* Outer Wrapper Box */}
                    <div
                        className="p-4 xl:p-8"
                        style={{
                            backgroundColor: "rgba(66, 66, 66, 0.2)",
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                    >
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8">
                            {/* Left Side - Company Info Box */}
                            <div
                                className="p-4 xl:p-10 "
                                style={{
                                    backgroundColor: "rgba(66, 66, 66, 0.2)",
                                    backdropFilter: "blur(20px)",
                                    WebkitBackdropFilter: "blur(20px)",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                }}
                            >
                                {/* Company Description */}
                                <div className="mb-10">
                                    <h3 className="text-2xl xl:text-3xl font-semibold text-white mb-3 leading-tight">
                                        Designing Experiences That Drive Growth
                                    </h3>
                                    <p className="text-[#AAAAAA] text-sm md:text-base lg:text-lg">
                                        We&apos;re a digital-first team helping businesses build
                                        meaningful
                                    </p>
                                </div>

                                {/* Contact Details */}
                                <div className="space-y-3 md:space-y-4 mb-10">
                                    {/* Email */}
                                    <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg bg-[#3F3F3F] border border-white/10">
                                        <div className="shrink-0 mt-0.5 md:mt-1">
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="md:w-6 md:h-6"
                                            >
                                                <rect
                                                    x="3"
                                                    y="5"
                                                    width="18"
                                                    height="14"
                                                    rx="2"
                                                    stroke="white"
                                                    strokeWidth="1.5"
                                                />
                                                <path
                                                    d="M3 7L12 13L21 7"
                                                    stroke="white"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-white font-medium text-sm md:text-base lg:text-lg mb-0.5 md:mb-1 truncate">
                                                Email us
                                            </p>
                                            <p className="text-[#AAAAAA] text-xs md:text-sm lg:text-base break-words">
                                                maktech.corporate@gmail.com
                                            </p>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg bg-[#3F3F3F] border border-white/10">
                                        <div className="shrink-0 mt-0.5 md:mt-1">
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="md:w-6 md:h-6"
                                            >
                                                <path
                                                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                                                    stroke="white"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-white font-medium text-sm md:text-base lg:text-lg mb-0.5 md:mb-1 truncate">
                                                Call on
                                            </p>
                                            <p className="text-[#AAAAAA] text-xs md:text-sm lg:text-base break-words">+012-3456-78910</p>
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg bg-[#3F3F3F] border border-white/10">
                                        <div className="shrink-0 mt-0.5 md:mt-1">
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="md:w-6 md:h-6"
                                            >
                                                <path
                                                    d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                                                    stroke="white"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <circle
                                                    cx="12"
                                                    cy="10"
                                                    r="3"
                                                    stroke="white"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-white font-medium text-sm md:text-base lg:text-lg mb-0.5 md:mb-1 truncate">
                                                Location
                                            </p>
                                            <p className="text-[#AAAAAA] text-xs md:text-sm lg:text-base break-words">
                                                A-Majid Tower, Pragati Sarani, Dhaka-1229
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Media */}
                                <div>
                                    <p className="text-white text-sm md:text-base font-medium mb-4">
                                        Social media
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <a
                                            href="#"
                                            className="w-12 h-12 rounded-lg bg-[#424242]/50 hover:bg-[#424242]/70 border border-white/5 flex items-center justify-center transition-all duration-200"
                                            aria-label="Facebook"
                                        >
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                            </svg>
                                        </a>
                                        <a
                                            href="#"
                                            className="w-12 h-12 rounded-lg bg-[#424242]/50 hover:bg-[#424242]/70 border border-white/5 flex items-center justify-center transition-all duration-200"
                                            aria-label="LinkedIn"
                                        >
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                                                <circle cx="4" cy="4" r="2" fill="white" />
                                            </svg>
                                        </a>
                                        <a
                                            href="#"
                                            className="w-12 h-12 rounded-lg bg-[#424242]/50 hover:bg-[#424242]/70 border border-white/5 flex items-center justify-center transition-all duration-200"
                                            aria-label="WhatsApp"
                                        >
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                            </svg>
                                        </a>
                                        <a
                                            href="#"
                                            className="w-12 h-12 rounded-lg bg-[#424242]/50 hover:bg-[#424242]/70 border border-white/5 flex items-center justify-center transition-all duration-200"
                                            aria-label="Behance"
                                        >
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M15 6h5M3 8h5.5a2.5 2.5 0 1 1 0 5H3V8zm0 5h5.5a2.5 2.5 0 1 1 0 5H3v-5z" />
                                                <path d="M16 13.5a3.5 3.5 0 1 0 3.5 3.5H16v-3.5z" fill="none" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - Form Box */}
                            <div
                                className="p-8 xl:p-10"
                                style={{
                                    backgroundColor: "rgba(66, 66, 66, 0.2)",
                                    backdropFilter: "blur(20px)",
                                    WebkitBackdropFilter: "blur(20px)",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                }}
                            >
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* Full Name */}
                                    <div>
                                        <label className="text-white-bg-cta text-base  mb-2 block">
                                            Client Name
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            placeholder="Full Name"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-[#3F3F3F] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-bg-cta transition-colors duration-200"
                                        />
                                    </div>

                                    {/* Company Name and Email */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="text-white-bg-cta text-base  mb-2 block">
                                                Company Name
                                            </label>
                                            <input
                                                type="text"
                                                name="companyName"
                                                placeholder="Company Name"
                                                value={formData.companyName}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-[#3F3F3F] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-bg-cta transition-colors duration-200"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-white-bg-cta text-base  mb-2 block">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-[#3F3F3F] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-bg-cta transition-colors duration-200"
                                            />
                                        </div>
                                    </div>

                                    {/* Service and Budget */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="text-white-bg-cta text-base  mb-2 block">
                                                Service
                                            </label>
                                            <select
                                                name="service"
                                                value={formData.service}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-[#3F3F3F] border border-white/10 rounded-lg text-white focus:outline-none focus:border-orange-bg-cta transition-colors duration-200 appearance-none cursor-pointer"
                                                style={{
                                                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                                                    backgroundRepeat: "no-repeat",
                                                    backgroundPosition: "right 1rem center",
                                                }}
                                            >
                                                <option value="" disabled>
                                                    Service
                                                </option>
                                                <option
                                                    value="ui-ux"
                                                    className="text-white"
                                                >
                                                    UI/UX Design
                                                </option>
                                                <option
                                                    value="mern"
                                                    className="text-white"
                                                >
                                                    MERN Stack Development
                                                </option>
                                                <option
                                                    value="application"
                                                    className="text-white"
                                                >
                                                    Application Development
                                                </option>
                                                <option
                                                    value="ecommerce"
                                                    className="text-white"
                                                >
                                                    E-Commerce Development
                                                </option>
                                                <option
                                                    value="marketing"
                                                    className="text-white"
                                                >
                                                    Digital Marketing
                                                </option>
                                                <option
                                                    value="wordpress"
                                                    className="text-white"
                                                >
                                                    WordPress Development
                                                </option>
                                                <option
                                                    value="shopify"
                                                    className="text-white"
                                                >
                                                    Shopify Development
                                                </option>
                                                <option
                                                    value="wix"
                                                    className="text-white"
                                                >
                                                    WIX Development
                                                </option>
                                                <option
                                                    value="graphic"
                                                    className="text-white"
                                                >
                                                    Graphic Design
                                                </option>
                                                <option
                                                    value="other"
                                                    className="text-white"
                                                >
                                                    Other
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-white-bg-cta text-base  mb-2 block">
                                                Budget
                                            </label>
                                            <select
                                                name="budget"
                                                value={formData.budget}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-[#3F3F3F] border border-white/10 rounded-lg text-white focus:outline-none focus:border-orange-bg-cta transition-colors duration-200 appearance-none cursor-pointer"
                                                style={{
                                                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                                                    backgroundRepeat: "no-repeat",
                                                    backgroundPosition: "right 1rem center",
                                                }}
                                            >
                                                <option value="" disabled>
                                                    Budget
                                                </option>
                                                <option
                                                    value="3000"
                                                    className="text-white"
                                                >
                                                    $3000
                                                </option>
                                                <option
                                                    value="4000"
                                                    className="text-white"
                                                >
                                                    $4000
                                                </option>
                                                <option
                                                    value="5000"
                                                    className="text-white"
                                                >
                                                    $5000
                                                </option>
                                                <option
                                                    value="6000"
                                                    className="text-white"
                                                >
                                                    $6000
                                                </option>
                                                <option
                                                    value="7000"
                                                    className="text-white"
                                                >
                                                    $7000
                                                </option>
                                                <option
                                                    value="8000"
                                                    className="text-white"
                                                >
                                                    $8000+
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Industry */}
                                    <div>
                                        <label className="text-white-bg-cta text-base  mb-2 block">
                                            Industry
                                        </label>
                                        <input
                                            type="text"
                                            name="industry"
                                            placeholder="Full industry name"
                                            value={formData.industry}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-[#3F3F3F] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-bg-cta transition-colors duration-200"
                                        />
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="text-white-bg-cta text-base  mb-2 block">
                                            Client Name
                                        </label>
                                        <textarea
                                            name="message"
                                            placeholder="Message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="4"
                                            className="w-full px-4 py-3 bg-[#3F3F3F] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-bg-cta transition-colors duration-200 resize-none"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="group w-full sm:w-fit flex items-center justify-between gap-4 md:gap-12 bg-[#FF6533] hover:bg-[#e55a2d] text-white p-1 pl-5  rounded-full transition-all duration-300 active:scale-95"
                                    >
                                        <span className="text-sm sm:text-base  font-medium">Let’s Talk</span>

                                        {/* White Circle with Arrow */}
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="black"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
