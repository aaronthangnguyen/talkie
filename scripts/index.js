const socket = io();

const messageList = document.getElementById("message-list");
const form = document.getElementById("form-container");
const messageInput = document.getElementById("message-input");
const usernameInput = document.getElementById("username-input");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (usernameInput.value && messageInput.value) {
    socket.emit("message", {
      username: usernameInput.value,
      messageContent: messageInput.value,
    });
    messageInput.value = "";
    messageInput.focus();
  }
});

socket.on("message", ({ username, messageContent }) => {
  const item = document.createElement("li");
  item.innerHTML = `<div><b>${username}:</b> ${messageContent}</div>`;
  messageList.appendChild(item);
});
