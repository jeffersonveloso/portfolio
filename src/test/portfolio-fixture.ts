import type { Portfolio } from "@/domain/portfolio/portfolio";

// A small, complete portfolio for tests that need one without depending on
// the real content.
export function aPortfolio(): Portfolio {
  return {
    profile: {
      name: "Ada Lovelace",
      role: "Software Engineer",
      description: "Engineer.",
      summary: "Summary.",
      tagline: "Tagline.",
      bio: "Bio.",
      availability: "Open to remote roles.",
      facts: { experience: "9+ years", basedIn: "London · UTC", english: "native" },
      location: { region: "London", country: "United Kingdom", countryCode: "GB", timezone: "UTC" },
      languages: [{ name: "English", level: "native", code: "en" }],
      photo: { src: "/ada.jpg", width: 240, height: 300 },
      contact: {
        email: "ada@example.com",
        emailSubject: "Remote role — let's talk",
        linkedin: "https://www.linkedin.com/in/ada",
        github: "https://github.com/ada",
        whatsapp: { display: "+44 20 7946 0000", digits: "442079460000", greeting: "Hi Ada, let's talk." },
      },
    },
    sections: [
      { id: "work", label: "Work" },
      { id: "contact", label: "Contact" },
    ],
    topSkills: ["TypeScript"],
    skills: [{ group: "Programming", items: ["TypeScript"] }],
    capabilities: [],
    projects: [],
    caseStudy: {
      slug: "engine",
      name: "Analytical Engine",
      summary: "Summary.",
      problem: "Problem.",
      solution: "Solution.",
      result: "Result.",
      role: "Creator",
      client: "Babbage",
      stack: ["Brass"],
      stage: "Prototype",
      highlights: [
        ["Mill", "Store", "Cards"],
        ["Loops", "Notes", "Output"],
      ],
      accent: "orange",
      screenshots: [
        { src: "/a.png", width: 10, height: 10, title: "A", alt: "A." },
        { src: "/b.png", width: 10, height: 10, title: "B", alt: "B." },
      ],
      screenshotsCaption: "Caption.",
    },
    engagements: [],
    workflow: [],
    experience: [],
    education: [],
  };
}
