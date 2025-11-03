// ===== CURSOR TRAIL EFFECT =====
const cursorTrail = document.querySelector('.cursor-trail');
let mouseX = 0;
let mouseY = 0;
let trailX = 0;
let trailY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateTrail() {
    trailX += (mouseX - trailX) * 0.1;
    trailY += (mouseY - trailY) * 0.1;
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top = trailY + 'px';
    requestAnimationFrame(animateTrail);
}

animateTrail();

// Create additional trail particles
for (let i = 0; i < 5; i++) {
    const particle = document.createElement('div');
    particle.className = 'cursor-trail';
    particle.style.width = (8 - i * 1) + 'px';
    particle.style.height = (8 - i * 1) + 'px';
    particle.style.opacity = 0.5 - i * 0.1;
    document.body.appendChild(particle);
    
    let pX = 0, pY = 0;
    let pTrailX = 0, pTrailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        pX = e.clientX;
        pY = e.clientY;
    });
    
    function animateParticle() {
        pTrailX += (pX - pTrailX) * (0.05 - i * 0.01);
        pTrailY += (pY - pTrailY) * (0.05 - i * 0.01);
        particle.style.left = pTrailX + 'px';
        particle.style.top = pTrailY + 'px';
        requestAnimationFrame(animateParticle);
    }
    
    setTimeout(() => animateParticle(), i * 50);
}

// ===== TYPING ANIMATION =====
const typingText = document.querySelector('.typing-text');
const texts = [
    'welcome.exe',
    'loading portfolio...',
    'system ready.',
    'initiating...',
    '> hello world'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => { isDeleting = true; }, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeText, speed);
}

typeText();

// ===== NAVIGATION TOGGLE =====
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== SCROLL REVEAL ANIMATION =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.about-card, .experience-card, .education-card, .skill-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== ACTIVE NAVIGATION LINK =====
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== GLITCH EFFECT ON SCROLL =====
let glitchElements = document.querySelectorAll('.glitch, .glitch-large');
let glitchTimeout;

window.addEventListener('scroll', () => {
    if (glitchTimeout) return;
    
    glitchTimeout = setTimeout(() => {
        glitchElements.forEach(element => {
            element.style.animation = 'none';
            setTimeout(() => {
                element.style.animation = '';
            }, 10);
        });
        glitchTimeout = null;
    }, 100);
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const bgGrid = document.querySelector('.bg-grid');
    if (bgGrid) {
        bgGrid.style.transform = `translate(${scrolled * 0.1}px, ${scrolled * 0.1}px)`;
    }
});

// ===== SKILL BAR ANIMATION =====
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ===== CARD HOVER GLOW EFFECT =====
document.querySelectorAll('.about-card, .experience-card, .education-card, .contact-link').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const glow = card.querySelector('.card-glow');
        if (glow) {
            glow.style.background = `radial-gradient(circle at ${x}px ${y}px, var(--accent-glow) 0%, transparent 70%)`;
        }
    });
});

// ===== RANDOM GLITCH ON INTERVAL =====
setInterval(() => {
    const randomGlitch = glitchElements[Math.floor(Math.random() * glitchElements.length)];
    if (randomGlitch) {
        randomGlitch.style.animation = 'none';
        setTimeout(() => {
            randomGlitch.style.animation = '';
        }, 50);
    }
}, 5000);

// ===== KEYBOARD INTERACTION =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // Here you would typically send the form data to a backend
        // For now, we'll just log it and show a success message
        console.log('Form submitted:', formData);
        
        // Show success message
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, var(--accent), var(--primary))';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
        }, 3000);
        
        // You can integrate with email services like:
        // - EmailJS: https://www.emailjs.com/
        // - Formspree: https://formspree.io/
        // - Your own backend API
    });
}

// ===== CONSOLE MESSAGE =====
console.log('%cPAVITHRA S - Portfolio', 'color: #ff9ec5; font-size: 20px; font-weight: bold;');
console.log('%cGood Vibes Activated ✨', 'color: #b19cd9; font-size: 14px;');

