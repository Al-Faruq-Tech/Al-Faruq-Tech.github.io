import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    ArrowLeft, Save, Send, Bold, Italic, Underline,
    Heading1, Heading2, Quote, List, ListOrdered, Link2, Image, Upload, X
} from 'lucide-react'
import Particles from '../components/Particles'
import { sampleWorks, categories } from '../data/works'
import './Editor.css'

const Editor = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [isSaving, setIsSaving] = useState(false)
    const [lastSaved, setLastSaved] = useState(null)

    const [formData, setFormData] = useState({
        title: '',
        category: 'Puisi',
        tags: '',
        content: '',
        coverImage: null
    })

    useEffect(() => {
        const isAuth = localStorage.getItem('uje_auth')
        if (!isAuth) {
            navigate('/login')
            return
        }

        if (id) {
            const work = sampleWorks.find(w => w.id === id)
            if (work) {
                setFormData({
                    title: work.title,
                    category: work.category,
                    tags: work.category.toLowerCase(),
                    content: work.content
                })
            }
        }
    }, [id, navigate])

    // Auto-save simulation
    useEffect(() => {
        const timer = setTimeout(() => {
            if (formData.title || formData.content) {
                handleAutoSave()
            }
        }, 3000)
        return () => clearTimeout(timer)
    }, [formData])

    const handleAutoSave = async () => {
        setIsSaving(true)
        await new Promise(resolve => setTimeout(resolve, 500))
        setIsSaving(false)
        setLastSaved(new Date().toLocaleTimeString('id-ID'))
    }

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handlePublish = async () => {
        if (!formData.title || !formData.content) {
            alert('Judul dan konten harus diisi!')
            return
        }

        setIsSaving(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsSaving(false)
        alert('Karya berhasil dipublikasikan!')
        navigate('/dashboard')
        alert('Karya berhasil dipublikasikan!')
        navigate('/dashboard')
    }

    const handleImport = (e) => {
        const file = e.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (event) => {
            const content = event.target.result
            setFormData(prev => ({
                ...prev,
                title: file.name.replace(/\.(txt|md)$/, ''),
                content: content
            }))
            alert('File berhasil diimport!')
        }
        reader.readAsText(file)
    }

    const handleCoverUpload = (e) => {
        const file = e.target.files[0]
        if (!file) return

        if (file.size > 2 * 1024 * 1024) {
            alert('Ukuran file maksimal 2MB!')
            return
        }

        const reader = new FileReader()
        reader.onload = (event) => {
            setFormData(prev => ({
                ...prev,
                coverImage: event.target.result
            }))
        }
        reader.readAsDataURL(file)
    }

    const removeCover = () => {
        setFormData(prev => ({
            ...prev,
            coverImage: null
        }))
    }

    const toolbarItems = [
        { icon: Bold, label: 'Bold' },
        { icon: Italic, label: 'Italic' },
        { icon: Underline, label: 'Underline' },
        { divider: true },
        { icon: Heading1, label: 'H1' },
        { icon: Heading2, label: 'H2' },
        { divider: true },
        { icon: Quote, label: 'Quote' },
        { icon: List, label: 'Bullet List' },
        { icon: ListOrdered, label: 'Numbered List' },
        { divider: true },
        { icon: Link2, label: 'Link' },
        { icon: Image, label: 'Image' },
    ]

    const wordCount = formData.content.trim() ? formData.content.trim().split(/\s+/).length : 0
    const readingTime = Math.max(1, Math.ceil(wordCount / 200))

    return (
        <div className="editor-page">
            <Particles />

            {/* Header */}
            <header className="editor-header glass">
                <Link to="/dashboard" className="back-btn">
                    <ArrowLeft size={20} />
                    Kembali
                </Link>

                <div className="save-status">
                    {isSaving ? (
                        <span className="saving">Menyimpan...</span>
                    ) : lastSaved ? (
                        <span className="saved">Tersimpan {lastSaved}</span>
                    ) : (
                        <span className="draft">Draft</span>
                    )}
                </div>

                <motion.button
                    className="btn btn-primary publish-btn"
                    onClick={handlePublish}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Send size={18} />
                    Publish
                </motion.button>
            </header>

            {/* Main Editor */}
            <main className="editor-main">
                <div className="editor-container">
                    {/* Metadata */}
                    <section className="editor-metadata glass">
                        <input
                            type="text"
                            name="title"
                            className="title-input"
                            placeholder="Masukkan judul karya..."
                            value={formData.title}
                            onChange={handleChange}
                        />

                        {/* Cover Image Upload */}
                        <div className="cover-upload-section">
                            {formData.coverImage ? (
                                <div className="cover-preview">
                                    <img src={formData.coverImage} alt="Cover" />
                                    <button onClick={removeCover} className="remove-cover-btn" title="Hapus Cover">
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <label className="cover-upload-btn">
                                    <Image size={18} />
                                    <span>Upload Cover</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleCoverUpload}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                            )}
                        </div>

                        <div className="meta-row">
                            <div className="meta-field">
                                <label>Kategori</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="input"
                                >
                                    {categories.filter(c => c !== 'Semua').map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="meta-field tags-field">
                                <label>Tags</label>
                                <input
                                    type="text"
                                    name="tags"
                                    className="input"
                                    placeholder="puisi, cinta, alam..."
                                    value={formData.tags}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Toolbar */}
                    <section className="editor-toolbar glass">
                        {toolbarItems.map((item, index) => (
                            item.divider ? (
                                <div key={index} className="toolbar-divider" />
                            ) : (
                                <button
                                    key={index}
                                    className="toolbar-btn"
                                    title={item.label}
                                >
                                    <item.icon size={18} />
                                </button>
                            )
                        ))}
                        <div className="toolbar-divider" />
                        <label className="toolbar-btn import-btn" title="Import File (.txt, .md)">
                            <Upload size={18} />
                            <input
                                type="file"
                                accept=".txt,.md"
                                onChange={handleImport}
                                style={{ display: 'none' }}
                            />
                        </label>
                    </section>

                    {/* Writing Area */}
                    <section className="editor-content glass">
                        <textarea
                            name="content"
                            className="content-textarea"
                            placeholder="Mulai menulis di sini..."
                            value={formData.content}
                            onChange={handleChange}
                        />
                    </section>

                    {/* Footer Stats */}
                    <footer className="editor-footer">
                        <span>{wordCount} kata</span>
                        <span>•</span>
                        <span>~{readingTime} menit baca</span>
                        <span>•</span>
                        <span>Terakhir disimpan: {lastSaved || '--'}</span>
                    </footer>
                </div>
            </main>
        </div>
    )
}

export default Editor
