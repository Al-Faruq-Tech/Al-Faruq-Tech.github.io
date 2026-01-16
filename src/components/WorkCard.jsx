import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Tag } from 'lucide-react'
import './WorkCard.css'

const WorkCard = ({ work, index }) => {
    const { id, title, excerpt, category, readingTime, coverImage, createdAt } = work

    return (
        <motion.article
            className="work-card glass"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
        >
            <Link to={`/karya/${id}`} className="work-card-link">
                {coverImage && (
                    <div className="work-card-image">
                        <img src={coverImage} alt={title} />
                        <div className="work-card-overlay" />
                    </div>
                )}

                <div className="work-card-content">
                    <div className="work-card-meta">
                        <span className="work-category">
                            <Tag size={12} />
                            {category}
                        </span>
                        <span className="work-reading-time">
                            <Clock size={12} />
                            {readingTime} menit
                        </span>
                    </div>

                    <h3 className="work-card-title">{title}</h3>

                    <p className="work-card-excerpt">{excerpt}</p>

                    <div className="work-card-footer">
                        <span className="read-more">Baca →</span>
                    </div>
                </div>
            </Link>
        </motion.article>
    )
}

export default WorkCard
