let classAdded = '';    //the class to be added for different weather conditions
let autoDetectLoc = 1;      //to find if query is searched or autolocated as api returns temp in C for location name while in K for lat and long coordinates
const api = {
  key: "eec70ae71d64dc37c3b1ff96428e5853",
  base: "https://api.openweathermap.org/data/2.5/"
};

// for autodetection of user location
function getLocation() {
  autoDetectLoc = 1;
  navigator.geolocation.getCurrentPosition(success,error);
  function success(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      error();
    }
  };
//if location can't be autodetected or permission is not given by the user
  function error(){
    document.querySelector(".current .temp").innerHTML = '';
    document.querySelector(".current .weather").innerHTML ='Meanwhile search for other cities ...'
    document.querySelector(".current .hilow").innerHTML = "Cannot detect your location.";
    document.querySelector(".current .wind span").innerHTML = '';
    document.querySelector(".current .humidity span").innerHTML = '';
    document.querySelector(".location .city").innerHTML = '';
    document.querySelector(".location .date").innerHTML = '';
  };
};

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  fetch(`${api.base}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
};

function setQuery(evt) {
  if ((evt.keyCode == 13 || evt.type=='click' || evt.type=='touchstart') && searchbox.value!=""){
    getResults(searchbox.value);
  };
};
function titleCase(str) {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
   }
   return splitStr.join(' ');
};

async function getResults(queryEntered) {
  let query = titleCase(queryEntered);
  let response = await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`);
  if (response.ok) { // if HTTP-status is 200-299
    // get the response body
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
  } else {
    console.log(`${queryEntered} does not exist`);
  }

};

function displayResults (weather) {
  if($("body").hasClass(classAdded)){
    $("body").removeClass(classAdded);
  };
  if($(".card").hasClass(classAdded+"-card")){
    $(".card").removeClass(classAdded+"-card");
  };

  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let wind = document.querySelector('.current .wind span');
  wind.innerText = `  ${Math.round(weather.wind.speed*(3.6))} km/h`;
  let humidity = document.querySelector('.current .humidity span');
  humidity.innerText = `  ${weather.main.humidity} %`;

  let dual = document.querySelector('.current .hilow');
  dual.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

  let hD = now.getHours();
  let weatherId = weather.weather[0].id.toString();

  if(weatherId=="800"){
    if(hD>=18 || hD<=4){
      classAdded = "clearn";
    }else{
      classAdded = "cleard";
    };
  }else if(weatherId[0]=="8"){
      classAdded = "cloud";
  }else if(weatherId[0]=="2"||weatherId[0]=="3"||weatherId[0]=="5"){
      classAdded = "rain";
  }else if(weatherId[0]=="6"){
      classAdded = "snow";
  }else{
    classAdded = "sand";
  };

  $("body").addClass(classAdded);
  $(".card").addClass(classAdded+"-card");
};

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
$(window).on('load', getLocation);
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);
const searchbutton = document.querySelector('.search-container .btn');
searchbutton.addEventListener('click',setQuery);
searchbutton.addEventListener('touchstart',setQuery);
