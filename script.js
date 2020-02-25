const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const sortBtn = document.getElementById('sort');
const showMillionairesBtn = document.getElementById('show-millionaires');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let index = 0;
let data = [];

/****** FUNCTIONS ******/
// Fetch random user and add money
const getRandomUser = async () => {
  const res = await fetch('people.json');
  const data = await res.json();

  if (index === data.results.length) {
    addUserBtn.disabled = true;
  } else {
    const user = data.results[index];
    index++;
    const newUser = {
      name: `${user.name.first} ${user.name.last}`,
      money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);
  }
};

// Add new user to array
const addData = obj => {
  data.push(obj);

  updateDOM();
};

// Update DOM
const updateDOM = (providedData = data) => {
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(item => {
    // Old way to append child on a parent
    // const element = document.createElement('div');
    // element.classList.add('person');
    // element.innerHTML = `<strong>${item.name}</strong> ${item.money}`;
    // main.appendChild(element);

    // Modern way to append child on a parent
    const element = `
      <div class="person">
        <strong>${item.name}</strong> ${formatMoney(item.money)}
      </div>
    `;
    main.insertAdjacentHTML('beforeend', element);
  });
};

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
const formatMoney = number => {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

// Double everyones money
const doubleMoney = () => {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
};

// Sort users by richest
const sortByRichest = () => {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
};

// Filter only millionaires
const showMillionaires = () => {
  data = data.filter(user => user.money >= 1000000);

  updateDOM();
};

// Calculate the total wealth
const calculateWealth = () => {
  const el = document.getElementById('wealth');
  if (el !== null) {
    el.parentNode.removeChild(el);
  }

  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = `
    <div id="wealth">
      <h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>
    </div>
  `;
  main.insertAdjacentHTML('beforeend', wealthEl);
};

/****** EVENT LISTENERS ******/
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
