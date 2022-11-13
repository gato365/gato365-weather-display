# gato365-weather-display
Displaying ability to use APIs


## API Information
Name: UCB_challenge-6
key: 726ac812a8b92daf497a98559b26b3fc




## To Get City information

- **Website:** https://openweathermap.org/api/geocoding-api

- **API Usage Format:** http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}



### Parameters

- **q:**required - City name, state code (only for the US) and country code divided by comma. Please use ISO 3166 country codes.

- **appid:** required - Your unique API key (you can always find it on your account page under the "API key" tab)

- **limit:** optional - Number of the locations in the API response (up to 5 results can be returned in the API response)


### Example

Using **London** 

http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}

## To Get City Weather

- Website to learn more: https://openweathermap.org/current

- API Usage Format: https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}.



### Parameters

- **lat, lon:** required - Geographical coordinates (latitude, longitude). If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our Geocoding API.

- **appid:** required - Your unique API key (you can always find it on your account page under the "API key" tab)

- **mode:** optional - Response format. Possible values are xml and html. If you don't use the mode parameter format is JSON by default. Learn more

- **units:** optional - Units of measurement. standard, metric and imperial units are available. If you do not use the units parameter, standard units will be applied by default

### Example


- Using **Latitude - 44.34, Longitudinal -  10.99**

https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API key}



## Develop HTML and CSS 
Here is my assignment's mark up:

<img src = "/assets/images/org_markup.jpg" width="25%" height="45%"> 

Below is my version's mark up. I drew it so that I can explore the tags needed for this design. I am pretty sure I may change it in the future using DOM so that it can be more official.

<img src = "/assets/images/my_markup.jpg" width="25%" height="45%"> 



