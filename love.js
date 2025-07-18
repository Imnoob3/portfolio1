// filepath: c:\Users\acer\Videos\code\lovre calc\script.js
// Scroll reveal animation
ScrollReveal().reveal('.reveal', {
    delay: 200,
    distance: '50px',
    duration: 1000,
    origin: 'bottom',
    opacity: 0,
    reset: true,
    viewFactor: 0.2
});

// Love Calculator functionality
document.getElementById('love-calc-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get the names
    const name1 = document.getElementById('name1').value.trim();
    const name2 = document.getElementById('name2').value.trim();
    
    // Validate inputs
    if (!name1 || !name2) {
        alert('Please enter both names');
        return;
    }
    
    // Calculate love percentage
    const loveScore = calculateLove(name1, name2);
    
    // Hide the form temporarily
    this.style.display = 'none';
    
    // Show the animation
    const heartAnimation = document.getElementById('heart-animation');
    heartAnimation.classList.remove('hidden');
    
    // After 10 seconds, show the result
    setTimeout(() => {
        // Hide animation
        heartAnimation.classList.add('hidden');
        
        // Show form again
        this.style.display = 'block';
        
        // Show result
        const result = document.getElementById('result');
        const loveScoreElement = document.getElementById('love-score');
        const messageElement = document.createElement('p');
        messageElement.className = 'love-message';
        
        result.classList.remove('hidden');
        loveScoreElement.textContent = `${loveScore}%`;
        messageElement.textContent = getLoveMessage(loveScore);
        
        // Add message after the score
        result.appendChild(messageElement);
    }, 10000);
});

function calculateLove(name1, name2) {
    const n1 = name1.toLowerCase();
    const n2 = name2.toLowerCase();
    
    // Extended special combinations
    const specialScores = {
        'soraj:sabina': 100,
    };

    // Check both combinations
    const combo1 = `${n1}:${n2}`;
    const combo2 = `${n2}:${n1}`;
    
    if (specialScores[combo1] !== undefined) return specialScores[combo1];
    if (specialScores[combo2] !== undefined) return specialScores[combo2];
    
    // Add the missing algorithm for non-special combinations
    const combined = n1 + n2;
    let sum = 0;
    for (let char of combined) {
        sum += char.charCodeAt(0);
    }
    // Generate a score between 50-100
    return Math.floor((sum % 51) + 50);
}

// Add this new function for love messages
function getLoveMessage(score) {
    if (score === 100) return "Perfect Match! Written in the stars! ⭐";
    if (score >= 90) return "Amazing Chemistry! Love is in the air! 💖";
    if (score >= 80) return "Great potential! Keep the spark alive! ✨";
    if (score >= 70) return "Good match! Give it a chance! 🌟";
    if (score >= 60) return "There's hope! Work on it! 🌈";
    return "Maybe try being friends first? 🤝";
}
// Mouse follower with trail effect
document.addEventListener('DOMContentLoaded', () => {
    const heart = document.querySelector('.floating-heart');
    let mouseX = 0;
    let mouseY = 0;
    let heartX = 0;
    let heartY = 0;
    
    // Show heart when mouse moves
    document.addEventListener('mousemove', (e) => {
        heart.style.display = 'block';
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create trail effect
        createTrail(mouseX, mouseY);
    });

    function createTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'heart-trail';
        trail.innerHTML = '❤️';
        trail.style.left = (x - 10) + 'px';
        trail.style.top = (y - 10) + 'px';
        document.body.appendChild(trail);

        // Remove trail after animation
        setTimeout(() => {
            trail.remove();
        }, 1000);
    }

    // Smooth animation function
    function animate() {
        // Calculate distance between current heart position and mouse
        const dx = mouseX - heartX;
        const dy = mouseY - heartY;

        // Move heart towards mouse with easing
        heartX += dx * 0.1;
        heartY += dy * 0.1;

        // Update heart position
        heart.style.left = `${heartX - 10}px`;
        heart.style.top = `${heartY - 10}px`;

        // Add rotation based on movement
        const angle = Math.atan2(dy, dx);
        const rotation = angle * (180 / Math.PI);
        const scale = Math.min(Math.max(Math.sqrt(dx * dx + dy * dy) / 100, 0.8), 1.2);
        
        heart.style.transform = `rotate(${rotation}deg) scale(${scale})`;

        // Continue animation
        requestAnimationFrame(animate);
    }

    // Start animation
    animate();
});