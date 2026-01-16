import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, Instagram, Twitter, CheckCircle } from 'lucide-react'
import './Contact.css'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500))

        setIsSubmitting(false)
        setIsSubmitted(true)
        setFormData({ name: '', email: '', message: '' })

        setTimeout(() => setIsSubmitted(false), 5000)
    }

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const socialLinks = [
        { icon: Mail, href: 'mailto:hello@uje.com', label: 'hello@uje.com' },
        { icon: Instagram, href: 'https://instagram.com', label: '@uje' },
        { icon: Twitter, href: 'https://twitter.com', label: '@uje' },
    ]

    return (
        <div className="contact-page">
            <section className="contact-hero">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Mari Terhubung
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    Punya pertanyaan, kolaborasi, atau hanya ingin menyapa? Saya senang mendengar dari kamu!
                </motion.p>
            </section>

            <section className="contact-content section">
                <div className="container">
                    <div className="contact-grid">
                        <motion.form
                            className="contact-form glass"
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            {isSubmitted ? (
                                <motion.div
                                    className="success-message"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                >
                                    <CheckCircle size={48} />
                                    <h3>Pesan Terkirim!</h3>
                                    <p>Terima kasih telah menghubungi. Saya akan segera membalas.</p>
                                </motion.div>
                            ) : (
                                <>
                                    <div className="form-group">
                                        <label htmlFor="name">Nama</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="input"
                                            placeholder="Nama kamu"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="input"
                                            placeholder="email@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="message">Pesan</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            className="input"
                                            placeholder="Tulis pesanmu di sini..."
                                            rows="5"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <motion.button
                                        type="submit"
                                        className="btn btn-primary submit-btn"
                                        disabled={isSubmitting}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {isSubmitting ? (
                                            <span className="loading">Mengirim...</span>
                                        ) : (
                                            <>
                                                <Send size={18} />
                                                Kirim Pesan
                                            </>
                                        )}
                                    </motion.button>
                                </>
                            )}
                        </motion.form>

                        <motion.div
                            className="contact-info"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h3>Atau temukan saya di</h3>

                            <div className="contact-links">
                                {socialLinks.map((link, index) => (
                                    <motion.a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="contact-link glass"
                                        whileHover={{ x: 5 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                    >
                                        <link.icon size={20} />
                                        <span>{link.label}</span>
                                    </motion.a>
                                ))}
                            </div>

                            <div className="contact-note glass">
                                <p>
                                    💡 Saya biasanya merespon dalam 1-2 hari kerja.
                                    Untuk hal yang mendesak, silakan hubungi via Instagram.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact
