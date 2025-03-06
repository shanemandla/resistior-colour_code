// First Calculator: Color to Value
const band1 = document.getElementById('band1');
const band2 = document.getElementById('band2');
const band3 = document.getElementById('band3');
const band4 = document.getElementById('band4');
const band5 = document.getElementById('band5');
const resistorValue = document.getElementById('resistor-value');
const toleranceValue = document.getElementById('tolerance-value');

const colorCodes = {
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  violet: 7,
  gray: 8,
  white: 9,
  gold: 0.1,
  silver: 0.2,
  none: 0.2,
};

const multiplierCodes = {
  black: 1,
  brown: 10,
  red: 100,
  orange: 1000,
  yellow: 10000,
  green: 100000,
  blue: 1000000,
  violet: 10000000,
  gray: 100000000,
  white: 1000000000,
};

const toleranceCodes = {
  gold: '±5%',
  silver: '±10%',
  none: '±20%',
};

function updateResistor() {
  const bandCount = document.getElementById('band-count').value;
  const band1Color = document.getElementById('band1-select').value;
  const band2Color = document.getElementById('band2-select').value;
  const band3Color = document.getElementById('band3-select').value;
  const band4Color = document.getElementById('band4-select').value;
  const band5Color = document.getElementById('band5-select').value;

  // Update resistor diagram colors
  band1.style.backgroundColor = band1Color;
  band2.style.backgroundColor = band2Color;
  band3.style.backgroundColor = band3Color;
  band4.style.backgroundColor = band4Color;

  if (bandCount === '5') {
    band5.style.display = 'block';
    band5.style.backgroundColor = band5Color;
  } else {
    band5.style.display = 'none';
  }

  // Calculate resistor value
  let value;
  if (bandCount === '4') {
    value = (colorCodes[band1Color] * 10 + colorCodes[band2Color]) * multiplierCodes[band4Color];
    toleranceValue.textContent = toleranceCodes[band5Color];
  } else {
    value = (colorCodes[band1Color] * 100 + colorCodes[band2Color] * 10 + colorCodes[band3Color]) * multiplierCodes[band4Color];
    toleranceValue.textContent = toleranceCodes[band5Color];
  }

  resistorValue.textContent = `${value} Ω`;
}

// Event listeners for first calculator
document.getElementById('band-count').addEventListener('change', () => {
  const bandCount = document.getElementById('band-count').value;
  document.getElementById('band5-selector').style.display = bandCount === '5' ? 'block' : 'none';
  updateResistor();
});

document.getElementById('band1-select').addEventListener('change', updateResistor);
document.getElementById('band2-select').addEventListener('change', updateResistor);
document.getElementById('band3-select').addEventListener('change', updateResistor);
document.getElementById('band4-select').addEventListener('change', updateResistor);
document.getElementById('band5-select').addEventListener('change', updateResistor);

// Initialize first calculator
updateResistor();

// Second Calculator: Value to Color
const valueBand1 = document.getElementById('value-band1');
const valueBand2 = document.getElementById('value-band2');
const valueBand3 = document.getElementById('value-band3');
const valueBand4 = document.getElementById('value-band4');
const colorCodeResult = document.getElementById('color-code-result');

const valueToColorCodes = {
  0: 'black',
  1: 'brown',
  2: 'red',
  3: 'orange',
  4: 'yellow',
  5: 'green',
  6: 'blue',
  7: 'violet',
  8: 'gray',
  9: 'white',
};

const multiplierToColorCodes = {
  1: 'black',
  10: 'brown',
  100: 'red',
  1000: 'orange',
  10000: 'yellow',
  100000: 'green',
  1000000: 'blue',
  10000000: 'violet',
  100000000: 'gray',
  1000000000: 'white',
};

document.getElementById('calculate-colors').addEventListener('click', () => {
  const value = parseFloat(document.getElementById('resistor-value-input').value);
  const unit = document.getElementById('resistor-unit').value;

  let resistorValue;
  switch (unit) {
    case 'kΩ':
      resistorValue = value * 1000;
      break;
    case 'MΩ':
      resistorValue = value * 1000000;
      break;
    default:
      resistorValue = value;
  }

  const digits = String(resistorValue).replace('.', '').split('').map(Number);
  const firstDigit = digits[0];
  const secondDigit = digits[1];
  const multiplier = Math.pow(10, digits.length - 2);

  valueBand1.style.backgroundColor = valueToColorCodes[firstDigit];
  valueBand2.style.backgroundColor = valueToColorCodes[secondDigit];
  valueBand3.style.backgroundColor = multiplierToColorCodes[multiplier];
  valueBand4.style.backgroundColor = 'gold'; // Default tolerance

  colorCodeResult.textContent = `${firstDigit} ${secondDigit} x${multiplier} ±5%`;
});