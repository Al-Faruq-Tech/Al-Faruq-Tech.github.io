import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, ThumbsUp, MessageCircle } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import './Comments.css'

const Comments = ({ workId = 'default' }) => {
    // Default comments (used when Supabase not configured)
    const defaultComments = [
        {
            id: 1,
            author: "Budi Santoso",
            avatar: "B",
            text: "Tulisan yang sangat menginspirasi! Saya suka penggunaan metafora di paragraf ketiga.",
            time: "2 jam yang lalu",
            likes: 5,
            isLiked: false
        },
        {
            id: 2,
            author: "Siti Rahma",
            avatar: "S",
            text: "Ditunggu karya selanjutnya kak! 🔥",
            time: "5 jam yang lalu",
            likes: 3,
            isLiked: false
        }
    ]

    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [loading, setLoading] = useState(true)

    // Load comments from Supabase on mount
    useEffect(() => {
        const loadComments = async () => {
            if (!isSupabaseConfigured) {
                // Use localStorage fallback
                const saved = localStorage.getItem(`comments_${workId}`)
                if (saved) {
                    setComments(JSON.parse(saved))
                } else {
                    setComments(defaultComments)
                }
                setLoading(false)
                return
            }

            try {
                const { data, error } = await supabase
                    .from('comments')
                    .select('*')
                    .eq('work_id', workId)
                    .order('created_at', { ascending: false })

                if (error) throw error

                if (data && data.length > 0) {
                    const formattedComments = data.map(c => ({
                        id: c.id,
                        author: c.author,
                        avatar: c.author.charAt(0).toUpperCase(),
                        text: c.text,
                        time: formatTime(c.created_at),
                        likes: c.likes,
                        isLiked: localStorage.getItem(`liked_${c.id}`) === 'true'
                    }))
                    setComments(formattedComments)
                } else {
                    setComments(defaultComments)
                }
            } catch (error) {
                console.error('Error loading comments:', error)
                setComments(defaultComments)
            } finally {
                setLoading(false)
            }
        }

        loadComments()
    }, [workId])

    const formatTime = (timestamp) => {
        const now = new Date()
        const commentDate = new Date(timestamp)
        const diffMs = now - commentDate
        const diffMins = Math.floor(diffMs / 60000)
        const diffHours = Math.floor(diffMs / 3600000)
        const diffDays = Math.floor(diffMs / 86400000)

        if (diffMins < 1) return 'Baru saja'
        if (diffMins < 60) return `${diffMins} menit yang lalu`
        if (diffHours < 24) return `${diffHours} jam yang lalu`
        return `${diffDays} hari yang lalu`
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!newComment.trim()) return

        setIsSubmitting(true)

        const comment = {
            id: Date.now().toString(),
            author: "Pengunjung",
            avatar: "P",
            text: newComment,
            time: "Baru saja",
            likes: 0,
            isLiked: false
        }

        // Optimistic update
        setComments([comment, ...comments])
        setNewComment('')

        if (!isSupabaseConfigured) {
            // Fallback: save to localStorage
            const updatedComments = [comment, ...comments]
            localStorage.setItem(`comments_${workId}`, JSON.stringify(updatedComments))
            setIsSubmitting(false)
            return
        }

        try {
            const { data, error } = await supabase
                .from('comments')
                .insert({
                    work_id: workId,
                    author: "Pengunjung",
                    text: newComment,
                    likes: 0
                })
                .select()
                .single()

            if (error) throw error

            // Update with real ID from database
            if (data) {
                setComments(prev => prev.map(c =>
                    c.id === comment.id ? { ...c, id: data.id } : c
                ))
            }
        } catch (error) {
            console.error('Error saving comment:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleLike = async (id) => {
        const comment = comments.find(c => c.id === id)
        if (!comment) return

        const newLikeStatus = !comment.isLiked
        const newLikes = newLikeStatus ? comment.likes + 1 : comment.likes - 1

        // Optimistic update
        setComments(comments.map(c => {
            if (c.id === id) {
                return { ...c, likes: newLikes, isLiked: newLikeStatus }
            }
            return c
        }))

        // Save like status to localStorage
        localStorage.setItem(`liked_${id}`, newLikeStatus.toString())

        if (!isSupabaseConfigured) {
            // Fallback: update localStorage
            const updatedComments = comments.map(c =>
                c.id === id ? { ...c, likes: newLikes, isLiked: newLikeStatus } : c
            )
            localStorage.setItem(`comments_${workId}`, JSON.stringify(updatedComments))
            return
        }

        try {
            await supabase
                .from('comments')
                .update({ likes: newLikes })
                .eq('id', id)
        } catch (error) {
            console.error('Error updating like:', error)
        }
    }

    if (loading) {
        return (
            <section className="comments-section">
                <div className="comments-header">
                    <h3>Komentar</h3>
                </div>
                <div className="comments-loading">Memuat komentar...</div>
            </section>
        )
    }

    return (
        <section className="comments-section">
            <div className="comments-header">
                <h3>Komentar</h3>
                <span className="comments-count">{comments.length}</span>
            </div>

            {/* Comment Form */}
            <motion.form
                className="comment-form glass"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="form-header">
                    <div className="user-avatar">P</div>
                    <div className="comment-input-wrapper">
                        <textarea
                            className="comment-input"
                            placeholder="Tulis tanggapanmu..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-actions">
                    <motion.button
                        type="submit"
                        className="btn btn-primary submit-btn"
                        disabled={!newComment.trim() || isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isSubmitting ? 'Mengirim...' : (
                            <>
                                <Send size={16} />
                                Kirim
                            </>
                        )}
                    </motion.button>
                </div>
            </motion.form>

            {/* Comments List */}
            <div className="comments-list">
                <AnimatePresence>
                    {comments.map((comment) => (
                        <motion.div
                            key={comment.id}
                            className="comment-item"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            layout
                        >
                            <div className="user-avatar">{comment.avatar}</div>
                            <div className="comment-content">
                                <div className="comment-meta">
                                    <span className="comment-author">{comment.author}</span>
                                    <span className="comment-time">{comment.time}</span>
                                </div>
                                <p className="comment-text">{comment.text}</p>
                                <div className="comment-actions">
                                    <button
                                        className={`action-btn-small ${comment.isLiked ? 'active' : ''}`}
                                        onClick={() => handleLike(comment.id)}
                                    >
                                        <ThumbsUp size={14} />
                                        {comment.likes}
                                    </button>
                                    <button className="action-btn-small">
                                        <MessageCircle size={14} />
                                        Balas
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </section>
    )
}

export default Comments
