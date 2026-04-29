
    // menu button references
    const newChatButton = document.getElementById("newChat");
    const chatFriendButton = document.getElementById("chatFriend");
    const recordLiveButton = document.getElementById("recordLive");

    // interests and find friend button references
    const findFriendButton = document.getElementById("saveBtn");
    const findfriend = document.getElementById("findfriend");
    const interests = document.getElementById("interests");
    const backButton = document.getElementById("backBtn");

    //convo references
    const newMessage = document.getElementById("newMessageBox");
    const sendTextButton = document.getElementById("sendTextBtn");
    const textInput = document.getElementById("text-input");
    let savedText = "";
    
    function toggleMenu() {
        const menu = document.getElementById('sub-menu');
        menu.classList.toggle('show');
    }

    if (newChatButton) {
        newChatButton.addEventListener("click", function () {
            console.log("Start a new Chat button clicked");
            window.location.href = "newChat.html";
        });
    }

    if (chatFriendButton) {
        chatFriendButton.addEventListener("click", function () {
            console.log("Chat with friend button clicked");
            window.location.href = "chatFriend.html";
        });
    }

    if (recordLiveButton) {
        recordLiveButton.addEventListener("click", function () {
            console.log("Live record button clicked");
            window.location.href = "recordLive.html";
        });
    }

    if (findFriendButton && findfriend) {
        findFriendButton.addEventListener("click", function () {
            findfriend.classList.remove("hidden");
            interests.classList.add("hidden");     // hide interests
            console.log("Find Friend Button clicked");
        });
    }

    if (backButton) {
        backButton.addEventListener("click", function () {
            findfriend.classList.add("hidden");
            interests.classList.remove("hidden");     // un hide interests
            console.log("Back Button clicked");
        });
    }

    if (sendTextButton && textInput) {
        sendTextButton.addEventListener("click", () => {
            const text = textInput.value.trim();
            if (!text) return;
    
            const chatContainer = document.querySelector(".chat-container");
    
            const newDiv = document.createElement("div");
            newDiv.classList.add("message", "sent");
            newDiv.textContent = text;
    
            chatContainer.appendChild(newDiv);
    
            textInput.value = "";
            chatContainer.scrollTop = chatContainer.scrollHeight;
        });
    }

