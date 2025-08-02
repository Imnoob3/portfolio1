// ===== LOVE CALCULATOR FUNCTIONALITY =====
// ===== LOVE CALCULATOR FUNCTIONALITY =====

// DOM Elements
const loveForm = document.getElementById('love-calc-form');
const resultDiv = document.getElementById('result');
const loveScore = document.getElementById('love-score');
const heartAnimation = document.getElementById('heart-animation');

// ===== LOVE CALCULATION LOGIC =====
function calculateLoveScore(name1, name2) {
    // Simple but fun love calculation algorithm
    const combinedNames = (name1 + name2).toLowerCase();
    let score = 0;
    
    // Base score from name length
    score += (name1.length + name2.length) * 2;
    
    // Add points for matching letters
    const name1Letters = name1.toLowerCase().split('');
    const name2Letters = name2.toLowerCase().split('');
    
    name1Letters.forEach(letter => {
        if (name2Letters.includes(letter)) {
            score += 10;
        }
    });
    
    // Add points for vowels
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const vowelCount = combinedNames.split('').filter(char => vowels.includes(char)).length;
    score += vowelCount * 5;
    
    // Add points for love-related letters
    const loveLetters = ['l', 'o', 'v', 'e'];
    const loveLetterCount = combinedNames.split('').filter(char => loveLetters.includes(char)).length;
    score += loveLetterCount * 15;
    
    // Ensure score is between 0 and 100
    score = Math.min(100, Math.max(0, score));
    
    return score;
}

// ===== LOADING ANIMATION =====
function showLoadingAnimation() {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-hearts">
                <span>💕</span>
                <span>💖</span>
                <span>💗</span>
                <span>💓</span>
                <span>💝</span>
            </div>
            <h3>Calculating Love...</h3>
            <p>Analyzing compatibility between ${document.getElementById('name1').value} and ${document.getElementById('name2').value}</p>
            <div class="loading-bar">
                <div class="loading-progress"></div>
            </div>
        </div>
    `;
    document.body.appendChild(loadingOverlay);
    
    // Start progress animation
    const progress = loadingOverlay.querySelector('.loading-progress');
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
        } else {
            width += 1.4; // Takes 7 seconds to complete
            progress.style.width = width + '%';
        }
    }, 100);
}

function hideLoadingAnimation() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            loadingOverlay.remove();
        }, 500);
    }
}

// ===== ANIMATION FUNCTIONS =====
function createSnowflakes() {
    const snowContainer = document.querySelector('.snow-container');
    if (!snowContainer) return;
    
    const snowflakes = ['❄', '❅', '❆', '✻', '✼', '❉', '❊', '❋'];
    
    setInterval(() => {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
        snowflake.style.opacity = Math.random();
        snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
        
        snowContainer.appendChild(snowflake);
        
        // Remove snowflake after animation
        setTimeout(() => {
            if (snowflake.parentNode) {
                snowflake.parentNode.removeChild(snowflake);
            }
        }, 5000);
    }, 300);
}

function createFloatingHearts() {
    const hearts = ['❤️', '💖', '💕', '💗', '💓', '💝'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        
        document.body.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 5000);
    }, 2000);
}

function showHeartAnimation() {
    if (heartAnimation) {
        heartAnimation.classList.remove('hidden');
        
        // Hide animation after 3 seconds
        setTimeout(() => {
            heartAnimation.classList.add('hidden');
        }, 3000);
    }
}

// ===== RESULT DISPLAY =====
function displayResult(score, name1, name2) {
    const messages = {
        high: ['Perfect Match! 💕', 'Soulmates! 💖', 'True Love! 💝'],
        medium: ['Good Chemistry! 💗', 'Potential Love! 💓', 'Nice Match! 💕'],
        low: ['Friendship Zone! 🤝', 'Room to Grow! 🌱', 'New Beginnings! 🌸']
    };
    
    let category, message;
    
    if (score >= 80) {
        category = 'high';
        message = messages.high[Math.floor(Math.random() * messages.high.length)];
    } else if (score >= 50) {
        category = 'medium';
        message = messages.medium[Math.floor(Math.random() * messages.medium.length)];
    } else {
        category = 'low';
        message = messages.low[Math.floor(Math.random() * messages.low.length)];
    }
    
    // Update result display
    resultDiv.innerHTML = `
        <h2>${message}</h2>
        <div id="love-score">${score}%</div>
        <p>${name1} + ${name2} = Love Score</p>
    `;
    
    resultDiv.classList.remove('hidden');
    
    // Add show class for animation
    setTimeout(() => {
        resultDiv.classList.add('show');
    }, 100);
    
    // Add celebration effects
    showHeartAnimation();
    createCelebrationHearts();
}

function createCelebrationHearts() {
    const hearts = ['❤️', '💖', '💕', '💗', '💓', '💝'];
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.animationDuration = '2s';
            heart.style.fontSize = '2rem';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 2000);
        }, i * 100);
    }
}

// ===== FORM HANDLING =====
function handleFormSubmit(event) {
    event.preventDefault();
    
    const name1Input = document.getElementById('name1');
    const name2Input = document.getElementById('name2');
    const name1 = name1Input.value.trim();
    const name2 = name2Input.value.trim();
    
    // Validation
    if (!name1 || !name2) {
        alert('Please enter both names!');
        return;
    }
    
    if (name1.length < 2 || name2.length < 2) {
        alert('Please enter valid names (at least 2 characters)!');
        return;
    }
    
    // Calculate love score
    const score = calculateLoveScore(name1, name2);
    
    // Show loading animation
    showLoadingAnimation();
    
    // Display result with 7-second delay
    setTimeout(() => {
        hideLoadingAnimation();
        displayResult(score, name1, name2);
    }, 7000);
    
    // Scroll to result
    setTimeout(() => {
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    }, 7500);
}

// ===== INITIALIZATION =====
function initLoveCalculator() {
    // Start background animations
    createSnowflakes();
    createFloatingHearts();
    
    // Add form event listener
    if (loveForm) {
        loveForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Add input validation
    const inputs = loveForm.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
        });
    });
}

// ===== ACCESSIBILITY FEATURES =====
function addAccessibilityFeatures() {
    // Add ARIA labels
    const inputs = loveForm.querySelectorAll('input');
    inputs[0].setAttribute('aria-label', 'First person\'s name');
    inputs[1].setAttribute('aria-label', 'Second person\'s name');
    
    // Add keyboard navigation
    loveForm.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleFormSubmit(event);
        }
    });
}

// ===== PERFORMANCE OPTIMIZATION =====
function optimizePerformance() {
    // Throttle animations on mobile
    if (window.innerWidth <= 768) {
        const style = document.createElement('style');
        style.textContent = `
            .snowflake, .floating-heart {
                animation-duration: 4s !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Reduce animation frequency on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        const style = document.createElement('style');
        style.textContent = `
            .snowflake, .floating-heart {
                display: none;
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== INITIALIZE WHEN DOM IS READY =====
document.addEventListener('DOMContentLoaded', function() {
    initLoveCalculator();
    addAccessibilityFeatures();
    optimizePerformance();
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateLoveScore,
        displayResult,
        handleFormSubmit
    };
}
