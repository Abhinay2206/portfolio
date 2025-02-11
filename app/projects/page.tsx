"use client"
import { ExternalLink, Github, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { projects } from "../../data/Projects"
import { useEffect, useState } from "react"

export default function ProjectsPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [theme, setTheme] = useState("dark")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark"
    setTheme(savedTheme)
    document.documentElement.classList.toggle("dark", savedTheme === "dark")
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-32 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 shadow-lg shadow-violet-500/10 hover:shadow-violet-500/20 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1"
            >
              <ArrowLeft
                size={20}
                className="text-violet-600 dark:text-violet-400 group-hover:-translate-x-1 transition-transform duration-300"
              />
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-medium">
                Back Home
              </span>
            </Link>

            <motion.h1
              className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              All Projects
            </motion.h1>
          </div>
        </div>

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate="show"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              className="group relative overflow-hidden rounded-2xl transition-all duration-500 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-violet-500 dark:hover:border-violet-500 hover:shadow-2xl hover:shadow-violet-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-500" />
              <div className="absolute -inset-x-2 -inset-y-2 bg-gradient-to-r from-violet-600/30 to-indigo-600/30 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700" />

              <div className="p-8 relative">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-1.5 rounded-full text-sm bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 hover:scale-110 hover:rotate-1 transition-all duration-300 cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Link
                    href={`/projectDetails?title=${encodeURIComponent(project.title)}`}
                    className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90 transition-all duration-300"
                  >
                    <ExternalLink size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                    More Details
                  </Link>
                  <a
                    href={project.github}
                    className="group flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                  >
                    <Github
                      size={18}
                      className="group-hover:scale-110 transition-transform duration-300 text-gray-700 dark:text-gray-300"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Source Code</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

