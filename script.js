
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
    //might have to change some
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
        //function for sending messages
        function sendMessage() {
            const messageText = textInput.value.trim();
                if (messageText === "") return;
        
                const chatContainer = document.querySelector(".chat-container");
        
                // create new message bubble
                const newDiv = document.createElement("div");
                newDiv.classList.add("message", "sent");
                newDiv.textContent = messageText;
        
                // add it to the chat
                chatContainer.appendChild(newDiv);
        
                // clear input
                textInput.value = "";
        
                // auto scroll to bottom
                chatContainer.scrollTop = chatContainer.scrollHeight;

                // unhides messages other person "sends"
                const receivedMessages = document.querySelectorAll(".received.hidden");

                receivedMessages.forEach((msg, index) => {
                    setTimeout(() => {
                        chatContainer.appendChild(msg);   // move it to the bottom
                        msg.classList.remove("hidden");   // then show it
                        chatContainer.scrollTop = chatContainer.scrollHeight;
                    }, 800 * (index + 1));
                });

        }
        
        //send text when send button clicked
        sendTextButton.addEventListener("click", sendMessage);

        //send text when enter key is pressed
        textInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
            }
        });

        //translation
        const btn = document.getElementById("translateBtn");
        let activeWord = null;

        document.querySelectorAll(".word").forEach(word => {
        word.addEventListener("mouseenter", () => {
            activeWord = word;

            const rect = word.getBoundingClientRect();
            btn.style.left = window.scrollX + rect.left + "px";
            btn.style.top = window.scrollY + rect.top - 40 + "px";
            btn.style.display = "block";
            btn.dataset.text = word.textContent;
        });
        });

        document.addEventListener("mousemove", (e) => {
        if (!activeWord || btn.style.display !== "block") return;

        const overWord = activeWord.contains(e.target);
        const overBtn = btn.contains(e.target);

        if (!overWord && !overBtn) {
            btn.style.display = "none";
            activeWord = null;
        }
        });

        btn.addEventListener("click", () => {
        alert("Translate: " + btn.dataset.text);
        });

    }

    
