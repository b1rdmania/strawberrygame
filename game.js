const hiddenMessage = ["G", "O", "O", "D", " ", "L", "U", "C", "K", "!"];
let pickedCount = 0;

function createStrawberryField() {
    const field = document.getElementById('strawberry-field');
    for (let i = 0; i < 10; i++) {
        const strawberry = document.createElement('div');
        strawberry.className = 'strawberry';
        strawberry.textContent = '🍓';
        strawberry.dataset.index = i;
        strawberry.addEventListener('click', handleStrawberryClick);
        field.appendChild(strawberry);
    }
}

function handleStrawberryClick(event) {
    const strawberry = event.target;
    if (strawberry.textContent === '🍓') {
        const index = parseInt(strawberry.dataset.index);
        strawberry.textContent = hiddenMessage[index];
        strawberry.className = 'letter';
        pickedCount++;
        
        updateCounter();
        
        if (pickedCount === 10) {
            showCompletionMessage();
        }
    }
}

function updateCounter() {
    const counter = document.getElementById('counter');
    counter.textContent = `Strawberries picked: ${pickedCount}/10`;
}

function showCompletionMessage() {
    const message = document.getElementById('message');
    message.innerHTML = `
        <p>Congratulations, Strawberry!</p>
        <p>${hiddenMessage.join("")} with your coding journey! 🌟</p>
        <p>Remember: Every great programmer started with their first line of code.</p>
        <p>You're already on your way! 💫</p>
    `;
    message.classList.remove('hidden');
    setTimeout(() => message.classList.add('visible'), 100);
}

// Initialize the game
createStrawberryField(); 