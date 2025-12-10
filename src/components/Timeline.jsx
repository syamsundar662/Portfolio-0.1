import { motion } from 'framer-motion'
import { FaGraduationCap, FaBriefcase, FaCode, FaRocket } from 'react-icons/fa'
import './Timeline.css'
import './glass-card.css'

const Timeline = () => {
  const timelineItems = [
    {
      type: 'experience',
      icon: FaBriefcase,
      title: 'Flutter Developer',
      organization: 'Onwords Smart Solution',
      period: 'Aug 2024 - Present',
      description: 'Developing smart home automation applications including Onwords Living Home and Onwords Smart Things. Working with REST APIs, WebSocket, MQTT, and IoT integrations.',
      color: '#ec4899',
      current: true,
    },
    {
      type: 'education',
      icon: FaCode,
      title: 'Mobile Application Development Using Flutter',
      organization: 'Brototype, Ernakulam',
      period: '2022 - 2023',
      description: 'Specialized training in Flutter and Dart for cross-platform mobile app development. Learned modern state management, Firebase integration, and clean architecture.',
      color: '#8b5cf6',
    },
    {
      type: 'education',
      icon: FaGraduationCap,
      title: 'Bachelor of Computer Application',
      organization: 'RR Institutions, Bangalore',
      period: '2019 - 2022',
      description: 'Completed BCA with CGPA of 6.6. Gained foundational knowledge in computer science, programming, and software development.',
      color: '#6366f1',
    },
  ]

  return (
    <section id="timeline" className="timeline">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h2 className="section-title">
          My <span className="gradient-text">Journey</span>
        </h2>
        <p className="section-subtitle">From education to professional experience</p>
      </motion.div>

      <div className="timeline-container">
        <div className="timeline-line"></div>
        {timelineItems.map((item, index) => (
          <motion.div
            key={index}
            className={`timeline-item ${item.current ? 'current' : ''}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.15,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            <div className={`timeline-content glass-card ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-icon" style={{ background: item.color }}>
                <item.icon />
              </div>
              <div className="timeline-details">
                <div className="timeline-type">{item.type === 'education' ? 'Education' : 'Experience'}</div>
                <h3 className="timeline-title">{item.title}</h3>
                <div className="timeline-organization">{item.organization}</div>
                <div className="timeline-period">{item.period}</div>
                <p className="timeline-description">{item.description}</p>
              </div>
            </div>
            <div className="timeline-dot" style={{ borderColor: item.color }}>
              {item.current && <div className="timeline-dot-pulse" style={{ background: item.color }}></div>}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Timeline

