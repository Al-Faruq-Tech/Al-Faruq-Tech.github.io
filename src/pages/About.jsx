import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { Mail, Instagram, Twitter, Feather, Book, Sparkles, Pen } from 'lucide-react'
import profileImg from '../assets/profile.png'
import './About.css'

const About = () => {
    const roleRef = useRef(null)
    const roles = ['Penulis', 'Pemimpi', 'Pelajar', 'Pencari']

    useEffect(() => {
        let currentIndex = 0
        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % roles.length
            if (roleRef.current) {
                gsap.to(roleRef.current, {
                    opacity: 0,
                    y: -20,
                    duration: 0.3,
                    onComplete: () => {
                        if (roleRef.current) {
                            roleRef.current.textContent = roles[currentIndex]
                            gsap.fromTo(
                                roleRef.current,
                                { opacity: 0, y: 20 },
                                { opacity: 1, y: 0, duration: 0.3 }
                            )
                        }
                    }
                })
            }
        }, 2000)

        return () => clearInterval(interval)
    }, [])

    const timeline = [
        { year: '2020', event: 'Mulai menulis puisi pertama', icon: Pen },
        { year: '2022', event: 'Memenangkan juara 3 lomba menulis', icon: Book },
        { year: '2024', event: 'Menulis cerpen dan mengikuti berbagai antologi', icon: Feather },
        { year: '2026', event: 'Membuat website UJE', icon: Sparkles },
    ]

    const socialLinks = [
        { icon: Mail, href: 'mailto:hello@uje.com', label: 'Email' },
        { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
        { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    ]

    return (
        <div className="about-page">
            <section className="about-hero">
                <motion.div
                    className="about-avatar"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <div className="avatar-glow" />
                    <img src={profileImg} alt="UJE Profile" className="avatar-image" />
                </motion.div>

                <motion.div
                    className="about-intro"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h1>Halo! 👋</h1>
                    <p className="intro-role">
                        Saya adalah seorang <span ref={roleRef} className="role-text">Penulis</span>
                    </p>
                </motion.div>
            </section>

            <section className="about-bio section">
                <div className="container">
                    <motion.div
                        className="bio-content glass"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p>
                            Saya percaya pada kekuatan kata-kata untuk menyembuhkan dan menginspirasi.
                            Melalui tulisan, saya menjelajahi kedalaman emosi manusia dan keindahan alam.
                        </p>
                        <p>
                            Setiap cerita yang saya tulis adalah perjalanan—perjalanan ke dalam diri sendiri,
                            ke dalam mimpi, ke dalam kemungkinan-kemungkinan yang tak terbatas.
                        </p>
                        <blockquote>
                            "Setiap cerita adalah perjalanan jiwa."
                            <cite>— UJE</cite>
                        </blockquote>
                    </motion.div>
                </div>
            </section>

            <section className="about-timeline section">
                <div className="container">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        Perjalanan Menulis
                    </motion.h2>

                    <div className="timeline">
                        {timeline.map((item, index) => (
                            <motion.div
                                key={item.year}
                                className="timeline-item"
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="timeline-marker">
                                    <item.icon size={20} />
                                </div>
                                <div className="timeline-content glass">
                                    <span className="timeline-year">{item.year}</span>
                                    <p>{item.event}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="about-social section">
                <div className="container">
                    <motion.h3
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        Terhubung dengan saya
                    </motion.h3>

                    <div className="social-links">
                        {socialLinks.map((link, index) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link glass"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.1 }}
                            >
                                <link.icon size={24} />
                                <span>{link.label}</span>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About
