



// Testing URL and API Ability
const apiKey = '726ac812a8b92daf497a98559b26b3fc'
var cityName = 'London'
var requestUrlCity = 'http://api.openweathermap.org/geo/1.0/direct?q='+cityName+'&limit=5&appid=' + apiKey;
// console.log(requestUrlCity);



function getLatLongAPI() {
    var requestUrlLL;
    fetch(requestUrlCity)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data[0]);
            const latInfo = data[0].lat;
            const lonInfo = data[0].lon;

            requestUrlLL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latInfo + '&lon=' + lonInfo + '&appid=' + apiKey;
           
        });

        return requestUrlLL;
}





var info = getLatLongAPI();
console.log(info);