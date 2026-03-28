import { useState } from "react";

const ContactUs = () => {
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
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-md w-fit mb-6 mx-auto"
            style={{
              background:
                "linear-gradient(90deg, rgba(46,34,30,0.98) 0%, rgba(38,30,28,0.92) 50%, rgba(28,22,20,0.88) 100%)",
              border: "1px solid rgba(255,255,255,0.03)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)",
            }}
          >
            <div className="relative flex items-center justify-center w-3.5 h-3.5">
              <span
                className="absolute w-full h-full rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, rgba(255,101,51,0.95), rgba(255,101,51,0.6) 40%, rgba(255,101,51,0.25) 70%)",
                }}
              ></span>
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: "linear-gradient(180deg, #ff8a5a, #ff6533)",
                }}
              ></span>
            </div>
            <span className="text-base font-medium text-white">
              Let&apos;s talk
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl xl:text-4xl 2xl:text-5xl font-semibold mb-4 leading-tight text-white">
            Ready to scale? Let&apos;s talk.
          </h2>

          {/* Subheading */}
          <p className="text-[#AAAAAA] text-sm xl:text-lg max-w-3xl mx-auto">
            If you are seeking more than short-term output and instead want a
            coordinated digital structure capable of growing with your business,
            the conversation is worth starting.
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
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8">
              {/* Left Side - Company Info Box */}
              <div
                className="p-8 xl:p-10 "
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
                <div className="space-y-4 mb-10">
                  {/* Email */}
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-[#3F3F3F] border border-white/10">
                    <div className="shrink-0 mt-1">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
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
                    <div>
                      <p className="text-white font-medium text-base md:text-lg mb-1">
                        Email us
                      </p>
                      <p className="text-[#AAAAAA] text-sm md:text-base">
                        maktechgroup@gmail.com
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-[#3F3F3F] border border-white/10">
                    <div className="shrink-0 mt-1">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
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
                    <div>
                      <p className="text-white font-medium text-base md:text-lg mb-1">
                        Call on
                      </p>
                      <p className="text-[#AAAAAA] text-sm md:text-base">
                        +88 01897-669233
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-[#3F3F3F] border border-white/10">
                    <div className="shrink-0 mt-1">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
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
                    <div>
                      <p className="text-white font-medium text-base md:text-lg mb-1">
                        Location
                      </p>
                      <p className="text-[#AAAAAA] text-sm md:text-base">
                        8th Floor, A, Majid Tower, Ka-24 Progati Sarani Rd,
                        Dhaka 1229
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <p className="text-white text-sm md:text-base font-medium mb-4">
                    Instant Query
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://wa.me/8801897669233"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-lg text-white bg-orange-bg-cta border border-white/5 flex items-center justify-center transition-all duration-200 hover:scale-110"
                      aria-label="WhatsApp"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
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
                    <label className="text-white-bg-cta text-base md:text-lg mb-2 block">
                      Full Name
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
                      <label className="text-white-bg-cta text-base md:text-lg mb-2 block">
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
                      <label className="text-white-bg-cta text-base md:text-lg mb-2 block">
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
                      <label className="text-white-bg-cta text-base md:text-lg mb-2 block">
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
                        <option value="ui-ux" className="text-white">
                          UI/UX Design
                        </option>
                        <option value="mern" className="text-white">
                          MERN Stack Development
                        </option>
                        <option value="application" className="text-white">
                          Application Development
                        </option>
                        <option value="ecommerce" className="text-white">
                          E-Commerce Development
                        </option>
                        <option value="marketing" className="text-white">
                          Digital Marketing
                        </option>
                        <option value="wordpress" className="text-white">
                          WordPress Development
                        </option>
                        <option value="shopify" className="text-white">
                          Shopify Development
                        </option>
                        <option value="wix" className="text-white">
                          WIX Development
                        </option>
                        <option value="graphic" className="text-white">
                          Graphic Design
                        </option>
                        <option value="other" className="text-white">
                          Other
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="text-white-bg-cta text-base md:text-lg mb-2 block">
                        Budget
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white pointer-events-none">
                          $
                        </span>
                        <input
                          type="number"
                          name="budget"
                          placeholder="Enter your budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full pl-8 pr-4 py-3 bg-[#3F3F3F] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-bg-cta transition-colors duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Industry */}
                  <div>
                    <label className="text-white-bg-cta text-base md:text-lg mb-2 block">
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
                    <label className="text-white-bg-cta text-base md:text-lg mb-2 block">
                      Message
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
                    className="relative z-10 group inline-flex items-center gap-3 overflow-hidden bg-orange-bg-cta hover:bg-[#e5501a] hover:shadow-[0_4px_20px_rgba(255,101,51,0.45)] text-white font-semibold rounded-full transition-all duration-200 active:scale-[0.97]"
                    style={{ padding: "13px 28px" }}
                  >
                    <span className="inline-block -translate-x-0.5 transition-transform duration-300 ease-out delay-75 group-hover:translate-x-0">
                      Let’s Start
                    </span>
                    <span
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-white shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </span>
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

export default ContactUs;
