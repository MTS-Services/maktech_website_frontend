import { FaChartBar, FaHeart, FaInstagram, FaShare, FaTwitter } from 'react-icons/fa';

const SocialIcon = ({ icon: Icon, label, value }) => (
  <div className="flex flex-col items-center mb-0 md:mb-8 text-white transition-colors cursor-pointer group">
    <Icon size={20} className="group-hover:text-[#ff6533] transition-colors" />
    {label && (
      <span className="mt-2 text-[10px] md:text-[11px] uppercase tracking-[0.08em] text-white/70 group-hover:text-white transition-colors">
        {label}
      </span>
    )}
    {value && (
      <span className="text-xs md:text-sm font-semibold text-white leading-tight mt-0.5">
        {value}
      </span>
    )}
  </div>
);

const normalizeImageUrl = (url) => {
  if (!url || typeof url !== 'string') return url;
  if (url.startsWith('http://www.api.maktechgroup.com')) {
    return url.replace('http://www.api.maktechgroup.com', 'https://www.api.maktechgroup.com');
  }
  return url;
};

const stripHtml = (html) => {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

const ArticlePage = ({ blog }) => {
  const coverImg = normalizeImageUrl(blog?.coverImage) || '/Desktop.webp';
  
  const blogHtml = typeof blog?.content === 'object' && blog?.content !== null
    ? blog.content.html
    : (typeof blog?.content === 'string' ? blog.content : null);

  const introText = blog?.blogContent
    ? stripHtml(blog.blogContent)
    : `The seamless experience of browsing a website, from reading a sports update to scrolling through a gallery, is the result of a complex yet beautifully coordinated system. At its core, web development is a conversation between a client—your web browser—and a remote server. When you enter a URL, your browser sends a formal request across the internet to a server where the website's files are stored. The server then processes this request and sends back a package of data, which the browser translates into the visual interface you see on your screen.`;

  const keyTakeawayPoints = blog?.keyTakeaways
    ? blog.keyTakeaways.split('\n').map(t => t.replace(/^[•\-\*]\s*/, '').trim()).filter(Boolean)
    : [];

  return (
    <div className="min-h-screen text-[#eee]">
      {/* Header Image Section */}
      <div className="relative w-full max-w-360 overflow-hidden mx-auto rounded-2xl">
        <img
          src={coverImg}
          alt={blog?.title || 'Article Banner'}
          className="w-full max-h-[560px] object-cover object-center"
        />

        {/* Top/Bottom orange gradient glows */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-orange-950/30 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-orange-950/20 to-transparent pointer-events-none"></div>
      </div>

      <div className="relative max-w-360 mx-auto flex flex-col md:flex-row gap-12 px-6 py-16 md:py-24">
        {/* Background vertical grid lines */}
        <div className="absolute inset-0 flex justify-around pointer-events-none opacity-[0.03]">
          <div className="w-[1px] h-full bg-white"></div>
          <div className="w-[1px] h-full bg-white"></div>
          <div className="w-[1px] h-full bg-white"></div>
          <div className="w-[1px] h-full bg-white"></div>
        </div>

        {/* Sidebar Metrics - Sticky */}
        <aside className="md:sticky md:top-24 self-start flex flex-row md:flex-col items-center justify-center md:justify-start w-full md:w-20 shrink-0 gap-6 md:gap-0 z-10">
          <SocialIcon icon={FaChartBar} label="views" value={blog?.engagement?.views || '1.6K'} />
          <SocialIcon icon={FaShare} label="shares" value={blog?.engagement?.shares || '1.2K'} />
          <SocialIcon icon={FaHeart} label="likes" value={blog?.engagement?.likes || '125'} />
          {blog?.engagement?.twitter && (
            <SocialIcon icon={FaTwitter} label="twitter" value={String(blog.engagement.twitter)} />
          )}
          <SocialIcon icon={FaInstagram} label="instagram" value={blog?.engagement?.instagram || '425'} />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 max-w-360 z-10">
          {/* Top Intro Paragraph */}
          {introText && (
            <p className="text-base md:text-lg text-white/90 leading-[1.85] mb-16 font-serif max-w-360">
              {introText}
            </p>
          )}

          {/* Key Takeaways Box (if available from API) */}
          {keyTakeawayPoints.length > 0 && (
            <div className="mb-16 rounded-2xl border border-white/10 bg-[#161616]/80 p-6 md:p-8 backdrop-blur-md shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-orange-bg-cta" />
                <h3 className="text-xs font-bold tracking-widest text-[#ff6533] uppercase">
                  Key Takeaways
                </h3>
              </div>
              <ul className="space-y-3 font-sans">
                {keyTakeawayPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/90 text-sm md:text-base leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0 bg-orange-bg-cta" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Headline Section with Large Quote */}
          <div className="relative mb-14 flex items-start gap-4 md:gap-6">
            <div className="shrink-0 pt-1.5 md:pt-2">
              <span className="text-6xl md:text-8xl text-white/20 font-serif leading-none italic">”</span>
            </div>
            <h2 className="text-[28px] md:text-[42px] font-bold text-[#E3E3E3] font-sans leading-[1.2] tracking-tight">
              {blog?.title || 'Decoding the Digital Engine: How the Web Development System Works'}
            </h2>
          </div>

          {/* Render Rich HTML or Fallback Bullets */}
          {blogHtml ? (
            <div
              className="blog-rich-content font-serif text-white/90 text-base md:text-lg leading-[1.85] space-y-6 [&_h2]:text-[24px] [&_h2]:md:text-[32px] [&_h2]:font-bold [&_h2]:font-sans [&_h2]:text-[#E3E3E3] [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-[20px] [&_h3]:md:text-[26px] [&_h3]:font-semibold [&_h3]:font-sans [&_h3]:text-[#E3E3E3] [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:text-white/90 [&_img]:rounded-2xl [&_img]:my-8 [&_img]:w-full [&_img]:object-cover [&_blockquote]:border-l-4 [&_blockquote]:border-orange-bg-cta [&_blockquote]:pl-6 [&_blockquote]:py-2 [&_blockquote]:italic [&_blockquote]:text-white/80 [&_blockquote]:my-6 [&_a]:text-orange-bg-cta [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: blogHtml }}
            />
          ) : (
            <div className="space-y-12 pl-2 md:pl-8 font-serif">
              {/* Bullet 1 */}
              <div className="relative group">
                <span className="absolute -left-7 md:-left-9 top-3 w-1.5 h-1.5 bg-white rounded-full opacity-80 group-hover:scale-125 transition-transform"></span>
                <p className="text-base md:text-lg text-white leading-[1.8]">
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
                <span className="absolute -left-7 md:-left-9 top-3 w-1.5 h-1.5 bg-white rounded-full opacity-80 group-hover:scale-125 transition-transform"></span>
                <p className="text-base md:text-lg text-white leading-[1.8]">
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
          )}
        </main>
      </div>
    </div>
  );
};

export default ArticlePage;