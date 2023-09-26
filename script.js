var reference = document.getElementById("userscom-chat").getAttribute("data-reference");
// var image = document.getElementById("userscom-chat").getAttribute("data-image");
var image = "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png";

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

    #drop-area {
      // border-radius: 12px;
      // border: 2px dashed #ccc;
      // padding: 20px;
      // text-align: center;
  }

  #image-preview {
    height: 100px;
    width: 200px;
  }

  #image-preview img{
    height: 100px
  }

  #image-preview #iconContainer
  {
    right: 20px;
  }

  #extensionDiv {
    background: lightgray;
    display: flex;
    justify-content: center;
    border-radius: 10px;
  }

  #iconContainer {
    cursor: pointer;
    width: 20px;
    height: 20px;
    right: 30px;
    position: absolute;
  }

  .imagePicker {
    font-size: 1px;
    position: absolute;
    opacity: 0;
    cursor: pointer;
    top: 80px;
    right: 20px;
    width: 20px !important;
  }

  .attachmentContainer svg {
    width: 20px;
    right: 30px;
    position: absolute;
    top: 90px;
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

  // Drop Area
  const dropArea = document.createElement('div');
  dropArea.id = "drop-area";

  // Create the input element
  const inputFile = document.createElement('input');
  inputFile.type = 'file';
  inputFile.id = 'fileInput';
  inputFile.name = 'attachment';
  inputFile.className = 'imagePicker';

  const attachmentContainer = document.createElement('div');
  attachmentContainer.className = 'attachmentContainer';
  attachmentContainer.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
    </svg>
  `;

  // Append the input and label elements to the shadow root
  attachmentContainer.appendChild(inputFile);
  form.appendChild(attachmentContainer);

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
  form.appendChild(dropArea);
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
    const fileInput = form.querySelector('#fileInput');
    const file = fileInput ? fileInput.files[0] : null;
    if (file) {
        formData.append('attachment', file);
    }

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

  const dropAreaDiv = form.querySelector("#drop-area");
        const fileInput = form.querySelector("#fileInput");
        
        dropAreaDiv.addEventListener("dragenter", (e) => {
            e.preventDefault();
            dropAreaDiv.classList.add("dragging");
        });

        dropAreaDiv.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        dropAreaDiv.addEventListener("dragleave", () => {
            dropAreaDiv.classList.remove("dragging");
        });

        dropAreaDiv.addEventListener("drop", (e) => {
            e.preventDefault();
            dropAreaDiv.classList.remove("dragging");

            const file = e.dataTransfer.files[0];
            handleFile(file);
        });

        fileInput.addEventListener("change", (e) => {
          console.log('file change')
            const file = e.target.files[0];
            handleFile(file);
        });

        document.addEventListener("paste", (e) => {
            const items = e.clipboardData.items;

            for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf("image") !== -1) {
                    const file = items[i].getAsFile();
                    handleFile(file);
                    break; 
                }
            }
        });

        function handleFile(file) {
          const fileExtension = file.name.split('.').pop();
          const existingExtensionDiv = form.querySelector("#extensionDiv");
          if (existingExtensionDiv) {
            existingExtensionDiv.remove();
          }
          
          const previewImage = form.querySelector("#image-preview");
          if (previewImage) {
            previewImage.remove();
          }
            const reader = new FileReader();
            if (file && file.type.startsWith("image/")) {
                reader.onload = (event) => {
                  const image = new Image();
                  image.src = event.target.result;
                  const imagePreview = document.createElement("div");
                  imagePreview.id = "image-preview";
                  const imgElement = document.createElement("img");
                  imgElement.id = "imgElement";
                  imgElement.src = event.target.result;

                  const iconContainer = document.createElement('div');
                  iconContainer.id = "iconContainer";
                  iconContainer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
                  imagePreview.appendChild(iconContainer);
                  imagePreview.appendChild(imgElement);
                  dropArea.appendChild(imagePreview);

                  iconContainer.addEventListener("click", (e) => {
                    const fileInput = form.querySelector('#fileInput');
                    if (fileInput) {
                      fileInput.value = '';
                    }
                    const extensionDiv = form.querySelector('#extensionDiv');
                    if (extensionDiv) {
                      extensionDiv.innerHTML = '';
                    }
                    const imagePreview = form.querySelector('#image-preview');
                    if(imagePreview)
                    {
                      imagePreview.remove();
                    }
                  });
                };
                reader.readAsDataURL(file);

                

            } else {
                const extensionDiv = document.createElement('div');
                extensionDiv.id = "extensionDiv";
                const iconContainer = document.createElement('div');
                iconContainer.id = "iconContainer";
                const text = document.createElement('h3');
                text.textContent = fileExtension;
                iconContainer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
                extensionDiv.appendChild(iconContainer);
                extensionDiv.appendChild(text);
                dropArea.appendChild(extensionDiv);
                reader.readAsDataURL(file);

                iconContainer.addEventListener("click", (e) => {
                const fileInput = form.querySelector('#fileInput');
                if (fileInput) {
                  fileInput.value = '';
                }
                const extensionDiv = form.querySelector('#extensionDiv');
                if (extensionDiv) {
                  extensionDiv.innerHTML = '';
                }
                const imagePreview = form.querySelector('#imagePreview');
                if(imagePreview)
                {
                  imagePreview.innerHTML = "";
                }
              });
            }
          }
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