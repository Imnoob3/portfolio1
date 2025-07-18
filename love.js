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
    
    // Hide the form temporarily
    this.style.display = 'none';
    
    // Show the animation
    const heartAnimation = document.getElementById('heart-animation');
    heartAnimation.classList.remove('hidden');
    
    // Calculate love percentage (you can modify this algorithm)
    const loveScore = calculateLove(name1, name2);
    
    // After 10 seconds, show the result
    setTimeout(() => {
        // Hide animation
        heartAnimation.classList.add('hidden');
        
        // Show form again
        this.style.display = 'block';
        
        // Show result
        const result = document.getElementById('result');
        const loveScoreElement = document.getElementById('love-score');
        result.classList.remove('hidden');
        loveScoreElement.textContent = `${loveScore}%`;
    }, 10000);
});

function calculateLove(name1, name2) {
    // Simple love calculation algorithm (you can make this more complex)
    const combined = (name1 + name2).toLowerCase();
    let sum = 0;
    
    for (let char of combined) {
        sum += char.charCodeAt(0);
    }
    
    // Generate a "random" but consistent number between 50-100
    return Math.floor((sum % 51) + 50);
}