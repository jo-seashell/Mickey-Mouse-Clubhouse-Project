document.addEventListener("DOMContentLoaded", function () {
    const newChatButton = document.getElementById("newChat");
    const chatFriendButton = document.getElementById("chatFriend");
    const recordLiveButton = document.getElementById("recordLive");
    const findFriendButton = document.getElementById("friendButton");
    const findfriend = document.getElementById("findfriend");

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
            console.log("Find Friend Button clicked");
        });
    }
});