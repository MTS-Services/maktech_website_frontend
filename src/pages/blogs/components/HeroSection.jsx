import { ArrowRight,  } from "lucide-react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumb";

export default function HeroSection() {
  return (
    <>
      <section 
        className="relative min-h-175 flex items-center justify-center overflow-hidden"
     
      >
       

        {/* Content */}
        <div className="relative z-10 w-full container mx-auto  px-6  flex flex-col items-center text-center">
          {/* Breadcrumb */}
          <Breadcrumb />

          {/* Headline */}
          <h1 className="text-white font-bold leading-[1.1] tracking-tight mb-5 text-[2.4rem] sm:text-[3rem] md:text-6xl">
            Designing
            <br />
            Experiences That Drive
           Growth
          </h1>

          <p className="text-[#DBDBDB] text-lg sm:text-xl leading-relaxed w-4/6 mb-10">
            We&apos;re a digital-first team helping businesses build meaningful
            <br className="hidden sm:block" /> products through strategy, design,
            and technology.
          </p>

          {/* CTA Button */}
          <Link to="/blogs/details">
            <button 
              className=" bg-[#FF6533] group inline-flex items-center gap-3 rounded-full px-8 py-3.5 text-base sm:text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
            
            >
              View Blogs
              <span
                className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white transition-transform duration-300 group-hover:translate-x-0.5"
                style={{ color: "#E8643A" }}
              >
                <ArrowRight size={14} strokeWidth={2} />
              </span>
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
