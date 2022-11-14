



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
            console.log(data);
            console.log(data[0]);
            const latInfo = data[0].lat;
            const lonInfo = data[0].lon;
        });
}


const latInfo = 44.34;
const lonInfo = 10.99;
// var requestUrlLL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latInfo + '&lon=' + lonInfo + '&appid=' + apiKey;
var requestUrlLL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latInfo + '&lon=' + lonInfo + '&appid=' + apiKey;

function getAPILL() {

    fetch(requestUrlLL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // Day 0 (today) 
            var temperature = data['list'];


            console.log(temperature);

            // var temperature = data['main'].temp;
            // temperature = (temperature - 273.15)*9/5 +32;
            // var windSpeed = data['wind'].speed;
            // var humidity = data['main'].humidity;

            var currentDay = temperature[0];
            console.log(currentDay['main']);
            
        
        });

}

// We need a promise based on the user

// new Promise((resolve,reject) => {
// })

var info = getAPILL();
console.log(info);