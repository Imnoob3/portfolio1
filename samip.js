// ===== DOM ELEMENTS =====
const toggleSwitch = document.getElementById('darkModeToggle');
const contactForm = document.getElementById('contactForm');

// ===== THEME MANAGEMENT =====
function initTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-mode', currentTheme === 'dark');
    toggleSwitch.checked = currentTheme === 'dark';
}

function toggleTheme() {
    const isDark = toggleSwitch.checked;
    document.body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// ===== ANIMATIONS =====
function initAnimations() {
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '30px',
            duration: 1000,
            delay: 200,
            reset: false
        });

        sr.reveal('header', { delay: 300 });
        sr.reveal('.about', { delay: 400 });
        sr.reveal('.projects', { delay: 500 });
        sr.reveal('.project-card', { interval: 200 });
        sr.reveal('.contact', { delay: 600 });
        sr.reveal('footer', { delay: 700 });
    }
}

// ===== TYPING ANIMATION =====
function initTypingAnimation() {
    if (typeof Typed !== 'undefined') {
        new Typed('.typing', {
            strings: ['Web Developer', 'Designer', 'Freelancer', 'Student', 'YouTuber'],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true
        });
    }
}

// ===== FORM VALIDATION =====
function validateForm() {
    let isValid = true;
    const fields = {
        name: { element: document.getElementById('name'), minLength: 2 },
        email: { element: document.getElementById('email'), pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        message: { element: document.getElementById('message'), minLength: 10 }
    };

    // Clear previous errors
    Object.values(fields).forEach(field => {
        const errorElement = document.getElementById(field.element.id + 'Error');
        if (errorElement) errorElement.textContent = '';
    });

    // Validate each field
    Object.entries(fields).forEach(([fieldName, field]) => {
        const value = field.element.value.trim();
        const errorElement = document.getElementById(field.element.id + 'Error');

        if (field.minLength && value.length < field.minLength) {
            errorElement.textContent = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${field.minLength} characters`;
            isValid = false;
        } else if (field.pattern && !field.pattern.test(value)) {
            errorElement.textContent = `Please enter a valid ${fieldName}`;
            isValid = false;
        }
    });

    return isValid;
}

// ===== FORM SUBMISSION =====
async function handleFormSubmit(event) {
    event.preventDefault();
    
    if (!validateForm()) return;

    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        message: document.getElementById('message').value.trim()
    };

    try {
        const response = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            showMessage('Message sent successfully!', 'success');
            event.target.reset();
        } else {
            showMessage('Failed to send message. Please try again.', 'error');
        }
    } catch (error) {
        showMessage('An error occurred. Please try again later.', 'error');
    }
}

// ===== MESSAGE DISPLAY =====
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message`;
    messageDiv.textContent = message;
    
    const contactSection = document.querySelector('.contact');
    contactSection.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// ===== RESPONSIVE NAVIGATION =====
function initResponsiveNav() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== ACCESSIBILITY =====
function initAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any open modals or dropdowns
            const activeElements = document.querySelectorAll('.active');
            activeElements.forEach(el => el.classList.remove('active'));
        }
    });

    // Add focus management
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(el => {
        el.addEventListener('focus', () => {
            el.style.outline = '2px solid var(--primary-color)';
            el.style.outlineOffset = '2px';
        });
        
        el.addEventListener('blur', () => {
            el.style.outline = '';
            el.style.outlineOffset = '';
        });
    });
}

// ===== INITIALIZATION =====
function init() {
    // Initialize theme
    initTheme();
    
    // Add event listeners
    toggleSwitch.addEventListener('change', toggleTheme);
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Initialize animations
    initAnimations();
    initTypingAnimation();
    
    // Initialize responsive navigation
    initResponsiveNav();
    
    // Initialize accessibility features
    initAccessibility();
    
    // Add smooth scrolling for anchor links
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
}

// ===== LOAD EVENT =====
document.addEventListener('DOMContentLoaded', init);

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        handleFormSubmit,
        showMessage,
        toggleTheme
    };
}

