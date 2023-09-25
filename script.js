var reference = document.getElementById("userscom-chat").getAttribute("data-reference");
var image = document.getElementById("userscom-chat").getAttribute("data-image");
console.log('image...', image)

// Define the custom element tag
function ChatBox() {
  // Create styles
  var style = document.createElement("style");
  style.textContent = `
    /* Your styles go here */
    .open-button {
      background-color: white;
      color: white;
      padding: 16px;
      border: none;
      cursor: pointer;
      opacity: 0.8;
      position: fixed;
      bottom: 23px;
      right: 28px;
      width: 100px;
      border-radius: 50%;
    }

    /* The popup chat - hidden by default */
    .chat-popup {
      display: none;
      position: fixed;
      bottom: 0;
      right: 15px;
      border: 3px solid #f1f1f1;
      z-index: 9;
    }

    /* Add styles to the form container */
    .form-container {
      max-width: 300px;
      padding: 10px;
      background-color: white;
    }

    /* Full-width textarea */
    .form-container textarea {
      width: 100%;
      padding: 15px;
      margin: 5px 0 22px 0;
      border: none;
      background: #f1f1f1;
      resize: none;
      min-height: 200px;
    }

    /* When the textarea gets focus, do something */
    .form-container textarea:focus {
      background-color: #ddd;
      outline: none;
    }

    /* Set a style for the submit/send button */
    .form-container .btn {
      background-color: #04AA6D;
      color: white;
      padding: 16px 20px;
      border: none;
      cursor: pointer;
      width: 100%;
      margin-bottom: 10px;
      opacity: 0.8;
    }

    /* Add a red background color to the cancel button */
    .form-container .cancel {
      background-color: red;
    }

    /* Add some hover effects to buttons */
    .form-container .btn:hover, .open-button:hover {
      opacity: 1;
    }
  `;
  document.head.appendChild(style);

  // Create chat button
  var img = document.createElement("img");
  img.src= image;
  img.className = "open-button";

  // Create chat popup
  var chatPopup = document.createElement("div");
  chatPopup.className = "chat-popup";

  // Create form
  var form = document.createElement("form");
  form.action = "/action_page.php";
  form.className = "form-container";

  // Create heading
  var heading = document.createElement("h1");
  heading.textContent = "Chat";

  // Create label for message input
  var label = document.createElement("label");
  label.textContent = "Message";

  // Create textarea for message input
  var textarea = document.createElement("textarea");
  textarea.placeholder = "Type message..";
  textarea.name = "msg";
  textarea.required = true;

  // Create send button
  var sendButton = document.createElement("button");
  sendButton.type = "submit";
  sendButton.className = "btn";
  sendButton.textContent = "Send";

  // Create close button
  var closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "btn cancel";
  closeButton.textContent = "Close";

  // Append elements to form
  form.appendChild(heading);
  form.appendChild(label);
  form.appendChild(textarea);
  form.appendChild(sendButton);
  form.appendChild(closeButton);

  // Append form to chat popup
  chatPopup.appendChild(form);

  // Append chat button and chat popup to the body
  document.body.appendChild(img);
  document.body.appendChild(chatPopup);

  // Add event listeners
  img.addEventListener("click", function () {
    chatPopup.style.display = "block";
  });

  closeButton.addEventListener("click", function () {
    chatPopup.style.display = "none";
  });
}

// Automatically add chat component when the page is completely loaded
document.addEventListener("DOMContentLoaded", function () {
  if (!document.querySelector("chat-box")) {
    ChatBox();
  }
});
