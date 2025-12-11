import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import './ViewCounter.css'

const ViewCounter = () => {
  const [viewCount, setViewCount] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Track page view and get count
    const trackView = async () => {
      try {
        // Increment view count using the database function
        const { data, error } = await supabase.rpc('increment_page_view')

        if (error) throw error

        // Set the view count
        setViewCount(data)
      } catch (error) {
        console.error('Error tracking view:', error)
        // If increment fails, try to just get the count
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
      } finally {
        setLoading(false)
      }
    }

    trackView()
  }, [])

  if (loading) {
    return null // Don't show anything while loading
  }

  return (
    <div className="view-counter">
      <span className="view-icon">👁️</span>
      <span className="view-text">
        {viewCount !== null ? viewCount.toLocaleString() : '---'} views
      </span>
    </div>
  )
}

export default ViewCounter
