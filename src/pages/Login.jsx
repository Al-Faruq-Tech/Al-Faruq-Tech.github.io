import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Leaf, Lock, Eye, EyeOff } from 'lucide-react'
import Particles from '../components/Particles'
import './Login.css'

const Login = () => {
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    // Simple password check (in real app, use proper auth)
    const ADMIN_PASSWORD = 'uje2025'

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        await new Promise(resolve => setTimeout(resolve, 800))

        if (password === ADMIN_PASSWORD) {
            localStorage.setItem('uje_auth', 'true')
            navigate('/dashboard')
        } else {
            setError('Password salah. Coba lagi.')
            setIsLoading(false)
        }
    }

    return (
        <div className="login-page">
            <Particles />

            <motion.div
                className="login-card glass"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="login-header">
                    <motion.div
                        className="login-logo"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                    >
                        <Leaf size={40} />
                    </motion.div>
                    <h1>UJE</h1>
                    <p>Writer's Dashboard</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="password">
                            <Lock size={16} />
                            Password
                        </label>
                        <div className="password-input">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                className="input"
                                placeholder="Masukkan password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <motion.p
                            className="error-message"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {error}
                        </motion.p>
                    )}

                    <motion.button
                        type="submit"
                        className="btn btn-primary login-btn"
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isLoading ? 'Memverifikasi...' : 'Masuk'}
                    </motion.button>
                </form>

                <p className="login-hint">
                    Hint: uje2025
                </p>
            </motion.div>
        </div>
    )
}

export default Login
