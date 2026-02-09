"use client"
import { ExternalLink, Github, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { projects } from "../../data/Projects"
import { useEffect } from "react"

export default function ProjectsPage() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark"
    document.documentElement.classList.toggle("dark", savedTheme === "dark")
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 py-24 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 dark:from-violet-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            All Projects
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-violet-300 dark:hover:border-violet-700 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <ArrowLeft
                size={18}
                className="text-violet-600 dark:text-violet-400 group-hover:-translate-x-1 transition-transform duration-300"
              />
              <span className="text-gray-700 dark:text-gray-300 font-medium">Back Home</span>
            </Link>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
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
              className="group relative p-6 rounded-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-gray-200/50 dark:border-zinc-800/50 hover:border-violet-300 dark:hover:border-violet-700 shadow-sm hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300"
              whileHover={{ y: -4 }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 5 && (
                    <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-gray-400">
                      +{project.tech.length - 5}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/projectDetails?title=${encodeURIComponent(project.title)}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium shadow-sm hover:shadow-md hover:shadow-violet-500/25 transition-all duration-300"
                  >
                    <span>View Details</span>
                    <ExternalLink size={14} />
                  </Link>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-300 text-sm font-medium hover:border-violet-300 dark:hover:border-violet-700 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-300"
                  >
                    <Github size={14} />
                    <span>Code</span>
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
