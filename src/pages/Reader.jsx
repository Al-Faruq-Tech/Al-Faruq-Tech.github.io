import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Share2, Heart, Clock, Tag, Settings, Volume2, VolumeX } from 'lucide-react'
import { sampleWorks } from '../data/works'
import Comments from '../components/Comments'
import './Reader.css'

const Reader = () => {
    const { id } = useParams()
    const [work, setWork] = useState(null)
    const [fontSize, setFontSize] = useState(18)
    const [showSettings, setShowSettings] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [isSoundOn, setIsSoundOn] = useState(false)
    const [readingProgress, setReadingProgress] = useState(0)

    useEffect(() => {
        const foundWork = sampleWorks.find((w) => w.id === id)
        setWork(foundWork)
    }, [id])

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = (scrollTop / docHeight) * 100
            setReadingProgress(Math.min(100, Math.max(0, progress)))
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    if (!work) {
        return (
            <div className="reader-loading">
                <p>Memuat karya...</p>
            </div>
        )
    }

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: work.title,
                    text: work.excerpt,
                    url: window.location.href,
                })
            } catch (err) {
                console.log('Share cancelled')
            }
        } else {
            navigator.clipboard.writeText(window.location.href)
            alert('Link berhasil disalin!')
        }
    }

    return (
        <div className="reader-page">
            {/* Progress Bar */}
            <div className="reading-progress">
                <div
                    className="progress-bar"
                    style={{ width: `${readingProgress}%` }}
                />
            </div>

            {/* Header */}
            <header className="reader-header">
                <Link to="/karya" className="back-btn">
                    <ArrowLeft size={20} />
                    <span>Kembali</span>
                </Link>

                <div className="reader-actions">
                    <button
                        className="action-btn"
                        onClick={() => setIsSoundOn(!isSoundOn)}
                        title="Ambient Sound"
                    >
                        {isSoundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
                    </button>
                    <button
                        className="action-btn"
                        onClick={() => setShowSettings(!showSettings)}
                        title="Pengaturan"
                    >
                        <Settings size={20} />
                    </button>
                </div>
            </header>

            {/* Settings Panel */}
            {showSettings && (
                <motion.div
                    className="settings-panel glass"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h4>Pengaturan Baca</h4>
                    <div className="setting-item">
                        <label>Ukuran Font</label>
                        <input
                            type="range"
                            min="14"
                            max="24"
                            value={fontSize}
                            onChange={(e) => setFontSize(Number(e.target.value))}
                        />
                        <span>{fontSize}px</span>
                    </div>
                </motion.div>
            )}

            {/* Content */}
            <article className="reader-content">
                <motion.header
                    className="work-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="work-title">{work.title}</h1>
                    <div className="work-divider">✦</div>
                    <div className="work-meta">
                        <span className="meta-item">
                            <Tag size={14} />
                            {work.category}
                        </span>
                        <span className="meta-item">
                            <Clock size={14} />
                            {work.readingTime} menit baca
                        </span>
                    </div>
                </motion.header>

                <motion.div
                    className="work-body"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{ fontSize: `${fontSize}px` }}
                >
                    {work.content.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </motion.div>

                <footer className="work-footer">
                    <div className="work-actions">
                        <button
                            className={`action-btn large ${isLiked ? 'liked' : ''}`}
                            onClick={() => setIsLiked(!isLiked)}
                        >
                            <Heart size={24} fill={isLiked ? 'currentColor' : 'none'} />
                            <span>{work.likes + (isLiked ? 1 : 0)}</span>
                        </button>
                        <button className="action-btn large" onClick={handleShare}>
                            <Share2 size={24} />
                            <span>Bagikan</span>
                        </button>
                    </div>
                </footer>
            </article>

            <div className="reader-interaction container">
                <Comments workId={id} />
            </div>

            {/* Related Works */}
            <section className="related-works">
                <h3>Karya Lainnya</h3>
                <div className="related-grid">
                    {sampleWorks
                        .filter((w) => w.id !== id)
                        .slice(0, 3)
                        .map((relatedWork) => (
                            <Link
                                key={relatedWork.id}
                                to={`/karya/${relatedWork.id}`}
                                className="related-card glass"
                            >
                                <h4>{relatedWork.title}</h4>
                                <span className="related-category">{relatedWork.category}</span>
                            </Link>
                        ))}
                </div>
            </section>
        </div>
    )
}

export default Reader
