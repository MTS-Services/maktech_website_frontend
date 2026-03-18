import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BlogHeroCard = () => {
  return (
    <section className="bg-[#1a1a1a] flex items-center justify-center p-6 py-24 min-h-[500px]">
      <div className=" w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        
        {/* Left Side: Image Container */}
        <div className="relative group overflow-hidden rounded-lg shadow-2xl">
          <img 
            src="/Rectangle.png" 
            alt="Developer working on web system" 
            className="w-full h-auto object-cover "
          />
        </div>

        {/* Right Side: Content */}
        <div className="flex flex-col space-y-6">
          
          {/* Category Badge */}
          <div className=" inline-flex items-center space-x-3 px-5 py-3 rounded-xl bg-[#3d2e2a] radial-gradient(ellipse 86.93% 86.93% at 14.58% 10.42%, #FF653300 0%, #1C1C1C 100%)' border border-white/10 w-fit">
<div className='p-3 bg-[#623A2C] rounded-2xl '>
            <div className="w-4 h-4 rounded-full bg-[#FF6533] shadow-lg shadow-[#FF6533]/40" />
</div>
              <span className="text-white text-base font-medium">Blog - Web</span>
          </div>
          

          {/* Headline */}
          <h1 className="text-4xl   font-bold text-white leading-tight">
            How the system of Web <span className="text-gray-400"> Development</span> works
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-base md:text-xl leading-relaxed max-w-lg">
            In this blog, he is trying to develop a web, the blog is about the web...
          </p>

          {/* CTA Button */}
          <Link to="/blogs/details">
            <button 
              className="inline-flex items-center gap-3 bg-[#FF6533] hover:bg-[#E8643A] text-white font-semibold rounded-full px-6 py-3 transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-[#FF6533]/20"
              aria-label="Read more about web development"
            >
              <span>Read More</span>
              <div className="bg-white rounded-full p-1.5 flex items-center justify-center">
                <FaArrowRight className="w-5 h-5 text-[#FF6533]" />
              </div>
            </button>
          </Link>
          
        </div>
      </div>
    </section>
  );
};

export default BlogHeroCard;