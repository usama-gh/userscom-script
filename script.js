const reference = document.getElementById("userscom-chat").getAttribute("data-reference");
// var welcomeText = document.getElementById("userscom-chat").getAttribute("welcome-text");
// const position = document.getElementById("userscom-chat").getAttribute("position");
// var image = document.getElementById("userscom-chat").getAttribute("file-name");
let ticketId;
let projectDetails;
// const BASE_URL = "http://127.0.0.1:9000";
const BASE_URL = "https://app.userscom.com";


// Define the custom element tag
function ChatBox() {

  console.log('projectDetails...', projectDetails)
  const welcomeText = projectDetails && projectDetails.welcome_text || 'Need Help'
  const position = projectDetails && projectDetails.position || 'br'
  const image = projectDetails && projectDetails.image ? 'https://assets.userscom.com/'+projectDetails.image : 'https://assets.userscom.com/project_avatar.jpg'
  // Create styles
  const styles = `
  
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
    /* Your styles go here */
    .open-button {
      background-color: #ffffffcc;
      color: white;
      padding: 7px;
      border: none;
      cursor: pointer;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      backdrop-filter: blur(8px);
      box-shadow:rgb(0 0 0 / 8%) 3px 5px 14px 2px;
    }
    .userscom_body{
      background: rgb(255, 255, 255);
      border-radius: 15px;
      box-shadow: rgba(100, 116, 139, 0.09) 0px 1px 13px;
      margin: 7px;
    }
    .welcomeMsgLeft{
      position: absolute;
      bottom: 40px;
      left: 0px;
      background: rgba(255, 255, 255, 0.62);
      transform: translateX(75%);
      padding: 4px 8px 4px 8px;
      font-size: 13px;
      backdrop-filter: blur(7px);
      width: max-content;
      border-radius: 55px 55px 55px 1px;
      border:1.5px solid rgb(0 0 0 / 11%);
    }
    .welcomeMsg {
      position: absolute;
    bottom: 40px;
    left: 0px;
    background: rgba(255, 255, 255, 0.62);
    transform: translateX(-75%);
    padding: 4px 8px 4px 8px;
    font-size: 13px;
    backdrop-filter: blur(7px);
    width: max-content;
    border-radius: 55px 55px 1px 55px;
    border:1.5px solid rgb(0 0 0 / 11%);
    }
    /* The popup chat - hidden by default */
    .chat-popup {
      align-items: end;
      display: flex;
      position: fixed;
      font-family: 'Inter', sans-serif;
      bottom: 15px;
      right: 15px;
      z-index: 9999999;
      flex-direction: column;
      row-gap:1.125rem;
    }

    .userscom_header{
      padding:0px 20px;
    

    }
    .userscom_heading {
      font-size: 20px;
      color:rgb(128 138 153);
      font-weight: 600;
      font-family: 'Inter', sans-serif;
      letter-spacing: -0.04px;
    }
    .chat-popup-left {
      align-items: start;
      display: flex;
      position: fixed;
      font-family: 'Inter', sans-serif;
      bottom: 15px;
      left: 15px;
      z-index: 9999999;
      flex-direction: column;
      row-gap:1.125rem;
    }

    /* Add styles to the form container */
    .form-container {
      display:none;
      max-width: 400px;
      width:350px;
      position:relative;
      border-radius:20px;
      background:linear-gradient(36deg, rgb(242, 246, 255), rgb(255 255 255));
      overflow: hidden;
    position: relative;
    box-shadow:rgba(0, 0, 0, 0.16) 0px 5px 40px;
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
      border-bottom: 1px solid rgb(241 241 241);
      display:flex;
      position:relative;
      justify-content:center;
      align-items:center;
    }
  
    .form-container input {
      width: 50%;
      padding-left: 14px;
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
      position:relative;
      background-color: #f3f7ff;
    color: rgb(71, 89, 113);
    padding: 16px 20px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    width: -webkit-fill-available;
    letter-spacing: -0.4px;
    background-clip: padding-box;
    margin: 7px 7px 7px;
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
   
      position: absolute;
    transform: translateY(-100%);
    padding:9px;
  }


  #image-preview img{
    border-radius: 6px;
    max-height: 60px;
  }

  #iconContainer
  {
    
    background: #fff;
    border-radius: 30px;
    box-shadow: 0px 0 3px #00000054;
    display: flex;
    align-items: center;
    justify-content: center;
    top:0;
    right:0;
    cursor:pointer;
    position:absolute;
  }


  #extensionDiv {
    background: white;
    display: flex;
    justify-content: center;
    border-radius: 10px;
    padding-left: 20px;
    padding-right: 20px;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 2px;
  
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
    color:rgb(241 241 241);
  }

  #overlaySuccess {
    
   
    justify-content: center;
    align-items: center;
    position: absolute;
    flex-direction: column;
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
    margin-top: 5px;
    margin-bottom: 20px;
    text-align: center
  }
  .field-wrapper {
    display:flex;
    align-items:center;
    border-bottom: 1px solid rgb(241 241 241) !important;

  }
  .field-wrapper > :first-child {
    border-right: 1px solid rgb(241 241 241) !important;
  }
  #successButton{
    background: transparent;
    border-radius: 20px;
    padding: 5px 10px;
    margin: auto;
    color:#ffffff;
    font-size:11px;
    cursor: pointer;
  }

  .successIconContainer{
    width: 50px;
    margin: auto;
  }

  .water-mark-text{
    text-align: center;
    font-size: 11px;
    color:#7c818b;
  }
  .water-mark-container{
    margin-top:9px;
    margin-bottom:9px;
  }

  .button--loading{color:transparent !important;} .button--loading::after { content: ""; position: absolute; width: 16px; height: 16px; top: 0; left: 0; right: 0; bottom: 0; margin: auto; border: 4px solid transparent; border-top-color: #7a8696; border-radius: 50%; animation: button-loading-spinner 1s ease infinite; } @keyframes button-loading-spinner { from { transform: rotate(0turn);}to {transform: rotate(1turn);}}

  `;
  
  var parentDiv = document.createElement('div');
  document.body.append(parentDiv);
  const userscomRoot = parentDiv.attachShadow({ mode: 'open' });
  let uploadedFile = null;
  const styleSheet = new CSSStyleSheet();
  styleSheet.replaceSync(styles);
  userscomRoot.adoptedStyleSheets = [styleSheet];
  
  // Create chat button
  if(projectDetails && projectDetails.icon != 'image')
  {
    var img = document.createElement("div");
    var svg;

    switch (projectDetails.icon) {
      case '1':
        svg = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=""><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>';
        break;

      case '2':
        svg = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>';
        break;

      case '3':
        svg = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.810.22 1.668.337 2.555.337z" /></svg>';
        break;

      default:
    }

    console.log('svg')
    img.innerHTML = svg;
    img.className = "open-button";


  }
  else{
    var img = document.createElement("img");
    img.src=  image;
    img.className = "open-button";
  }

  // Create chat popup
  var chatPopup = document.createElement("div");
  if(position && position == 'bl')
  {
    chatPopup.className = "chat-popup-left";
  }
  else{
    chatPopup.className = "chat-popup";
  }

  var welcomeMsg = document.createElement("div");
  welcomeMsg.innerHTML=welcomeText
  if(position == 'bl')
  {
    welcomeMsg.className = 'welcomeMsgLeft'
  }
  else{
    welcomeMsg.className = "welcomeMsg";
  }

  // Create form
  var form = document.createElement("form");
  form.className = "form-container";

  var header = document.createElement("div");
  header.className="userscom_header"
  header.innerHTML="<h3 class='userscom_heading'>Message us</h3>"
  form.appendChild(header)


  var formbody = document.createElement("div");
  formbody.className="userscom_body"
  form.appendChild(formbody)


  // Create textarea for message input
  var fieldsWrapper = document.createElement("div");
  fieldsWrapper.className="field-wrapper"

  var textarea = document.createElement("textarea");
  textarea.placeholder = "Type your message..";
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

  formbody.appendChild(textAreaWrapper)

  // Append the input and label elements to the shadow root
  attachmentContainer.appendChild(inputFile);
  textAreaWrapper.appendChild(attachmentContainer);


  // Create send button
  var sendButton = document.createElement("button");
  sendButton.type = "submit";
  sendButton.className = "btn";
  sendButton.textContent = "Send";

  
  var waterMark = document.createElement("div");
  waterMark.className = "water-mark-container";

  var waterMarkText = document.createElement("p");
  waterMarkText.className = "water-mark-text";
  waterMarkText.textContent = "Chat by Userscom";
  waterMark.appendChild(waterMarkText);
  // Create close button
  // var closeButton = document.createElement("img");
  // closeButton.src = image;
  // closeButton.className = "cancel";

  // Append elements to form

  formbody.appendChild(dropArea);
  formbody.appendChild(fieldsWrapper)

  // form.appendChild(nameInput);
  // form.appendChild(emailInput);
  formbody.appendChild(sendButton);
  
 
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

  var successButton = document.createElement("a");
  successButton.id = "successButton";
  successButton.textContent = "Send another";
  overlaySuccessDivText.appendChild(successButton);
  
  overlaySuccessDiv.appendChild(overlaySuccessDivText);
  form.appendChild(overlaySuccessDiv);

  // Append form to chat popup
  chatPopup.appendChild(form);
  chatPopup.appendChild(img)
  
  setTimeout(function(){ 
    if(welcomeText)
    {
      chatPopup.appendChild(welcomeMsg)
    }

   }, 7000);


 

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
      welcomeMsg.style.display="block"
    }else{
      form.style.display = "block";
      welcomeMsg.style.display="none"
    }
  });
 
  // img.addEventListener("click", function () {
  //   form.style.display = "none";
  // });

  var successButton = form.querySelector("#successButton");
  successButton.addEventListener("click", function () {
    var overlayDivSuccess = chatPopup.querySelector("#overlaySuccess");
    overlayDivSuccess.style.display="none";
    // form.querySelector("#overlaySuccess").style.display = "flex";
  //  form.querySelector("#overlaySuccess").style.display = "none";

    
  });

  let userAttributes = {};
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const fileInput = form.querySelector('#fileInput');
    const file = fileInput ? fileInput.files[0] : null;
    if (file || uploadedFile) {
        formData.append('attachment', file || uploadedFile);
    }

    if(userAttributes)
    {
      formData.append('user_attributes', JSON.stringify(userAttributes))
    }
    const endPoint = ticketId && ticketId != undefined ? BASE_URL+"/edit/ticket/"+ticketId : BASE_URL+"/add/ticket/"+reference;
    sendButton.classList.add("button--loading");
    fetch(endPoint, {
            method: 'POST',
            body: formData,
        }).then((response) => {
          return response.json();
        })
        .then((data) => {
          ticketId = data
          form.querySelector("#overlaySuccess").style.display = "flex";

          successButton.style.backgroundColor='#78c27d'
          successTextHeading.textContent='Sent'
          successTextSubtitle.textContent='You will hear from us very soon'
          overlaySuccessDiv.style.backgroundColor='rgb(234 255 237)';
          overlaySuccessDivText.style.color='#78c27d';
          
          // for (let i = 0; i < form.length; i++) {
          //     if (form[i].type !== "submit") {
          //         form[i].value = "";
          //     }
          // }
          
          if(localStorage.getItem('userscomPlan') && localStorage.getItem('userscomPlan') == 0)
          {
            overlaySuccessDiv.appendChild(waterMark);
          }
          sendButton.classList.remove("button--loading");
          
        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch
          form.querySelector("#overlaySuccess").style.display = "flex";
          successButton.style.backgroundColor='#ff8282'
          successTextHeading.textContent='Error'
          successTextSubtitle.textContent='Something went wrong. Try again later.'
          overlaySuccessDiv.style.backgroundColor='rgb(255 234 239)';
          overlaySuccessDivText.style.color='#ff8282';
          if(localStorage.getItem('userscomPlan') && localStorage.getItem('userscomPlan') == 0)
          {
            overlaySuccessDiv.appendChild(waterMark);
          }
          sendButton.classList.remove("button--loading");
        });

       
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
          uploadedFile = file
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
                  iconContainer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="13px" height="13px" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>';
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
                const text = document.createElement('p');
                text.textContent = fileExtension;
                iconContainer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="13px" height="13px" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>';
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

fetch(BASE_URL+"/api/project/details/"+reference, { method: 'GET' }).then((response) => {
  return response.json();
})
.then((data) => {
  localStorage.setItem("userscomPlan", data.plan)
  projectDetails = data
})
.catch((error) => {
  console.error('Error:', error);
});

// Automatically add chat component when the page is completely loaded
document.addEventListener("DOMContentLoaded", function () {
  if (!document.querySelector("chat-box")) {
    setTimeout(() => {
      ChatBox();
    }, 1000)
    
  }
  
});