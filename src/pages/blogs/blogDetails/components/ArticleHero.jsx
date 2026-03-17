import {
  Clock,
  BarChart2,
  Facebook,
  Twitter,
  Share2,
  ArrowRight,
} from "lucide-react";
import Breadcrumb from "../../../../components/Breadcrumb";

const ArticleHero = () => {
  return (
    <section className="relative w-full min-h-190 flex flex-col items-center justify-center  px-6 py-20 text-center overflow-hidden">
      {/* Decorative Gradient Blobs */}
      <div className="absolute -left-10 -bottom-10 w-40 h-60 bg-gradient-to-br from-[#FF6B35] to-transparent opacity-40 blur-3xl rounded-full rotate-45" />
      <div className="absolute -right-10 -bottom-10 w-40 h-60 bg-gradient-to-bl from-[#FF6B35] to-transparent opacity-40 blur-3xl rounded-full -rotate-45" />
      <Breadcrumb />
      <div className="container mx-auto z-10">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl  font-bold text-white tracking-tight mb-8">
          How the system of Web Development works
        </h1>

        {/* Metadata Bar */}
        <div className="flex flex-wrap items-center justify-center gap-y-4 text-[#FFFFFF] text-sm md:text-base font-medium">
          <span className="flex items-center">
            by <span className="text-white ml-1">Emma Rose</span>
          </span>

          <span className="mx-3 hidden md:inline">—</span>

          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>2 minute read</span>
          </div>

          <span className="mx-3 hidden md:inline">—</span>

          <div className="flex items-center gap-2">
            <BarChart2 size={16} />
            <span>1.6K views</span>
          </div>

          <span className="mx-3 hidden md:inline">—</span>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <button className="hover:text-white transition-colors">
              <Facebook size={18} fill="currentColor" />
            </button>
            <button className="hover:text-white transition-colors">
              <Twitter size={18} fill="currentColor" />
            </button>
            <button className="hover:text-white transition-colors">
              <span className="flex items-center gap-1">
                <Share2 size={18} fill="currentColor" />
                <span className="text-xs">1.2K shares</span>
              </span>
            </button>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12 flex items-center justify-center">
          <button className="group flex items-center gap-4 bg-[#FF6B35] hover:bg-[#FF8354] text-white pl-8 pr-2 py-2 rounded-full transition-all duration-300 transform active:scale-95 shadow-lg shadow-orange-900/20">
            <span className="text-lg font-semibold">Contact With US</span>
            <div className="bg-white rounded-full p-2 group-hover:translate-x-1 transition-transform">
              <ArrowRight size={20} className="text-[#111111]" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ArticleHero;
