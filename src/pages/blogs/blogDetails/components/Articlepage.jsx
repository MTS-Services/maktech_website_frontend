import React from 'react';
import { FaChartBar, FaHeart, FaInstagram, FaShare, FaTwitter } from 'react-icons/fa';

const SocialIcon = ({ icon: Icon, label, value }) => (
    <div className="flex flex-col items-center mb-0 md:mb-8 text-white transition-colors cursor-pointer ">
        <Icon size={20} />
        {label && (
            <span className="mt-2 text-[10px] md:text-[11px] uppercase tracking-[0.08em] text-white">
                {label}
            </span>
        )}
        {value && (
            <span className="text-xs md:text-sm font-semibold text-white leading-tight">
                {value}
            </span>
        )}
    </div>
);

const ArticleUI = ({ blog }) => {
    const stripHtml = (html) => {
      if (!html) return "";
      const doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent || "";
    };

    return (
        <div className="min-h-screen text-[#eee]">
            {/* Header Image Section */}
            <div className="relative w-full  max-w-360 overflow-hidden  mx-auto">
                <img
                    src={blog.coverImage || "/Desktop.webp"}
                    alt=""
                    className="w-full h-full object-cover object-center"
                />

                {/* Top/Bottom orange gradient glows from the reference image */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-orange-950/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-orange-950/20 to-transparent"></div>
            </div>

            <div className="relative  max-w-360 mx-auto flex flex-col md:flex-row gap-12 px-6 py-16 md:py-24">
                {/* Background vertical grid lines */}
                <div className="absolute inset-0 flex justify-around pointer-events-none opacity-[0.03]">
                    <div className="w-[1px] h-full bg-white"></div>
                    <div className="w-[1px] h-full bg-white"></div>
                    <div className="w-[1px] h-full bg-white"></div>
                    <div className="w-[1px] h-full bg-white"></div>
                </div>

                {/* Sidebar Metrics - Sticky */}
                <aside className="md:sticky md:top-24 self-start flex flex-row md:flex-col items-center justify-center md:justify-start w-full md:w-20 shrink-0 gap-6 md:gap-0 z-10">
                    <SocialIcon icon={FaChartBar} label="views" value={blog?.engagement?.views || "1.6K"} />
                    <SocialIcon icon={FaShare} label="shares" value={blog?.engagement?.shares || "996K"} />
                    <SocialIcon icon={FaHeart} label="likes" value={blog?.engagement?.likes || "125"} />
                    <SocialIcon icon={FaTwitter} label="twitter" value={blog?.engagement?.twitter || ""} />
                    <SocialIcon icon={FaInstagram} label="instagram" value={blog?.engagement?.instagram || "425"} />
                </aside>

                {/* Main Content Area */}
                <main className="flex-1  max-w-360 z-10">
                    {/* Top Intro Paragraph - Serif font from image */}
                    <p className="text-base text-white leading-[1.8] mb-10 font-serif max-w-360 whitespace-pre-wrap">{stripHtml(blog.blogContent)}</p>

                    {blog.content && (
                        <div 
                            className="tiptap-content text-white max-w-360 mb-20 prose prose-invert"
                            dangerouslySetInnerHTML={{ __html: typeof blog.content === 'object' ? blog.content.html : blog.content }}
                        />
                    )}

                    {/* Key Takeaways Section */}
                    {blog?.keyTakeaways && (
                        <div className="border border-[#333] p-5 md:p-[25px] rounded-lg mb-10 bg-transparent">
                            <div className="border-l-2 border-[#FF6533] pl-3 mb-5">
                                <h4 className="text-[#FF6533] m-0 text-xs uppercase font-bold tracking-[0.1em] font-sans">
                                    Key takeaways
                                </h4>
                            </div>
                            <ul className="list-none pl-0 text-[#BEBEBE] text-[15px] m-0 font-sans leading-[1.8] space-y-3">
                                {blog.keyTakeaways.split('\n').filter(p => p.trim() !== '').map((point, index) => (
                                    <li key={index} className="relative pl-4">
                                        <span className="absolute left-0 top-2.5 w-1 h-1 bg-[#BEBEBE] rounded-full"></span>
                                        {point.trim()}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ArticleUI;