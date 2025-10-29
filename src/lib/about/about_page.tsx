"use client";

import { AboutPageData } from "@/lib/about/model/about_data";
import { getAboutData } from "@/lib/about/service/about_service";
import {
  shouldShowSection,
  // getFallbackAchievements,
} from "@/lib/about/utils/fallback_data";
// import { formatDate } from "@/lib/commons/utils/date_format";
import { useEffect, useState, useRef } from "react";
import Lottie from "lottie-react";
import coderAnimation from "@/assets/animations/coder2.json";
import Loader from "@/lib/commons/loader/loader";

const AboutPage = () => {
  const [aboutData, setAboutData] = useState<AboutPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [showFallbackAchievements, setShowFallbackAchievements] =
  //   useState(false);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    const fetchAboutData = async () => {
      if (hasFetchedRef.current) {
        return;
      }
      hasFetchedRef.current = true;

      try {
        setLoading(true);
        setError(null);

        // Service now handles fallback data automatically
        const data = await getAboutData();
        setAboutData(data);
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
        <Loader message="Loading about information" />
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
      {/* Lottie Animation */}
      <div className="text-center mb-5">
        <div className="inline-block w-64 h-64 md:w-80 md:h-80">
          <Lottie
            animationData={coderAnimation}
            loop={true}
            className="w-full h-full"
          />
        </div>
      </div>
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {aboutData.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {aboutData.description}
        </p>
      </div>

      {/* About Content */}
      <div className="mb-16">
        <div
          className="prose prose-lg dark:prose-invert max-w-4xl mx-auto text-center"
          dangerouslySetInnerHTML={{ __html: aboutData.content }}
        />
      </div>

      {/* Skills Section */}
      {shouldShowSection.skills(aboutData) && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Skills & Technologies
          </h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {aboutData.skills!.map((skill, index) => (
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
      {/* {shouldShowSection.experience(aboutData) && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Experience</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {aboutData.experience!.map((exp) => (
              <div key={exp.id} className="relative">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold mb-1">
                        {exp.position}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium text-lg">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-0">
                      {formatDate(exp.startDate)} -{" "}
                      {exp.current ? "Present" : formatDate(exp.endDate || "")}
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
      )} */}

      {/* Education Section */}
      {/* {shouldShowSection.education(aboutData) && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Education</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {aboutData.education!.map((edu) => (
              <div key={edu.id}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        {edu.degree}
                      </h3>
                      <p className="text-green-600 dark:text-green-400 font-medium">
                        {edu.institution}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-0">
                      {formatDate(edu.startDate)} -{" "}
                      {formatDate(edu.endDate || "")}
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
      )} */}

      {/* {shouldShowSection.achievements(aboutData) ? (
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Achievements</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {aboutData.achievements!.map((achievement) => (
              <div key={achievement.id}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg h-full">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold">
                      {achievement.title}
                    </h3>
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
      ) : (
        // No achievements in API - show button to display mock data
        <div className="mb-16">
          {!showFallbackAchievements ? (
            <div className="text-center">
              <button
                onClick={() => setShowFallbackAchievements(true)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                View Sample Achievements
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between max-w-4xl mx-auto mb-8">
                <h2 className="text-3xl font-bold">Achievements (Sample)</h2>
                <button
                  onClick={() => setShowFallbackAchievements(false)}
                  className="text-sm px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Hide Sample
                </button>
              </div>
              <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
                {getFallbackAchievements().map((achievement) => (
                  <div key={achievement.id}>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg h-full border-l-4 border-blue-500">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold">
                          {achievement.title}
                        </h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-4">
                          {formatDate(achievement.date)}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        {achievement.description}
                      </p>
                      <span className="text-xs text-blue-600 dark:text-blue-400 mt-2 block">
                        Sample Data
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )} */}
    </main>
  );
};

export default AboutPage;
