



// Testing URL and API Ability
const apiKey = '726ac812a8b92daf497a98559b26b3fc'
var tmpcityName = document.querySelector('#cityName');
var tmpsubmitBtn = document.querySelector('#submitBtn');
var cityName;
var requestUrl;
var day0 = document.querySelector('#day-0');



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
   
   // Copy Paste 6 times
    const info = day0.nextElementSibling;
    
    info.children[0].innerHTML = 'Temp--';
    info.children[1].innerHTML = 'Wind--';
    info.children[2].innerHTML = 'Humidity--';

    requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=5&appid=' + apiKey;
    getapi();
    
});


function updateDayInfo(info,ts,ws,hu){

    info.children[0].innerHTML = 'Temp:' + ts;
    info.children[1].innerHTML = 'Wind:' + ts;
    info.children[2].innerHTML = 'Humidity:' + hu;
    

}


function getapi() {
    var fiveDayForecast = [];
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
                    // console.log(temperature);

                    // Donohue Issue 1: For each or arrow method
                    for (let dayIndex = 0; dayIndex < 6; dayIndex++) {
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

    return fiveDayForecast;
}




