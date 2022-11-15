



// Testing URL and API Ability
const apiKey = '726ac812a8b92daf497a98559b26b3fc'
var cityName = 'London'
var requestUrlCity = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=5&appid=' + apiKey;
// console.log(requestUrlCity);



function getAPICITY() {

    fetch(requestUrlCity)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            // console.log(data[0]);
            const latInfo = data[0].lat;
            const lonInfo = data[0].lon;
        });
}


const latInfo = 44.34;
const lonInfo = 10.99;

// var requestUrlLL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latInfo + '&lon=' + lonInfo + '&appid=' + apiKey;
var requestUrlLL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latInfo + '&lon=' + lonInfo + '&appid=' + apiKey;
var cityName = 'Modena';
function getAPILL() {

    fetch(requestUrlLL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            // Day 0 (today) 
            var temperature = data['list'];
            // console.log(temperature);


            var fiveDayForecast = [];

            // Donohue Issue 1: For each or arrow method
            for (let dayIndex = 0; dayIndex < 5; dayIndex++) {
                const currentDay = temperature[dayIndex];


                // Get Relavant Information
                const oneDayForecast = {
                    d: currentDay.dt,
                    t: ((currentDay['main'].temp - 273.15) * 9 / 5 + 32).toFixed(2),
                    ws: currentDay['wind'].speed,
                    h: currentDay['main'].humidity
                }
                fiveDayForecast = fiveDayForecast.concat(oneDayForecast);

            }

            // Display Information
            const weatherInfo = JSON.stringify(fiveDayForecast)
            storeCityWeather(cityName, weatherInfo);

        });
}



// -----------------Function Definitions--------------------
// Author: Immanuel Williams PhD 
// Date Created: 11/15/2022
// Date Modified: 11/15/2022
// Name: storeCityWeather
// Purpose: Stores city's weather
// Input: event,cityName,weatherInfo
// Output: NA
// Notes: NA
// -----------------Function Definitions--------------------
// function storeCityWeather(event,cityName,weatherInfo) {
function storeCityWeather(cityName, weatherInfo) {
    // event.preventDefault();
    // Set new submission to local storage 
    localStorage.setItem("description" + cityName, weatherInfo);



}

// Donohue Issue 2: Local storage process of this problem (Eman Think through 11/16/2022)
// Donohue Issue 3: Make HTML and CSS in JS, to learn (MUST Eman Think through 11/16/2022)

// We need a promise based on the user

// new Promise((resolve,reject) => {
// })





var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=5&appid=' + apiKey;
function getapi() {

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            // console.log(data[0]);
            const latInfo = data[0].lat;
            const lonInfo = data[0].lon;
            var requestUrlLL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latInfo + '&lon=' + lonInfo + '&appid=' + apiKey;



            fetch(requestUrlLL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {

                    // Day 0 (today) 
                    var temperature = data['list'];
                    // console.log(temperature);


                    var fiveDayForecast = [];

                    // Donohue Issue 1: For each or arrow method
                    for (let dayIndex = 0; dayIndex < 5; dayIndex++) {
                        const currentDay = temperature[dayIndex];


                        // Get Relavant Information
                        const oneDayForecast = {
                            d: currentDay.dt,
                            t: ((currentDay['main'].temp - 273.15) * 9 / 5 + 32).toFixed(2),
                            ws: currentDay['wind'].speed,
                            h: currentDay['main'].humidity
                        }
                        fiveDayForecast = fiveDayForecast.concat(oneDayForecast);

                    }

                    // Display Information
                    const weatherInfo = JSON.stringify(fiveDayForecast)
                    storeCityWeather(cityName, weatherInfo);

                });


        });
}


var info = getapi();

