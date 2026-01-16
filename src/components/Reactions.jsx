import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Reactions.css'

const Reactions = () => {
    const emojis = [
        { id: 'love', symbol: '❤️', label: 'Love' },
        { id: 'sad', symbol: '😢', label: 'Sad' },
        { id: 'fire', symbol: '🔥', label: 'Lit' },
        { id: 'clap', symbol: '👏', label: 'Clap' },
        { id: 'think', symbol: '💭', label: 'Deep' }
    ]

    const [counts, setCounts] = useState({
        love: 12,
        sad: 4,
        fire: 8,
        clap: 15,
        think: 6
    })

    const [userReaction, setUserReaction] = useState(null)
    const [particles, setParticles] = useState([])

    const handleReact = (id, symbol) => {
        if (userReaction === id) return // Prevent multiple clicks on same reaction

        // Update counts
        setCounts(prev => ({
            ...prev,
            [id]: prev[id] + 1,
            ...(userReaction ? { [userReaction]: prev[userReaction] - 1 } : {})
        }))

        setUserReaction(id)

        // Add floating particle effect
        const newParticle = { id: Date.now(), symbol }
        setParticles(prev => [...prev, newParticle])
        
        // Remove particle after animation
        setTimeout(() => {
            setParticles(prev => prev.filter(p => p.id !== newParticle.id))
        }, 1000)
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
