const hiddenMessage = ["G", "O", "O", "D", " ", "L", "U", "C", "K", "!"];
let pickedCount = 0;

// Add sparkle effect
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #fff 10%, transparent 60%);
        transform: translate(-50%, -50%);
        animation: sparkleAnim 0.8s forwards;
    `;
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
}

// Add CSS animation for sparkles
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleAnim {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
        50% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
        100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
    }
`;
document.head.appendChild(style);

function createStrawberryField() {
    const field = document.getElementById('strawberry-field');
    for (let i = 0; i < 10; i++) {
        const strawberry = document.createElement('div');
        strawberry.className = 'strawberry';
        strawberry.textContent = '🍓';
        strawberry.dataset.index = i;
        strawberry.addEventListener('click', handleStrawberryClick);
        
        // Add hover effect
        strawberry.addEventListener('mouseover', () => {
            if (strawberry.textContent === '🍓') {
                strawberry.style.transform = 'perspective(1000px) translateZ(20px) scale(1.1) rotate(5deg)';
            }
        });
        
        strawberry.addEventListener('mouseout', () => {
            if (strawberry.textContent === '🍓') {
                strawberry.style.transform = 'perspective(1000px) translateZ(0) scale(1) rotate(0deg)';
            }
        });
        
        field.appendChild(strawberry);
    }
}

function handleStrawberryClick(event) {
    const strawberry = event.target;
    if (strawberry.textContent === '🍓') {
        // Create multiple sparkles
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const rect = strawberry.getBoundingClientRect();
                const x = rect.left + rect.width * Math.random();
                const y = rect.top + rect.height * Math.random();
                createSparkle(x, y);
            }, i * 50);
        }

        const index = parseInt(strawberry.dataset.index);
        strawberry.style.transform = 'perspective(1000px) scale(0.8)';
        
        setTimeout(() => {
            strawberry.textContent = hiddenMessage[index];
            strawberry.className = 'letter';
            strawberry.style.transform = '';
            pickedCount++;
            updateCounter();
            
            if (pickedCount === 10) {
                setTimeout(showCompletionMessage, 500);
            }
        }, 200);
    }
}

function updateCounter() {
    const counter = document.getElementById('counter');
    counter.textContent = `Strawberries picked: ${pickedCount}/10`;
    
    // Add pulse animation to counter
    counter.style.animation = 'none';
    counter.offsetHeight; // Trigger reflow
    counter.style.animation = 'pulse 0.3s ease-out';
}

// Add CSS animation for counter pulse
style.textContent += `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;

function showCompletionMessage() {
    const message = document.getElementById('message');
    message.innerHTML = `
        <p>✨ Congratulations, Strawberry! ✨</p>
        <p>${hiddenMessage.join("")} with your coding journey! 🌟</p>
        <p>Remember: Every great programmer started with their first line of code.</p>
        <p>You're already on your way! 💫</p>
    `;
    message.classList.remove('hidden');
    
    // Create celebratory sparkles
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const x = window.innerWidth * Math.random();
            const y = window.innerHeight * Math.random();
            createSparkle(x, y);
        }, i * 100);
    }
    
    setTimeout(() => message.classList.add('visible'), 100);
}

// Initialize the game
createStrawberryField(); 