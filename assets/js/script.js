



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
    getapi();

    // Copy Paste 6 times


    var cityInfoString = localStorage.getItem('description' + cityName);
    var cityInfoJSON = JSON.parse(cityInfoString);
    console.log(cityInfoJSON);


    console.log();

    // I will refractor this
    // Day 0
    const info0 = day0.nextElementSibling;
    info0.children[0].innerHTML = 'Temp--' + cityInfoJSON[0].t;
    info0.children[1].innerHTML = 'Wind--' + cityInfoJSON[0].ws;
    info0.children[2].innerHTML = 'Humidity--' + cityInfoJSON[0].h;


    // Day 1
    const info1 = day1.children[0];
    info1.children[0].innerHTML = 'Temp--' + cityInfoJSON[1].t;
    info1.children[1].innerHTML = 'Wind--'+ cityInfoJSON[1].ws;
    info1.children[2].innerHTML = 'Humidity--' + cityInfoJSON[1].h;


    // Day 2
    const info2 = day2.children[0];
    info2.children[0].innerHTML = 'Temp--' + cityInfoJSON[2].t;
    info2.children[1].innerHTML = 'Wind--'+ cityInfoJSON[2].ws;
    info2.children[2].innerHTML = 'Humidity--' + cityInfoJSON[2].h;


    // Day 3
    const info3 = day3.children[0];
    info3.children[0].innerHTML = 'Temp--' + cityInfoJSON[3].t;
    info3.children[1].innerHTML = 'Wind--'+ cityInfoJSON[3].ws;
    info3.children[2].innerHTML = 'Humidity--' + cityInfoJSON[3].h;

    // Day 4
    const info4 = day4.children[0];
    info4.children[0].innerHTML = 'Temp--' + cityInfoJSON[4].t;
    info4.children[1].innerHTML = 'Wind--'+ cityInfoJSON[4].ws;
    info4.children[2].innerHTML = 'Humidity--' + cityInfoJSON[4].h;


    // Day 5
    const info5 = day5.children[0];
    info5.children[0].innerHTML = 'Temp--' + cityInfoJSON[5].t;
    info5.children[1].innerHTML = 'Wind--'+ cityInfoJSON[5].ws;
    info5.children[2].innerHTML = 'Humidity--' + cityInfoJSON[5].h;

});


// function updateDayInfo(info,ts,ws,hu){

//     info.children[0].innerHTML = 'Temp:' + ts;
//     info.children[1].innerHTML = 'Wind:' + ts;
//     info.children[2].innerHTML = 'Humidity:' + hu;


// }




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

                    // console.log(fiveDayForecast);
                    // Display Information
                    const weatherInfo = JSON.stringify(fiveDayForecast)
                    storeCityWeather(cityName, weatherInfo);

                });


        });

    return fiveDayForecast;
}




