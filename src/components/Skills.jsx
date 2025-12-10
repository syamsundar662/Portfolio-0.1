import { motion } from 'framer-motion'
import {
  FaMobile,
  FaJs,
  FaGitAlt,
  FaHtml5,
  FaCss3Alt,
  FaDatabase,
  FaCode,
  FaCloud,
  FaBrain,
} from 'react-icons/fa'
import { SiFlutter, SiDart, SiFirebase, SiSupabase } from 'react-icons/si'
import './Skills.css'
import './glass-card.css'

const Skills = () => {
  const skills = [
    { name: 'Flutter', icon: SiFlutter },
    { name: 'Dart', icon: SiDart },
    { name: 'Android', icon: FaMobile },
    { name: 'iOS', icon: FaMobile },
    { name: 'BloC', icon: FaCode },
    { name: 'GetX', icon: FaCode },
    { name: 'Provider', icon: FaCode },
    { name: 'Riverpod', icon: FaCode },
    { name: 'Clean Architecture', icon: FaCode },
    { name: 'Firebase', icon: SiFirebase },
    { name: 'Supabase', icon: SiSupabase },
    { name: 'SQL', icon: FaDatabase },
    { name: 'Hive', icon: FaDatabase },
    { name: 'REST API', icon: FaCloud },
    { name: 'WebSocket', icon: FaCloud },
    { name: 'MQTT', icon: FaCloud },
    { name: 'Java', icon: FaCode },
    { name: 'HTML/CSS', icon: FaHtml5 },
    { name: 'JavaScript', icon: FaJs },
    { name: 'Git', icon: FaGitAlt },
    { name: 'Cursor', icon: FaCode },
    { name: 'AI', icon: FaBrain },
    { name: 'Meta', icon: FaCode },
  ]

  return (
    <section id="skills" className="skills">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h2 className="section-title">
          My <span className="gradient-text">Skills</span>
        </h2>
        <p className="section-subtitle">Technologies I work with</p>
      </motion.div>

      <div className="skills-container">
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="skill-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.05,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              whileHover={{ 
                y: -5,
                scale: 1.05,
                transition: { type: 'tween', duration: 0.2 }
              }}
            >
              <div className="skill-icon">
                <skill.icon />
              </div>
              <span className="skill-name">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills

