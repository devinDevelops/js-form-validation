const formEl = document.querySelector('form');

// const countryEl = document.getElementById('country');
// const passwordEl = document.getElementById('password');
// const passwordConfirmEl = document.getElementById('password-confirm');

const blankErrorMsg = 'This field is required. Please provide a value.';

const getErrorMsgEl = inputEl =>
  document.querySelector(`#${inputEl.id} + .error-msg`);

function setErrorMsg(msg, inputEl) {
  getErrorMsgEl(inputEl).textContent = msg;
}

function giveInvalidElFocus() {
  const invalidInput = document.querySelector('input[class="invalid"]');

  if (invalidInput === null) return;

  invalidInput.focus();
}

function setInputElValid(inputEl) {
  getErrorMsgEl(inputEl).classList.add('hidden');
  inputEl.classList.remove('invalid');
  inputEl.classList.add('valid');
}

function setInputElInvalid(inputEl) {
  getErrorMsgEl(inputEl).classList.remove('hidden');
  inputEl.classList.remove('valid');
  inputEl.classList.add('invalid');
}

function checkEmail() {
  const emailEl = document.getElementById('email');
  const emVal = emailEl.value.trim();
  const re =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  const isNotValidFormat = !re.test(emVal);

  if (emVal.length === 0) {
    setInputElInvalid(emailEl);
    setErrorMsg(blankErrorMsg, emailEl);
  } else if (isNotValidFormat) {
    setInputElInvalid(emailEl);
    setErrorMsg('Please format the email as "email@example.com"', emailEl);
  } else {
    setInputElValid(emailEl);
  }
}

function checkZipCode() {
  const zcEl = document.getElementById('zip-code');
  const zcVal = zcEl.value.trim();
  const re = /^\d{5}$/gm;
  const isNotValidFormat = !re.test(zcVal);

  if (zcVal.length === 0) {
    setInputElInvalid(zcEl);
    setErrorMsg(blankErrorMsg, zcEl);
  } else if (isNotValidFormat) {
    setInputElInvalid(zcEl);
    setErrorMsg('Please enter 5 digits in a valid format. Ex. "32100"', zcEl);
  } else {
    setInputElValid(zcEl);
  }
}

// function checkCountry() {}

// function checkPassword() {}

// function checkPasswordCofirm() {}

formEl.addEventListener('submit', e => {
  e.preventDefault();
  // run each check here
  checkEmail();
  checkZipCode();
  giveInvalidElFocus();
});
