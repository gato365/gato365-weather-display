



// Testing URL and API Ability
const apiKey = '726ac812a8b92daf497a98559b26b3fc'
var tmpcityName = document.querySelector('#cityName');
var tmpsubmitBtn = document.querySelector('#submitBtn');
var cityName;
var requestUrl;
var fiveDayForecast = [];
var day0 = document.querySelector('#day-0');
var day1 = document.querySelector('#day-1');
var day2 = document.querySelector('#day-2');
var day3 = document.querySelector('#day-3');
var day4 = document.querySelector('#day-4');
var day5 = document.querySelector('#day-5');



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


tmpsubmitBtn.addEventListener("click", function () {
    cityName = tmpcityName.value;
    console.log(cityName);
    day0.innerHTML = cityName;
    requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=5&appid=' + apiKey;
    getapi()
});

var currentDay;

function inputDayInfo(currentDay, currentWeather, isCurrentDay) {






    if (isCurrentDay === true) {
        var currentDay = currentDay.nextElementSibling;
        currentDay.children[0].innerHTML = 'Temp: ' + currentWeather.t;
        currentDay.children[1].innerHTML = 'Wind: ' + currentWeather.ws;
        currentDay.children[2].innerHTML = 'Humidity: ' + currentWeather.h;



    } else if (isCurrentDay === false) {


        var currentDay = currentDay.children[0];
        

        currentDay.children[0].innerHTML = 'Temp: ' + currentWeather.t;
        currentDay.children[1].innerHTML = 'Wind: ' + currentWeather.ws;
        currentDay.children[2].innerHTML = 'Humidity: ' + currentWeather.h;

        if (['thunderstorm', 'rain', 'snow', 'clouds', 'fog'].includes(currentWeather.weather)) {
            currentDay.style.backgroundImage =
                `url('https://mdbgo.io/ascensus/mdb-advanced/img/${currentWeather.weather}.gif')`;
        } else {
            currentDay.style.backgroundImage =
                `url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')`;
        }


    }
}

function htmlDOMManipulation() {
    // Copy Paste 6 times


    var cityInfoString = localStorage.getItem('description' + cityName);
    var cityInfoJSON = JSON.parse(cityInfoString);




    // I will refractor this
    // Day 0

    inputDayInfo(day0, cityInfoJSON[0], true);
    inputDayInfo(day1, cityInfoJSON[1], false);
    inputDayInfo(day2, cityInfoJSON[2], false);
    inputDayInfo(day3, cityInfoJSON[3], false);
    inputDayInfo(day4, cityInfoJSON[4], false);
    inputDayInfo(day5, cityInfoJSON[5], false);

}

function getapi() {

    fetch(requestUrl)


        .then(function (response) {
            // Check for Error
            if (!response.ok) {
                throw response.json();
            }
            // Return JSON text
            return response.json();
        })
        .then(function (data) {

            // Gets Lat and Long from data
            const latInfo = data[0].lat;
            const lonInfo = data[0].lon;

            // Creates URL LL
            var requestUrlLL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latInfo + '&lon=' + lonInfo + '&appid=' + apiKey;



            fetch(requestUrlLL)

                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    // Day 0 (today) 
                    var temperature = data['list'];


                    // Donohue Issue 1: For each or arrow method
                    for (let dayIndex = 0; dayIndex < 6; dayIndex++) {
                        const currentDay = temperature[dayIndex];


                        // Get Relavant Information
                        const oneDayForecast = {
                            d: moment.toDate(currentDay.dt),
                            t: ((currentDay['main'].temp - 273.15) * 9 / 5 + 32).toFixed(2),
                            ws: currentDay['wind'].speed,
                            h: currentDay['main'].humidity,
                            weather: currentDay['weather'][0].main.toLowerCase()
                        }
                        fiveDayForecast = fiveDayForecast.concat(oneDayForecast);

                    }


                    // Display Information
                    const weatherInfo = JSON.stringify(fiveDayForecast)
                    storeCityWeather(cityName, weatherInfo);
                    htmlDOMManipulation();

                });


        });


}




