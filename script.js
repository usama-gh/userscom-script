const reference = document.getElementById("userscom-chat").getAttribute("data-reference");
let ticketId;
let projectDetails;
let responseData;

// const BASE_URL = "http://127.0.0.1:8000";
const BASE_URL = "https://app.userscom.com";
let userAttributes = {};
document.addEventListener('updateUserAttributes', (event) => {
  userAttributes = event.detail;
  console.log('userAttributes...', userAttributes)
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



// Define the custom element tag
function ChatBox() {

  console.log('projectDetails...', projectDetails)
  const welcomeText = projectDetails && projectDetails.welcome_text || 'Need Help'
  const position = projectDetails && projectDetails.position || 'br'
  const image = projectDetails && projectDetails.image ? 'https://assets.userscom.com/'+projectDetails.image : 'https://assets.userscom.com/project_avatar.jpg'
  // Create styles
  const styles = `
  


.tabs {
  display: flex;
  position: relative;
  background-color: #517eea1f;
  // box-shadow: 0 0 1px 0 rgba(24, 94, 224, 0.15), 0 6px 12px 0 rgba(24, 94, 224, 0.15);
  padding: 2px;
  border-radius: 99px;
}
.tabs * {
  z-index: 2;
}

input[type=radio] {
  display: none;
}
.past_tickets {
  display:none;
  background-color: white;
  border-radius: 15px;
  margin: 0px 5px 5px 5px;
  padding: 5px;
  max-height:341px;
  overflow-y:auto;
  min-height:341px;
}

.ticket-item{
  background-color: white;
  border-radius: 53px;
  margin: 10px 4px;
  position:relative;
  padding: 8px 10px;
  box-shadow: 0px 0px 8px 0px rgb(0 0 0 / 7%);
}

.tab {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 92px;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 99px;
  cursor: pointer;
  transition: color 0.15s ease-in;
}

input[type=radio] + label {
  color: #7f8fb1;
}

input[type=radio]:checked + label {
  color: rgb(51 80 142);
}


input[id=radio-1]:checked ~ .glider {
  transform: translateX(0);
}

input[id=radio-2]:checked ~ .glider {
  transform: translateX(100%);
}

.ticket_time{
  font-size:0.65rem;
  color:#767676;
}


.viewticket_button{
  font-size: 0.75rem;
  background: #dbe6ff;
  color: #33508e;
  text-align: center;
  padding: 6px 14px;
  text-decoration: none;
  transition:all 200ms ease-in;
  border-radius: 50px;
}
.viewticket_button:hover{
  background: #d1ddf7;
}

.glider {
  position: absolute;
  display: flex;
  height: 30px;
  width: 92px;
  background-color: #ffffff;
  z-index: 1;
  border-radius: 99px;
  transition: 0.25s ease-out;
}

@media (max-width: 700px) {
  .tabs {
    transform: scale(0.6);
  }
}



    /* Your styles go here */
    .open-button {
      background-color: #ffffffcc;
      color: rgb(71 77 113);
      padding: 7px;
      border: none;
      cursor: pointer;
      width: 35px;
      height: 35px;
      display:flex;
      justify-content:center;
      align-items:center;
      border-radius: 50%;
      backdrop-filter: blur(8px);
      box-shadow:rgb(0 0 0 / 8%) 3px 5px 14px 2px;
    }
    .open-button svg {
      width: 24px;
    }
    .userscom_body{
      position:relative;
      background: rgb(255, 255, 255);
      border-radius: 15px;
      box-shadow: rgba(100, 116, 139, 0.09) 0px 1px 13px;
      margin: 0px 5px 5px 5px;
    }
    .welcomeMsgLeft{
      position: absolute;
      bottom: 40px;
      right: 10px;
      background: rgba(255, 255, 255, 0.62);
      transform: translateX(100%);
      padding: 4px 8px 4px 8px;
      font-size: 13px;
      backdrop-filter: blur(7px);
      width: max-content;
      border-radius: 55px 55px 55px 1px;
      border: 1.5px solid rgb(0 0 0 / 11%);
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
      row-gap:0.55rem;
    }

    .userscom_header{
      padding: 0px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    

    }
    .userscom_heading {
      font-size: 20px;
      color:rgb(51 80 142);
      font-weight: 600;
      font-family: 'Inter', sans-serif;
      letter-spacing: -0.50px;
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
      row-gap:0.55rem;
    }

    /* Add styles to the form container */
    .form-container {
      display:none;
      max-width: 400px;
      width:370px;
      position:relative;
      border-radius:20px;
      background:linear-gradient(36deg, rgb(177 201 255), rgb(255 255 255));
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
     
      color:rgb(51 80 142);
      border: none;
      font-family: 'Inter', sans-serif;
      background: transparent;
      
      resize: none;
      min-height: 250px;
      padding:20px;
    }
    
    .textarea-wrapper{
      border-bottom: 1px solid rgb(241 241 241);
      display:flex;
      position:relative;
      justify-content:center;
      align-items:center;
    }
  
    .form-container input[type="text"] {
      width: 50%;
      padding-left: 14px;
      padding-right: 20px;
      font-family: 'Inter', sans-serif;
      padding-top:10px;
      padding-bottom:10px;
      outline:transparent;
      color:rgb(51 80 142);
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
      background-color: rgb(221 232 255);
    color: rgb(51 80 142);
    padding: 16px 20px;
    border: none;
    font-weight: 600 !important;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    width: -webkit-fill-available;
    letter-spacing: -0.4px;
    background-clip: padding-box;
    margin: 7px 7px 7px;
    border-radius: 9px;
    transition: background-color 0.3s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    column-gap:3px;


    }
   .btn:hover{
      background-color:rgb(213 225 248);
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
    cursor:pointer;
    color:rgb(192 192 192);
  }

  #overlaySuccess {
    
   
    justify-content: center;
    align-items: center;
    position: absolute;
    flex-direction: column;
    width: 100%;
    inset: 0px;
    transition: 0.3s;
    background: #ffffff;
    z-index: 2;
    cursor: pointer;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  #successTextHeading {
     font-size: 30px;
    font-family: 'Inter', sans-serif;
    margin-top: 5px;
     letter-spacing:-2px;
    margin-bottom: 5px;
    text-align: center;
    font-weight:600;
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
    text-align: center;
    font-weight:400;
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

  .custom-flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.custom-flex-items {
    display: flex;
    align-items: center;
    gap: 0.6rem;
}

.custom-avatar-container {
    width: 2rem;
    height: 2rem;
    position:relative;
    background: linear-gradient(45deg, #fdfeff, #d8e4ff);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.0rem;
    text-transform:uppercase;
    color: #6290ff;
    font-weight: 500;
}

.custom-text-container {
    display: flex;
    flex-direction: column;
    row-gap: 2px;
}

.custom-text-container p {
 margin:0px;
}

.custom-message-text {
    font-size: 0.78rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 185px;
}

.redCounter{
  position: absolute;
    right: 0px;
    z-index:1;
    top: -8px;
    background: #ff2727;
    padding: 3px 6px;
    border-radius: 34px;
    color: #fff;
    font-size: 9px;
}
.custom-button {
    padding: 0.75rem 1.5rem;
    border-radius: 999px;
    font-size: 1.2rem;
    background-color: #4F46E5;
    color: #fff;
}

.align-self-center{
  align-self: center;
}
.info-message {
  height:341px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #b1b1b1;
  row-gap: 6px;
}
.info-text {
font-weight:500;
font-size:0.9rem;
}
.responseCount{
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  top: -3%;
}
.responseCountHeading{
  padding: 4px 10px;
  margin:0px;
  text-align: center;
  font-weight: 300;
  font-size: 11px;
  background: #517eea;
  box-shadow:1px 1px 7px #00000036;
  color: #fff;
  border-radius: 20px;

}

  `;
  
  var parentDiv = document.createElement('div');
  document.body.append(parentDiv);
  const userscomRoot = parentDiv.attachShadow({ mode: 'open' });

  const style = document.createElement('style');

  const linkElement = document.createElement('link');
linkElement.rel = 'stylesheet';
linkElement.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap';

// Append the link element to the shadow DOM root
document.head.appendChild(linkElement);


  const styleElement = document.createElement('style');
  styleElement.textContent = styles;

  // Append the style element to the shadow DOM
  userscomRoot.appendChild(styleElement);

  
  let uploadedFile = null;
  // const styleSheet = new CSSStyleSheet();
  // styleSheet.replaceSync(styles);
  // userscomRoot.adoptedStyleSheets = [styleSheet];
  
  // Create chat button
  if(projectDetails && projectDetails.icon != 'image')
  {
    var img = document.createElement("div");
    var svg;

    switch (projectDetails.icon) {
      case '1':
        svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z" clip-rule="evenodd" /></svg>';
        break;

      case '2':
        svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M5.337 21.718a6.707 6.707 0 01-.533-.074.75.75 0 01-.44-1.223 3.73 3.73 0 00.814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 01-4.246.997z" clip-rule="evenodd" /></svg>';
        break;

      case '3':
        svg = '<svg class="w-6 h-6 text-gray-700"  viewBox="0 0 364 364" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M327.6 0H36.4C26.7461 0 17.4876 3.83496 10.6613 10.6612C3.83499 17.4875 0 26.746 0 36.3998V254.798C0 264.452 3.83499 273.711 10.6613 280.537C17.4876 287.363 26.7461 291.198 36.4 291.198H91V345.798C91.0097 349.228 91.9888 352.586 93.8242 355.484C95.6597 358.382 98.2769 360.703 101.374 362.178C103.794 363.418 106.481 364.043 109.2 363.998C113.305 363.974 117.282 362.563 120.484 359.994L206.57 291.198H327.6C337.254 291.198 346.512 287.363 353.339 280.537C360.165 273.711 364 264.452 364 254.798V36.3998C364 26.746 360.165 17.4875 353.339 10.6612C346.512 3.83496 337.254 0 327.6 0Z" fill="currentColor" /></svg>';
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
  var form = document.createElement("div");
  form.className = "form-container";
  form.id = "userscom-form";





  var header = document.createElement("div");
  header.className="userscom_header"
  header.innerHTML="<h3 class='userscom_heading'>Message us</h3>"

  

  form.appendChild(header)

  

  var tabs = document.createElement("div")
  tabs.style.position='relative';
  tabs.innerHTML = "<div class='tabs'><input type='radio' id='radio-1' name='tabs' checked /><label class='tab' for='radio-1'>New Ticket</label><input type='radio' id='radio-2' name='tabs' /><label class='tab' for='radio-2'>Past Tickets</label><span class='glider'></span></div>";
  header.appendChild(tabs)
  

    
 


  var formbody = document.createElement("form");
  formbody.className="userscom_body"
  
  const allTickets = JSON.parse(localStorage.getItem('allTickets')) || []
  var pasttickets = document.createElement("div");
  pasttickets.id = "past_tickets"
  pasttickets.className="past_tickets"
  pasttickets.innerHTML = "";
  allTickets.map((ticket) => {
    console.log('ticketReference...', ticket.ticketReference)
    const responseCount = responseData?.responses?.filter(i => i.ticket_id == ticket.id)?.length;

    const responseSpan = responseCount && responseCount > 0 ? "<span class='redCounter'>" + (responseCount != undefined ? responseCount : 0) + "</span>" : "";
    pasttickets.innerHTML += "<div class='ticket-item'><div class='custom-flex-container'><div class='custom-flex-items'><div class='custom-avatar-container'>" + responseSpan + "" + ticket.name.charAt(0) + "</div><div class='custom-text-container'><p class='ticket_time'>" + formatDateTimeForTicket(ticket.date) + "</p><p class='custom-message-text'>" + ticket.message + "</p></div><div class='custom-text-container'></div></div><div><a class='viewticket_button' target='_blank' href='" + BASE_URL + "/ticket/conversation/" + ticket.ticketReference + "'>View</a></div></div></div>";

  })
  if(allTickets.length===0){
    pasttickets.innerHTML='<div class="info-message"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alert-circle"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg><span class="info-text">No tickets created</span></div>' 
  }


    form.appendChild(pasttickets)

  // Create textarea for message input
  var fieldsWrapper = document.createElement("div");
  fieldsWrapper.className="field-wrapper"
  const responseCount = responseData?.responses?.length
  console.log("responseCount...", responseCount)
  var responseWrapper = document.createElement("div");
  responseWrapper.className = "responseCount";
  if(responseCount > 1){
    responseWrapper.innerHTML = "<h5 class='responseCountHeading'>You've "+responseCount+" new replies</h5>";
  }else{
    responseWrapper.innerHTML = "<h5 class='responseCountHeading'>You've "+responseCount+" new reply</h5>";
  }
 

  var counterInTab = document.createElement("span");
  counterInTab.innerHTML = "<span class='redCounter'>"+responseCount+"</span>";

  tabs.appendChild(counterInTab)
  if(responseCount && responseCount > 0)
  {
    formbody.appendChild(responseWrapper)
  }
  form.appendChild(formbody)

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
  sendButton.textContent = "Submit";

  var sendIcon=document.createElement("span")
  sendIcon.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>'
  sendButton.prepend(sendIcon)
  var waterMark = document.createElement("div");
  waterMark.className = "water-mark-container";

  var waterMarkText = document.createElement("p");
  waterMarkText.className = "water-mark-text";
  waterMarkText.textContent = "Powered by Userscom";
  waterMark.appendChild(waterMarkText);


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
 





  var successTextHeading = document.createElement("div");
  successTextHeading.id="successTextHeading";
  successTextHeading.innerHTML = '<span><svg width="337" height="295" viewBox="0 0 337 295" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M336.118 0L247.748 220.955L192.509 165.732L203.548 198.863L177.771 221.019V167.098L304.099 37.0535L162.158 141.782L82.0001 121.532L336.118 0Z" fill="url(#paint0_linear_920_25)"/><path d="M145.046 211.253L78.0581 261.935" stroke="#9FCDFF" stroke-width="4" stroke-dasharray="12 12"/><path d="M110.051 165L43.0636 215.682" stroke="#9FCDFF" stroke-width="4" stroke-dasharray="12 12"/><path d="M114.39 198.082L17.4973 271.39" stroke="#9FCDFF" stroke-width="4" stroke-dasharray="12 12"/><defs><linearGradient id="paint0_linear_920_25" x1="209.059" y1="0" x2="209.059" y2="221.019" gradientUnits="userSpaceOnUse"><stop stop-color="#278EFF"/><stop offset="1" stop-color="#ABD3FF" stop-opacity="0.63"/></linearGradient></defs></svg></span><span>Ticket Sent</span>';
  overlaySuccessDivText.appendChild(successTextHeading);

  var successTextSubtitle = document.createElement("h6");
  successTextSubtitle.id = "successTextSubtitle";
  successTextSubtitle.textContent = "You will receive a response via email";
  overlaySuccessDivText.appendChild(successTextSubtitle);

  var successButton = document.createElement("a");
  successButton.id = "successButton";
  successButton.textContent = "Edit ticket";
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

  header.addEventListener('change', function (event) {
    if (event.target.type === 'radio' && event.target.name === 'tabs') {
        var selectedTab = event.target.id;
        if(selectedTab==="radio-2"){
            form.querySelector('.userscom_body').style.display="none"
            form.querySelector('.past_tickets').style.display="block"
        }else{
          // new ticket
          form.querySelector('.userscom_body').style.display="block"
          form.querySelector('.past_tickets').style.display="none"
        }
        console.log('Selected tab:', selectedTab);
    }
});

  img.addEventListener("click", function () {
    
    if(form.style.display==='block'){
      form.style.display = "none";
     
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

 
  formbody.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(formbody);
    const fileInput = formbody.querySelector('#fileInput');
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
          ticketId = data.id
          const ticket = {
            id: ticketId,
            date: new Date().toString(),
            name: formData.get('name') || formData.get('email'),
            message: formData.get('message'),
            ticketReference: data.reference
          }

          var storedArray = JSON.parse(localStorage.getItem('allTickets')) || [];
          storedArray.unshift(ticket);

          localStorage.setItem('allTickets', JSON.stringify(storedArray))
      

          form.querySelector("#overlaySuccess").style.display = "flex";

          successButton.style.backgroundColor='#2d2d2d'
          successTextHeading.innerHTML = '<span><svg width="337" height="100" viewBox="0 0 337 295" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M336.118 0L247.748 220.955L192.509 165.732L203.548 198.863L177.771 221.019V167.098L304.099 37.0535L162.158 141.782L82.0001 121.532L336.118 0Z" fill="url(#paint0_linear_920_25)"/><path d="M145.046 211.253L78.0581 261.935" stroke="#9FCDFF" stroke-width="4" stroke-dasharray="12 12"/><path d="M110.051 165L43.0636 215.682" stroke="#9FCDFF" stroke-width="4" stroke-dasharray="12 12"/><path d="M114.39 198.082L17.4973 271.39" stroke="#9FCDFF" stroke-width="4" stroke-dasharray="12 12"/><defs><linearGradient id="paint0_linear_920_25" x1="209.059" y1="0" x2="209.059" y2="221.019" gradientUnits="userSpaceOnUse"><stop stop-color="#278EFF"/><stop offset="1" stop-color="#ABD3FF" stop-opacity="0.63"/></linearGradient></defs></svg></span><span>Ticket Sent</span>';
          successTextSubtitle.textContent = "You will receive a response via email";
          overlaySuccessDiv.style.backgroundColor='#ffffff';
          overlaySuccessDivText.style.color='#202020';
          
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
          try {
            updateTickets(form)
          }catch(e){
              console.log(e)
          }
        
          
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


          
       function updateTickets(form)
       {
       
          const allTickets = JSON.parse(localStorage.getItem('allTickets')) || []
          var pasttickets = form.querySelector('.past_tickets');

         
          pasttickets.innerHTML = "";
          allTickets.map((ticket) => {
            pasttickets.innerHTML+="<div class='ticket-item'><div class='custom-flex-container'><div class='custom-flex-items'><div class='custom-avatar-container'>"+ticket.name.charAt(0)+"</div><div class='custom-text-container'><p class='ticket_time'>"+formatDateTimeForTicket(ticket.date)+"</p><p class='custom-message-text'>"+ticket.message+"</p></div><div class='custom-text-container'></div></div><div><a class='viewticket_button' target='_blank' href='"+BASE_URL+"/ticket/conversation/"+ticket.ticketReference+"'>View</a></div></div></div>";
          })
        
        
       }
  
        function formatDateTimeForTicket (dateString) {
          const currentDate = new Date();
          let inputDate;
          if (dateString && dateString != undefined) {
            inputDate = new Date(dateString);
          } else {
            inputDate = new Date(currentDate);
          }
        
          const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          };
        
          if (
            inputDate.getDate() === currentDate.getDate() &&
            inputDate.getMonth() === currentDate.getMonth() &&
            inputDate.getFullYear() === currentDate.getFullYear()
          ) {
            return `Today at ${inputDate.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
            })}`;
          } else if (
            inputDate.getDate() === currentDate.getDate() - 1 &&
            inputDate.getMonth() === currentDate.getMonth() &&
            inputDate.getFullYear() === currentDate.getFullYear()
          ) {
            return `Yesterday at ${inputDate.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
            })}`;
          } else {
            return inputDate.toLocaleDateString("en-US", options);
          }
        };

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

const allTickets = JSON.parse(localStorage.getItem('allTickets')) || [];
const ticketIds = allTickets.filter(ticket => ticket.id !== undefined).map(i => i.id);
console.log("Filtered Tickets...", reference, ticketIds);

if(reference && ticketIds && ticketIds?.length > 0)
{
  fetch(BASE_URL+"/api/unseen-tickets-count/"+reference+"/"+ticketIds, { method: 'GET' }).then((response) => {
    return response.json();
  })
  .then((data) => {
    responseData = data
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

if(reference)
{
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
}


// Automatically add chat component when the page is completely loaded
document.addEventListener("DOMContentLoaded", function () {
  if (!document.querySelector("chat-box")) {
    setTimeout(() => {
      ChatBox();
    }, 1000)
    
  }
  
});