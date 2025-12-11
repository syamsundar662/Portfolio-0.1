import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'
import emailjs from '@emailjs/browser'
import { supabase } from '../lib/supabase'
import './Contact.css'
import './glass-card.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' })

  // EmailJS Configuration - Set these in your .env file
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // Clear status message when user starts typing
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Check if EmailJS is configured
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setSubmitStatus({
        type: 'error',
        message: 'Email service not configured. Please contact me directly at syamsundar662@gmail.com',
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      // Save message to database
      const { error: dbError } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
          },
        ])

      if (dbError) throw dbError

      // Try to send email using EmailJS (optional, won't fail if not configured)
      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        try {
          await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {
              from_name: formData.name,
              from_email: formData.email,
              message: formData.message,
              to_email: profile?.email || 'syamsundar662@gmail.com',
            },
            EMAILJS_PUBLIC_KEY
          )
        } catch (emailError) {
          console.warn('EmailJS Error (non-critical):', emailError)
          // Don't fail the whole submission if email fails
        }
      }

      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your message! I will get back to you soon.',
      })
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Error submitting message:', error)
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or contact me directly.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const [profile, setProfile] = useState(null)

  useEffect(() => {
    fetchProfile()
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
    }
  }

  const contactInfo = profile ? [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: profile.email || 'syamsundar662@gmail.com',
      link: `mailto:${profile.email || 'syamsundar662@gmail.com'}`,
    },
    ...(profile.phone_uae ? [{
      icon: FaPhone,
      label: 'Phone (UAE)',
      value: profile.phone_uae,
      link: `tel:${profile.phone_uae.replace(/\s/g, '')}`,
    }] : []),
    ...(profile.phone_india ? [{
      icon: FaPhone,
      label: 'Phone (India)',
      value: profile.phone_india,
      link: `tel:${profile.phone_india.replace(/\s/g, '')}`,
    }] : []),
    ...(profile.location ? [{
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: profile.location,
      link: null,
    }] : []),
  ] : [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'syamsundar662@gmail.com',
      link: 'mailto:syamsundar662@gmail.com',
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'Kochi, Ernakulam, Kerala',
      link: null,
    },
  ]

  return (
    <section id="contact" className="contact">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h2 className="section-title">
          Get In <span className="gradient-text">Touch</span>
        </h2>
        <p className="section-subtitle">Let's work together on your next project</p>
      </motion.div>

      <div className="contact-container">
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h3>Let's Connect</h3>
          <p>
            I'm always open to discussing new projects, creative ideas, or opportunities to be part
            of your visions. Feel free to reach out!
          </p>
          <div className="contact-details">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="contact-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="contact-icon">
                  <info.icon />
                </div>
                <div className="contact-text">
                  <span className="contact-label">{info.label}</span>
                  {info.link ? (
                    <a href={info.link} className="contact-value">
                      {info.value}
                    </a>
                  ) : (
                    <span className="contact-value">{info.value}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.form
          className="contact-form glass-card"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              placeholder="Your Message"
            />
          </div>
          {submitStatus.type && (
            <div
              className={`submit-status ${submitStatus.type === 'success' ? 'success' : 'error'}`}
            >
              {submitStatus.message}
            </div>
          )}
          <motion.button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            transition={{ type: 'tween', duration: 0.2 }}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span> Sending...
              </>
            ) : (
              <>
                <FaPaperPlane /> Send Message
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
    </section>
  )
}

export default Contact

