// Header Scroll Effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll Reveal Animation (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
};

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Hero Canvas Animation (Shader-like Particle/Gradient effect)
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function initCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particles = [];
    
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            alpha: Math.random() * 0.5 + 0.1
        });
    }
}

function drawCanvas() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw subtle moving gradient
    const time = Date.now() * 0.0005;
    const cx = width / 2 + Math.cos(time) * 100;
    const cy = height / 2 + Math.sin(time) * 100;
    
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, width * 0.8);
    gradient.addColorStop(0, 'rgba(0, 229, 255, 0.08)');
    gradient.addColorStop(1, 'rgba(3, 3, 5, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw particles
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${p.alpha})`;
        ctx.fill();
    });

    requestAnimationFrame(drawCanvas);
}

window.addEventListener('resize', initCanvas);
initCanvas();
drawCanvas();

// Card Hover Glow Effect
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Parallax Effect for About Image
window.addEventListener('scroll', () => {
    const parallaxImages = document.querySelectorAll('.parallax');
    parallaxImages.forEach(img => {
        const speed = 0.1;
        const rect = img.parentElement.getBoundingClientRect();
        // Only parallax if in viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const yPos = (window.innerHeight - rect.top) * speed;
            img.style.transform = `translateY(${yPos - 50}px) scale(1.05)`;
        }
    });
});

// Review Slider
const sliderWrapper = document.getElementById('reviewSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;
const totalSlides = document.querySelectorAll('.slide').length;

function updateSlider() {
    sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
}

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
});

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
});

// Auto slide
setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}, 6000);
