function toggleMenu() {
    const menu = document.getElementById('sub-menu');
    menu.classList.toggle('show');
}
//defining buttons under toggle Menu
const newChatButton = document.getElementById("newChat");
const chatFriendButton = document.getElementById("chatFriend");
const recordLiveButton = document.getElementById("recordLive");


//adding event listeners for each button
newChatButton.addEventListener("click", function(){
    console.log("Start a new Chat button clicked ")
    window.location.href = "newChat.html"; //opens newChat html page
})
chatFriendButton.addEventListener("click", function(){
    console.log("Chat with friend button clicked ")
    window.location.href = "chatFriend.html"; //opens chatFriend html page
})
recordLiveButton.addEventListener("click", function(){
    console.log("Live record button clicked ")
    window.location.href = "recordLive.html"; //opens liveRecord html page
})