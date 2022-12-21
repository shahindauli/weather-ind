// clock implementation
setInterval(time, 1000);
function time() {
    var hour = document.getElementById("hour");
    var min = document.getElementById("min");
    var sec = document.getElementById("sec");
    var ap = document.getElementById("am-pm");

    var d = new Date();
    hour.innerHTML = hours(d);
    sec.innerHTML = seconds(d);
    min.innerHTML = minutes(d);
    ap.innerHTML = apm(d);
}
time();

// date implmntn
var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
function showDate() {

    var date = new Date();
    var day = days[date.getDay()];
    var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var mm = months[date.getMonth()];
    var y = (date.getFullYear()) % 100;
    var fdate = day + " " + " " + dd + " " + mm + " " + y;
    document.getElementById("mdate").innerHTML = fdate;

}
showDate();

// country city name
const city = document.getElementById("city-Name");
const country = document.getElementById("country");
city.style.color = "black"; country.style.color = "black";

// for input box styling
function focuss() {
    const dad = document.getElementById("search");
    dad.style.outline = "none"; dad.style.border = "2px solid blue";
}
function blurs() {
    const dad = document.getElementById("search");
    dad.style.border = "none";
}
function onmousehover() {
    document.getElementById("search").style.border = "1px solid blue";
}
function onmouseouts() {
    document.getElementById("search").style.border = "none";
}

// weather data for website

function loadWeather() {
    console.clear();

    var inp = document.getElementById("search");
    // 1st api call
    var apiurl = 'https://api.openweathermap.org/data/2.5/weather?q=' + inp.value + '&units=metric&appid=52dc5a70d30ec838411a72da0d5dbfec';
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            var info = JSON.parse(this.response);
            console.log(info);
            showData(info);
        }
    }
    xhttp.open('Get', apiurl, true);
    xhttp.send();
    // 2nd api call start from here
    var apiurl2 = 'https://api.openweathermap.org/data/2.5/forecast?q=' + inp.value + '&units=metric&appid=52dc5a70d30ec838411a72da0d5dbfec';
    var xhttp2 = new XMLHttpRequest();
    xhttp2.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            var info2 = JSON.parse(this.response);
            console.log(info2);
            showData2(info2);
        }

    }
    xhttp2.open('Get', apiurl2, true);
    xhttp2.send();


}

function showData(data) {
    var displayCity = document.getElementById("city-Name");
    const displayCountry = document.getElementById("country");
    displayCity.innerHTML=data.name;
    displayCountry.innerHTML = data.sys.country;
    document.getElementById("lat").innerHTML = data.coord.lat;
    document.getElementById("lon").innerHTML = data.coord.lon;
    document.getElementById("temp").innerHTML = data.main.temp;
    document.getElementById("sunny").innerHTML = data.weather[0].main;
    document.getElementById("minmum").innerHTML = data.main.temp_min;
    document.getElementById("max").innerHTML = data.main.temp_max;
    document.getElementById("windspeed").innerHTML = (data.wind.speed * 3.6).toFixed(2) + " km/h";
    document.getElementById("humidity").innerHTML = data.main.humidity + " %";
    var srise = new Date(data.sys.sunrise * 1000);
    document.getElementById("rise").innerHTML = hours(srise) + " : " + minutes(srise);
    document.getElementById("srap").innerHTML = " " + apm(srise);
    var sset = new Date(data.sys.sunset * 1000);
    document.getElementById("set").innerHTML = hours(sset) + " : " + minutes(sset);
    document.getElementById("ssap").innerHTML = " " + apm(sset);
    // icon adding
    const mi = document.getElementById("mi");
    const ccv = data.weather[0].icon;
    const icoonurl = "https://openweathermap.org/img/w/" + ccv + ".png";
    mi.setAttribute("src", icoonurl);

}

// time functon
function seconds(date) {
    var dates = date.getSeconds();
    dates = dates < 10 ? "0" + dates : dates;
    return dates;
}
function minutes(date) {
    var dates = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    return dates;
}
function hours(date) {
    var dates = date.getHours();
    if (dates > 12) {
        dates = dates - 12;
    }
    else {
        dates = dates;
    }
    dates = dates < 10 ? "0" + dates : dates;

    return dates;
}
function apm(date) {
    var dates = date.getHours();
    dates = dates > 12 ? "PM" : "AM";
    return dates;
}

// geoloc
function geo() {
    console.clear();
    navigator.geolocation.getCurrentPosition(ff);
    function ff(gg) {
        var lat = gg.coords.latitude;
        var lon = gg.coords.longitude;
        console.log(lat + " " + lon);
        var apiurl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric&appid=52dc5a70d30ec838411a72da0d5dbfec';
        var xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            if (this.readyState == 4 && this.status == 200) {
                var info = JSON.parse(this.response);
                console.log(info);
                showData(info);
            }
        }
        xhttp.open('Get', apiurl, true);
        xhttp.send();
        // 2nd api call start from here
        var apiurl2 = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=metric&appid=52dc5a70d30ec838411a72da0d5dbfec';
        var xhttp2 = new XMLHttpRequest();
        xhttp2.onload = function () {
            if (this.readyState == 4 && this.status == 200) {
                var info2 = JSON.parse(this.response);
                console.log(info2);
                showData2(info2);
            }
        }
        xhttp2.open('Get', apiurl2, true);
        xhttp2.send();

    }

}

// counrtey city state code api se
var headers = new Headers()
headers.append("X-CSCAPI-KEY", "SFZQTGQzWDdwaG4yS2ROSlZzc21lU2pOM3RQTHBxQ20yVmJNRjRGdw==");
var ro = {
    method: 'Get',
    headers: headers,
    redirect: 'follow'
};

// country function
function countrym() {
    fetch("https://api.countrystatecity.in/v1/countries", ro)
        .then(response => response.json())
        //   .then(result => console.log(result))
        .then(result => countryf(result))
        .catch(error => console.log('error', error));
}
countrym();

function countryf(data) {
    console.log(data);
    const country = document.getElementById("countrys");
    var st = "";
    st += "<Option value=" + " sc" + ">" + "Select Country" + "</Option>"
    for (var i = 0; i < data.length; i++) {
        st += "<Option value=" + data[i].iso2 + ">" + data[i].name + "</Option>"
    }
    country.innerHTML = st;
}
var ctr = "";
// state func
function state(data) {
    console.clear();
    var url = "https://api.countrystatecity.in/v1/countries/" + data + "/states"
    fetch(url, ro)
        .then(response => response.json())
        // .then(result => console.log(result))
        .then(result => getstate(result))
        .catch(error => console.log('error', error));
    ctr = data;
    console.log(ctr);
}


function getstate(data) {
    console.clear();
    console.log(data);
    var sortedState = []; var resISO = [];
    for (var i = 0; i < data.length; i++) {
        sortedState[i] = data[i].name;
    }

    sortedState.sort();
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data.length; j++) {
            if (sortedState[i] == data[j].name) {
                resISO[i] = data[j].iso2;
            }
        }
    }
    console.log(sortedState);
    console.log(resISO);
    const state = document.getElementById("state-select");
    var st = "";
    st += "<Option value=" + " ss" + ">" + "Select State" + "</Option>"
    for (var i = 0; i < data.length; i++) {
        st += "<Option value=" + resISO[i] + ">" + sortedState[i] + "</Option>"
    }
    state.innerHTML = st;
}

// city func
function citys(data) {
    var url = "https://api.countrystatecity.in/v1/countries/" + ctr + "/states/" + data + "/cities"
    fetch(url, ro)
        .then(response => response.json())
        //  .then(result => console.log(result))
        .then(result => getcity(result))
        .catch(error => console.log('error', error));
}
function getcity(data) {
    console.clear();
    console.log(data);
    const city = document.getElementById("city-select");
    var st = "";
    st += "<Option value=" + " ss" + ">" + "Select City" + "</Option>"
    for (var i = 0; i < data.length; i++) {
        st += "<Option>" + data[i].name + "</Option>"
    }
    city.innerHTML = st;
}





// city selecct wether code
function getWetherByCity() {
    console.clear();
    const gwbc = document.getElementById("city-select");
    console.log(gwbc);
    var apiurl = 'https://api.openweathermap.org/data/2.5/weather?q=' + gwbc.value + '&units=metric&appid=52dc5a70d30ec838411a72da0d5dbfec';
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            var info = JSON.parse(this.response);
            console.log(info);
            showData(info);
        }
    }
    xhttp.open('Get', apiurl, true);
    xhttp.send();
    // 2nd api call start from here
    var apiurl2 = 'https://api.openweathermap.org/data/2.5/forecast?q=' + gwbc.value + '&units=metric&appid=52dc5a70d30ec838411a72da0d5dbfec';
    var xhttp2 = new XMLHttpRequest();
    xhttp2.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            var info2 = JSON.parse(this.response);
            console.log(info2);
            showData2(info2);
        }
    }
    xhttp2.open('Get', apiurl2, true);
    xhttp2.send();
}

//disability function

function ai() {
    const cc = document.getElementById("search");
    const c = document.getElementById("go");
    if (cc.value.length != 0) {
        c.disabled = false;
    }

    else {
        c.disabled = true;
    }
}


function gwds() {
    const cv = document.getElementById("gwd");
    const cvc = document.getElementById("city-select");
    if (cvc.selectedIndex != 0) {
        cv.disabled = false;
    }
    else {
        cv.disabled = true;
    }
}

//...forcast code start
function showData2(data) {
    const l = document.getElementsByClassName("forecast");
    const ftemp = document.getElementsByClassName("ftempb");
    const fdate = document.getElementsByClassName("fdateb");
    const fsunn = document.getElementsByClassName("fsunny");
    const fwind = document.getElementsByClassName("fwind");
    const ficon = document.getElementsByClassName("ficon");
    for (var i = 0; i < l.length; i++) {

        var fdatan = i * 8;
        //temp
        ftemp[i].innerHTML = data.list[fdatan].main.temp + " °C";
        //date
        var fd = data.list[fdatan].dt;
        var hd = new Date(fd * 1000);
        var fdates = hd.getDate() < 10 ? "0" + hd.getDate() : hd.getDate();

        var fdays = days[hd.getDay()];
        var fulldate = fdays + " " + fdates
        fdate[i].innerHTML = fulldate;
        // sunny
        fsunn[i].innerHTML = data.list[fdatan].weather[0].main;
        fwind[i].innerHTML =(data.list[fdatan].wind.speed * 3.6).toFixed(2) + " km/h";
        // ficion
        const ccv = data.list[fdatan].weather[0].icon;
        const icoonurl = "https://openweathermap.org/img/w/" + ccv + ".png";

        ficon[i].setAttribute("src", icoonurl);


    }


}

///geo
document.getElementById("loc").addEventListener("click", geo);

// initial loading
window.onload = function () {
    document.getElementById("search").value = "Mumbai"
    loadWeather();
    document.getElementById("search").value = "";
}


// code end