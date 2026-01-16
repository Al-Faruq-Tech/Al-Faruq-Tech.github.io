import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, Moon, Sun, Leaf } from 'lucide-react'
import './Navigation.css'

const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(true)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/karya', label: 'Karya' },
        { path: '/about', label: 'About' },
        { path: '/contact', label: 'Contact' },
    ]

    return (
        <motion.nav
            className={`navigation ${isScrolled ? 'scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    <Leaf className="logo-icon" />
                    <span className="logo-text">UJE</span>
                </Link>

                <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.label}
                            {location.pathname === link.path && (
                                <motion.div
                                    className="nav-underline"
                                    layoutId="underline"
                                    transition={{ duration: 0.3 }}
                                />
                            )}
                        </Link>
                    ))}
                </div>

                <div className="nav-actions">
                    <button
                        className="theme-toggle"
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        aria-label="Toggle theme"
                    >
                        {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
                    </button>

                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <motion.div
                    className="mobile-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </motion.nav>
    )
}

export default Navigation
