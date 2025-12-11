import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from 'react-icons/fa'
import { supabase } from '../lib/supabase'
import './Hero.css'
import './glass-card.css'

const Hero = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [viewCount, setViewCount] = useState(null)

  useEffect(() => {
    fetchProfile()
    
    // Check if this session has already been counted
    const sessionKey = 'portfolio_view_counted'
    const hasBeenCounted = sessionStorage.getItem(sessionKey)
    
    if (!hasBeenCounted) {
      // First visit in this session - increment
      fetchViewCount()
      sessionStorage.setItem(sessionKey, 'true')
    } else {
      // Already counted in this session - just fetch current count
      fetchViewCountOnly()
    }
  }, [])

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profile')
        .select('*')
        .single()

      if (error) throw error
      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchViewCount = async () => {
    try {
      // Increment and get view count
      const { data: rpcData, error: rpcError } = await supabase.rpc('increment_page_view')

      if (!rpcError && rpcData !== null) {
        setViewCount(rpcData)
        return
      }

      // Fallback: try direct update
      const { data: currentData } = await supabase
        .from('page_views')
        .select('view_count')
        .single()

      if (currentData) {
        const newCount = (currentData.view_count || 0) + 1
        
        const { data: updateData, error: updateError } = await supabase
          .from('page_views')
          .update({ 
            view_count: newCount,
            last_updated: new Date().toISOString()
          })
          .eq('id', '00000000-0000-0000-0000-000000000000')
          .select('view_count')
          .single()

        if (!updateError && updateData) {
          setViewCount(updateData.view_count)
        } else {
          setViewCount(currentData.view_count)
        }
      }
    } catch (error) {
      console.error('Error fetching view count:', error)
      // Try to just get current count
      try {
        const { data, error: fetchError } = await supabase
          .from('page_views')
          .select('view_count')
          .single()

        if (!fetchError && data) {
          setViewCount(data.view_count)
        }
      } catch (err) {
        console.error('Error fetching view count:', err)
      }
    }
  }

  const fetchViewCountOnly = async () => {
    try {
      const { data, error } = await supabase
        .from('page_views')
        .select('view_count')
        .single()

      if (!error && data) {
        setViewCount(data.view_count)
      }
    } catch (error) {
      console.error('Error fetching view count:', error)
    }
  }

  const socialLinks = profile ? [
    { icon: FaGithub, url: profile.github_url || '#', label: 'GitHub' },
    { icon: FaLinkedin, url: profile.linkedin_url || '#', label: 'LinkedIn' },
    { icon: FaEnvelope, url: `mailto:${profile.email || ''}`, label: 'Email' },
  ] : []

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
            Hi, I'm <span className="gradient-text" data-text={profile?.full_name || 'Syam Sundar'}>
              {profile?.full_name || 'Syam Sundar'}
            </span>
          </motion.h1>

          <motion.h2
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {profile?.title || 'Flutter Developer'}
          </motion.h2>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {profile?.description || 'Passionate Flutter developer building high-quality, performant mobile applications for Android, iOS, Web, and Desktop. Specialized in creating elegant solutions with clean architecture and modern state management.'}
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
              href="https://zxhfsfrzwrcedqnpqglp.supabase.co/storage/v1/object/public/cv-files/cvs/syamsundar_cv.pdf"
              download="Syam-Sundar-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'tween', duration: 0.2 }}
            >
              <FaDownload /> Download CV
            </motion.a>
          </motion.div>

          {!loading && (
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
          )}
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
                <span className="code-property">name</span>: <span className="code-string">'{profile?.full_name || 'Syam Sundar'}'</span>,
              </motion.div>
              <motion.div
                className="code-line indent"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className="code-property">role</span>: <span className="code-string">'{profile?.title || 'Flutter Developer'}'</span>,
              </motion.div>
              <motion.div
                className="code-line indent"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className="code-property">passion</span>: <span className="code-string">'Building cross-platform mobile apps'</span>,
              </motion.div>
              <motion.div
                className="code-line indent"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className="code-property">code</span>: <span className="code-number">{viewCount !== null ? `000${viewCount}` : '0000'}</span>
              </motion.div>
              <motion.div
                className="code-line"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {'}'};
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

