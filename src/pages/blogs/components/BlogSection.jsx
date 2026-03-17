import { ArrowRight } from "lucide-react";

const blogs = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=400&h=200&fit=crop",
    title: "Grow Website in Organic Way",
    desc: "Achieving real website traffic without spending on ads is possible through a blend of strategic SEO, quality content, and superior UX. This blog explores the core principles of driving sustainable organic growth.",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=200&fit=crop",
    title: "Modern Web Design Trends",
    desc: "Top Web Design Trends to Elevate Your Brand in 2026 Summary: Stay ahead of the curve with modern design trends. From AI-driven layouts to minimalist aesthetics, learn how to create a visually stunning website that captivates your digital audience.",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=200&fit=crop",
    title: "Custom Development vs. CMS",
    desc: "Choosing the right platform is crucial for business growth. We compare custom-built solutions with popular CMS options to help you decide which path offers the best scalability and security organic growth.",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop",
    title: "Website Speed & Conversions",
    desc: "A one-second delay can cost you customers. Explore the technical strategies we use to optimize site performance, reduce bounce rates, and turn casual visitors into loyal paying clients.",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop",
    title: "E-commerce Growth",
    desc: "Ready to sell online? Discover the essential features of a successful e-commerce website, from seamless checkout experiences to robust security measures that build customer .",
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop",
    title: "Mobile-First Approach",
    desc: "With mobile traffic dominating the web, a responsive site is no longer optional. Learn how our mobile-first approach ensures your website looks and performs perfectly on every screen size.",
  },
];

const BlogCard = ({ blog }) => (
  <div className="bg-[#1c1c1c]   cursor-pointer overflow-hidden">
    <img src={blog.img} alt={blog.title} className="w-full h-44 object-cover" />

    {/* Title Section */}
    <div className="py-4 ">
      <h3 className="text-xl sm:text-2xl font-semibold text-[#E3E3E3] leading-snug">
        {blog.title}
      </h3>
    </div>

    {/* Description Section */}
    <div className="pb-4">
      <p className="text-base  text-[#BEBEBE] leading-relaxed mb-3">
        {blog.desc}
      </p>
      <a
        href="#"
        className="inline-flex items-center gap-1 text-base sm:text-lg text-[#ccc] font-medium hover:text-orange-500 transition-colors underline"
      >
        Read More <ArrowRight size={13} />
      </a>
    </div>
  </div>
);

export default function BlogSection() {
  return (
    <section className="  px-5 py-14 sm:py-16 md:py-24">
      <div className="container mx-auto">
        {/* Badge */}
       



          <div className=" my-6 inline-flex items-center space-x-3 px-6 py-2 rounded-xl bg-[#3d2e2a] border border-white/10 w-fit">
            <div className="p-3 bg-[#623A2C] rounded-2xl">

            <div className="w-4 h-4 rounded-full bg-[#FF6533] shadow-lg shadow-[#FF6533]/40" />
            </div>
            <span className="text-white text-base font-medium">Badge</span>
          </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-8 leading-tight">
          Read our recent <span className="text-[#ccc] font-normal">blogs</span>
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  ">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
