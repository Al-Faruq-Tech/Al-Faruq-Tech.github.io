import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import WorkCard from '../components/WorkCard'
import { sampleWorks, categories } from '../data/works'
import './Gallery.css'

const Gallery = () => {
    const [activeCategory, setActiveCategory] = useState('Semua')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredWorks = useMemo(() => {
        return sampleWorks.filter((work) => {
            const matchesCategory = activeCategory === 'Semua' || work.category === activeCategory
            const matchesSearch = work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                work.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
            return matchesCategory && matchesSearch
        })
    }, [activeCategory, searchQuery])

    return (
        <div className="gallery-page">
            <section className="gallery-hero">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Koleksi Karya
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Jelajahi berbagai tulisan yang telah saya rangkai
                </motion.p>
            </section>

            <section className="gallery-filters">
                <div className="container">
                    <motion.div
                        className="search-box glass"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="Cari karya..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                    </motion.div>

                    <motion.div
                        className="category-tabs"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                                {activeCategory === category && (
                                    <motion.div
                                        className="tab-underline"
                                        layoutId="tab-underline"
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </button>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="gallery-content section">
                <div className="container">
                    {filteredWorks.length > 0 ? (
                        <div className="gallery-grid">
                            {filteredWorks.map((work, index) => (
                                <WorkCard key={work.id} work={work} index={index} />
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            className="no-results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <p>Tidak ada karya yang ditemukan</p>
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    )
}

export default Gallery
