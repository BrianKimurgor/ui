"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Title */}
      <motion.h1
        className="text-4xl font-bold"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        About Me
      </motion.h1>

      {/* Self Introduction */}
      <motion.p
        className="text-lg text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        Hello! I'm a passionate developer with a deep interest in building scalable and efficient web applications. My mission is to continuously grow and create impactful software.
      </motion.p>

      {/* Skills & Experience */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold">Skills & Experience</h2>
        <ul className="list-disc pl-5 text-lg">
          <li>Web Development (React, Next.js, Tailwind CSS)</li>
          <li>Backend Development (Node.js, Express, .NET)</li>
          <li>Database Management (PostgreSQL, MongoDB)</li>
          <li>Cloud & Containerization (Docker, Kubernetes)</li>
        </ul>
      </motion.div>

      {/* Mission */}
      <motion.p
        className="text-lg text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        My mission is to craft applications that solve real-world problems while providing seamless user experiences.
      </motion.p>

      {/* Hobbies/Interests */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <h2 className="text-2xl font-semibold">Hobbies & Interests</h2>
        <p className="text-lg">
          Outside of development, I enjoy reading psychology books, exploring new tech trends, and hiking in nature.
        </p>
      </motion.div>

      {/* Contact Info */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <h2 className="text-2xl font-semibold">Contact Me</h2>
        <p className="text-lg">
          Feel free to reach out to me via{" "}
          <a href="mailto:youremail@example.com" className="text-blue-500">
            email
          </a>
          , or connect with me on{" "}
          <a href="https://www.linkedin.com/in/yourprofile" className="text-blue-500">
            LinkedIn
          </a>.
        </p>
        <button className="mt-4" onClick={() => window.location.href = 'mailto:youremail@example.com'}>
          Get in Touch
        </button>
      </motion.div>
    </div>
  );
}
