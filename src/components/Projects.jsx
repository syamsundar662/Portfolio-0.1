import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { supabase } from '../lib/supabase'
import './Projects.css'
import './glass-card.css'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="projects" className="projects">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h2 className="section-title">
          My <span className="gradient-text">Projects</span>
        </h2>
        <p className="section-subtitle">Some of my recent work</p>
      </motion.div>

      {loading ? (
        <div className="loading-state">Loading projects...</div>
      ) : (
        <div className="projects-grid">
          {projects.map((project, index) => (
          <motion.div
            key={index}
            className="project-card glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            whileHover={{ 
              y: -5,
              transition: { type: 'tween', duration: 0.2 }
            }}
          >
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-technologies">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="project-links">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    aria-label="View on GitHub"
                  >
                    <FaGithub /> Code
                  </a>
                )}
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    aria-label="View demo"
                  >
                    <FaExternalLinkAlt /> Demo
                  </a>
                )}
                {project.published && (
                  <span className="project-badge">Published</span>
                )}
              </div>
            </div>
          </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Projects

