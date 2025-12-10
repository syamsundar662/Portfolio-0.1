import { motion } from 'framer-motion'
import { FaCode, FaRocket, FaHeart } from 'react-icons/fa'
import './About.css'
import './glass-card.css'

const About = () => {
  const features = [
    {
      icon: FaCode,
      title: 'Clean Code',
      description: 'Writing maintainable and scalable code following best practices and design patterns.',
    },
    {
      icon: FaRocket,
      title: 'Fast Delivery',
      description: 'Efficient development process ensuring timely delivery without compromising quality.',
    },
    {
      icon: FaHeart,
      title: 'Passionate',
      description: 'Genuine love for technology and continuous learning to stay ahead of the curve.',
    },
  ]

  return (
    <section id="about" className="about">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h2 className="section-title">
          About <span className="gradient-text">Me</span>
        </h2>
        <p className="section-subtitle">Get to know me better</p>
      </motion.div>

      <div className="about-content">
        <motion.div
          className="about-text glass-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h3>Hello! I'm Syam Sundar</h3>
          <p>
            I'm a highly motivated and determined Flutter Developer with a passion for building high-quality mobile applications.
            Currently working at Onwords Smart Solutions, I specialize in creating cross-platform apps for Android, iOS, Web, and Desktop from a single codebase.
          </p>
          <p>
            My expertise includes developing smart home automation applications, social media platforms, and travel apps using Flutter, Dart, and modern state management solutions like BloC, GetX, and Provider. I have hands-on experience with Firebase, REST APIs, WebSocket, MQTT, and IoT integrations.
          </p>
          <p>
            I'm passionate about writing clean, maintainable code following best practices and clean architecture principles. When I'm not coding, you can find me exploring new Flutter packages, contributing to open-source projects, or continuously learning to stay ahead in the mobile development space.
          </p>
        </motion.div>

        <div className="about-features">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card glass-card"
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
              <div className="feature-icon">
                <feature.icon />
              </div>
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About

