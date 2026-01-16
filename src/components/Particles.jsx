import { useEffect, useRef } from 'react'
import './Particles.css'

const Particles = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let animationFrameId
        let particles = []

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        const createParticles = () => {
            particles = []
            const particleCount = Math.floor((canvas.width * canvas.height) / 15000)

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 3 + 1,
                    speedX: (Math.random() - 0.5) * 0.3,
                    speedY: (Math.random() - 0.5) * 0.3 - 0.2,
                    opacity: Math.random() * 0.5 + 0.2,
                    hue: Math.random() > 0.7 ? 45 : 120, // Golden or sage green
                })
            }
        }

        const drawParticle = (particle) => {
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)

            const gradient = ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size * 2
            )

            if (particle.hue === 45) {
                // Golden particles
                gradient.addColorStop(0, `hsla(${particle.hue}, 60%, 70%, ${particle.opacity})`)
                gradient.addColorStop(1, `hsla(${particle.hue}, 60%, 70%, 0)`)
            } else {
                // Sage green particles
                gradient.addColorStop(0, `hsla(${particle.hue}, 30%, 60%, ${particle.opacity * 0.7})`)
                gradient.addColorStop(1, `hsla(${particle.hue}, 30%, 60%, 0)`)
            }

            ctx.fillStyle = gradient
            ctx.fill()
        }

        const updateParticle = (particle) => {
            particle.x += particle.speedX
            particle.y += particle.speedY

            // Pulse effect
            particle.opacity += Math.sin(Date.now() * 0.001 + particle.x) * 0.005
            particle.opacity = Math.max(0.1, Math.min(0.7, particle.opacity))

            // Wrap around
            if (particle.x < 0) particle.x = canvas.width
            if (particle.x > canvas.width) particle.x = 0
            if (particle.y < 0) particle.y = canvas.height
            if (particle.y > canvas.height) particle.y = 0
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particles.forEach((particle) => {
                updateParticle(particle)
                drawParticle(particle)
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        resizeCanvas()
        createParticles()
        animate()

        window.addEventListener('resize', () => {
            resizeCanvas()
            createParticles()
        })

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener('resize', resizeCanvas)
        }
    }, [])

    return <canvas ref={canvasRef} className="particles-canvas" />
}

export default Particles
