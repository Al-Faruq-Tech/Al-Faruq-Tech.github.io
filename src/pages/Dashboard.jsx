import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    Leaf, LogOut, Plus, Edit, Trash2,
    BookOpen, FileText, Users, BarChart3,
    Home, PenTool, Archive, Tag, Settings
} from 'lucide-react'
import Particles from '../components/Particles'
import { sampleWorks } from '../data/works'
import './Dashboard.css'

const Dashboard = () => {
    const [works, setWorks] = useState(sampleWorks)
    const [activeTab, setActiveTab] = useState('all')
    const navigate = useNavigate()

    useEffect(() => {
        const isAuth = localStorage.getItem('uje_auth')
        if (!isAuth) {
            navigate('/login')
        }
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem('uje_auth')
        navigate('/login')
    }

    const handleDelete = (id) => {
        if (window.confirm('Yakin ingin menghapus karya ini?')) {
            setWorks(works.filter(w => w.id !== id))
        }
    }

    const stats = [
        { icon: BookOpen, value: works.length, label: 'Total Karya', color: 'golden' },
        { icon: FileText, value: 2, label: 'Draft', color: 'sage' },
        { icon: Users, value: '142', label: 'Pembaca', color: 'teal' },
    ]

    const sidebarItems = [
        { icon: BarChart3, label: 'Dashboard', id: 'dashboard' },
        { icon: PenTool, label: 'Tulis Baru', id: 'new', link: '/editor' },
        { icon: Archive, label: 'Semua Karya', id: 'all' },
        { icon: FileText, label: 'Draft', id: 'draft' },
        { icon: Tag, label: 'Tags', id: 'tags' },
        { icon: Settings, label: 'Pengaturan', id: 'settings' },
    ]

    return (
        <div className="dashboard-page">
            <Particles />

            {/* Sidebar */}
            <aside className="dashboard-sidebar glass">
                <div className="sidebar-header">
                    <Link to="/" className="sidebar-logo">
                        <Leaf size={24} />
                        <span>UJE</span>
                    </Link>
                    <p>Dashboard</p>
                </div>

                <nav className="sidebar-nav">
                    {sidebarItems.map((item) => (
                        item.link ? (
                            <Link
                                key={item.id}
                                to={item.link}
                                className="sidebar-item"
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </Link>
                        ) : (
                            <button
                                key={item.id}
                                className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(item.id)}
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </button>
                        )
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <button className="sidebar-item logout" onClick={handleLogout}>
                        <LogOut size={20} />
                        <span>Keluar</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div>
                        <h1>Selamat Datang, Penulis! ✨</h1>
                        <p>Apa yang ingin kamu tulis hari ini?</p>
                    </div>
                    <div className="header-actions">
                        <Link to="/" className="btn btn-secondary">
                            <Home size={18} />
                            Lihat Website
                        </Link>
                    </div>
                </header>

                {/* Stats */}
                <section className="dashboard-stats">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            className={`stat-card glass ${stat.color}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <stat.icon size={28} />
                            <span className="stat-value">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                        </motion.div>
                    ))}
                </section>

                {/* Works Table */}
                <section className="dashboard-works">
                    <div className="works-header">
                        <h2>Karya Terbaru</h2>
                        <Link to="/editor" className="btn btn-primary">
                            <Plus size={18} />
                            Tulis Baru
                        </Link>
                    </div>

                    <div className="works-table glass">
                        <div className="table-header">
                            <span>Judul</span>
                            <span>Kategori</span>
                            <span>Status</span>
                            <span>Tanggal</span>
                            <span>Aksi</span>
                        </div>

                        {works.map((work, index) => (
                            <motion.div
                                key={work.id}
                                className="table-row"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <span className="work-title-cell">{work.title}</span>
                                <span className="work-category-cell">{work.category}</span>
                                <span className="work-status-cell">
                                    <span className="status-badge published">Published</span>
                                </span>
                                <span className="work-date-cell">{work.createdAt}</span>
                                <span className="work-actions-cell">
                                    <Link to={`/editor/${work.id}`} className="action-icon edit">
                                        <Edit size={16} />
                                    </Link>
                                    <button
                                        className="action-icon delete"
                                        onClick={() => handleDelete(work.id)}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Dashboard
