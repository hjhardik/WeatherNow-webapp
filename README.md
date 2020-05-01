# WeatherNow-webapp

WeatherNow is a fully responsive web application which uses the OpenWeather web API and HTML5 Geolocation API to accurately locate the location of the user and display the weather conditions in the area. The user can also search up different cities and places on the search bar to know the current weather conditions in the desired city. 

The front end is designed using HTML, CSS, Bootstrap and JavaScript and jQuery while the backend works on Node.js, Express.js and EJS. The application is completely responsive for additional usage in mobile and tablet browsers.

When the permission to access location is granted by the user, the HTML5 Geolocation is used to detect the user location and then implemented through OpenWeather API to generate the current weather conditions:
![Location Granted](https://github.com/HardikJ7321/WeatherNow-webapp/blob/master/weatherphoto/granted.png)
If the permission is not granted, it diplays :
![Location Denied](https://github.com/HardikJ7321/WeatherNow-webapp/blob/master/weatherphoto/denied.png)

The user can also search up different cities irrespective of location access permissions :
![Search](https://github.com/HardikJ7321/WeatherNow-webapp/blob/master/weatherphoto/search.png)

