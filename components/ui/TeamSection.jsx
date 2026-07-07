import { ExternalLink, Mail } from "lucide-react";

const TEAM = [
  {
    name:    "Rahul Pingale",
    role:    "Founder & Chief Advisor",
    initials: "RP",
    bio:     "15+ years in wealth management with expertise in goal-based financial planning.",
    linkedin: "#",
    email:    "#",
  },
  {
    name:    "Sneha Pingale",
    role:    "Head – Insurance Advisory",
    initials: "SP",
    bio:     "Certified insurance advisor specialising in life and health insurance solutions.",
    linkedin: "#",
    email:    "#",
  },
  {
    name:    "Amit Sharma",
    role:    "Senior Investment Analyst",
    initials: "AS",
    bio:     "CFA charterholder with deep expertise in mutual fund research and portfolio construction.",
    linkedin: "#",
    email:    "#",
  },
  {
    name:    "Priya Desai",
    role:    "Client Relationship Manager",
    initials: "PD",
    bio:     "Dedicated to ensuring every client gets timely service and proactive financial reviews.",
    linkedin: "#",
    email:    "#",
  },
];

const BG_COLORS = ["#0F1A51", "#a68256", "#0F1A51", "#a68256"];

export default function TeamSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-[#a68256] uppercase tracking-[0.2em]">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
            Meet the Experts Behind Your Wealth
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Experienced professionals who put your financial goals at the centre of everything they do.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member, i) => (
            <div
              key={member.name}
              className="group bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
            >
              {/* Avatar */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 ring-4 ring-transparent group-hover:ring-[#a68256]/20 transition-all duration-300"
                style={{ background: BG_COLORS[i] }}
              >
                {member.initials}
              </div>

              <h3 className="text-base font-semibold text-gray-900">{member.name}</h3>
              <p className="text-xs font-medium text-[#a68256] mt-0.5 mb-3">{member.role}</p>
              <p className="text-xs text-gray-500 leading-relaxed flex-grow">{member.bio}</p>

              {/* Social links */}
              <div className="flex gap-3 mt-4">
                <a
                  href={member.linkedin}
                  aria-label={`${member.name} LinkedIn`}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#0F1A51] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`mailto:${member.email}`}
                  aria-label={`Email ${member.name}`}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#a68256] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
