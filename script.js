let characterId = "Hpk0GozjACb3mtHeAaAMb0r9pcJGbzF317I_Ux_ALOA"; 
function toggleCardMenu() {
    const cardMenu = document.getElementById("card-menu");
    if (cardMenu) {
        cardMenu.style.display = cardMenu.style.display === "none" ? "block" : "none";
    }
}

function handleCardClick(newCharacterId, clickedCard) {
    characterId = newCharacterId; 
    const cardMenu = document.getElementById("card-menu");
    
    if (cardMenu) {
        cardMenu.style.display = "none";
    }

    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => card.classList.remove('active'));
    clickedCard.classList.add('active');
}

document.addEventListener("DOMContentLoaded", () => {
    const chatMessages = document.getElementById("chat-messages");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const loadingSpinner = document.getElementById("loading-spinner");

    // Function to append a user message to the chat box
    function appendUserMessage(message) {
        const userMessage = document.createElement("div");
        userMessage.classList.add("user-message");
        userMessage.innerText = `You: ${message}`;
        chatMessages.appendChild(userMessage);
    }

    // Function to append a bot message to the chat box
    function appendBotMessage(message) {
        const botMessage = document.createElement("div");
        botMessage.classList.add("bot-message");
        botMessage.innerText = `${message}`;
        chatMessages.appendChild(botMessage);
    }

    

    // Function to send user input to the server and receive a response
    async function sendMessageToServer(message) {
        try {
            const response = await fetch(`http://localhost:3000/chat?characterId=${characterId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: message })
            });

            const data = await response.json();
            return data.text;
        } catch (error) {
            console.error('Error sending message:', error);
            return 'Error: Unable to connect to the server.';
        }
    }

    // Function to handle user input
    async function handleUserInput() {
        const message = userInput.value.trim();
        if (message) {
            appendUserMessage(message);
            userInput.value = "";

            loadingSpinner.style.display = "block"; // Show loading spinner

            // Simulate bot response (you will replace this with actual API call)
            const botResponse = await sendMessageToServer(message);
            appendBotMessage(botResponse);

            loadingSpinner.style.display = "none"; // Hide loading spinner
        }
    }

    // Event listener for the send button click
    sendBtn.addEventListener("click", handleUserInput);

    // Event listener for the enter key press in the input field
    userInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            handleUserInput();
        }
    });

    // Dark/light mode toggle event listener
    const modeToggle = document.getElementById("dark-mode-toggle");
    modeToggle.addEventListener("click", () => {
        
        document.body.classList.toggle("light-mode");
        const chatContainer = document.querySelector(".chat-container");
        chatContainer.classList.toggle("light-mode");
        const chatMessages = document.querySelector(".chat-messages");
        chatMessages.classList.toggle("light-mode");
        const chatInput = document.querySelector(".chat-input");
        chatInput.classList.toggle("light-mode");
        const userInput = document.getElementById("user-input");
        userInput.classList.toggle("light-mode");
        const userMessages = document.querySelectorAll(".user-message");
        userMessages.forEach(message => message.classList.toggle("light-mode"));
        const botMessages = document.querySelectorAll(".bot-message");
        botMessages.forEach(message => message.classList.toggle("light-mode"));
    });
});
