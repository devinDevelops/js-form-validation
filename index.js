const formEl = document.querySelector('form');

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

function checkCountry() {
  const countryEl = document.getElementById('country');
  const countryVal = countryEl.value.trim();
  const re = /^[a-zA-Z ]*$/; // find a new re
  const isNotValidFormat = !re.test(countryVal);
  const isTooShort = countryVal.length < 2;

  if (countryVal.length === 0) {
    setInputElInvalid(countryEl);
    setErrorMsg(blankErrorMsg, countryEl);
  } else if (isNotValidFormat || isTooShort) {
    setInputElInvalid(countryEl);
    setErrorMsg(
      'Please enter at least 2 characters. No numbers or special characters.',
      countryEl
    );
  } else {
    setInputElValid(countryEl);
  }
}

function checkPassword() {
  const passwordEl = document.getElementById('password');
  const pwVal = passwordEl.value.trim();
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  const isNotValidFormat = !re.test(pwVal);

  if (pwVal.length === 0) {
    setInputElInvalid(passwordEl);
    setErrorMsg(blankErrorMsg, passwordEl);
  } else if (isNotValidFormat) {
    setInputElInvalid(passwordEl);
    setErrorMsg(
      'Please use a minimum of 8 characters, with at least 1 uppercase character, 1 lowercase character, and 1 number. Ex. "Password1"',
      passwordEl
    );
  } else {
    setInputElValid(passwordEl);
  }
}

function checkPasswordCofirm() {
  const passwordEl = document.getElementById('password');
  const passwordConfirmEl = document.getElementById('password-confirm');
  const pwVal = passwordEl.value.trim();
  const pwcVal = passwordConfirmEl.value.trim();
  const pwsDontMatch = pwVal !== pwcVal;

  if (pwcVal.length === 0) {
    setInputElInvalid(passwordConfirmEl);
    setErrorMsg(blankErrorMsg, passwordConfirmEl);
  } else if (pwsDontMatch) {
    setInputElInvalid(passwordConfirmEl);
    setErrorMsg(
      'Passwords do not match. Please check again.',
      passwordConfirmEl
    );
  } else {
    setInputElValid(passwordConfirmEl);
  }
}

formEl.addEventListener('submit', e => {
  e.preventDefault();
  // run each check here
  checkEmail();
  checkCountry();
  checkZipCode();
  checkPassword();
  checkPasswordCofirm();
  giveInvalidElFocus();
});
