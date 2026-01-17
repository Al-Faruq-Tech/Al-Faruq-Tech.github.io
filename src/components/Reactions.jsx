import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import './Reactions.css'

const Reactions = ({ workId = 'default' }) => {
    const emojis = [
        { id: 'love', symbol: '❤️', label: 'Love' },
        { id: 'sad', symbol: '😢', label: 'Sad' },
        { id: 'fire', symbol: '🔥', label: 'Lit' },
        { id: 'clap', symbol: '👏', label: 'Clap' },
        { id: 'think', symbol: '💭', label: 'Deep' }
    ]

    // Default counts (used when Supabase not configured or as initial state)
    const defaultCounts = {
        love: 12,
        sad: 4,
        fire: 8,
        clap: 15,
        think: 6
    }

    const [counts, setCounts] = useState(defaultCounts)
    const [userReaction, setUserReaction] = useState(null)
    const [particles, setParticles] = useState([])
    const [loading, setLoading] = useState(true)

    // Load reactions from Supabase on mount
    useEffect(() => {
        const loadReactions = async () => {
            if (!isSupabaseConfigured) {
                // Use localStorage fallback
                const saved = localStorage.getItem(`reactions_${workId}`)
                if (saved) {
                    const parsed = JSON.parse(saved)
                    setCounts(parsed.counts || defaultCounts)
                    setUserReaction(parsed.userReaction || null)
                }
                setLoading(false)
                return
            }

            try {
                const { data, error } = await supabase
                    .from('reactions')
                    .select('reaction_type, count')
                    .eq('work_id', workId)

                if (error) throw error

                if (data && data.length > 0) {
                    const newCounts = { ...defaultCounts }
                    data.forEach(r => {
                        newCounts[r.reaction_type] = r.count
                    })
                    setCounts(newCounts)
                }

                // Check user's reaction from localStorage
                const savedReaction = localStorage.getItem(`user_reaction_${workId}`)
                if (savedReaction) {
                    setUserReaction(savedReaction)
                }
            } catch (error) {
                console.error('Error loading reactions:', error)
            } finally {
                setLoading(false)
            }
        }

        loadReactions()
    }, [workId])

    const handleReact = async (id, symbol) => {
        if (userReaction === id) return // Prevent multiple clicks on same reaction

        const prevReaction = userReaction
        const newCounts = {
            ...counts,
            [id]: counts[id] + 1,
            ...(prevReaction ? { [prevReaction]: counts[prevReaction] - 1 } : {})
        }

        // Optimistic update
        setCounts(newCounts)
        setUserReaction(id)

        // Add floating particle effect
        const newParticle = { id: Date.now(), symbol }
        setParticles(prev => [...prev, newParticle])
        setTimeout(() => {
            setParticles(prev => prev.filter(p => p.id !== newParticle.id))
        }, 1000)

        // Save to localStorage
        localStorage.setItem(`user_reaction_${workId}`, id)

        if (!isSupabaseConfigured) {
            // Fallback: save to localStorage
            localStorage.setItem(`reactions_${workId}`, JSON.stringify({
                counts: newCounts,
                userReaction: id
            }))
            return
        }

        // Save to Supabase
        try {
            // Update new reaction count
            await supabase
                .from('reactions')
                .upsert({
                    work_id: workId,
                    reaction_type: id,
                    count: newCounts[id]
                }, { onConflict: 'work_id,reaction_type' })

            // Update previous reaction count if exists
            if (prevReaction) {
                await supabase
                    .from('reactions')
                    .upsert({
                        work_id: workId,
                        reaction_type: prevReaction,
                        count: newCounts[prevReaction]
                    }, { onConflict: 'work_id,reaction_type' })
            }
        } catch (error) {
            console.error('Error saving reaction:', error)
        }
    }

    if (loading) {
        return (
            <div className="reactions-container glass">
                <span className="reactions-loading">Memuat...</span>
            </div>
        )
    }

    return (
        <div className="reactions-container glass">
            {emojis.map((emoji) => (
                <button
                    key={emoji.id}
                    className={`reaction-btn ${userReaction === emoji.id ? 'active' : ''}`}
                    onClick={() => handleReact(emoji.id, emoji.symbol)}
                    title={emoji.label}
                >
                    <span className="reaction-emoji">{emoji.symbol}</span>
                    <span className="reaction-count">{counts[emoji.id]}</span>

                    <AnimatePresence>
                        {particles.map(p => p.symbol === emoji.symbol && (
                            <motion.span
                                key={p.id}
                                className="reaction-particle"
                                initial={{ opacity: 1, y: 0, scale: 1 }}
                                animate={{ opacity: 0, y: -50, scale: 1.5 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                {emoji.symbol}
                            </motion.span>
                        ))}
                    </AnimatePresence>
                </button>
            ))}
        </div>
    )
}

export default Reactions
