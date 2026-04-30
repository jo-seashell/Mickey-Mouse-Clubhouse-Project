
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
    }

    //translation
    const translateBtn = document.getElementById("translateBtn");
    const translatePopup = document.getElementById("translatePopup");
    const popupFullTranslation = document.getElementById("popupFullTranslation");
    const popupWordList = document.getElementById("popupWordList");
    const saveWordBtn = document.getElementById("saveWordBtn");

    let savedWords = [];

    function getMockTranslation(text) {
        const dictionary = {
            "早上好": { pinyin: "zǎo shang hǎo", translation: "good morning" },
            "现在": { pinyin: "xiàn zài", translation: "now" },
            "我": { pinyin: "wǒ", translation: "I / me" },
            "有": { pinyin: "yǒu", translation: "have" },
            "冰淇淋": { pinyin: "bīng qí lín", translation: "ice cream" },
            "但是": { pinyin: "dàn shì", translation: "but" },
            "最": { pinyin: "zuì", translation: "most" },
            "喜欢": { pinyin: "xǐ huan", translation: "like" },
            "速度与激情": { pinyin: "sù dù yǔ jī qíng", translation: "Fast & Furious" }
        };
    
        const fullSentenceDictionary = {
            "早上好现在我有冰淇淋": "Good morning, I have ice cream.",
            "我有冰淇淋": "I have ice cream.",
            "但是我最喜欢速度与激情9": "But my favorite is Fast & Furious 9!"
        };
    
        const words = Object.keys(dictionary).sort((a, b) => b.length - a.length);
        const parts = [];
        let remaining = text.trim();
    
        while (remaining.length > 0) {
            const firstChar = remaining[0];
    
            if (/^[\s,.;:!?，。！？、]/.test(firstChar)) {
                remaining = remaining.slice(1);
                continue;
            }
    
            let matched = false;
    
            for (const word of words) {
                if (remaining.startsWith(word)) {
                    parts.push({
                        text: word,
                        pinyin: dictionary[word].pinyin,
                        translation: dictionary[word].translation
                    });
                    remaining = remaining.slice(word.length);
                    matched = true;
                    break;
                }
            }
    
            if (!matched) {
                const numberMatch = remaining.match(/^\d+/);
    
                if (numberMatch) {
                    const number = numberMatch[0];
                    parts.push({
                        text: number,
                        pinyin: number,
                        translation: number
                    });
                    remaining = remaining.slice(number.length);
                    continue;
                }
    
                parts.push({
                    text: firstChar,
                    pinyin: firstChar,
                    translation: "Translation not found"
                });
                remaining = remaining.slice(1);
            }
        }
    
        const normalizedText = text.replace(/[\s,.;:!?，。！？、]/g, "");
    
        return {
            parts,
            fullTranslation:
                fullSentenceDictionary[normalizedText] ||
                parts.map(item => item.translation).join(" ")
        };
    }

    function hideTranslateButton() {
        translateBtn.style.display = "none";
        translateBtn.dataset.text = "";
    }

    function hideTranslatePopup() {
        translatePopup.classList.add("hidden");
        translatePopup.dataset.text = "";
        translatePopup.dataset.pinyin = "";
        translatePopup.dataset.translation = "";
    }

    document.addEventListener("selectionchange", () => {
        const selection = window.getSelection();
        const selectedText = selection.toString().trim();
        const hasText = selectedText.length > 0;

        document.querySelectorAll(".message.received").forEach(msg => {
            msg.classList.remove("has-selection");
        });

        hideTranslatePopup();

        if (!hasText || !selection.rangeCount) {
            hideTranslateButton();
            return;
        }

        const range = selection.getRangeAt(0);
        const container = range.commonAncestorContainer;
        const el = container.nodeType === 1 ? container : container.parentElement;
        const message = el ? el.closest(".message.received") : null;

        if (!message) {
            hideTranslateButton();
            return;
        }

        message.classList.add("has-selection");

        const rect = range.getBoundingClientRect();
        if (!rect.width && !rect.height) {
            hideTranslateButton();
            return;
        }

        translateBtn.dataset.text = selectedText;
        translateBtn.style.left = `${window.scrollX + rect.left}px`;
        translateBtn.style.top = `${window.scrollY + rect.top - 40}px`;
        translateBtn.style.display = "block";
    });

    if (translateBtn) {
        translateBtn.addEventListener("click", () => {
            const selectedText = translateBtn.dataset.text;
            if (!selectedText) return;

            const result = getMockTranslation(selectedText);

            popupFullTranslation.innerHTML = `
                <div class="popup-full-text">${result.fullTranslation}</div>
            `;

            popupWordList.innerHTML = result.parts
                .map(item => `
                    <div class="popup-word-row">
                        <span class="popup-word-cn">${item.text}</span>
                        <span class="popup-word-py">${item.pinyin}</span>
                        <span class="popup-word-en">${item.translation}</span>
                    </div>
                `)
                .join("");

            translatePopup.dataset.text = selectedText;
            translatePopup.dataset.pinyin = JSON.stringify(result.parts.map(item => item.pinyin));
            translatePopup.dataset.translation = JSON.stringify(result.parts.map(item => item.translation));
            translatePopup.dataset.fullTranslation = result.fullTranslation;

            const selection = window.getSelection();
            if (!selection.rangeCount) return;

            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            translatePopup.style.left = `${window.scrollX + rect.left}px`;
            translatePopup.style.top = `${window.scrollY + rect.bottom + 8}px`;

            translatePopup.classList.remove("hidden");
            hideTranslateButton();
        });

        translateBtn.addEventListener("mousedown", (e) => {
            e.preventDefault();
        });
    }

    if (saveWordBtn) {
        saveWordBtn.addEventListener("click", () => {
            const entry = {
                text: translatePopup.dataset.text,
                pinyin: JSON.parse(translatePopup.dataset.pinyin || "[]"),
                translation: JSON.parse(translatePopup.dataset.translation || "[]")
            };

            if (!entry.text) return;

            savedWords.push(entry);
            console.log("Saved words:", savedWords);

            hideTranslatePopup();
            hideTranslateButton();
            window.getSelection().removeAllRanges();
        }); 

        saveWordBtn.addEventListener("mousedown", (e) => {
            e.preventDefault();
        });

    }

        
