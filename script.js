var select = document.querySelectorAll(".currency"),
    input_currency = document.getElementById('input_currency'),
    output_currency = document.getElementById('output_currency');

fetch(`https://api.frankfurter.app/currencies`)
    .then((data) => data.json())
    .then((data) => {
        const entries = Object.entries(data);
        console.log(data)
        for (var i = 0; i < entries.length; i++) {
            select[0].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
            select[1].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
        }

    });

function convert() {
    input_currency_val = input_currency.value;
    if (select[0].value != select[1].value) {
        alert("yes")
        const host = 'api.frankfurter.app';
        fetch(`https://${host}/latest?amount=${input_currency_val}&from=${select[0].value}&to=${select[1].value}`)
            .then((val) => val.json())
            .then((val) => {
                //alert(`10 GBP = ${data.rates.USD} USD`);
                output_currency.value = Object.values(val.rates)[0]
                console.log(Object.values(val.rates)[0])
            });
    } else {
        alert("Peease select two different currencies")
    }
}

// --------------------
let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");
searchBtn.addEventListener("click", () => {
    let countryName = countryInp.value;
    let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    console.log(finalURL);
    fetch(finalURL)
        .then((response) => response.json())
        .then((data) => {
            //   console.log(data[0]);
            //   console.log(data[0].capital[0]);
            //   console.log(data[0].flags.svg);
            //   console.log(data[0].name.common);
            //   console.log(data[0].continents[0]);
            //   console.log(Object.keys(data[0].currencies)[0]);
            //   console.log(data[0].currencies[Object.keys(data[0].currencies)].name);
            //   console.log(
            //     Object.values(data[0].languages).toString().split(",").join(", ")
            //   );
            result.innerHTML = `
        <img src="${data[0].flags.svg}" class="flag-img">
        <h2>${data[0].name.common}</h2>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Capital:</h4>
                <span>${data[0].capital[0]}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Continent:</h4>
                <span>${data[0].continents[0]}</span>
            </div>
        </div>
         <div class="wrapper">
            <div class="data-wrapper">
                <h4>Population:</h4>
                <span>${data[0].population}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Currency:</h4>
                <span>${data[0].currencies[Object.keys(data[0].currencies)].name
                } - ${Object.keys(data[0].currencies)[0]}</span>
            </div>
        </div>
         <div class="wrapper">
            <div class="data-wrapper">
                <h4>Common Languages:</h4>
                <span>${Object.values(data[0].languages)
                    .toString()
                    .split(",")
                    .join(", ")}</span>
            </div>
        </div>
      `;
        })
        .catch(() => {
            if (countryName.length == 0) {
                result.innerHTML = `<h3>The input field cannot be empty</h3>`;
            } else {
                result.innerHTML = `<h3>Please enter a valid country name.</h3>`;
            }
        });
});