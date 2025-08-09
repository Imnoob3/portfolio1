// Get zodiac sign from date
function getZodiacSign(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
    return "Pisces";
}

// Calculate compatibility based on birthdays
function calculateCompatibility(date1, date2) {
    const zodiac1 = getZodiacSign(new Date(date1));
    const zodiac2 = getZodiacSign(new Date(date2));
    
    // Basic zodiac compatibility scores (simplified)
    const baseScore = Math.floor(Math.random() * 40) + 60; // Base score between 60-100
    
    // Add zodiac analysis
    const zodiacAnalysis = `${zodiac1} and ${zodiac2} Compatibility:\n
        Your zodiac signs suggest a ${baseScore >= 80 ? 'strong' : 'moderate'} connection.
        ${zodiac1} brings ${getZodiacTraits(zodiac1)}, while
        ${zodiac2} contributes ${getZodiacTraits(zodiac2)}.`;
    
    return {
        score: baseScore,
        analysis: zodiacAnalysis
    };
}

// Get zodiac traits
function getZodiacTraits(sign) {
    const traits = {
        Aries: "passion and energy",
        Taurus: "stability and devotion",
        Gemini: "adaptability and wit",
        Cancer: "emotion and nurturing",
        Leo: "confidence and loyalty",
        Virgo: "practicality and attention",
        Libra: "harmony and charm",
        Scorpio: "intensity and depth",
        Sagittarius: "adventure and optimism",
        Capricorn: "ambition and reliability",
        Aquarius: "innovation and friendship",
        Pisces: "compassion and creativity"
    };
    return traits[sign];
}

// Form submission handler
document.getElementById('birthday-calc-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get elements
    const loadingAnimation = document.getElementById('loading-animation');
    const resultDiv = document.getElementById('result');
    const heartAnimation = document.getElementById('heart-animation');
    
    // Hide result and heart animation if visible
    resultDiv.classList.add('hidden');
    heartAnimation.classList.add('hidden');
    
    // Show loading animation
    loadingAnimation.classList.remove('loading-hidden');
    
    // Calculate after 5 second delay
    setTimeout(() => {
        const date1 = document.getElementById('date1').value;
        const date2 = document.getElementById('date2').value;
        
        // Calculate compatibility
        const result = calculateCompatibility(date1, date2);
        
        // Hide loading animation
        loadingAnimation.classList.add('loading-hidden');
        
        // Show result and heart animation
        resultDiv.classList.remove('hidden');
        heartAnimation.classList.remove('hidden');
        
        // Update result content
        document.getElementById('love-score').textContent = `${result.score}%`;
        document.getElementById('zodiac-compatibility').innerHTML = result.analysis;
        
        // Create floating hearts effect
        createFloatingHearts();
    }, 5000);
});

// Snow effect with mouse attraction
let snowflakes = [];
let mouseX = 0;
let mouseY = 0;

// Mouse tracking
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

class Snowflake {
    constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = -10;
        this.size = Math.random() * 3 + 2;
        this.speedY = Math.random() * 1 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.element = document.createElement('div');
        this.element.className = 'snowflake';
        this.element.innerHTML = '❄';
        this.element.style.position = 'absolute';
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
        this.element.style.fontSize = this.size + 'px';
        document.getElementById('snowContainer').appendChild(this.element);
    }

    update() {
        // Basic movement
        this.y += this.speedY;
        this.x += this.speedX;

        // Mouse attraction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
            const attractionForce = 0.5;
            this.x += (dx / distance) * attractionForce;
            this.y += (dy / distance) * attractionForce;
            this.element.style.filter = 'brightness(1.5)';
        } else {
            this.element.style.filter = 'none';
        }

        // Update position
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';

        // Remove if out of screen
        if (this.y > window.innerHeight || this.x < 0 || this.x > window.innerWidth) {
            this.element.remove();
            return false;
        }
        return true;
    }
}

function createSnow() {
    const snowContainer = document.getElementById('snowContainer');
    snowContainer.innerHTML = ''; // Clear existing snowflakes
    snowflakes = [];

    function addSnowflake() {
        if (snowflakes.length < 50) {
            snowflakes.push(new Snowflake());
        }
        snowflakes = snowflakes.filter(flake => flake.update());
        requestAnimationFrame(addSnowflake);
    }

    addSnowflake();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    createSnow();
    // Recreate snowflakes periodically
    setInterval(createSnowflakes, 8000);
    
    // Add sparkles on click
    document.addEventListener('click', function(e) {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createSparkle(
                    e.pageX + (Math.random() - 0.5) * 50,
                    e.pageY + (Math.random() - 0.5) * 50
                );
            }, i * 100);
        }
    });

    // Add loading animation to form submit
    document.getElementById('birthday-calc-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const loadingAnimation = document.getElementById('loading-animation');
        const resultDiv = document.getElementById('result');
        
        resultDiv.classList.add('hidden');
        loadingAnimation.classList.remove('loading-hidden');
        
        setTimeout(() => {
            const date1 = document.getElementById('date1').value;
            const date2 = document.getElementById('date2').value;
            const result = calculateCompatibility(date1, date2);
            
            loadingAnimation.classList.add('loading-hidden');
            resultDiv.classList.remove('hidden');
            
            document.getElementById('love-score').textContent = `${result.score}%`;
            document.getElementById('zodiac-compatibility').innerHTML = result.analysis;
            
            createFloatingHearts();
            document.getElementById('heart-animation').classList.remove('hidden');
        }, 5000);
    });
});

// Update sharing functions to remove name references
function shareOnFacebook() {
    const score = document.getElementById('love-score').textContent;
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=I just calculated my birthday love compatibility! Our score is ${score}! Try it yourself!`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

function shareOnInstagram() {
    alert('To share on Instagram:\n1. Take a screenshot of your result\n2. Open Instagram\n3. Create a new post or story\n4. Upload the screenshot');
}

function downloadResult() {
    const resultDiv = document.getElementById('result');
    html2canvas(resultDiv).then(canvas => {
        const link = document.createElement('a');
        link.download = 'birthday-love-result.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}