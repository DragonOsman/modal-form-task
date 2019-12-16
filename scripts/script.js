"use strict";

const heading = document.createElement("h1");
heading.textContent = "Click the button below";
document.body.append(heading);

const button = document.createElement("button");
button.textContent = "Click to show form";
document.body.append(button);

const promptFormContainer = document.getElementById("prompt-form-container");
const originalDisplaySetting = promptFormContainer.style.display;
promptFormContainer.style.display = "none";

function showPrompt(html, callback) {
  promptFormContainer.style.display = originalDisplaySetting;
  const coverDiv = document.createElement("div");
  coverDiv.id = "cover-div";
  document.body.append(coverDiv);
  coverDiv.style.overflowY = "hidden";

  const promptForm = document.getElementById("prompt-form");

  const textInput = promptForm.querySelectorAll("input")[0];
  textInput.focus();

  const promptMessage = document.getElementById("prompt-message");
  promptMessage.innerHTML = html;

  const cancelButton = promptForm.elements[promptForm.elements.length - 1];

  promptForm.addEventListener("submit", event => {
    event.preventDefault();

    if (textInput.value === "") {
      return;
    }

    callback(`You entered: ${textInput.value}`);

    coverDiv.remove();
    promptFormContainer.style.display = "none";
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      callback(null);

      coverDiv.remove();
      promptFormContainer.style.display = "none";
    }
  });

  cancelButton.addEventListener("click", () => {
    callback(null);

    coverDiv.remove();
    promptFormContainer.style.display = "none";
  });
}

button.addEventListener("click", () => {
  showPrompt("Enter something<br>...Smart :)", alert);
});
