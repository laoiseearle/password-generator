const slider = document.getElementById('sliderRange');
const sliderLabel = document.getElementById('charSlider');

slider.addEventListener('input', function () {
  const x = slider.value * 5;
  const color = `linear-gradient(90deg, #a4ffaf ${x}%, #18171f ${x}%)`;
  slider.style.background = color;
  sliderLabel.innerText = slider.value;
});
