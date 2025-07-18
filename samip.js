// Dark Mode Toggle
const toggleSwitch = document.getElementById('darkModeToggle');

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.body.classList.toggle('dark-mode', currentTheme === 'dark');
    toggleSwitch.checked = currentTheme === 'dark';
}

toggleSwitch.addEventListener('change', function(e) {
    if (e.target.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
});

// Scroll Reveal Animations
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

// Typing Animation
const typed = new Typed('.typing', {
    strings: ['Web Developer', 'Designer', 'Freelancer', 'Student' ,'youtuber'],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});

// Form Validation
function validateForm() {
    let isValid = true;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Name validation
    if (name.length < 2) {
        document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
        isValid = false;
    } else {
        document.getElementById('nameError').textContent = '';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email';
        isValid = false;
    } else {
        document.getElementById('emailError').textContent = '';
    }

    // Message validation
    if (message.length < 10) {
        document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
        isValid = false;
    } else {
        document.getElementById('messageError').textContent = '';
    }

    return isValid;
}

// Update the form's JavaScript in samip.js
async function handleSubmit(event) {
    event.preventDefault();
    
    if (!validateForm()) return;

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        
        if (response.ok) {
            showSuccessMessage('Message sent successfully!');
            event.target.reset();
        } else {
            showErrorMessage('Failed to send message. Please try again.');
        }
    } catch (error) {
        showErrorMessage('An error occurred. Please try again later.');
    }
}

// Add these helper functions
function showSuccessMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.textContent = message;
    document.querySelector('.contact').appendChild(messageDiv);
    setTimeout(() => messageDiv.remove(), 5000);
}

function showErrorMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'error-message';
    messageDiv.textContent = message;
    document.querySelector('.contact').appendChild(messageDiv);
    setTimeout(() => messageDiv.remove(), 5000);
}

