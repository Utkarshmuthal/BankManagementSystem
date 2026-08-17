// =============================
// PrimeBank AI Chatbot
// =============================

const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");
const chatBody = document.getElementById("chatBody");
const userInput = document.getElementById("userInput");

// Your Spring Boot backend
const CHAT_API = "http://localhost:8082/api/chat";


// =============================
// Open Chat
// =============================

chatToggle.onclick = () => {

    chatWindow.style.display = "flex";

    userInput.focus();

};


// =============================
// Close Chat
// =============================

closeChat.onclick = () => {

    chatWindow.style.display = "none";

};


// =============================
// Enter Key
// =============================

userInput.addEventListener("keypress", function(e) {

    if (e.key === "Enter") {

        e.preventDefault();

        sendMessage();

    }

});


// =============================
// Send Message
// =============================

async function sendMessage() {

    const text = userInput.value.trim();

    if (text === "") {
        return;
    }


    // Show user message
    addUserMessage(text);

    // Clear input
    userInput.value = "";

    // Disable input while AI is responding
    userInput.disabled = true;


    // Show typing
    showTyping();


    try {

        const response = await fetch(CHAT_API, {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },

            body: JSON.stringify({
                message: text
            })

        });


        const responseText = await response.text();

        console.log("Chatbot response:", responseText);


        if (!response.ok) {

            throw new Error(
                "Server returned " +
                response.status +
                ": " +
                responseText
            );

        }


        let data;

        try {

            data = JSON.parse(responseText);

        } catch (error) {

            throw new Error(
                "Invalid response from server"
            );

        }


        removeTyping();


        // ChatResponse normally contains "reply"
        const reply =
            data.reply ||
            data.message ||
            data.response;


        if (!reply) {

            addBotMessage(
                "Sorry, I received an empty response from PrimeBank Assistant."
            );

        } else {

            addBotMessage(
                formatResponse(reply)
            );

        }


    } catch (error) {

        console.error(
            "PrimeBank Chatbot Error:",
            error
        );


        removeTyping();


        addBotMessage(
            "⚠️ Sorry, I'm unable to connect to PrimeBank Assistant right now.<br><br>" +
            "Please make sure the banking server is running."
        );

    }


    // Enable input again
    userInput.disabled = false;

    userInput.focus();

}


// =============================
// Quick Reply
// =============================

function quickReply(text) {

    // Put button text into input
    userInput.value = text;

    // Send it to Gemini
    sendMessage();

}


// =============================
// User Message
// =============================

function addUserMessage(text) {

    const message = document.createElement("div");

    message.className = "user-message";

    message.textContent = text;

    chatBody.appendChild(message);

    scrollChat();

}


// =============================
// Bot Message
// =============================

function addBotMessage(text) {

    const message = document.createElement("div");

    message.className = "bot-message";

    message.innerHTML = text;

    chatBody.appendChild(message);

    scrollChat();

}


// =============================
// Typing Indicator
// =============================

function showTyping() {

    removeTyping();


    const typing = document.createElement("div");

    typing.id = "typingIndicator";

    typing.className = "bot-message";


    typing.innerHTML = `
        <span>PrimeBank Assistant is typing</span>
        <span class="typing-dots">...</span>
    `;


    chatBody.appendChild(typing);

    scrollChat();

}


// =============================
// Remove Typing
// =============================

function removeTyping() {

    const typing =
        document.getElementById("typingIndicator");


    if (typing) {

        typing.remove();

    }

}


// =============================
// Scroll Chat
// =============================

function scrollChat() {

    chatBody.scrollTop =
        chatBody.scrollHeight;

}


// =============================
// Format AI Response
// =============================

function formatResponse(text) {

    let result = String(text);


    // Prevent HTML injection
    result = result
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");


    // Bold markdown
    result = result.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
    );


    // Convert line breaks
    result = result.replace(
        /\n/g,
        "<br>"
    );


    return result;

}