import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPalette, FaTimes } from 'react-icons/fa'
import './ThemeSwitcher.css'

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false)

  const themes = [
    {
      name: 'Purple',
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#ec4899',
    },
    {
      name: 'Blue Red',
      primary: '#3b82f6',
      secondary: '#ef4444',
      accent: '#f59e0b',
    },
    {
      name: 'Green',
      primary: '#10b981',
      secondary: '#059669',
      accent: '#34d399',
    },
    {
      name: 'Orange',
      primary: '#f97316',
      secondary: '#ea580c',
      accent: '#fb923c',
    },
    {
      name: 'Cyan',
      primary: '#06b6d4',
      secondary: '#0891b2',
      accent: '#22d3ee',
    },
    {
      name: 'Pink',
      primary: '#ec4899',
      secondary: '#db2777',
      accent: '#f472b6',
    },
  ]

  const applyTheme = (theme) => {
    document.documentElement.style.setProperty('--primary-color', theme.primary)
    document.documentElement.style.setProperty('--secondary-color', theme.secondary)
    document.documentElement.style.setProperty('--accent-color', theme.accent)
    localStorage.setItem('portfolio-theme', JSON.stringify(theme))
    setIsOpen(false)
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme')
    if (savedTheme) {
      const theme = JSON.parse(savedTheme)
      applyTheme(theme)
    }
  }, [])

  return (
    <>
      <motion.button
        className="theme-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
      >
        <FaPalette />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="theme-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="theme-picker"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <div className="theme-picker-header">
                <h3>Choose Theme</h3>
                <button className="theme-close" onClick={() => setIsOpen(false)}>
                  <FaTimes />
                </button>
              </div>
              <div className="themes-grid">
                {themes.map((theme, index) => (
                  <motion.button
                    key={index}
                    className="theme-option"
                    onClick={() => applyTheme(theme)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="theme-colors">
                      <div
                        className="theme-color"
                        style={{ background: theme.primary }}
                      />
                      <div
                        className="theme-color"
                        style={{ background: theme.secondary }}
                      />
                      <div
                        className="theme-color"
                        style={{ background: theme.accent }}
                      />
                    </div>
                    <span className="theme-name">{theme.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default ThemeSwitcher

