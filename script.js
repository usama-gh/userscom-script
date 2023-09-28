var reference = document.getElementById("userscom-chat").getAttribute("data-reference");
var image = document.getElementById("userscom-chat").getAttribute("data-image");
// var image = "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg";

// Define the custom element tag
function ChatBox() {
  // Create styles
  const styles = `
  
  @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
    /* Your styles go here */
    .open-button {
      background-color: #ffffff75;
      color: white;
      padding: 7px;
      border: none;
      cursor: pointer;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      backdrop-filter: blur(8px);
    }

    /* The popup chat - hidden by default */
    .chat-popup {
      align-items: end;
      display: flex;
      position: fixed;
      
      bottom: 15px;
      right: 15px;
      z-index: 9999999;
      flex-direction: column;
      row-gap:1.125rem;
    }

    /* Add styles to the form container */
    .form-container {
      display:none;
      max-width: 400px;
      width:350px;
      border-radius:15px;
      background: linear-gradient(180deg, #fff, #cad5e6);
      overflow: hidden;
    position: relative;
    }

    /* Change placeholder text color for both input and textarea */
    input::placeholder,
    textarea::placeholder {
      color: #94A3B8; /* Change this to the desired color */
    }

    
    /* Full-width textarea */
    textarea {
      width: 100%;
     
      color:#64748B;
      border: none;
      font-family: 'Inter', sans-serif;
      background: transparent;
      
      resize: none;
      min-height: 200px;
      padding:20px;
    }
    
    .textarea-wrapper{
      border-bottom: 1px solid #bdcbe2;
      display:flex;
      justify-content:center;
      align-items:center;
    }
  
    .form-container input {
      width: 50%;
      padding-left: 20px;
      padding-right: 20px;
      font-family: 'Inter', sans-serif;
      padding-top:10px;
      padding-bottom:10px;
      outline:transparent;
      border: none; 
      background: transparent;
      resize: none;
    }

    /* When the textarea gets focus, do something */
    .form-container textarea:focus {
      background: transparent;
      outline: none;
    }

    /* Set a style for the submit/send button */
    .form-container .btn {
      background-color: #dfe6f3;
    color: rgb(71, 89, 113);
    padding: 16px 20px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    width: -webkit-fill-available;
    letter-spacing: -0.4px;
    background-clip: padding-box;
    margin: 7px;
    border-radius: 9px;
    transition: background-color 0.3s;


    }
   .btn:hover{
      background-color:#ecf1f9;
    }

    /* Add a red background color to the cancel button */
    .form-container .cancel {
      background-color: red;
      width: 70px;
      float: right;
      cursor: pointer;
    }

    /* Add some hover effects to buttons */
   

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
    top: 20px;
    right: 20px;
    width: 20px !important;
  }

  .attachmentContainer svg {
    width: 20px;
    right: 20px;
    position: absolute;
    top: 20px;
    color:#bdcbe2;
  }

  #overlaySuccess {
    
   
    justify-content: center;
    align-items: center;
    position: absolute;

    width: 100%;
    inset: 0px;
    transition: 0.3s;
    background: rgb(240, 255, 242);
    z-index: 2;
    cursor: pointer;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  #successTextHeading {
    color: #8BB593;
     font-size: 42px;
    font-family: 'Inter', sans-serif;
    margin-top: 5px;
     letter-spacing:-2px;
    margin-bottom: 5px;
    text-align: center;
  }
  #text {
    display: flex;
    flex-direction: column;
    justify-content: center;

  }
  #successTextSubtitle
  {
    font-size: 14px;
    color: #8BB593;
    margin-top: 5px;
    margin-bottom: 20px;
    text-align: center
  }
  .field-wrapper {
    display:flex;
    align-items:center;
    border-bottom: 1px solid #bdcbe2 !important;

  }
  .field-wrapper > :first-child {
    border-right: 1px solid #bdcbe2 !important;
  }
  #successButton{
    border: solid 1px #8BB593;
    background-color: transparent;
    border-radius: 20px;
    color: #8BB593;
    padding: 5px 10px;
    margin: auto;
    cursor: pointer;
  }

  .successIconContainer{
    width: 50px;
    margin: auto;
  }

  `;
  
  var parentDiv = document.createElement('div');
  document.body.append(parentDiv);
  const userscomRoot = parentDiv.attachShadow({ mode: 'open' });

  const styleSheet = new CSSStyleSheet();
  styleSheet.replaceSync(styles);
  userscomRoot.adoptedStyleSheets = [styleSheet];
  
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
  var fieldsWrapper = document.createElement("div");
  fieldsWrapper.className="field-wrapper"

  var textarea = document.createElement("textarea");
  textarea.placeholder = "Type message..";
  textarea.name = "message";
  textarea.required = true;

  var textAreaWrapper = document.createElement("div");
  textAreaWrapper.className = "textarea-wrapper";

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
  fieldsWrapper.appendChild(emailInput)
  fieldsWrapper.appendChild(nameInput)
  
  textAreaWrapper.appendChild(textarea)

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

  form.appendChild(textAreaWrapper);
  // Append the input and label elements to the shadow root
  attachmentContainer.appendChild(inputFile);
  form.appendChild(attachmentContainer);

  // Create send button
  var sendButton = document.createElement("button");
  sendButton.type = "submit";
  sendButton.className = "btn";
  sendButton.textContent = "Send";

  // Create close button
  // var closeButton = document.createElement("img");
  // closeButton.src = image;
  // closeButton.className = "cancel";

  // Append elements to form

  form.appendChild(dropArea);
  form.appendChild(fieldsWrapper)

  // form.appendChild(nameInput);
  // form.appendChild(emailInput);
  form.appendChild(sendButton);
 
  // form.appendChild(closeButton);

  const overlaySuccessDiv = document.createElement('div');
  overlaySuccessDiv.id = 'overlaySuccess';
  const overlaySuccessDivText = document.createElement('div');
  overlaySuccessDivText.id = 'text';

  overlaySuccessDiv.style.display="none";

  // var successIcon = document.createElement("div");
  // successIcon.className = "successIconContainer";
  //   successIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  //   <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  // </svg>
  // `;

  // overlaySuccessDivText.appendChild(successIcon);

  var successTextHeading = document.createElement("h6");
  successTextHeading.id = "successTextHeading";
  successTextHeading.textContent = "Sent";
  overlaySuccessDivText.appendChild(successTextHeading);

  var successTextSubtitle = document.createElement("h6");
  successTextSubtitle.id = "successTextSubtitle";
  successTextSubtitle.textContent = "You will hear back from us soon";
  overlaySuccessDivText.appendChild(successTextSubtitle);

  var successButton = document.createElement("button");
  successButton.id = "successButton";
  successButton.textContent = "← Send another";
  overlaySuccessDivText.appendChild(successButton);
  
  overlaySuccessDiv.appendChild(overlaySuccessDivText);
  form.appendChild(overlaySuccessDiv);

  // Append form to chat popup
  chatPopup.appendChild(form);
  chatPopup.appendChild(img)

  // Append chat button and chat popup to the body
  // userscomRoot.appendChild(img);
  userscomRoot.appendChild(chatPopup);
  // userscomRoot.appendChild(parentDiv);
  // document.body.appendChild(img);
  // document.body.appendChild(chatPopup);

  // Add event listeners
  img.addEventListener("click", function () {
    
    if(form.style.display==='block'){
      form.style.display = "none";
    }else{
      form.style.display = "block";
    }
  });

  // img.addEventListener("click", function () {
  //   form.style.display = "none";
  // });

  var successButton = form.querySelector("#successButton");
  successButton.addEventListener("click", function () {
    // var overlayDivSuccess = chatPopup.querySelector("#overlaySuccess");
    overlaySuccessDiv.style.display="none";
    form.querySelector("#overlaySuccess").style.display = "none";
  //  form.querySelector("#overlaySuccess").style.display = "none";

    
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
          form.querySelector("#overlaySuccess").style.display = "flex";
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

        form.addEventListener("paste", (e) => {
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