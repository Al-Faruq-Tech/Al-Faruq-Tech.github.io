import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navigation from './Navigation'
import Particles from './Particles'
import Footer from './Footer'
import './Layout.css'

const Layout = () => {
    return (
        <div className="layout">
            <Particles />
            <Navigation />
            <motion.main
                className="main-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Outlet />
            </motion.main>
            <Footer />
        </div>
    )
}

export default Layout
