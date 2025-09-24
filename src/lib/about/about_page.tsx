"use client";

import { AboutPageData } from "@/lib/about/model/about_data";
import { getAboutData } from "@/lib/about/service/about_service";
import { formatDate } from "@/lib/commons/utils/date_format";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const AboutPage = () => {
  const [aboutData, setAboutData] = useState<AboutPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    const fetchAboutData = async () => {
      // Prevent double fetch in React Strict Mode
      if (hasFetchedRef.current) {
        return;
      }
      hasFetchedRef.current = true;

      try {
        setLoading(true);
        setError(null);

        const data = await getAboutData();
        
        if (!data) {
          // Fallback data if Strapi is not available
          const fallbackData: AboutPageData = {
            id: 1,
            title: "About Me",
            description: "Full-Stack Developer passionate about creating innovative solutions",
            content: `
              <p>Hello! I'm Daniel Alvarez, a passionate full-stack developer with a love for creating innovative and efficient solutions. With several years of experience in web development, I specialize in modern JavaScript frameworks and technologies.</p>
              <p>I enjoy working on challenging projects that push the boundaries of what's possible on the web. Whether it's building responsive user interfaces with React, developing robust APIs with Node.js, or architecting scalable cloud solutions, I'm always eager to learn and apply new technologies.</p>
              <p>When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through blog posts and technical articles.</p>
            `,
            image: {
              url: "/profile.png",
            },
            skills: [
              "JavaScript", "TypeScript", "React", "Next.js", "Node.js", 
              "Express", "Python", "Django", "PostgreSQL", "MongoDB", 
              "AWS", "Docker", "Git", "GraphQL", "REST APIs"
            ],
            experience: [
              {
                id: 1,
                company: "Tech Innovation Corp",
                position: "Senior Full-Stack Developer",
                startDate: "2022-01-01",
                endDate: "",
                current: true,
                description: "Leading development of modern web applications using React, Node.js, and cloud technologies. Mentoring junior developers and contributing to architectural decisions."
              },
              {
                id: 2,
                company: "Digital Solutions Ltd",
                position: "Full-Stack Developer",
                startDate: "2020-06-01",
                endDate: "2021-12-31",
                current: false,
                description: "Developed and maintained multiple client projects using various technologies including React, Vue.js, and Python Django."
              }
            ],
            education: [
              {
                id: 1,
                institution: "University of Technology",
                degree: "Bachelor's in Computer Science",
                startDate: "2016-09-01",
                endDate: "2020-05-31",
                description: "Focused on software engineering principles, algorithms, and data structures."
              }
            ],
            achievements: [
              {
                id: 1,
                title: "Open Source Contributor",
                description: "Active contributor to several popular open-source projects",
                date: "2023-01-01"
              },
              {
                id: 2,
                title: "AWS Certified Developer",
                description: "Achieved AWS Certified Developer - Associate certification",
                date: "2022-08-15"
              }
            ],
            publishedAt: new Date().toISOString(),
          };
          setAboutData(fallbackData);
        } else {
          setAboutData(data);
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
        setError("Failed to load about information");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4 pt-28">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <span className="ml-3 text-gray-600">Loading about information...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 pt-28">
        <div className="text-center py-8">
          <p className="text-red-600 text-xl">{error}</p>
        </div>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="container mx-auto p-4 pt-28">
        <div className="text-center py-8">
          <p className="text-gray-600 text-xl">About information not found</p>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 pt-20">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {aboutData.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {aboutData.description}
        </p>
      </div>

      {/* Profile Image */}
      {aboutData.image?.url && (
        <div className="text-center mb-16">
          <div className="inline-block relative w-48 h-48 rounded-full overflow-hidden">
            <Image
              src={aboutData.image.url}
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* About Content */}
      <div className="mb-16">
        <div
          className="prose prose-lg dark:prose-invert max-w-4xl mx-auto text-center"
          dangerouslySetInnerHTML={{ __html: aboutData.content }}
        />
      </div>

      {/* Skills Section */}
      {aboutData.skills && aboutData.skills.length > 0 && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Skills & Technologies</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {aboutData.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience Section */}
      {aboutData.experience && aboutData.experience.length > 0 && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Experience</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {aboutData.experience.map((exp) => (
              <div key={exp.id} className="relative">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold mb-1">{exp.position}</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium text-lg">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-0">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate || '')}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {aboutData.education && aboutData.education.length > 0 && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Education</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {aboutData.education.map((edu) => (
              <div key={edu.id}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{edu.degree}</h3>
                      <p className="text-green-600 dark:text-green-400 font-medium">
                        {edu.institution}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-0">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate || '')}
                    </span>
                  </div>
                  {edu.description && (
                    <p className="text-gray-700 dark:text-gray-300">
                      {edu.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements Section */}
      {aboutData.achievements && aboutData.achievements.length > 0 && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Achievements</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {aboutData.achievements.map((achievement) => (
              <div key={achievement.id}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg h-full">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold">{achievement.title}</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-4">
                      {formatDate(achievement.date)}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default AboutPage;