import { useEffect } from "react";
import { Link } from "react-router-dom";
import LeadershipProfile from "../../components/team/LeadershipProfile";
import Breadcrumb from "../../components/Breadcrumb";

const LEADERS = [
  {
    orientation: "image-left",
    headline: "Visionary Leader Driving Strategic Growth",
    description: [
      "Mohammad Alamgir Kabir leads the company with a strategic vision that drives growth, innovation, and operational excellence. With extensive experience in corporate leadership, he excels in shaping business strategies, fostering sustainable partnerships, and ensuring long-term value for stakeholders.",
      "His decisive approach and commitment to ethical leadership have consistently positioned the organization at the forefront of its industry.",
    ],
    name: "Mohammad Alamgir Kabir",
    role: "Chief Executive Officer",
    company: "MAKTECH",
    image: "/our_work/Frame 2147226428.png",
    imageAlt: "Portrait of Mohammad Alamgir Kabir",
  },
  {
    orientation: "image-right",
    headline: "Financial Strategist Ensuring Sustainable Growth",
    description: [
      "Toufique Ahmed Akash manages the company’s financial strategy, ensuring robust fiscal planning, reporting, and compliance. His expertise encompasses budgeting, financial analysis, and risk management, supporting informed decision-making at the executive level.",
      "With a meticulous and forward-thinking approach, he ensures the organization maintains financial health while pursuing sustainable growth opportunities.",
    ],
    name: "Toufique Ahmed Akash",
    role: "Director, Finance",
    company: "MAKTECH",
    image: "/our_work/Frame 2147226428 (3).png",
    imageAlt: "Portrait of Toufique Ahmed Akash",
  },

  {
    orientation: "image-left",
    headline: "Growth-Oriented Sales & Business Strategist",
    description: [
      "Mukabber Hossain is responsible for spearheading sales initiatives and cultivating new business opportunities. His strategic insights into market trends, customer needs, and competitive positioning enable the company to expand its reach and strengthen client relationships.",
      "With a results-oriented approach, he continuously drives revenue growth while fostering a culture of innovation and collaboration within the sales team.",
    ],
    name: "Mukabber Hossain",
    role: "Director, Sales & Business Development",
    company: "MAKTECH",
    image: "/our_work/Frame 2147226428 (2).png",
    imageAlt: "Portrait of Mukabber Hossain",
  },
  {
    orientation: "image-right",
    headline: "Operational Excellence & Process Optimization Expert",
    description: [
      "Md. Firoj Mia oversees all operational functions, ensuring that processes are efficient, scalable, and aligned with organizational goals. He brings a wealth of experience in streamlining operations, optimizing resources, and implementing best practices across departments.",
      "His leadership ensures seamless coordination between teams, driving operational excellence and supporting the company’s growth trajectory.",
    ],
    name: "Md. Firoj Mia",
    role: "Director, Operations",
    company: "MAKTECH",
    image: "/our_work/Frame 2147226428 (1).png",
    imageAlt: "Portrait of Md. Firoj Mia",
  },
];

const OurTeam = () => {
  useEffect(() => {
    document.title = "Our Team – Maktech";
  }, []);

  return (
    <main className="relative w-full  overflow-hidden pb-20">
      <section className="mx-auto container flex min-h-screen flex-col items-center justify-center gap-10 px-5 pt-28 pb-14 text-center sm:px-8 md:pt-32 md:pb-16 lg:px-12 lg:pb-20">
        <Breadcrumb label="Our team" />

        <div className="flex flex-col items-center gap-4">
          <h1 className="text-[40px] leading-[1.1] text-white sm:text-[48px] md:text-[56px] lg:text-[64px]">
            Our Leadership Team
          </h1>
          <p className="max-w-4xl text-lg leading-relaxed text-[#dbdbdb]">
            Driving Vision, Strategy, and Growth Across{" "}
            <br className="hidden sm:block" />
            Every Level of Our Organization
          </p>
        </div>

        <Link
          to="/contact"
          className="relative z-10 group mt-4 inline-flex items-center gap-3 overflow-hidden rounded-full bg-orange-bg-cta text-white font-semibold transition-all duration-200 hover:bg-[#e5501a] hover:shadow-[0_4px_20px_rgba(255,101,51,0.45)] active:scale-[0.97]"
          style={{ padding: "13px 28px" }}
        >
          <span className="inline-block -translate-x-0.5 transition-transform duration-300 ease-out delay-75 group-hover:translate-x-0">
            Contact With Us
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
        </Link>
      </section>

      <section className="mx-auto mt-8 flex container flex-col gap-20 pb-10 sm:mt-12 sm:px-8 lg:mt-16 lg:px-12">
        {LEADERS.map((leader) => (
          <LeadershipProfile key={leader.name} {...leader} />
        ))}
      </section>
    </main>
  );
};

export default OurTeam;
