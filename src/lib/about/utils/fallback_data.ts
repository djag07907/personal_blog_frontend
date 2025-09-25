import { AboutPageData } from "@/lib/about/model/about_data";

export const getFallbackAboutData = (): AboutPageData => {
  return {
    id: 1,
    title: "About Me",
    description:
      "Full-Stack Developer passionate about creating innovative solutions",
    content: `
      <p>Hello! I'm a passionate full-stack developer with a love for creating innovative and efficient solutions. With experience in web development, I specialize in modern JavaScript frameworks and technologies.</p>
      <p>I enjoy working on challenging projects that push the boundaries of what's possible on the web. Whether it's building responsive user interfaces with React, developing robust APIs with Node.js, or architecting scalable solutions, I'm always eager to learn and apply new technologies.</p>
      <p>When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge through technical articles and blog posts.</p>
    `,
    image: {
      url: "/profile.png",
    },
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "Python",
      "Django",
      "PostgreSQL",
      "MongoDB",
      "AWS",
      "Docker",
      "Git",
      "GraphQL",
      "REST APIs",
    ],
    experience: [
      {
        id: 1,
        company: "Tech Innovation Corp",
        position: "Senior Full-Stack Developer",
        startDate: "2022-01-01",
        endDate: "",
        current: true,
        description:
          "Leading development of modern web applications using React, Node.js, and cloud technologies. Mentoring junior developers and contributing to architectural decisions.",
      },
      {
        id: 2,
        company: "Digital Solutions Ltd",
        position: "Full-Stack Developer",
        startDate: "2020-06-01",
        endDate: "2021-12-31",
        current: false,
        description:
          "Developed and maintained multiple client projects using various technologies including React, Vue.js, and Python Django.",
      },
    ],
    education: [
      {
        id: 1,
        institution: "University of Technology",
        degree: "Bachelor's in Computer Science",
        startDate: "2016-09-01",
        endDate: "2020-05-31",
        description:
          "Focused on software engineering principles, algorithms, and data structures.",
      },
    ],
    achievements: [
      {
        id: 1,
        title: "Open Source Contributor",
        description:
          "Active contributor to several popular open-source projects",
        date: "2023-01-01",
      },
      {
        id: 2,
        title: "AWS Certified Developer",
        description:
          "Achieved AWS Certified Developer - Associate certification",
        date: "2022-08-15",
      },
    ],
    publishedAt: new Date().toISOString(),
  };
};

/**
 * Merges Strapi data with fallback data, using Strapi data where available
 * and fallback data for missing or empty fields.
 * NOTE: Achievements are NOT automatically filled with fallback data.
 */
export const mergeWithFallback = (
  strapiData: AboutPageData | null
): AboutPageData => {
  if (!strapiData) {
    const fallbackData = getFallbackAboutData();
    return {
      ...fallbackData,
      achievements: [], // Always start with empty achievements
    };
  }

  const fallback = getFallbackAboutData();

  return {
    id: strapiData.id || fallback.id,
    title: strapiData.title?.trim() || fallback.title,
    description: strapiData.description?.trim() || fallback.description,
    content: strapiData.content?.trim() || fallback.content,
    image: {
      url:
        strapiData.image?.url?.trim() || fallback.image?.url || "/profile.png",
    },
    skills:
      strapiData.skills && strapiData.skills.length > 0
        ? strapiData.skills
        : fallback.skills,
    experience:
      strapiData.experience && strapiData.experience.length > 0
        ? strapiData.experience
        : fallback.experience,
    education:
      strapiData.education && strapiData.education.length > 0
        ? strapiData.education
        : fallback.education,
    // Achievements: only use Strapi data, never fallback automatically
    achievements:
      strapiData.achievements && strapiData.achievements.length > 0
        ? strapiData.achievements
        : [],
    publishedAt: strapiData.publishedAt || fallback.publishedAt,
  };
};

/**
 * Gets only the fallback achievements data for manual display
 */
export const getFallbackAchievements = () => {
  const fallbackData = getFallbackAboutData();
  return fallbackData.achievements || [];
};

/**
 * Utility functions to check if sections have data and should be displayed
 */
export const shouldShowSection = {
  skills: (data: AboutPageData) => data.skills && data.skills.length > 0,
  experience: (data: AboutPageData) =>
    data.experience && data.experience.length > 0,
  education: (data: AboutPageData) =>
    data.education && data.education.length > 0,
  achievements: (data: AboutPageData) =>
    data.achievements && data.achievements.length > 0,
};
