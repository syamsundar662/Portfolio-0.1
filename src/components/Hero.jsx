import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown, FaDownload } from 'react-icons/fa'
import './Hero.css'
import './glass-card.css'

const Hero = () => {
  const socialLinks = [
    { icon: FaGithub, url: 'https://github.com/syamsundar662', label: 'GitHub' },
    { icon: FaLinkedin, url: 'https://www.linkedin.com/in/syam-sundar-89bb60256/', label: 'LinkedIn' },
    { icon: FaEnvelope, url: 'mailto:syamsundar662@gmail.com', label: 'Email' },
  ]

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="hero">
      <div className="hero-shapes">
        <div className="morphing-shape morphing-shape-1"></div>
        <div className="morphing-shape morphing-shape-2"></div>
      </div>
      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span>Welcome to my portfolio</span>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Hi, I'm <span className="gradient-text" data-text="Syam Sundar">Syam Sundar</span>
          </motion.h1>

          <motion.h2
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Flutter Developer
          </motion.h2>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Passionate Flutter developer building high-quality, performant mobile applications for Android, iOS, Web, and Desktop.
            Specialized in creating elegant solutions with clean architecture and modern state management.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.button
              className="btn btn-primary"
              onClick={() => scrollToSection('projects')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'tween', duration: 0.2 }}
            >
              View My Work
            </motion.button>
            <motion.button
              className="btn btn-secondary"
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'tween', duration: 0.2 }}
            >
              Get In Touch
            </motion.button>
            <motion.a
              href="/cv/Syam-Sundar-CV.pdf"
              download="Syam-Sundar-CV.pdf"
              className="btn btn-secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'tween', duration: 0.2 }}
            >
              <FaDownload /> Download CV
            </motion.a>
          </motion.div>

          <motion.div
            className="hero-social"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'tween', duration: 0.2 }}
                aria-label={social.label}
              >
                <social.icon />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="glass-card hero-card">
            <div className="code-glow"></div>
            <div className="code-snippet">
              <motion.div
                className="code-line"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className="code-keyword">const</span>{' '}
                <span className="code-variable">developer</span> = {'{'}
              </motion.div>
              <motion.div
                className="code-line indent"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className="code-property">name</span>: <span className="code-string">'Syam Sundar'</span>,
              </motion.div>
              <motion.div
                className="code-line indent"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className="code-property">role</span>: <span className="code-string">'Flutter Developer'</span>,
              </motion.div>
              <motion.div
                className="code-line indent"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className="code-property">passion</span>: <span className="code-string">'Building cross-platform mobile apps'</span>
              </motion.div>
              <motion.div
                className="code-line"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {'}'};
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={() => scrollToSection('about')}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FaArrowDown />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero

