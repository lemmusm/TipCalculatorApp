/* ACCESS TO ELEMENTS */

// get values from inputs
const BILL = document.getElementById('bill');
const PEOPLE_N = document.getElementById('people-number');
const TIP_PERSON = document.getElementById('tip-person');
const TOTAL_TIP = document.getElementById('total-tip');
const BTN_RESET = document.getElementById('btn-reset');

// ERROR MESSAGE
const ERROR_BILL = document.getElementById('error-bill');
const ERROR_NPEOPLE = document.getElementById('error-npeople');

// TIPS
const FIVE_TIP = document.getElementById('five-tip');
const TEN_TIP = document.getElementById('ten-tip');
const FIFTEEN_TIP = document.getElementById('fifteen-tip');
const TWENTYFIVE_TIP = document.getElementById('twentyfive-tip');
const FIFTY_TIP = document.getElementById('fifty-tip');
const CUSTOM_TIP = document.getElementById('custom-tip');
const LIST_TIP = [FIVE_TIP, TEN_TIP, FIFTEEN_TIP, TWENTYFIVE_TIP, FIFTY_TIP];

// default values
let bill = 0;
let customTip = 0;
let peopleN = 0;
let tipPercent = 0;

// create dictionary for kinds of tip
const KINDS_TIP = [
  { kind: 'bill' },
  { kind: 'custom-tip' },
  { kind: 'people-number' },
];

/* FUNCTIONS */
// asign value to bill, customTip and peopleN
const getValues = (e) => {
  const id = e.target.id;

  // get value from tag
  const value = e.target.value || parseInt(e.target.innerHTML) || 0;

  // access to tip types through the dictionary
  const kindTip =
    KINDS_TIP.find((data) => data.kind === id)?.kind ||
    parseInt(e.target.innerHTML) ||
    0;

  // return values
  if (kindTip === 'bill') bill = parseFloat(value);
  if (kindTip === 'custom-tip' || !isNaN(kindTip))
    customTip = parseFloat(value);
  if (kindTip === 'people-number') peopleN = parseInt(value);
};

// mark/remove tip as selected
const selected = (e) => {
  let div = e.target;
  // remove previously added "selected" class
  LIST_TIP.forEach((item) => {
    item.classList.remove('selected');

    BTN_RESET.classList.remove('btn-selected');
    BTN_RESET.disabled = true;
  });

  BTN_RESET.classList.add('btn-selected');
  BTN_RESET.disabled = false;

  // add "selected" and "btn-selected" class
  div.classList.add('selected');

  // clear custom tip input
  CUSTOM_TIP.value = '';
  return getValues(e);
};

// reset values in results
const resetValues = () => {
  BILL.value = '';
  PEOPLE_N.value = '';
  CUSTOM_TIP.value = '';

  // set default values
  /*   bill = 0;
  customTip = 0;
  peopleN = 0;
  tipPercent = 0; */

  TIP_PERSON.innerHTML = '$0.00';
  TOTAL_TIP.innerHTML = '$0.00';

  // disabled btn-reset
  BTN_RESET.classList.remove('btn-selected');

  // remove previously added "selected" class
  LIST_TIP.forEach((item) => {
    item.classList.remove('selected');
  });
};

// set values in results section
const setValues = () => {
  if (!peopleN) {
    TIP_PERSON.innerHTML = '$' + parseFloat(0).toFixed(2);
    TOTAL_TIP.innerHTML = '$' + parseFloat(0).toFixed(2);
  } else {
    TIP_PERSON.innerHTML = '$' + tipPerPerson().toFixed(2);
    TOTAL_TIP.innerHTML = '$' + totalPerPerson().toFixed(2);
  }

  // validate inputs
  validateInputs();
};

// show/hide error message, validate if value = 0
const validateInputs = () => {
  BILL.value === '0'
    ? (ERROR_BILL.style.display = 'block')
    : (ERROR_BILL.style.display = 'none');

  PEOPLE_N.value === '0'
    ? (ERROR_NPEOPLE.style.display = 'block')
    : (ERROR_NPEOPLE.style.display = 'none');
};

// calc tip per person
const tipPerPerson = () => {
  const totalTips = (bill * customTip) / 100 / peopleN;
  return totalTips || 0;
};

// calc total per person
const totalPerPerson = () => {
  let totalTips = (customTip * bill) / 100;
  let total = totalTips + bill;
  let totalPerPerson = total / peopleN;
  return totalPerPerson;
};

/* EVENTS */
// get values from listener input event
BILL.addEventListener('input', getValues);
PEOPLE_N.addEventListener('input', getValues);
CUSTOM_TIP.addEventListener('input', getValues);
CUSTOM_TIP.addEventListener('input', getValues);

// get values from click input event
LIST_TIP.forEach((item) => item.addEventListener('click', selected));
LIST_TIP.forEach((item) => item.addEventListener('click', setValues));

// clear percent box tip
CUSTOM_TIP.addEventListener('click', selected);
// when access to input, first remove "btn-selected" class and disabled
CUSTOM_TIP.addEventListener('click', () => {
  BTN_RESET.classList.remove('btn-selected');
  BTN_RESET.disabled = true;
});
// check if input is empty
CUSTOM_TIP.addEventListener('input', () => {
  if (CUSTOM_TIP.value !== '') {
    BTN_RESET.classList.add('btn-selected');
    BTN_RESET.disabled = false;
  } else {
    BTN_RESET.classList.remove('btn-selected');
    BTN_RESET.disabled = true;
  }
});

// set values from listener input event
BILL.addEventListener('input', setValues);
PEOPLE_N.addEventListener('input', setValues);
CUSTOM_TIP.addEventListener('input', setValues);

// reset values
BTN_RESET.addEventListener('click', resetValues);
