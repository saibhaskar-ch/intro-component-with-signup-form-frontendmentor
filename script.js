"use strict";

// id names below

// first-name
// last-name
// email
// password

//claim-button

const button = document.getElementById("claim-button");
const inputs = ["first-name", "last-name", "email", "password"];

button.addEventListener("click", (e) => {
  e.preventDefault();
  inputs.forEach((input) => {
    const inputElement = document.getElementById(`${input}-input`);
    inputElement.focus();
    inputElement.blur();
  });
});

function displayError(id, message) {
  const inputContainer = document.getElementById(`${id}-container`);
  const inputElement = document.getElementById(`${id}-input`);
  const errorIcon = document.getElementById(`${id}-error-icon`);
  const errorMessage = document.getElementById(`${id}-error-message`);

  inputContainer.classList.add("border-red-500");
  inputElement.classList.add("text-red-orange");
  inputElement.classList.add("placeholder:invisible");
  errorIcon.classList.add("visible");
  errorMessage.textContent = message;
  errorMessage.classList.add("block");
}

function hideError(id) {
  const inputContainer = document.getElementById(`${id}-container`);
  const inputElement = document.getElementById(`${id}-input`);
  const errorIcon = document.getElementById(`${id}-error-icon`);
  const errorMessage = document.getElementById(`${id}-error-message`);

  inputContainer.classList.remove("border-red-500");
  inputElement.classList.remove("text-red-orange");
  inputElement.classList.remove("placeholder:invisible");
  errorIcon.classList.remove("visible");
  errorMessage.classList.remove("block");
}

function assignEventListeners(id) {
  const inputContainer = document.getElementById(`${id}-container`);
  const inputElement = document.getElementById(`${id}-input`);

  inputContainer.addEventListener("click", () => {
    inputContainer.classList.add("border-black");
    inputElement.focus();
  });

  inputElement.addEventListener("focusin", () => {
    inputContainer.classList.add("border-black");
  });

  inputElement.addEventListener("focusout", () => {
    inputContainer.classList.remove("border-black");
    if (inputElement?.validity.valueMissing) {
      const name = id
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      displayError(id, `${name} cannot be empty`);
    } else if (id === "email" && inputElement?.validity.patternMismatch) {
      displayError(id, "Looks like this is not an email");
    } else {
      hideError(id);
    }
  });
}

inputs.forEach((input) => assignEventListeners(input));


