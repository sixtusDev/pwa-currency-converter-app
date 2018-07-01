let basicSetup = () => {
  let amountToConvert = ``;
  let currencyFrom = ``;
  let currencyTo = ``;

  let amountToConvertDisplay = document.querySelector('.converter__display-area--input');

  document.querySelector('.converter__input--7').addEventListener('click', (e) => {
    amountToConvertDisplay.textContent += e.target.textContent;
    amountToConvert += e.target.textContent;
  })

  document.querySelector('.converter__input--8').addEventListener('click', (e) => {
    amountToConvertDisplay.textContent += e.target.textContent;
    amountToConvert += e.target.textContent;
  })

  document.querySelector('.converter__input--9').addEventListener('click', (e) => {
    amountToConvertDisplay.textContent += e.target.textContent;
    amountToConvert += e.target.textContent;
  })

  document.querySelector('.converter__input--4').addEventListener('click', (e) => {
    amountToConvertDisplay.textContent += e.target.textContent;
    amountToConvert += e.target.textContent;
  })

  document.querySelector('.converter__input--5').addEventListener('click', (e) => {
    amountToConvertDisplay.textContent += e.target.textContent;
    amountToConvert += e.target.textContent;
  })

  document.querySelector('.converter__input--6').addEventListener('click', (e) => {
    amountToConvertDisplay.textContent += e.target.textContent;
    amountToConvert += e.target.textContent;
  })

  document.querySelector('.converter__input--1').addEventListener('click', (e) => {
    amountToConvertDisplay.textContent += e.target.textContent;
    amountToConvert += e.target.textContent;
  })

  document.querySelector('.converter__input--2').addEventListener('click', (e) => {
    amountToConvertDisplay.textContent += e.target.textContent;
    amountToConvert += e.target.textContent;
  })

  document.querySelector('.converter__input--3').addEventListener('click', (e) => {
    amountToConvertDisplay.textContent += e.target.textContent;
    amountToConvert += e.target.textContent;
  })

  document.querySelector('.converter__input--0').addEventListener('click', (e) => {
    amountToConvertDisplay.textContent += e.target.textContent;
    amountToConvert += e.target.textContent;
  })

  document.querySelector('.converter__input--dot').addEventListener('click', (e) => {
    amountToConvertDisplay.textContent += e.target.textContent;
    amountToConvert += e.target.textContent;
  })

  document.querySelector('.converter__input--c').addEventListener('click', (e) => {
    amountToConvertDisplay.textContent = '';
    amountToConvert = ``;
    document.querySelector('.converter__display-area--output').textContent = '';
  })

  document.querySelector('#converter__select-1').addEventListener('change', e => {
    currencyFrom = e.target.value;
  });

  document.querySelector('#converter__select-2').addEventListener('change', e => {
    currencyTo = e.target.value;
  });

  document.querySelector('.converter__input--equal').addEventListener('click', (e) => {
    currencyFrom = encodeURIComponent(currencyFrom);
    currencyTo = encodeURIComponent(currencyTo);

    const query = `${currencyFrom}_${currencyTo}`;

    const url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`;

    let netWorkDataReceived = false;
    fetch(url)
    .then((res) =>{
      console.log(res);
      return res.json();
    })
    .then((data) => {
      networkDataReceived = true;
      console.log(data);
      const dataArray = Object.values(data);
      document.querySelector('.converter__display-area--output').textContent = dataArray[0];

    })
    .catch((error) => {
      console.log('Erorrrrr' + error);
    })
  })
}

function getCurrency() {

  const url = `https://free.currencyconverterapi.com/api/v5/currencies`;

  fetch(url)
  .then(res => {
    return res.json();
  })
  .then(data => {
    const currencyArray = Object.values(data.results);

    document.querySelector('#converter__select-1').innerHTML = currencyArray.map(curr => `<option value="${curr.id}">${curr.currencyName}</option>`).join('\n');
    document.querySelector('#converter__select-2').innerHTML = currencyArray.map(curr => `<option value="${curr.id}">${curr.currencyName}</option>`).join('\n');
  })
}

getCurrency();
basicSetup();


// check for browser support
if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
  .then(() => {
    console.log('Service worker registered');
  })
  .catch(error => {
    console.log('An error occured during srevice worker registration ' + error);
  })
}