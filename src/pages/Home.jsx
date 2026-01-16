import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ArrowDown, BookOpen, Feather, Users } from 'lucide-react'
import WorkCard from '../components/WorkCard'
import { sampleWorks } from '../data/works'
import './Home.css'

const Home = () => {
    const heroRef = useRef(null)
    const titleRef = useRef(null)

    useEffect(() => {
        // GSAP animation for hero title
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.hero-title-char',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: 'power3.out',
                    delay: 0.3
                }
            )

            gsap.fromTo(
                '.hero-tagline',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, delay: 1 }
            )

            gsap.fromTo(
                '.hero-cta',
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.5, delay: 1.5 }
            )
        }, heroRef)

        return () => ctx.revert()
    }, [])

    const titleChars = 'UJE'.split('')
    const featuredWorks = sampleWorks.slice(0, 3)

    const stats = [
        { icon: BookOpen, value: '23', label: 'Karya' },
        { icon: Feather, value: '5+', label: 'Tahun Menulis' },
        { icon: Users, value: '100+', label: 'Pembaca' },
    ]

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero" ref={heroRef}>
                <div className="hero-content">
                    <p className="hero-greeting">Selamat datang di</p>

                    <h1 className="hero-title" ref={titleRef}>
                        {titleChars.map((char, index) => (
                            <span key={index} className="hero-title-char">
                                {char}
                            </span>
                        ))}
                    </h1>

                    <p className="hero-tagline">
                        Tempat di mana kata-kata bertemu ketenangan
                    </p>

                    <motion.div
                        className="hero-cta"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link to="/karya" className="btn btn-primary">
                            Jelajahi Karya
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    className="scroll-indicator"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <ArrowDown size={24} />
                </motion.div>
            </section>

            {/* Featured Works Section */}
            <section className="section featured-section">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="section-title">Karya Terbaru</h2>
                        <p className="section-subtitle">
                            Beberapa tulisan terbaru yang mungkin menarik untuk dibaca
                        </p>
                    </motion.div>

                    <div className="works-grid">
                        {featuredWorks.map((work, index) => (
                            <WorkCard key={work.id} work={work} index={index} />
                        ))}
                    </div>

                    <motion.div
                        className="section-footer"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <Link to="/karya" className="btn btn-secondary">
                            Lihat Semua Karya →
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="section stats-section">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="stat-card glass"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <stat.icon className="stat-icon" size={32} />
                                <span className="stat-value">{stat.value}</span>
                                <span className="stat-label">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section cta-section">
                <div className="container">
                    <motion.div
                        className="cta-content glass"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2>Ingin Terhubung?</h2>
                        <p>Mari berkenalan dan berbagi cerita bersama</p>
                        <Link to="/contact" className="btn btn-primary">
                            Hubungi Saya
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default Home
