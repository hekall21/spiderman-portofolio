import { Mail, Phone } from "lucide-react";

function InstagramIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TiktokIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

function GithubIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export const socials = [
  {
    name: "WhatsApp",
    value: "0895-3209-59499",
    url: "https://wa.me/62895320959499",
    icon: Phone,
    color: "#25D366", // WhatsApp Green
    badge: "Direct Chat",
    action: "Chat via WhatsApp"
  },
  {
    name: "Email",
    value: "haikelsaleh21@gmail.com",
    url: "mailto:haikelsaleh21@gmail.com",
    icon: Mail,
    color: "#00F0FF", // Electric Cyan
    badge: "Official Inquiries",
    action: "Send Email"
  },
  {
    name: "LinkedIn",
    value: "Muhammad Haikel Saleh",
    url: "https://www.linkedin.com/in/muhammad-haikel-saleh-9ab823337/",
    icon: LinkedinIcon,
    color: "#0A66C2", // LinkedIn Blue
    badge: "Professional Profile",
    action: "Connect on LinkedIn"
  },
  {
    name: "GitHub",
    value: "hekall21",
    url: "https://github.com/hekall21",
    icon: GithubIcon,
    color: "#FFFFFF", // White
    badge: "Code Repositories",
    action: "View Projects"
  },
  {
    name: "Instagram",
    value: "@hkell_21",
    url: "https://instagram.com/hkell_21",
    icon: InstagramIcon,
    color: "#E1306C", // Instagram Pink
    badge: "Social",
    action: "Follow"
  },
  {
    name: "TikTok",
    value: "@hkell21",
    url: "https://tiktok.com/@hkell21",
    icon: TiktokIcon,
    color: "#AC4BFF", // TikTok Purple
    badge: "Multimedia",
    action: "Follow"
  }
];

export const contactInfo = {
  email: "haikelsaleh21@gmail.com",
  phone: "0895320959499",
  whatsapp: "+62 895-3209-59499",
  whatsappRaw: "62895320959499",
  location: "Kramat Jati, Jakarta Timur, Indonesia",
  github: "https://github.com/hekall21",
  linkedin: "https://www.linkedin.com/in/muhammad-haikel-saleh-9ab823337/",
  responseTime: "< 2 Jam (Fast Response)",
  availability: "Open for Full-time, Internship & Freelance"
};
