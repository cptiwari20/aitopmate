// Single place to edit the brand, numbers and copy that appear across the site.
// Replace the cohort numbers with your real figures before launch.

export const site = {
  name: "TopAImate",
  tagline: "The invite-only room for people building the AI era.",
  description:
    "TopAImate is an invite-only community for AI founders, engineers, operators, marketers, recruiters and career-changers. Honest conversations about what AI makes possible — and what it puts at risk.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://topaimate.com",
  email: "invites@topaimate.com",
  cohort: {
    name: "Cohort 03",
    closes: "November 30, 2026",
    seatsTotal: 150,
    seatsTaken: 112,
    reviewDays: "5–7 days",
  },
};

export type Circle = {
  slug: string;
  name: string;
  who: string;
  inside: string[];
  access: string;
};

// "The Commons" is open to every member. Circles unlock only when you meet their bar.
export const circles: Circle[] = [
  {
    slug: "founders",
    name: "AI Founders",
    who: "People running an AI-native company, from first commit to Series B.",
    inside: [
      "Private founder rooms, max 12 people each",
      "Pricing, fundraising and GTM teardown sessions",
      "Pilot introductions from the Operators circle",
    ],
    access: "Founder or co-founder of an AI product with real users or revenue.",
  },
  {
    slug: "engineers",
    name: "AI Engineers",
    who: "ML engineers, applied AI engineers, researchers and infra people who ship.",
    inside: [
      "Architecture reviews and eval clinics",
      "Build squads on member projects",
      "What-broke-in-production write-ups",
    ],
    access: "2+ years shipping software, with AI work you can point to.",
  },
  {
    slug: "operators",
    name: "AI Managers & Operators",
    who: "Product leads, heads of ops and managers rolling AI into real teams.",
    inside: [
      "Adoption playbooks that survived contact with a team",
      "Change-management and re-skilling roundtables",
      "Vendor evaluation notes, shared honestly",
    ],
    access: "You lead a team or own a function where AI is being deployed.",
  },
  {
    slug: "gtm",
    name: "AI Marketers & SDRs",
    who: "Marketers, SDRs and sales leaders working alongside AI agents every day.",
    inside: [
      "Outbound and content experiments with real numbers",
      "Agent + human workflow breakdowns",
      "Positioning reviews for AI products",
    ],
    access: "Currently in a go-to-market role using or selling AI.",
  },
  {
    slug: "hiring",
    name: "AI Hiring",
    who: "Founders, hiring managers and recruiters building AI teams.",
    inside: [
      "Warm access to vetted member talent",
      "Role-design and compensation benchmarks",
      "Interview loops that test for real AI skill",
    ],
    access: "You are actively hiring for AI roles this year.",
  },
  {
    slug: "seekers",
    name: "AI Job Seekers",
    who: "Career-changers and early-career people moving into AI work.",
    inside: [
      "Portfolio and project reviews by practitioners",
      "Mock interviews with the Hiring circle",
      "A structured 8-week path from learning to shipping",
    ],
    access: "Serious about moving into AI, with a project in progress.",
  },
];

export const inside = [
  {
    title: "Rooms",
    body: "Topic and circle chats that stay small on purpose. Off the record by default, real names always.",
  },
  {
    title: "Sessions",
    body: "Short, practitioner-led courses. No gurus — just people showing exactly how they did the thing.",
  },
  {
    title: "Projects",
    body: "Members team up on builds. Engineers, founders and marketers in one squad, with a four-week deadline.",
  },
  {
    title: "Opportunities",
    body: "Jobs, co-founder matches, pilots and advisory seats — shared inside before they're shared anywhere else.",
  },
];

// India Rooms — founder sessions across Indian cities, on IST. Edit cities, topics and cadence here.
export const indiaRooms = [
  {
    city: "Indore",
    name: "Build From Home",
    topic: "Building an AI company without moving to Bangalore: local talent, lower burn, and customers who pick up the phone.",
    when: "Monthly · in person",
  },
  {
    city: "Jabalpur",
    name: "First Builders",
    topic: "Students and first-time founders from the city's engineering colleges shipping their first real AI products.",
    when: "Fortnightly · in person",
  },
  {
    city: "Bangalore",
    name: "Founder Room",
    topic: "Selling AI to Indian enterprises: long cycles, endless POCs, and how to actually get paid.",
    when: "Monthly · in person · 12 seats",
  },
  {
    city: "Pune",
    name: "Services → Product",
    topic: "For engineers and leaders moving from IT services into building AI products.",
    when: "Monthly · in person",
  },
  {
    city: "Mumbai · Delhi NCR · Hyderabad",
    name: "Metro Rooms",
    topic: "AI for Bharat in Mumbai, India → global SaaS in Delhi NCR, build nights with GCC engineers in Hyderabad.",
    when: "Monthly · in person",
  },
  {
    city: "Online",
    name: "Fear & Possibility, IST",
    topic: "The honest one: what AI means for India's IT jobs — and what we do about it together.",
    when: "Thursdays · 8 pm IST · English & Hinglish",
  },
];

// Cities where members are asking for a room. Shown as "forming next".
export const indiaFormingCities = ["Bhopal", "Jaipur", "Ahmedabad", "Nagpur", "Chandigarh", "Kochi", "Coimbatore", "Lucknow"];

export const faqs = [
  {
    q: "Why is TopAImate invite-only?",
    a: "Because honest conversation needs trust. We cap each cohort, review every application by hand and keep rooms small, so people can say what they actually think about AI — including what scares them.",
  },
  {
    q: "Who gets accepted?",
    a: "People doing real work in AI, or seriously moving into it: founders, engineers, managers, marketers, SDRs, recruiters and career-changers. We care more about what you're building and how you think than your title.",
  },
  {
    q: "How long does review take?",
    a: `Applications are reviewed weekly. Most people hear back within ${site.cohort.reviewDays}. Some are invited to a 15-minute call first.`,
  },
  {
    q: "What are circles?",
    a: "Every member joins The Commons. Circles — Founders, Engineers, Operators, Go-to-Market, Hiring and Job Seekers — are private spaces that unlock when you meet their bar. You can belong to more than one.",
  },
  {
    q: "Is TopAImate only for the US and Europe?",
    a: "No. We run India Rooms — in-person founder sessions in Indore, Jabalpur, Bangalore, Pune, Mumbai, Delhi NCR and Hyderabad, plus weekly online sessions on IST — and new cities open when enough members ask. Some of our most honest conversations happen there, especially about what AI means for India's IT services workforce.",
  },
  {
    q: "Is it free?",
    a: "The founding cohorts are free for accepted members. We'd rather earn the right to charge later than sell seats to anyone who can pay.",
  },
  {
    q: "What if I'm not accepted?",
    a: "You can re-apply next cohort. Many members got in on a second try, once they had something shipped to show.",
  },
];
