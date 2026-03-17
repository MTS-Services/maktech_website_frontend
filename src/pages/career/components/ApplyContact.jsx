import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
const ApplyContact = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        companyName: "",
        email: "",
        service: "",
        budget: "",
        industry: "",
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
        console.log("Form submitted:", formData);
    };

    return (
        <section className="w-full relative py-16 xl:py-20 2xl:py-24 overflow-hidden">
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

            <div className="container mx-auto px-5 xl:px-8 2xl:px-12 relative z-10">
                {/* Header */}
                <div className="mb-12 xl:mb-16 text-center">
                    {/* Badge */}


                    {/* Heading */}
                    <h2 className="text-3xl xl:text-4xl 2xl:text-5xl font-semibold mb-4 leading-tight text-white">
                        Apply Now
                    </h2>

                    {/* Subheading */}
                    <p className="text-[#AAAAAA] text-sm xl:text-lg max-w-3xl mx-auto">
                        Please fill up the form that we can reach you out!
                    </p>
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
                        className="p-6 xl:p-8"
                        style={{
                            backgroundColor: "rgba(66, 66, 66, 0.2)",
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                    >

                        {/*  Company Info Box */}
                        <div
                            className="p-8 xl:p-10 "
                            style={{
                                backgroundColor: "rgba(66, 66, 66, 0.2)",
                                backdropFilter: "blur(20px)",
                                WebkitBackdropFilter: "blur(20px)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                            }}
                        >

                            {/* Right Side - Application Form */}
                            <form onSubmit={handleSubmit} className="p-8 xl:p-10">
                                {/* Full Name */}
                                <div className="mb-8">
                                    <label className="block text-white text-sm md:text-base font-medium mb-3">
                                        Full Name
                                    </label>
                                    <div
                                        className="h-13 rounded-xl flex items-center px-5 transition-all duration-200 hover:border-orange-bg-cta/60 group cursor-text"
                                        style={{
                                            backgroundColor: "rgba(66, 66, 66, 0.3)",
                                            backdropFilter: "blur(20px)",
                                            WebkitBackdropFilter: "blur(20px)",
                                            border: "1px solid rgba(255, 255, 255, 0.15)",
                                        }}
                                    >
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Full Name"
                                            className="w-full bg-transparent text-white placeholder-[#777777] outline-none text-sm md:text-base"
                                        />
                                    </div>
                                </div>

                                {/* Phone Number & Email */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div>
                                        <label className="block text-white text-sm md:text-base font-medium mb-3">
                                            Phone Number
                                        </label>
                                        <div
                                            className="h-13 rounded-xl flex items-center px-5 transition-all duration-200 hover:border-orange-bg-cta/60 group cursor-text"
                                            style={{
                                                backgroundColor: "rgba(66, 66, 66, 0.3)",
                                                backdropFilter: "blur(20px)",
                                                WebkitBackdropFilter: "blur(20px)",
                                                border: "1px solid rgba(255, 255, 255, 0.15)",
                                            }}
                                        >
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="+880"
                                                className="w-full bg-transparent text-white placeholder-[#777777] outline-none text-sm md:text-base"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-white text-sm md:text-base font-medium mb-3">
                                            Email
                                        </label>
                                        <div
                                            className="h-13 rounded-xl flex items-center px-5 transition-all duration-200 hover:border-orange-bg-cta/60 group cursor-text"
                                            style={{
                                                backgroundColor: "rgba(66, 66, 66, 0.3)",
                                                backdropFilter: "blur(20px)",
                                                WebkitBackdropFilter: "blur(20px)",
                                                border: "1px solid rgba(255, 255, 255, 0.15)",
                                            }}
                                        >
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Email"
                                                className="w-full bg-transparent text-white placeholder-[#777777] outline-none text-sm md:text-base"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Years of Experience & Expertise Tags */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div>
                                        <label className="block text-white text-sm md:text-base font-medium mb-3">
                                            Years of Experience
                                        </label>
                                        <div
                                            className="h-13 rounded-xl flex items-center px-5 transition-all duration-200 hover:border-orange-bg-cta/60 group cursor-text relative"
                                            style={{
                                                backgroundColor: "rgba(66, 66, 66, 0.3)",
                                                backdropFilter: "blur(20px)",
                                                WebkitBackdropFilter: "blur(20px)",
                                                border: "1px solid rgba(255, 255, 255, 0.15)",
                                            }}
                                        >
                                            <select
                                                defaultValue=""
                                                className="w-full bg-transparent text-white placeholder-[#777777] outline-none text-sm md:text-base appearance-none pr-8"
                                            >
                                                <option value="" className="bg-[#3F3F3F]">
                                                    Fresher
                                                </option>
                                                <option value="1-2" className="bg-[#3F3F3F]">
                                                    1-2 years
                                                </option>
                                                <option value="3-5" className="bg-[#3F3F3F]">
                                                    3-5 years
                                                </option>
                                                <option value="5+" className="bg-[#3F3F3F]">
                                                    5+ years
                                                </option>
                                            </select>
                                            <IoIosArrowDown />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-white text-sm md:text-base font-medium mb-3">
                                            Expertise (Skills)
                                        </label>
                                        <div
                                            className="h-13 rounded-xl flex items-center px-3 flex-wrap gap-2 overflow-hidden transition-all duration-200 hover:border-orange-bg-cta/60 group"
                                            style={{
                                                backgroundColor: "rgba(66, 66, 66, 0.3)",
                                                backdropFilter: "blur(20px)",
                                                WebkitBackdropFilter: "blur(20px)",
                                                border: "1px solid rgba(255, 255, 255, 0.15)",
                                            }}
                                        >
                                            <span className="bg-orange-bg-cta/30 border border-orange-bg-cta/60 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap">
                                                UI/UX Design ✕
                                            </span>
                                            <span className="bg-orange-bg-cta/30 border border-orange-bg-cta/60 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap">
                                                Content Writing ✕
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Applying For */}
                                <div className="mb-8">
                                    <label className="block text-white text-sm md:text-base font-medium mb-3">
                                        Applying For
                                    </label>
                                    <div
                                        className="h-13 rounded-xl flex items-center px-5 transition-all duration-200 hover:border-orange-bg-cta/60 group cursor-text relative"
                                        style={{
                                            backgroundColor: "rgba(66, 66, 66, 0.3)",
                                            backdropFilter: "blur(20px)",
                                            WebkitBackdropFilter: "blur(20px)",
                                            border: "1px solid rgba(255, 255, 255, 0.15)",
                                        }}
                                    >
                                        <select
                                            name="service"
                                            value={formData.service}
                                            onChange={handleChange}
                                            className="w-full bg-transparent text-white placeholder-[#777777] outline-none text-sm md:text-base appearance-none pr-8"
                                        >
                                            <option value="" className="bg-[#3F3F3F]">
                                                Select Position
                                            </option>
                                            <option value="frontend" className="bg-[#3F3F3F]">
                                                Frontend Developer
                                            </option>
                                            <option value="backend" className="bg-[#3F3F3F]">
                                                Backend Developer
                                            </option>
                                            <option value="designer" className="bg-[#3F3F3F]">
                                                UI/UX Designer
                                            </option>
                                            <option value="marketing" className="bg-[#3F3F3F]">
                                                Digital Marketer
                                            </option>
                                        </select>
                                        <IoIosArrowDown />
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="mb-8">
                                    <label className="block text-white text-sm md:text-base font-medium mb-3">
                                        Message
                                    </label>
                                    <div
                                        className="min-h-32 rounded-xl p-5 transition-all duration-200 hover:border-orange-bg-cta/60"
                                        style={{
                                            backgroundColor: "rgba(66, 66, 66, 0.3)",
                                            backdropFilter: "blur(20px)",
                                            WebkitBackdropFilter: "blur(20px)",
                                            border: "1px solid rgba(255, 255, 255, 0.15)",
                                        }}
                                    >
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Share your message..."
                                            className="w-full h-full bg-transparent text-white placeholder-[#777777] outline-none resize-none text-sm md:text-base"
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="group flex items-center justify-between gap-4 bg-[#FF6533] hover:bg-[#e55a2d] text-white p-2 pl-8 rounded-full transition-all duration-300 active:scale-95"
                                >
                                    <span className="text-lg font-medium">Send Message</span>

                                    {/* White Circle with Arrow */}
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                                        <svg
                                            width="20"
                                            height="20"
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
        </section>
    );
};

export default ApplyContact;

