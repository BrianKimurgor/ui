'use client'

import { useEffect, useState } from 'react'

type Project = {
  id: number
  title: string
  description: string
  imageUrl?: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/projects')
        const data = await res.json()
        setProjects(data)
      } catch (err) {
        console.error('Failed to fetch projects', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-600">My Projects</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading projects...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl shadow-lg bg-white p-5 hover:shadow-indigo-300 transition-all duration-300 border border-indigo-100"
            >
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
              )}
              <h2 className="text-xl font-semibold text-indigo-700">{project.title}</h2>
              <p className="text-gray-600 mt-2">{project.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
