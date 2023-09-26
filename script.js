var reference = document.getElementById("userscom-chat").getAttribute("data-reference");
// var image = document.getElementById("userscom-chat").getAttribute("data-image");
var image = "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png";
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
      min-height: 100px;
    }

    .form-container input {
      width: 50%;
      padding: 15px;
      margin: 5px 0 22px 0;
      border: none;
      background: #f1f1f1;
      resize: none;
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
      width: 70px;
      float: right;
      cursor: pointer;
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
  form.className = "form-container";

  // Create textarea for message input
  var textarea = document.createElement("textarea");
  textarea.placeholder = "Type message..";
  textarea.name = "message";
  textarea.required = true;

  var nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.placeholder = "Name";
  nameInput.name = "name";

  // Create an input field for the email
  var emailInput = document.createElement("input");
  emailInput.type = "text";
  emailInput.placeholder = "Email";
  emailInput.name = "email";
  emailInput.required = true;

  // Create send button
  var sendButton = document.createElement("button");
  sendButton.type = "submit";
  sendButton.className = "btn";
  sendButton.textContent = "Send";

  // Create close button
  var closeButton = document.createElement("img");
  closeButton.src = image;
  closeButton.className = "cancel";

  // Append elements to form
  form.appendChild(textarea);
  form.appendChild(nameInput);
  form.appendChild(emailInput);
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

  let userAttributes = {};
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    if(userAttributes)
    {
      formData.append('user_attributes', JSON.stringify(userAttributes))
    }

    fetch("http://127.0.0.1:8000/add/ticket/"+reference, {
            method: 'POST',
            body: formData,
        }).then((response) => {
          console.log('response...', response)
        })
  });

  document.addEventListener('updateUserAttributes', (event) => {
    userAttributes = event.detail;
    console.log('userAttributes...', userAttributes)
  });

  
}

// Automatically add chat component when the page is completely loaded
document.addEventListener("DOMContentLoaded", function () {
  if (!document.querySelector("chat-box")) {
    ChatBox();
  }
});
const userscom = {
  user: {
    set(options) {
      if (options) {
        Object.assign(this, options);
        console.log('User properties updated:', this);
        const event = new CustomEvent('updateUserAttributes', { detail: this });
        document.dispatchEvent(event);
      } else {
        console.error('No options provided');
      }
    }
  }
}