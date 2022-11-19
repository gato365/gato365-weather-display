



// Specify Variables
const apiKey = '726ac812a8b92daf497a98559b26b3fc'
var cityName = document.querySelector('#cityName');
var submitBtn = document.querySelector('#submitBtn');
var requestUrl;

var day0 = document.querySelector('#day-0');
var day1 = document.querySelector('#day-1');
var day2 = document.querySelector('#day-2');
var day3 = document.querySelector('#day-3');
var day4 = document.querySelector('#day-4');
var day5 = document.querySelector('#day-5');
var searchesContainer = document.querySelector('#previous-searches');
var searchedCities = [];

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
    // Set new submission to local storage 
    localStorage.setItem("description" + cityName, weatherInfo);

}


// -----------------Function Definitions--------------------
// Author: Immanuel Williams PhD 
// Date Created: 11/16/2022
// Date Modified: 11/18/2022
// Name: submitBtn
// Purpose: Button Gets City info from User 
// Input: (Click)
// Output: NA
// Notes: NA
// -----------------Function Definitions--------------------
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var newCityName = cityName.value;

    searchedCities = searchedCities.concat(newCityName);

    requestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + newCityName + '&limit=5&appid=' + apiKey;
    getApi(newCityName);

    displayPastSearches(newCityName);
});


// -----------------Function Definitions--------------------
// Author: Immanuel Williams PhD 
// Date Created: 11/17/2022
// Date Modified: 11/17/2022
// Name: inputDayInfo
// Purpose: Input info in the right format from local storage
// Input: currentDay, currentWeather, isCurrentDay
// Output: NA
// Notes: NA
// -----------------Function Definitions--------------------
function inputDayInfo(currentDay, currentWeather, isCurrentDay) {
    // Current Day Input data
    if (isCurrentDay === true) {
        var currentDay = currentDay.nextElementSibling;
        currentDay.children[0].innerHTML = 'Temp: ' + currentWeather.t;
        currentDay.children[1].innerHTML = 'Wind: ' + currentWeather.ws;
        currentDay.children[2].innerHTML = 'Humidity: ' + currentWeather.h;
        currentDay.children[3].innerHTML = 'Weather: ' + currentWeather.weather;
    } else if (isCurrentDay === false) { // Five-Forecast Input Data
        var currentDay = currentDay.children[0];
        currentDay.children[0].innerHTML = 'Temp: ' + currentWeather.t;
        currentDay.children[1].innerHTML = 'Wind: ' + currentWeather.ws;
        currentDay.children[2].innerHTML = 'Humidity: ' + currentWeather.h;
        currentDay.children[3].innerHTML = 'Weather: ' + currentWeather.weather;
        // Add Image based on predicted weather
        if (['thunderstorm', 'rain', 'snow', 'clouds', 'fog'].includes(currentWeather.weather)) {
            currentDay.style.backgroundImage =
                `url('https://mdbgo.io/ascensus/mdb-advanced/img/${currentWeather.weather}.gif')`;
        } else {
            currentDay.style.backgroundImage =
                `url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')`;
        }
    }
}


// -----------------Function Definitions--------------------
// Author: Immanuel Williams PhD 
// Date Created: 11/16/2022
// Date Modified: 11/16/2022
// Name: htmlDOMManipulation
// Purpose: Changes the html based on city's data
// Input: 
// Output: NA
// Notes: NA
// -----------------Function Definitions--------------------
function htmlDOMManipulation(cityName) {

    var cityInfoString = localStorage.getItem('description' + cityName);
    var cityInfoJSON = JSON.parse(cityInfoString);
    inputDayInfo(day0, cityInfoJSON[0], true);
    inputDayInfo(day1, cityInfoJSON[1], false);
    inputDayInfo(day2, cityInfoJSON[2], false);
    inputDayInfo(day3, cityInfoJSON[3], false);
    inputDayInfo(day4, cityInfoJSON[4], false);
    inputDayInfo(day5, cityInfoJSON[5], false);
    day0.innerHTML = cityName;
}



// -----------------Function Definitions--------------------
// Author: Immanuel Williams PhD 
// Date Created: 11/18/2022
// Date Modified: 11/18/2022
// Name: displayPastSearches
// Purpose: Displays a list a past Searches
// Input: cityName
// Output: NA
// Notes: NA
// -----------------Function Definitions--------------------
function displayPastSearches(cityName) {
    var newCityName = cityName;

    // Create Button
    var buttonCity = document.createElement('button');
    buttonCity.setAttribute('class', 'cityBtn');
    buttonCity.innerHTML = newCityName;
    searchesContainer.append(buttonCity);

    // Button Listener
    buttonCity.addEventListener("click", function () {
        var cityName = newCityName;
        htmlDOMManipulation(cityName);

        console.log(cityName);
    });

}



// -----------------Function Definitions--------------------
// Author: Immanuel Williams PhD 
// Date Created: 11/15/2022
// Date Modified: 11/18/2022
// Name: getApi
// Purpose: Gets Information from Open Weather based on user's city inpu
// Input: NA
// Output: NA
// Notes: NA
// -----------------Function Definitions--------------------
function getApi(cityName) {

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

                    // Check for Error
                    if (!response.ok) {
                       
                        throw response.json();
                    }
                    

                    return response.json();
                })
                .then(function (data) {
                    // Day 0 (today) 
                    var temperature = data['list'];
                    var fiveDayForecast = [];


                    // Donohue Issue 1: For each or arrow method
                    for (let dayIndex = 0; dayIndex < 6; dayIndex++) {
                        const currentDay = temperature[dayIndex];


                        // Get Relavant Information
                        const oneDayForecast = {
                            d: currentDay.dt,
                            t: ((currentDay['main'].temp - 273.15) * 9 / 5 + 32).toFixed(2),
                            ws: currentDay['wind'].speed,
                            h: currentDay['main'].humidity,
                            weather: currentDay['weather'][0].main.toLowerCase()
                        }
                        fiveDayForecast = fiveDayForecast.concat(oneDayForecast);



                    }


                    // Display Information
                    const weatherInfo = JSON.stringify(fiveDayForecast);
                    console.log(cityName);
                    storeCityWeather(cityName, weatherInfo);
                    htmlDOMManipulation(cityName);

                });


        })
        .catch(function (error) {
            console.error(error);
        });


}





