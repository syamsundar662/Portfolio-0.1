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
        // First, try to increment using RPC function
        const { data: rpcData, error: rpcError } = await supabase.rpc('increment_page_view')

        if (!rpcError && rpcData !== null) {
          setViewCount(rpcData)
          setLoading(false)
          return
        }

        // If RPC fails, try direct update (for public access)
        const { data: currentData } = await supabase
          .from('page_views')
          .select('view_count')
          .single()

        if (currentData) {
          const newCount = (currentData.view_count || 0) + 1
          
          // Try to update directly
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
            // If update fails, just show current count
            setViewCount(currentData.view_count)
          }
        }
      } catch (error) {
        console.error('Error tracking view:', error)
        // Fallback: just fetch the current count
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

  if (loading || viewCount === null) {
    return null
  }

  // Disguise as a code comment or version number
  const formattedCount = viewCount.toLocaleString()
  
  return (
    <div className="view-counter-disguised">
      <div className="code-snippet-vertical">
        <span className="code-bracket">[</span>
        <span className="code-keyword">views</span>
        <span className="code-operator">:</span>
        <span className="code-number">{formattedCount}</span>
        <span className="code-bracket">]</span>
      </div>
    </div>
  )
}

export default ViewCounter
