import { useState, useEffect } from 'react'
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
import { supabase } from '../lib/supabase'
import './Skills.css'
import './glass-card.css'

// Icon mapping function
const getIcon = (iconName) => {
  const iconMap = {
    SiFlutter: SiFlutter,
    SiDart: SiDart,
    SiFirebase: SiFirebase,
    SiSupabase: SiSupabase,
    FaMobile: FaMobile,
    FaJs: FaJs,
    FaGitAlt: FaGitAlt,
    FaHtml5: FaHtml5,
    FaCss3Alt: FaCss3Alt,
    FaDatabase: FaDatabase,
    FaCode: FaCode,
    FaCloud: FaCloud,
    FaBrain: FaBrain,
  }
  return iconMap[iconName] || FaCode
}

const Skills = () => {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error

      // Flatten all skills into a single array with icons
      const skillsWithIcons = (data || []).map((skill) => ({
        ...skill,
        icon: getIcon(skill.icon_name || 'FaCode'),
      }))

      setSkills(skillsWithIcons)
    } catch (error) {
      console.error('Error fetching skills:', error)
    } finally {
      setLoading(false)
    }
  }

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

      {loading ? (
        <div className="loading-state">Loading skills...</div>
      ) : (
        <div className="skills-container">
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.id || index}
                className="skill-chip"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.05,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                whileHover={{ 
                  y: -3,
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
      )}
    </section>
  )
}

export default Skills

