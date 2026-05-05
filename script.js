
//menu button references

const newChatButton = document.getElementById("newChat");
const chatFriendButton = document.getElementById("chatFriend");
const recordLiveButton = document.getElementById("recordLive");
// interests and find friend button references
const findFriendButton = document.getElementById("saveBtn");
const findfriend = document.getElementById("findfriend");
const interests = document.getElementById("interests");
const backButton = document.getElementById("backBtn");
const startChatButton = document.getElementById("startChatBtn");
//convo references
//might have to change some
const sendTextButton = document.getElementById("sendTextBtn");
const textInput = document.getElementById("text-input");
const reviewBox = document.querySelector(".feature-box.review");
const translateBtn = document.getElementById("translateBtn");
const translatePopup = document.getElementById("translatePopup");
const popupFullTranslation = document.getElementById("popupFullTranslation");
const popupWordList = document.getElementById("popupWordList");
const saveWordBtn = document.getElementById("saveWordBtn");



    // used to list static list of friendes for newChat
    const friends = [
    {
        name: "Miranda",
        language: "Chinese",
        interests: ["Music", "Food", "Travel"]
    },
    {
        name: "Wei",
        language: "Mandarin Chinese",
        interests: ["Gaming", "Technology", "Movies"]
    },
    {
        name: "Amina",
        language: "Chinese",
        interests: ["Books", "Food", "Art"]
    },
    {
        name: "Sofia",
        language: "Italian",
        interests: ["Fashion", "Music", "Travel"]
    },
    {
        name: "Hiro",
        language: "Chinese",
        interests: ["Movies", "Gaming", "Food"]
    },
    {
        name: "Camille",
        language: "Chinese",
        interests: ["Art", "Movies", "Books"]
    },
    {
        name: "Mateo",
        language: "Chinese",
        interests: ["Sports", "Nature", "Music"]
    },
    {
        name: "Priya",
        language: "Chinese",
        interests: ["Science", "Technology", "Fitness"]
    },
    {
        name: "Minji",
        language: "Chinese",
        interests: ["Music", "Fashion", "Food"]
    },
    {
        name: "Daniel",
        language: "Chinese",
        interests: ["Books", "Travel", "Technology"]
    }
    ];
    // gets friendList from newChat, then iterate over prev defined list
    function displayFriends() {
        const friendList = document.getElementById("friendList");

        if (!friendList) return;

        friendList.innerHTML = "";

        const selectedInterests = JSON.parse(localStorage.getItem("checkedItems")) || [];

        const sortedFriends = friends.slice().sort(function(a, b) {
            const aMatches = a.interests.filter(function(interest) {
                return selectedInterests.includes(interest);
            }).length;

            const bMatches = b.interests.filter(function(interest) {
                return selectedInterests.includes(interest);
            }).length;

            return bMatches - aMatches;
    });

    sortedFriends.forEach(function(friend) {
        const matchCount = friend.interests.filter(function(interest) {
            return selectedInterests.includes(interest);
        }).length;

        const friendItem = document.createElement("li");

        friendItem.innerHTML = `
            <label class="friendOption">
                <input type="radio" name="selectedFriend" value="${friend.name}">
                <span class="friend-name">${friend.name}</span>
            </label>
            <p>Language: ${friend.language}</p>
            <p>Interests: ${friend.interests.join(", ")}</p>
            <p>Matching interests: ${matchCount}</p>
        `;

        friendList.appendChild(friendItem);
    });
}

displayFriends();


// used in newConvo to display selected user name
const selectedFriend = document.getElementById("selectedName")
if (selectedFriend){
    selectedFriend.textContent = localStorage.getItem("selectedFriend") || "friend"
}

if (startChatButton){
    startChatButton.addEventListener("click", function(){
        const selectedFriendInput = document.querySelector('input[name="selectedFriend"]:checked');

        if (!selectedFriendInput) {
            alert("Please select a friend first.");
            return;

        }
        localStorage.setItem("selectedFriend", selectedFriendInput.value);
        window.location.href = "newConvo.html";
    });
}

// local storage -> checkedItems
// used to get one interest that user selected in checkbox and displays it
const myInterest = document.getElementById("commonInterest");
if (myInterest){
    const selectedInterests = JSON.parse(localStorage.getItem("checkedItems")) || [];
    myInterest.textContent = selectedInterests[0] || "something fun";

}






//Manages moving between different HTML pages
function toggleMenu() {
    const menu = document.getElementById('sub-menu');
    if (menu) menu.classList.toggle('show');
}

const navLinks = [
    { btn: newChatButton, url: "newChat.html" },
    { btn: reviewBox, url: "review.html" }
];

// Initialize click listeners for all defined navigation buttons
navLinks.forEach(link => {
    if (link.btn) link.btn.addEventListener("click", () => window.location.href = link.url);
});


 //Switching views within the same page (Interests vs. Finding Friend)

if (findFriendButton && findfriend) {
    findFriendButton.addEventListener("click", () => {
        findfriend.classList.remove("hidden");
        interests.classList.add("hidden");
    });
}

if (backButton) {
    backButton.addEventListener("click", () => {
        findfriend.classList.add("hidden");
        interests.classList.remove("hidden");
    });
}


 //Handles sending messages and triggering "simulated" replies
if (sendTextButton && textInput) {
    function sendMessage() {
        const messageText = textInput.value.trim();
        if (messageText === "") return;

        const chatContainer = document.querySelector(".chat-container");
        
        //Create and display the user's message
        const newDiv = document.createElement("div");
        newDiv.classList.add("message", "sent");
        newDiv.textContent = messageText;
        chatContainer.appendChild(newDiv);
        
        textInput.value = ""; // Clear input
        chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll to bottom

        // This looks for pre-existing hidden message elements in the HTML and reveals them
        const receivedMessages = document.querySelectorAll(".received.hidden");
        receivedMessages.forEach((msg, index) => {
            setTimeout(() => {
                chatContainer.appendChild(msg);
                msg.classList.remove("hidden");
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }, 800 * (index + 1)); // Staggered delay for realism
        });
    }

    sendTextButton.addEventListener("click", sendMessage);
    textInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }
    });
}
//Simulates a dictionary lookup using a longest-match algorithm

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

    // Sort keys by length (descending) to match longer phrases before individual characters
    const words = Object.keys(dictionary).sort((a, b) => b.length - a.length);
    const parts = [];
    let remaining = text.trim();

    while (remaining.length > 0) {
        const firstChar = remaining[0];
        // Skip punctuation
        if (/^[\s,.;:!?，。！？、]/.test(firstChar)) {
            remaining = remaining.slice(1);
            continue;
        }
        
        let matched = false;
        for (const word of words) {
            if (remaining.startsWith(word)) {
                parts.push({ text: word, pinyin: dictionary[word].pinyin, translation: dictionary[word].translation });
                remaining = remaining.slice(word.length);
                matched = true;
                break;
            }
        }
        
        // Handle numbers or unknown characters
        if (!matched) {
            const numberMatch = remaining.match(/^\d+/);
            if (numberMatch) {
                const number = numberMatch[0];
                parts.push({ text: number, pinyin: number, translation: number });
                remaining = remaining.slice(number.length);
            } else {
                parts.push({ text: firstChar, pinyin: firstChar, translation: "???" });
                remaining = remaining.slice(1);
            }
        }
    }

    const normalizedText = text.replace(/[\s,.;:!?，。！？、]/g, "");
    return {
        parts,
        fullTranslation: fullSentenceDictionary[normalizedText] || parts.map(item => item.translation).join(" ")
    };
}


 //Detects when a user highlights text and shows the translation button

document.addEventListener("selectionchange", () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (!selectedText || selection.rangeCount === 0) {
        if (translateBtn) translateBtn.style.display = "none";
        return;
    }

    const range = selection.getRangeAt(0);
    const container = range.commonAncestorContainer;
    const el = container.nodeType === 1 ? container : container.parentElement;
    
    // Safety check: Only show translation for messages received from the friend
    if (el.closest(".message.received")) {
        const rect = range.getBoundingClientRect();
        if (translateBtn) {
            translateBtn.style.display = "block";
            // Position the button floating above the highlighted text
            translateBtn.style.left = `${window.scrollX + rect.left + (rect.width / 2) - 20}px`;
            translateBtn.style.top = `${window.scrollY + rect.top - 45}px`;
            translateBtn.dataset.text = selectedText;
        }
    } else {
        if (translateBtn) translateBtn.style.display = "none";
    }
});

 //Populates the popup with translation data when the floating button is clicked
 
if (translateBtn) {
    //Prevent button click from clearing the text selection
    translateBtn.addEventListener("mousedown", (e) => e.preventDefault());

    translateBtn.addEventListener("click", () => {
        const selectedText = translateBtn.dataset.text;
        const result = getMockTranslation(selectedText);

        if (popupFullTranslation) {
            popupFullTranslation.innerHTML = `<div class="popup-full-text">${result.fullTranslation}</div>`;
        }

        if (popupWordList) {
            popupWordList.innerHTML = result.parts.map(item => `
                <div class="popup-word-row">
                    <span class="popup-word-cn">${item.text}</span>
                    <span class="popup-word-py">${item.pinyin}</span>
                    <span class="popup-word-en">${item.translation}</span>
                </div>
            `).join("");
        }

        //Cache data for potential "Save" action
        translatePopup.dataset.text = selectedText;
        translatePopup.dataset.pinyin = JSON.stringify(result.parts.map(p => p.pinyin));
        translatePopup.dataset.translation = JSON.stringify(result.parts.map(p => p.translation));

        //Position and show the detailed popup
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const rect = selection.getRangeAt(0).getBoundingClientRect();
            translatePopup.style.left = `${window.scrollX + rect.left}px`;
            translatePopup.style.top = `${window.scrollY + rect.bottom + 10}px`;
            translatePopup.classList.remove("hidden");
        }
        translateBtn.style.display = "none";
    });
}

// Global click listener to close popup if user clicks away
document.addEventListener("mousedown", (e) => {
    if (translatePopup && !translatePopup.contains(e.target) && e.target !== translateBtn) {
        translatePopup.classList.add("hidden");
    }
});

//using LocalStorage for the review section
if (saveWordBtn) {
    saveWordBtn.addEventListener("mousedown", (e) => e.preventDefault());
    saveWordBtn.addEventListener("click", () => {
        const entry = {
            text: translatePopup.dataset.text,
            pinyin: JSON.parse(translatePopup.dataset.pinyin || "[]"),
            translation: JSON.parse(translatePopup.dataset.translation || "[]")
        };

        if (!entry.text) return;

        //Save to browser LocalStorage
        let currentSavedWords = JSON.parse(localStorage.getItem("vocabularyList")) || [];
        //Only save if it's not already in the list
        if (!currentSavedWords.some(item => item.text === entry.text)) {
            currentSavedWords.push(entry);
            localStorage.setItem("vocabularyList", JSON.stringify(currentSavedWords));
        }

        translatePopup.classList.add("hidden");
        window.getSelection().removeAllRanges(); // Clear highlight after saving
    });
}

const RtnHomeBtn = document.getElementById("RtnHomeBtn");
const ReviewBtn = document.getElementById("ReviewBtn");

if(RtnHomeBtn){
    RtnHomeBtn.addEventListener("click", () => {
            window.location.href = "index.html";
    });
}

if(ReviewBtn){
    ReviewBtn.addEventListener("click", () => {
        window.location.href = "review.html";
    });
}

const backHomeBtn = document.getElementById("backHomeBtn");
if(backHomeBtn){
    backHomeBtn.addEventListener("click", () => {
            window.location.href = "index.html";
    });
}