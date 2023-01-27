// Slider
const slider = document.getElementById('sliderRange');
const sliderLabel = document.getElementById('charSlider');

// Password
const passwordText = document.getElementById('passwordText');
const copyText = document.getElementById('copyText');

// Checkboxes
const upperCase = document.getElementById('checkboxUppercase');
const lowerCase = document.getElementById('checkboxLowercase');
const numbers = document.getElementById('checkboxNumbers');
const symbols = document.getElementById('checkboxSymbols');

slider.addEventListener('input', function () {
  const x = slider.value * 5;
  const color = `linear-gradient(90deg, #a4ffaf ${x}%, #18171f ${x}%)`;
  slider.style.background = color;
  sliderLabel.innerText = slider.value;
});

const randomPassword = max => {
  let charSelection = '';
  let result = '';

  if (upperCase.checked) charSelection += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (lowerCase.checked) charSelection += 'abcdefghijklmnopqrstuvwxyz';
  if (numbers.checked) charSelection += '0123456789';
  if (symbols.checked) charSelection += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';

  for (let i = 0; i < max; i++) {
    result += charSelection.charAt(
      Math.floor(Math.random() * charSelection.length)
    );
  }

  return result;
};

const generatePassword = () => {
  copyText.classList.remove('show-text');
  let charLength = sliderLabel.innerText;

  if (charLength === '0') {
    passwordText.innerText = 'P4$5W0rD!';
    passwordText.style.opacity = ' 0.25';
    return;
  }

  passwordText.style.opacity = '1';
  passwordText.innerText = randomPassword(charLength);
};

const copyTextToClipboard = () => {
  navigator.clipboard.writeText(passwordText.innerText);
  copyText.classList.add('show-text');
};
