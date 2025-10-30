// "use client";

// import { ContactPageData } from "@/lib/contact/model/contact_data";
// import { getContactData } from "@/lib/contact/service/contact_service";
// import Image from "next/image";
// import { useEffect, useState, useRef } from "react";
// import Loader from "@/lib/commons/loader/loader";

// const ContactPage = () => {
//   const [contactData, setContactData] = useState<ContactPageData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const hasFetchedRef = useRef(false);

//   // Form state
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//     honeypot: "", // Anti-bot field
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [formError, setFormError] = useState("");

//   useEffect(() => {
//     const fetchContactData = async () => {
//       // Prevent double fetch in React Strict Mode
//       if (hasFetchedRef.current) {
//         return;
//       }
//       hasFetchedRef.current = true;

//       try {
//         setLoading(true);
//         setError(null);

//         let data = null;
//         try {
//           data = await getContactData();
//         } catch (apiError) {
//           console.log("API not available, using fallback data");
//         }

//         // Always use fallback data for now since Strapi collection might not exist yet
//         const fallbackData: ContactPageData = {
//           id: 1,
//           title: "Contact Me",
//           description: "Get in touch and let's discuss your next project",
//           content:
//             "<p>I'm always excited to connect with fellow developers, potential collaborators, and anyone interested in discussing technology, projects, or opportunities.</p>",
//           contactInfo: {
//             id: 1,
//             title: "Contact Information",
//             description: "Feel free to reach out through any of these channels",
//             email: "daniel@example.com",
//             phone: "+1 (555) 123-4567",
//             address: "Remote / Available Worldwide",
//             socialLinks: {
//               linkedin: "https://linkedin.com/in/danielalvarez",
//               github: "https://github.com/danielalvarez",
//               twitter: "https://twitter.com/danielalvarez",
//               instagram: "https://instagram.com/danielalvarez",
//             },
//             image: {
//               url: "/profile.png",
//             },
//           },
//           publishedAt: new Date().toISOString(),
//         };

//         // Use Strapi data if available, otherwise fallback
//         setContactData(data || fallbackData);
//       } catch (error) {
//         console.error("Error fetching contact data:", error);

//         // Even if there's an error, show fallback data instead of error message
//         const fallbackData: ContactPageData = {
//           id: 1,
//           title: "Contact Me",
//           description: "Get in touch and let's discuss your next project",
//           content:
//             "<p>I'm always excited to connect with fellow developers, potential collaborators, and anyone interested in discussing technology, projects, or opportunities.</p>",
//           contactInfo: {
//             id: 1,
//             title: "Contact Information",
//             description: "Feel free to reach out through any of these channels",
//             email: "daniel@example.com",
//             phone: "+1 (555) 123-4567",
//             address: "Remote / Available Worldwide",
//             socialLinks: {
//               linkedin: "https://linkedin.com/in/danielalvarez",
//               github: "https://github.com/danielalvarez",
//               twitter: "https://twitter.com/danielalvarez",
//               instagram: "https://instagram.com/danielalvarez",
//             },
//             image: {
//               url: "/profile.png",
//             },
//           },
//           publishedAt: new Date().toISOString(),
//         };
//         setContactData(fallbackData);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContactData();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (formData.honeypot) {
//       return;
//     }

//     setIsSubmitting(true);
//     setFormError("");

//     try {
//       const response = await fetch("https://api.web3forms.com/submit", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           access_key: "5e6231f6-3053-4cc7-b359-0622debae077",
//           subject: formData.subject || "Personal Blog - New Contact Message",
//           from_name: formData.name,
//           email: formData.email,
//           message: formData.message,
//         }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         setIsSuccess(true);
//         setFormData({
//           name: "",
//           email: "",
//           subject: "",
//           message: "",
//           honeypot: "",
//         });
//       } else {
//         setFormError("Failed to send message. Please try again.");
//       }
//     } catch (err) {
//       setFormError("An error occurred. Please try again later.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const closeSuccessModal = () => {
//     setIsSuccess(false);
//   };

//   const closeErrorModal = () => {
//     setFormError("");
//   };

//   if (loading) {
//     return (
//       <div className="container mx-auto p-4 pt-28">
//         <Loader message="Loading contact information" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto p-4 pt-28">
//         <div className="text-center py-8">
//           <p className="text-red-600 text-xl">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   if (!contactData) {
//     return (
//       <div className="container mx-auto p-4 pt-28">
//         <div className="text-center py-8">
//           <p className="text-gray-600 text-xl">Contact information not found</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 pt-20">
//       {/* Header */}
//       <div className="text-center mb-16">
//         <h1 className="text-4xl md:text-5xl font-bold mb-4">
//           {contactData.title}
//         </h1>
//         <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//           {contactData.description}
//         </p>
//       </div>

//       {/* Contact Content */}
//       <div className="grid lg:grid-cols-2 gap-12 mb-16">
//         {/* Contact Information */}
//         <div className="space-y-8">
//           <div
//             className="prose prose-lg dark:prose-invert max-w-none"
//             dangerouslySetInnerHTML={{ __html: contactData.content }}
//           />

//           {/* Contact Details */}
//           <div className="space-y-6">
//             <div className="flex items-start space-x-4">
//               <span className="text-2xl">📧</span>
//               <div>
//                 <h3 className="font-semibold text-lg">Email</h3>
//                 <a
//                   href={`mailto:${contactData.contactInfo.email}`}
//                   className="text-blue-600 dark:text-blue-400 hover:underline"
//                 >
//                   {contactData.contactInfo.email}
//                 </a>
//               </div>
//             </div>

//             {contactData.contactInfo.phone && (
//               <div className="flex items-start space-x-4">
//                 <span className="text-2xl">📱</span>
//                 <div>
//                   <h3 className="font-semibold text-lg">Phone</h3>
//                   <a
//                     href={`tel:${contactData.contactInfo.phone}`}
//                     className="text-blue-600 dark:text-blue-400 hover:underline"
//                   >
//                     {contactData.contactInfo.phone}
//                   </a>
//                 </div>
//               </div>
//             )}

//             {contactData.contactInfo.address && (
//               <div className="flex items-start space-x-4">
//                 <span className="text-2xl">📍</span>
//                 <div>
//                   <h3 className="font-semibold text-lg">Location</h3>
//                   <p className="text-gray-600 dark:text-gray-300">
//                     {contactData.contactInfo.address}
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Social Links */}
//           <div>
//             <h3 className="font-semibold text-lg mb-4">Connect with me</h3>
//             <div className="flex flex-wrap gap-4">
//               {contactData.contactInfo.socialLinks?.linkedin && (
//                 <a
//                   href={contactData.contactInfo.socialLinks.linkedin}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   <span>💼</span>
//                   <span>LinkedIn</span>
//                 </a>
//               )}

//               {contactData.contactInfo.socialLinks?.github && (
//                 <a
//                   href={contactData.contactInfo.socialLinks.github}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors"
//                 >
//                   <span>💻</span>
//                   <span>GitHub</span>
//                 </a>
//               )}

//               {contactData.contactInfo.socialLinks?.twitter && (
//                 <a
//                   href={contactData.contactInfo.socialLinks.twitter}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center space-x-2 bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
//                 >
//                   <span>🐦</span>
//                   <span>Twitter</span>
//                 </a>
//               )}

//               {contactData.contactInfo.socialLinks?.instagram && (
//                 <a
//                   href={contactData.contactInfo.socialLinks.instagram}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center space-x-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
//                 >
//                   <span>📷</span>
//                   <span>Instagram</span>
//                 </a>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Contact Form */}
//         <div>
//           <h2 className="text-2xl font-bold mb-6">Send me a message</h2>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid md:grid-cols-2 gap-4">
//               <div>
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-medium mb-2"
//                 >
//                   Name *
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   required
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                   className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium mb-2"
//                 >
//                   Email *
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   required
//                   value={formData.email}
//                   onChange={(e) =>
//                     setFormData({ ...formData, email: e.target.value })
//                   }
//                   className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
//                 />
//               </div>
//             </div>
//             <div>
//               <label
//                 htmlFor="subject"
//                 className="block text-sm font-medium mb-2"
//               >
//                 Subject
//               </label>
//               <input
//                 type="text"
//                 id="subject"
//                 name="subject"
//                 value={formData.subject}
//                 onChange={(e) =>
//                   setFormData({ ...formData, subject: e.target.value })
//                 }
//                 className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="message"
//                 className="block text-sm font-medium mb-2"
//               >
//                 Message *
//               </label>
//               <textarea
//                 id="message"
//                 name="message"
//                 rows={6}
//                 required
//                 value={formData.message}
//                 onChange={(e) =>
//                   setFormData({ ...formData, message: e.target.value })
//                 }
//                 className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
//                 placeholder="Tell me about your project or just say hello..."
//               />
//             </div>
//             {/* Honeypot - Hidden field for bot detection */}
//             <input
//               type="text"
//               name="botcheck"
//               value={formData.honeypot}
//               onChange={(e) =>
//                 setFormData({ ...formData, honeypot: e.target.value })
//               }
//               style={{ display: 'none' }}
//               tabIndex={-1}
//               autoComplete="off"
//             />
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//             >
//               {isSubmitting ? (
//                 <>
//                   <span className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
//                   Sending...
//                 </>
//               ) : (
//                 "Send Message"
//               )}
//             </button>
//           </form>
//         </div>
//       </div>

//       {contactData.contactInfo.image?.url && (
//         <div className="text-center">
//           <div className="inline-block relative w-32 h-32 rounded-full overflow-hidden">
//             <Image
//               src={contactData.contactInfo.image.url}
//               alt="Profile"
//               fill
//               className="object-cover"
//             />
//           </div>
//         </div>
//       )}

//       {/* Success Modal */}
//       {isSuccess && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
//           onClick={closeSuccessModal}
//         >
//           <div
//             className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-8 text-center"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="mb-4">
//               <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
//                 <svg
//                   className="w-8 h-8 text-green-600 dark:text-green-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//               </div>
//             </div>
//             <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
//             <p className="text-gray-600 dark:text-gray-300 mb-6">
//               Thank you for reaching out. I'll get back to you soon.
//             </p>
//             <button
//               onClick={closeSuccessModal}
//               className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Error Modal */}
//       {formError && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
//           onClick={closeErrorModal}
//         >
//           <div
//             className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-8 text-center"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="mb-4">
//               <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto">
//                 <svg
//                   className="w-8 h-8 text-red-600 dark:text-red-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </div>
//             </div>
//             <h3 className="text-2xl font-bold mb-2">Oops!</h3>
//             <p className="text-gray-600 dark:text-gray-300 mb-6">{formError}</p>
//             <button
//               onClick={closeErrorModal}
//               className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// };

// export default ContactPage;
