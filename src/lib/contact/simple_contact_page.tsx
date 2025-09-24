"use client";

import Image from "next/image";

const SimpleContactPage = () => {
  const contactData = {
    title: "Contact Me",
    description: "Get in touch and let's discuss your next project",
    content:
      "I'm always excited to connect with fellow developers, potential collaborators, and anyone interested in discussing technology, projects, or opportunities.",
    email: "daniel@example.com",
    phone: "+1 (555) 123-4567",
    address: "Remote / Available Worldwide",
    socialLinks: {
      linkedin: "https://linkedin.com/in/danielalvarez",
      github: "https://github.com/danielalvarez",
      twitter: "https://twitter.com/danielalvarez",
      instagram: "https://instagram.com/danielalvarez",
    },
  };

  return (
    <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 pt-20">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {contactData.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {contactData.description}
        </p>
      </div>

      {/* Contact Content */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Contact Information */}
        <div className="space-y-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>{contactData.content}</p>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <span className="text-2xl">📧</span>
              <div>
                <h3 className="font-semibold text-lg">Email</h3>
                <a
                  href={`mailto:${contactData.email}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {contactData.email}
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <span className="text-2xl">📱</span>
              <div>
                <h3 className="font-semibold text-lg">Phone</h3>
                <a
                  href={`tel:${contactData.phone}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {contactData.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <span className="text-2xl">📍</span>
              <div>
                <h3 className="font-semibold text-lg">Location</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {contactData.address}
                </p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect with me</h3>
            <div className="flex flex-wrap gap-4">
              <a
                href={contactData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span>💼</span>
                <span>LinkedIn</span>
              </a>

              <a
                href={contactData.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors"
              >
                <span>💻</span>
                <span>GitHub</span>
              </a>

              <a
                href={contactData.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
              >
                <span>🐦</span>
                <span>Twitter</span>
              </a>

              <a
                href={contactData.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
              >
                <span>📷</span>
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Send me a message</h2>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                placeholder="Tell me about your project or just say hello..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Profile Image */}
      <div className="text-center">
        <div className="inline-block relative w-32 h-32 rounded-full overflow-hidden">
          <Image
            src="/profile.png"
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </main>
  );
};

export default SimpleContactPage;
