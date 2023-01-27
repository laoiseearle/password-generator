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

// Strength
const strengthText = document.getElementById('strengthRatingText');
const strengthBars = document.getElementsByClassName('strength-bar');

slider.addEventListener('input', function () {
  const x = slider.value * 5;
  const color = `linear-gradient(90deg, #a4ffaf ${x}%, #18171f ${x}%)`;
  slider.style.background = color;
  sliderLabel.innerText = slider.value;
});

const setBarColor = (color, maxBars) => {
  for (let i = 0; i < 4; i++) {
    if (i < maxBars) {
      strengthBars[i].style.backgroundColor = color;
      strengthBars[i].style.border = 'none';
    } else {
      strengthBars[i].style.backgroundColor = 'transparent';
      strengthBars[i].style.border = '2px solid white';
    }
  }
};

const getStrengthScore = (charLength, checkboxes) => {
  let strength = 0;

  if (charLength === 0) {
    return 0;
  }

  if (charLength >= 8) {
    strength += 3;
  }

  if (charLength >= 11) {
    strength += 1;
  }

  if (charLength >= 14) {
    strength += 2;
  }

  // Each checkbox adds 1 strength
  strength += checkboxes.filter(checkbox => checkbox.checked).length;

  return strength;
};

const setStrengthBars = () => {
  const strength = getStrengthScore(sliderLabel.innerText, [
    upperCase,
    lowerCase,
    numbers,
    symbols,
  ]);

  if (strength >= 8) {
    strengthText.innerText = 'Strong';
    setBarColor('#a4ffaf', 4);
  } else if (strength >= 6) {
    strengthText.innerText = 'Medium';
    setBarColor('#f8cd65', 3);
  } else if (strength >= 4 && sliderLabel.innerText >= 4) {
    strengthText.innerText = 'Weak';
    setBarColor('#fb7c58', 2);
  } else {
    strengthText.innerText = 'Too Weak!';
    setBarColor('#f64a4a', 1);
  }
};

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
  } else {
    passwordText.style.opacity = '1';
    passwordText.innerText = randomPassword(charLength);
  }
  setStrengthBars();
};

const copyTextToClipboard = () => {
  navigator.clipboard.writeText(passwordText.innerText);
  copyText.classList.add('show-text');
};
