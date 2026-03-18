import React from 'react';
import { FaChartBar, FaHeart, FaInstagram, FaShare, FaTwitter } from 'react-icons/fa';

const SocialIcon = ({ icon: Icon, label, value }) => (
    <div className="flex flex-col items-center mb-8 text-white transition-colors cursor-pointer opacity-70 hover:opacity-100">
        <Icon size={20} />
        <span className="sr-only">{label || value || 'social icon'}</span>
    </div>
);

const ArticleUI = () => {
    return (
        <div className="min-h-screen text-[#eee]">
            {/* Header Image Section */}
            <div className="relative w-full h-[50vh] overflow-hidden max-w-7xl mx-auto">
                <img
                    src="/public/Desktop.jpg"
                    alt=""
                    className="w-full h-full object-cover object-center"
                />

                {/* Top/Bottom orange gradient glows from the reference image */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-orange-950/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-orange-950/20 to-transparent"></div>
            </div>

            <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row gap-12 px-6 py-16 md:py-24">
                {/* Background vertical grid lines */}
                <div className="absolute inset-0 flex justify-around pointer-events-none opacity-[0.03]">
                    <div className="w-[1px] h-full bg-white"></div>
                    <div className="w-[1px] h-full bg-white"></div>
                    <div className="w-[1px] h-full bg-white"></div>
                    <div className="w-[1px] h-full bg-white"></div>
                </div>

                {/* Sidebar Metrics - Sticky */}
                <aside className="md:sticky md:top-24 self-start flex flex-row md:flex-col items-center justify-center md:justify-start w-full md:w-20 shrink-0 gap-6 md:gap-0 z-10">
                    <SocialIcon icon={FaChartBar} label="views" value="1.6K" />
                    <SocialIcon icon={FaShare} label="shares" value="996K" />
                    <SocialIcon icon={FaHeart} label="likes" value="125" />
                    <SocialIcon icon={FaTwitter} label="twitter" />
                    <SocialIcon icon={FaInstagram} label="instagram" value="425" />
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 max-w-4xl z-10">
                    {/* Top Intro Paragraph - Serif font from image */}
                    <p className="text-base text-[#ccc] leading-[1.8] mb-20 font-serif max-w-3xl">
                        The seamless experience of browsing a website, from reading a sports update to scrolling through a gallery,
                        is the result of a complex yet beautifully coordinated system. At its core, web development is a
                        conversation between a client—your web browser—and a remote server. When you enter a URL, your
                        browser sends a formal request across the internet to a server where the website's files are stored.
                        The server then processes this request and sends back a package of data, which the browser translates
                        into the visual interface you see on your screen.
                    </p>

                    {/* Headline Section with Large Quote - Sans serif font from image */}
                    <div className="relative mb-20 flex items-start gap-4 md:gap-6">
                        <div className="shrink-0 pt-1.5 md:pt-2">
                            <span className="text-6xl md:text-8xl text-white/20 font-serif leading-none italic">”</span>
                        </div>
                        <h1 className="text-[32px] md:text-[46px] font-extrabold text-[#E3E3E3] font-sans leading-[1.15] tracking-tight">
                            Decoding the Digital Engine: How the Web Development System Works
                        </h1>
                    </div>

                    {/* List Content - Serif font, bullet points */}
                    <div className="space-y-12 pl-2 md:pl-8 font-serif">
                        {/* Bullet 1 */}
                        <div className="relative group">
                            {/* Bullet point dot */}
                            <span className="absolute -left-7 md:-left-9 top-3 w-1.5 h-1.5 bg-white rounded-full opacity-80 group-hover:scale-125 transition-transform"></span>
                            <p className="text-base text-[#ccc] leading-[1.8]">
                                The actual construction of a website relies on three fundamental layers that work in unison
                                to create a functional experience. The first layer is the structure, defined by HTML,
                                which acts as the skeleton of the page by identifying headings, paragraphs, and media.
                                Once the structure is in place, CSS is applied to handle the aesthetics, managing
                                everything from typography to color schemes to the responsive layout that allows a site
                                to look good on both a desktop and a phone. Finally, JavaScript acts as the nervous system,
                                providing the logic and interactivity that allows for real-time updates and dynamic content
                                without needing to refresh the entire page.
                            </p>
                        </div>

                        {/* Bullet 2 */}
                        <div className="relative group">
                            {/* Bullet point dot */}
                            <span className="absolute -left-7 md:-left-9 top-3 w-1.5 h-1.5 bg-white rounded-full opacity-80 group-hover:scale-125 transition-transform"></span>
                            <p className="text-base text-[#ccc] leading-[1.8]">
                                Beyond what the user sees, the system is supported by a robust "Back-end" infrastructure.
                                This involves the server-side logic and the database, which acts as a massive digital library.
                                For a blog, the database is where every article, comment, and user profile is securely stored.
                                When a visitor clicks on a specific post, the server fetches that specific data from the database,
                                merges it with the design templates, and delivers a complete page to the user. This intricate
                                dance between front-end design, back-end logic, and database management is what allows the
                                modern web to be the fast, reliable, and engaging platform we use every day.
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ArticleUI;