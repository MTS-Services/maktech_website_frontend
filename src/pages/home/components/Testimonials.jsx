const testimonials = [
  {
    id: 1,
    quote: "The team understood our vision from day one. The final product was clean, fast, and exactly what we needed to scale.",
    name: "Sarah Johnson",
    company: "TechFlow Inc.",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 2,
    quote: "Working with this team transformed how we approach digital strategy. Their expertise is unmatched.",
    name: "Michael Chen",
    company: "Digital Ventures",
    avatar: "https://i.pravatar.cc/150?img=12"
  },
  {
    id: 3,
    quote: "From concept to launch, every step was handled with professionalism and precision. Highly recommended!",
    name: "Emily Rodriguez",
    company: "StartUp Hub",
    avatar: "https://i.pravatar.cc/150?img=9"
  },
  {
    id: 4,
    quote: "The attention to detail and commitment to quality exceeded our expectations. A truly exceptional experience.",
    name: "David Thompson",
    company: "Growth Labs",
    avatar: "https://i.pravatar.cc/150?img=13"
  },
  {
    id: 5,
    quote: "Innovative solutions delivered on time. They understood our business needs perfectly and delivered beyond expectations.",
    name: "Lisa Anderson",
    company: "CloudSync Solutions",
    avatar: "https://i.pravatar.cc/150?img=10"
  },
  {
    id: 6,
    quote: "Outstanding technical expertise combined with great communication. The perfect partner for our digital transformation.",
    name: "James Wilson",
    company: "Enterprise Systems",
    avatar: "https://i.pravatar.cc/150?img=14"
  }
];

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-8 flex flex-col gap-6 h-full hover:border-[#3a3a3a] transition-colors duration-300">
      {/* Quote Icon */}
      <div className="text-[#4a4a4a]">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor">
          <path d="M12 21h6v12H6V21c0-5.523 4.477-10 10-10v4c-3.313 0-6 2.687-6 6v2zm18 0h6v12h-12V21c0-5.523 4.477-10 10-10v4c-3.313 0-6 2.687-6 6v2z"/>
        </svg>
      </div>
      
      {/* Quote Text */}
      <p className="text-[#b0b0b0] text-base leading-relaxed flex-1">
        {testimonial.quote}
      </p>
      
      {/* Author Info */}
      <div className="flex items-center gap-4">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="text-white font-semibold text-base">
            {testimonial.name},
          </p>
          <p className="text-[#888] text-sm">
            {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="w-full text-white pt-16 xl:pt-20 2xl:pt-24 relative overflow-hidden">
      <div className="max-w-full xl:max-w-[65%] mx-auto px-5 xl:px-8 2xl:px-12">
        {/* Header */}
        <div className="mb-12 xl:mb-16">
          {/* Badge */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-md w-fit mb-6"
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
            <span className="text-base font-medium text-white">Client Stories</span>
          </div>

          {/* Heading with underline */}
          <h2 className="text-3xl xl:text-4xl 2xl:text-5xl font-semibold leading-tight">
            <span className="bg-gradient-to-r from-[#FFFFFF] to-[#999999] bg-clip-text text-transparent">
              Trusted by Businesses{" "}
            </span>
            <span className="relative inline-block bg-gradient-to-r from-[#FFFFFF] to-[#999999] bg-clip-text text-transparent">
              Worldwide
              <svg 
                className="absolute -bottom-2 left-0 w-full" 
                height="8" 
                viewBox="0 0 200 8" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path 
                  d="M1 4C50 2 100 2 199 4" 
                  stroke="#ff6533" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
        </div>
      </div>

      {/* Scrolling Testimonials */}
      <div className="relative">
        <div className="overflow-hidden">
          <div 
            className="flex gap-6 pl-6"
            style={{
              animation: 'scroll 25s linear infinite',
              willChange: 'transform',
            }}
            onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
            onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div key={`${testimonial.id}-${index}`} className="shrink-0 w-[90%] md:w-[45%] xl:w-[30%]">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
