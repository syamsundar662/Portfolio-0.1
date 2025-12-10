import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import './Projects.css'
import './glass-card.css'

const Projects = () => {
  const projects = [
    {
      title: 'Onwords Living Home',
      description: 'A Home Assistant-powered smart home automation app with real-time device control, home sharing, automation, and scheduling features.',
      technologies: ['Flutter', 'Dart', 'REST API', 'WebSocket', 'Firebase'],
      github: 'https://github.com/syamsundar662',
      demo: null,
      published: true,
    },
    {
      title: 'FLIP - Social Media App',
      description: 'A social media platform with real-time chatting, photo sharing, follow/unfollow, likes, and comments. Built with Firebase backend and BloC architecture.',
      technologies: ['Flutter', 'Dart', 'Firebase', 'BloC', 'Google Sign-In'],
      github: 'https://github.com/syamsundar662/Flip',
      demo: null,
    },
    {
      title: 'TRAVISOR - Travel App',
      description: 'An intuitive travel application for tourists to search, sort, and discover destinations worldwide with wishlist features and personalized trip planning.',
      technologies: ['Flutter', 'Dart', 'Firebase', 'MVC Architecture'],
      github: 'https://github.com/syamsundar662/Travisor_Travel_App',
      demo: null,
    },
    {
      title: 'Onwords Smart Things',
      description: 'Smart home control app for managing lights, fans, ACs, and other devices with MQTT integration, Android/iOS widgets, and Siri Shortcuts.',
      technologies: ['Flutter', 'MQTT', 'IoT', 'Widgets', 'Siri Shortcuts'],
      github: 'https://github.com/syamsundar662',
      demo: null,
      published: true,
    },
    {
      title: 'Weather App',
      description: 'Location-based weather forecast app using OpenWeatherMap API with real-time data fetching and geolocation services.',
      technologies: ['Flutter', 'Dart', 'GetX', 'OpenWeather API', 'Geolocator'],
      github: 'https://github.com/syamsundar662',
      demo: null,
    },
    {
      title: 'MyOffice',
      description: 'Internal office management system with role-based access control, designed for seamless office operations and management.',
      technologies: ['Flutter', 'Dart', 'Firebase', 'Role-Based Auth'],
      github: 'https://github.com/syamsundar662',
      demo: null,
      published: true,
    },
  ]

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
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    aria-label="View on GitHub"
                  >
                    <FaGithub /> Code
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
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
    </section>
  )
}

export default Projects

