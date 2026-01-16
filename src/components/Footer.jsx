import { Link } from 'react-router-dom'
import { Mail, Instagram, Twitter, Heart, Leaf } from 'lucide-react'
import './Footer.css'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <Link to="/" className="footer-logo">
                        <Leaf className="footer-logo-icon" />
                        <span>UJE</span>
                    </Link>
                    <p className="footer-tagline">
                        Tempat di mana kata-kata bertemu ketenangan
                    </p>
                </div>

                <div className="footer-links">
                    <h4>Navigasi</h4>
                    <Link to="/">Home</Link>
                    <Link to="/karya">Karya</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </div>

                <div className="footer-social">
                    <h4>Terhubung</h4>
                    <div className="social-icons">
                        <a href="mailto:hello@uje.com" aria-label="Email">
                            <Mail size={20} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <Instagram size={20} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <Twitter size={20} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>
                    © {currentYear} UJE. Dibuat dengan <Heart size={14} className="heart-icon" /> di Indonesia
                </p>
            </div>
        </footer>
    )
}

export default Footer
