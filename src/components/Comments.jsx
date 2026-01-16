import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, ThumbsUp, MessageCircle, MoreHorizontal } from 'lucide-react'
import './Comments.css'

const Comments = ({ workId }) => {
    // Simulated comments data
    const [comments, setComments] = useState([
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
            isLiked: true
        }
    ])

    const [newComment, setNewComment] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!newComment.trim()) return

        setIsSubmitting(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        const comment = {
            id: Date.now(),
            author: "Pengunjung", // In real app, get from auth
            avatar: "P",
            text: newComment,
            time: "Baru saja",
            likes: 0,
            isLiked: false
        }

        setComments([comment, ...comments])
        setNewComment('')
        setIsSubmitting(false)
    }

    const handleLike = (id) => {
        setComments(comments.map(c => {
            if (c.id === id) {
                return {
                    ...c,
                    likes: c.isLiked ? c.likes - 1 : c.likes + 1,
                    isLiked: !c.isLiked
                }
            }
            return c
        }))
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
