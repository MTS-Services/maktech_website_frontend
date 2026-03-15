import { useState } from 'react';

const faqs = [
  {
    id: 1,
    question: "Can I trust Maktech with my budget and business growth?",
    answer: "We provide UI/UX design, web and mobile development, custom software solutions, branding, and ongoing support for digital products."
  },
  {
    id: 2,
    question: "What distinguishes Maktech from freelancers or typical agencies?",
    answer: "We provide UI/UX design, web and mobile development, custom software solutions, branding, and ongoing support for digital products."
  },
  {
    id: 3,
    question: "Do you understand different markets and competitive conditions?",
    answer: "Having worked across startups, SMEs, and enterprises internationally, we approach each project with contextual awareness. Market conditions vary; strategies must adjust accordingly."
  },
  {
    id: 4,
    question: "What results and timelines should I expect?",
    answer: "We provide UI/UX design, web and mobile development, custom software solutions, branding, and ongoing support for digital products."
  },
  {
    id: 5,
    question: "How is communication managed?",
    answer: "We provide UI/UX design, web and mobile development, custom software solutions, branding, and ongoing support for digital products."
  }
];

const FAQItem = ({ faq, isOpen, onToggle }) => {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-[#1f1f1f] transition-colors duration-200"
      >
        <span className="text-white text-base xl:text-lg font-medium pr-4">
          {faq.question}
        </span>
        <div className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-180'}`}>
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M5 12.5L10 7.5L15 12.5" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 pt-0">
          <p className="text-[#b0b0b0] text-sm xl:text-base leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openId, setOpenId] = useState(1);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-full text-white pt-16 xl:pt-20 2xl:pt-24 relative">
      <div className="max-w-full xl:max-w-[65%] mx-auto px-5 xl:px-8 2xl:px-12">
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
            <span className="text-base font-medium text-white">Need Help?</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl xl:text-4xl 2xl:text-5xl font-semibold mb-4 leading-tight bg-linear-to-r from-[#FFFFFF] to-[#999999] bg-clip-text text-transparent">
            Answers to Common Questions
          </h2>

          {/* Subheading */}
          <p className="text-[#AAAAAA] text-base xl:text-lg max-w-2xl mx-auto">
            Everything you need to know before starting your project with us.
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          {faqs.map((faq) => (
            <FAQItem 
              key={faq.id} 
              faq={faq} 
              isOpen={openId === faq.id}
              onToggle={() => toggleFAQ(faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
