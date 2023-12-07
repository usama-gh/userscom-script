const reference = document.getElementById("userscom-chat").getAttribute("data-reference");
const items = document.getElementById("userscom-chat").getAttribute("data-items");
const fields = JSON.parse(document.getElementById("userscom-chat").getAttribute("data-fields"));

const userscomHost = document.getElementById("userscom-form");
const userscomRoot = userscomHost.attachShadow({ mode: "open" });
let uploadedFile = null;
const styles = ` #parent-div{ position: relative; padding: 2rem 1rem; max-width:900px; margin-left: auto; margin-right: auto; } form { display:flex; flex-direction: column; row-gap: 0.675rem; /* 14px */ width: 100%; justify-content: center; } input, textarea, select {box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); font-size:0.875rem;border: 1px solid #dddddd; padding: 15px 10px; border-radius: 10px; font-family: 'Inter', sans-serif; } ::placeholder { color: #9C9C9C; } #fileInputLabel{ color: #9C9C9C; font-family: 'Inter', sans-serif; font-size: 12px; } #submitButton { position:relative; background-color: #4E4E4E; color: #FFFFFF; width: fit-content; border-radius: 12px; border: none; font-weight:bold; font-size:0.875rem; font-family: 'Inter', sans-serif; cursor: pointer; padding: 15px 25px; transition: 0.3s;box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); } #submitButton:hover { background-color: #191919; } #overlaySuccess { display: flex; justify-content: center; align-items: center; position: absolute; display: none; width: 100%; inset: 0px; transition: 0.3s; background-color: #EAFFEE; z-index: 2; cursor: pointer; height: 100%; top: 0; left: 0; right: 0; bottom: 0; } #successTextHeading { color: #8BB593; font-size: 42px; font-family: 'Inter', sans-serif; margin-top: 5px; letter-spacing:-2px; margin-bottom: 5px; } #successTextSubtitle {  font-family: 'Inter', sans-serif;font-size: 14px; color: #8BB593; margin-top: 5px; margin-bottom: 20px; } #successButton{ border: solid 1px #8BB593; background-color: transparent; border-radius: 20px; color: #8BB593; padding: 5px 10px; cursor: pointer; } #overlayFailed { display: flex; justify-content: center; align-items: center; position: absolute; display: none; width: 100%; inset: 0px; transition: 0.3s; background-color: #FFEAEA; z-index: 2; cursor: pointer; height: 100%; top: 0; left: 0; right: 0; bottom: 0; } #failedTextHeading { color: #FF6666; font-size: 42px; font-family: 'Inter', sans-serif; margin-top: 5px; letter-spacing:-2px; margin-bottom: 5px; } #failedTextSubtitle { font-family: 'Inter', sans-serif;font-size: 14px; color: #FF6666; margin-top: 5px; margin-bottom: 20px; } #failedButton{ border: solid 1px #FF6666; background-color: transparent; border-radius: 20px; color: #FF6666; padding: 5px 10px; cursor: pointer; } #text{ text-align: center; font-size: 50px; color: white; display: flex; flex-direction: column; align-items: center; height: 100%; justify-content: center; } #drop-area { font-family: 'Inter', sans-serif; position:relative;font-size:0.875rem; color:#9c9c9c; border-radius: 10px;box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); border: 1px dashed #ccc; padding: 20px; text-align: center; } #image-preview { margin-top:18px; height: 100px; width:fit-content; margin-left:auto;margin-right:auto; position:relative; } #image-preview img{border-radius:10px; height: 100px; box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1); } #image-preview #iconContainer { background:#fff; border-radius:100%; box-shadow:0 0 2px #0000003d;right: -9px; top:-9px; } #extensionDiv { background: lightgray; display: flex; justify-content: center; border-radius: 10px; } #iconContainer { cursor: pointer; width: 20px; height: 20px; right: 30px; position: absolute; } .imagePicker { font-size: 10px; top:0px;left:0px; width:100%; height:58px; position: absolute; opacity: 0; cursor: pointer; } .button--loading{color:transparent !important;}.water-mark-text{font-family: 'Inter', sans-serif; text-align: center; font-size: 11px; color:#7c818b;} .water-mark-container{ display: flex; justify-content: right; width: fit-content; float: right; margin-top:9px; margin-bottom:9px; } .button--loading::after { content: ""; position: absolute; width: 16px; height: 16px; top: 0; left: 0; right: 0; bottom: 0; margin: auto; border: 4px solid transparent; border-top-color: #ffffff; border-radius: 50%; animation: button-loading-spinner 1s ease infinite; } @keyframes button-loading-spinner { from { transform: rotate(0turn);}to {transform: rotate(1turn);}}`;
const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(styles);
userscomRoot.adoptedStyleSheets = [styleSheet];
let projectDetails;



const predefinedFields = [
    {
      checked: true,
      disabled: true,
      value: "name",
      title: "Full Name",
      type: 'text',
    },
    {
      checked: false,
      value: "company",
      title: "Company Name",
      type: 'text',
    },
    {
      checked: true,
      value: "phone",
      title: "Phone Number",
      type: 'text',
    },
    {
      checked: true,
      value: "email",
      title: "Email",
      type: 'text',
    },
    {
      checked: true,
      value: "message",
      title: "Message",
      type: 'textarea',
    },
    {
      checked: false,
      value: "first_name",
      title: "First Name",
      type: 'text',
    },
    {
      checked: false,
      value: "last_name",
      title: "Last Name",
      type: 'text',
    },
    {
      checked: false,
      value: "priority_id",
      title: "Priority",
      type: 'select',
    },
    {
      checked: false,
      value: "address",
      title: "Address",
      type: 'textarea',
    },
    {
      checked: false,
      value: "website_url",
      title: "Website URL",
      type: 'text',
    },
    {
      checked: false,
      value: "how_did_you_hear_about_us",
      title: "How did you hear about us?",
      type: 'text',
    },
    {
      checked: true,
      value: "attachment",
      title: "Attachment",
      type: 'file',
    },
  ];

const form = document.createElement("form");

fields.forEach((field) => {
    foundField = predefinedFields.find(i => i.value === field)
    if (field && foundField) {
        let template = document.createElement('template');

        if (foundField.type === 'text') {
            template.innerHTML = `
                <input type="text" id="${foundField.value}" name="${foundField.value}" placeholder="${foundField.title}">
            `;
        } else if (foundField.type === 'textarea') {
            template.innerHTML = `
                <textarea id="${foundField.value}" rows="5" name="${foundField.value}" placeholder="${foundField.title}"></textarea>
            `;
        } else if (foundField.type === 'select') {
            template.innerHTML = `
                <select id="${foundField.value}" name="${foundField.value}">
                    <option value="0">None</option>
                    <option value="1">Low</option>
                    <option value="2">Medium</option>
                    <option value="3">High</option>
                </select>
            `;
        } else if (foundField.type === 'file') {
            template.innerHTML = `
                <div id="drop-area">
                    <input type="file" id="fileInput" name="${foundField.value}" class="imagePicker">
                    <label for="fileInput">Upload Attachments</label>
                </div>
            `;
        }

        form.appendChild(template.content.cloneNode(true));
    }
});

const submitButton = document.createElement("button");
submitButton.textContent = "Submit";
submitButton.id = "submitButton";




var buttonContainer = document.createElement("div");
buttonContainer.className = 'button-container';
buttonContainer.appendChild(submitButton);


form.appendChild(buttonContainer);

const parentDiv = document.createElement("div");
parentDiv.id = "parent-div";
parentDiv.appendChild(form);
const overlaySuccessDiv = document.createElement("div");
overlaySuccessDiv.id = "overlaySuccess";
const overlaySuccessDivText = document.createElement("div");
overlaySuccessDivText.id = "text";
var successTextHeading = document.createElement("h6");
successTextHeading.id = "successTextHeading";
successTextHeading.textContent = "Ta-da! It's Sent";
overlaySuccessDivText.appendChild(successTextHeading);
var successTextSubtitle = document.createElement("h6");
successTextSubtitle.id = "successTextSubtitle";
successTextSubtitle.textContent =
  "Your message is successfully sent. You will receive an email too";
overlaySuccessDivText.appendChild(successTextSubtitle);
var successButton = document.createElement("button");
successButton.id = "successButton";
successButton.textContent = "Send another";
overlaySuccessDivText.appendChild(successButton);
overlaySuccessDiv.appendChild(overlaySuccessDivText);
parentDiv.appendChild(overlaySuccessDiv);
userscomRoot.appendChild(parentDiv);
const overlayFailedDiv = document.createElement("div");
overlayFailedDiv.id = "overlayFailed";
const overlayFailedDivText = document.createElement("div");
overlayFailedDivText.id = "text";
var failedTextHeading = document.createElement("h6");
failedTextHeading.id = "failedTextHeading";
failedTextHeading.textContent = "Something went wrong";
overlayFailedDivText.appendChild(failedTextHeading);
var failedTextSubtitle = document.createElement("h6");
failedTextSubtitle.id = "failedTextSubtitle";
failedTextSubtitle.textContent =
  "Well, that didn't quite go as planned. No biggie, try sending again in a bit.";
overlayFailedDivText.appendChild(failedTextSubtitle);
var failedButton = document.createElement("button");
failedButton.id = "failedButton";
failedButton.textContent = "Send another";
overlayFailedDivText.appendChild(failedButton);
overlayFailedDiv.appendChild(overlayFailedDivText);
parentDiv.appendChild(overlayFailedDiv);
userscomRoot.appendChild(parentDiv);
const dropArea = userscomRoot.querySelector("#drop-area");
const fileInput = userscomRoot.querySelector("#fileInput");
if (dropArea) {
  dropArea.addEventListener("dragenter", (e) => {
    e.preventDefault();
    dropArea.classList.add("dragging");
  });
  dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("dragging");
  });
  dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.classList.remove("dragging");
    const file = e.dataTransfer.files[0];
    handleFile(file);
  });
}
if (fileInput) {
  fileInput.addEventListener("change", (e) => {
    console.log("file change");
    const file = e.target.files[0];
    handleFile(file);
  });
}
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
  uploadedFile = file
  const fileExtension = file.name.split(".").pop();
  const existingExtensionDiv = userscomRoot.querySelector("#extensionDiv");
  if (existingExtensionDiv) {
    existingExtensionDiv.remove();
  }
  const previewImage = userscomRoot.querySelector("#image-preview");
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
      const iconContainer = document.createElement("div");
      iconContainer.id = "iconContainer";
      iconContainer.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>';
      imagePreview.appendChild(iconContainer);
      imagePreview.appendChild(imgElement);
      dropArea.appendChild(imagePreview);
      iconContainer.addEventListener("click", (e) => {
        const fileInput = userscomRoot.querySelector("#fileInput");
        if (fileInput) {
          fileInput.value = "";
        }
        const extensionDiv = userscomRoot.querySelector("#extensionDiv");
        if (extensionDiv) {
          extensionDiv.innerHTML = "";
        }
        const imagePreview = userscomRoot.querySelector("#image-preview");
        if (imagePreview) {
          imagePreview.remove();
        }
      });
    };
    reader.readAsDataURL(file);
  } else {
    const extensionDiv = document.createElement("div");
    extensionDiv.id = "extensionDiv";
    const iconContainer = document.createElement("div");
    iconContainer.id = "iconContainer";
    const text = document.createElement("h3");
    text.textContent = fileExtension;
    iconContainer.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
    extensionDiv.appendChild(iconContainer);
    extensionDiv.appendChild(text);
    dropArea.appendChild(extensionDiv);
    reader.readAsDataURL(file);
    iconContainer.addEventListener("click", (e) => {
      const fileInput = userscomRoot.querySelector("#fileInput");
      if (fileInput) {
        fileInput.value = "";
      }
      const extensionDiv = userscomRoot.querySelector("#extensionDiv");
      if (extensionDiv) {
        extensionDiv.innerHTML = "";
      }
      const imagePreview = userscomRoot.querySelector("#imagePreview");
      if (imagePreview) {
        imagePreview.innerHTML = "";
      }
    });
  }
}
let userAttributes = {};
userscomRoot.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  submitButton.classList.add("button--loading");
  const formData = new FormData(userscomRoot.querySelector("form"));
  const fileInput = userscomRoot.querySelector("#fileInput");
  const file = fileInput ? fileInput.files[0] : null;
  if (file || uploadedFile) {
    formData.append("attachment", file || uploadedFile);
  }
  console.log("userAttributes...", userAttributes);
  if (userAttributes) {
    formData.append("user_attributes", JSON.stringify(userAttributes));
  }
  fetch("https://app.userscom.com/add/ticket/"+reference, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        userscomRoot.querySelector("#overlaySuccess").style.display = "block";
        const formElements = userscomRoot.querySelector("form").elements;
        for (let i = 0; i < formElements.length; i++) {
          if (formElements[i].type !== "submit") {
            formElements[i].value = "";
          }
        }
        submitButton.classList.remove("button--loading");
      } else {
        userscomRoot.querySelector("#overlayFailed").style.display = "block";
        submitButton.classList.remove("button--loading");
      }
    })
    .catch(() => {
      userscomRoot.querySelector("#overlayFailed").style.display = "block";
    });
});
document.addEventListener("updateUserAttributes", (event) => {
  userAttributes = event.detail;
  console.log("userAttributes...", userAttributes);
});
var successButton = userscomRoot.querySelector("#successButton");
var failedButton = userscomRoot.querySelector("#failedButton");
function hideOverlay() {
  var overlayDivSuccess = userscomRoot.querySelector("#overlaySuccess");
  var overlayDivFailed = userscomRoot.querySelector("#overlayFailed");
  if (overlayDivSuccess) {
    overlayDivSuccess.style.display = "none";
  }
  if (overlayDivFailed) {
    overlayDivFailed.style.display = "none";
  }
}
successButton.addEventListener("click", hideOverlay);
failedButton.addEventListener("click", hideOverlay);

const userscom = {
  user: {
    set(options) {
      if (options) {
        Object.assign(this, options);
        console.log("User properties updated:", this);
        const event = new CustomEvent("updateUserAttributes", { detail: this });
        document.dispatchEvent(event);
      } else {
        console.error("No options provided");
      }
    },
  },
};

fetch("https://app.userscom.com/api/project/details/"+reference, { method: 'GET' }).then((response) => {
  return response.json();
})
.then((data) => {
  projectDetails = data
  console.log(data);
  if(projectDetails?.plan == 0)
{

  var waterMark = document.createElement("div");
waterMark.className = "water-mark-container";

var waterMarkText = document.createElement("p");
waterMarkText.className = "water-mark-text";
waterMarkText.textContent = "Chat by Userscom";
waterMark.appendChild(waterMarkText);

  var watemarkContainer=parentDiv.querySelector('.button-container')
  watemarkContainer.appendChild(waterMark);
}
})
.catch((error) => {
  console.error('Error:', error);
})