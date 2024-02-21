const input = document.querySelector('input')
const date = document.querySelector('.date')
const hours = document.querySelector('.hours')

const temp = document.querySelector('.temp')
const rain = document.querySelector('#stat1')
const wet = document.querySelector('#stat2')
const wind = document.querySelector('#stat3')

input.addEventListener('change', () => {
    getWeather(input.value)
})



class Weather {
    constructor (city, date, time, icon, tempC, tempF, windC, windF, rainC, rainF, wet) {
        this.city = city
        this.date = date
        this.time = time
        this.icon = icon
        this.tempC = tempC
        this.tempF = tempF
        this.windC = windC
        this.windF = windF
        this.rainC = rainC
        this.rainF = rainF
        this.wet = wet
    }


}


function getIcon(code) {

    //this function get data from weather and return icon

    const img = document.querySelector('img')

    const ICONS_MAP = {
        all: {},
        darksky: {
            "clear-day": "clear-day",
            "clear-night": "clear-night",
            "cloudy": "cloudy",
            "drizzle": "drizzle",
            "fog": "mist",
            "hail": "hail",
            "partly-cloudy-day": "partly-cloudy-day",
            "partly-cloudy-day-rain": "partly-cloudy-day-rain",
            "partly-cloudy-night": "partly-cloudy-night",
            "partly-cloudy-night-rain": "partly-cloudy-night-rain",
            "rain": "rain",
            "sleet": "sleet",
            "snow": "snow",
            "thunderstorm": "thunderstorms",
            "tornado": "tornado",
            "wind": "wind"
        },
        openweathermap: {
            "1000": "clear-day",
            "1003": "partly-cloudy-day",
            "1006": "partly-cloudy-night",
            "1009": "cloudy",
            "1030": "mist",
            "1063": "partly-cloudy-day-rain",
            "1066": "partly-cloudy-day-snow",
            "1069": "sleet",
            "1072": "drizzle",
            "1087": "thunderstorms",
            "1114": "snow",
            "1117": "snow",
            "1135": "cloudy",
            "1147": "cloudy",
            "1150": "drizzle",
            "1153": "drizzle",
            "1168": "drizzle",
            "1171": "drizzle",
            "1180": "rain",
            "1183": "rain",
            "1186": "rain",
            "1189": "rain",
            "1192": "rain",
            "1195": "rain",
            "1198": "rain",
            "1201": "rain",
            "1204": "sleet",
            "1207": "sleet",
            "1210": "snow",
            "1213": "snow",
            "1216": "snow",
            "1219": "snow",
            "1222": "snow",
            "1225": "snow",
            "1237": "snow",
            "1240": "rain",
            "1243": "rain",
            "1246": "tornado",
            "1249": "sleet",
            "1252": "sleet",
            "1255": "snow",
            "1258": "snow",
            "1261": "sleet",
            "1264": "sleet",
            "1273": "thunderstorms",
            "1276": "thunderstorms",
            "1279": "thunderstorms",
            "1282": "thunderstorms",
        }
    };

    let text = ICONS_MAP.openweathermap[code]

    

    return img.src = `https://bmcdn.nl/assets/weather-icons/v2.0/fill/${text}.svg`
}

function showData(weather) {
    //this function will get data from getWeather function and show on html

    input.value = weather.city
    date.textContent = weather.date
    hours.textContent = weather.time

    temp.textContent = weather.tempC
    rain.textContent = weather.rainC
    wet.textContent = weather.wet
    wind.textContent = weather.windC

    return 
}

temp.addEventListener('click', () => {
    console.log('hello')
    console.log(weather)
    if(temp.textContent == weather.tempC) {
        temp.textContent = weather.tempF
        rain.textContent = weather.rainF
        wind.textContent = weather.windF
    } else {
        temp.textContent = weather.tempC
        rain.textContent = weather.rainC
        wind.textContent = weather.windC
    }
})

async function getWeather(input) {   

    const key = "5c43a43244af4bca99a124931240802"

    try {

    const data = await fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${input}`, {mode: 'cors'})

    const json = await data.json()
    
    const location = json.location

    const city = `${location.name}, ${location.country}`

    let localtime = location.localtime
    localtime = new Date(localtime)
        
    let dayInWeek = localtime.getDay()
    let week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    for (let i = 0; i < week.length; i++) {
            if (i == dayInWeek) {
                dayInWeek = week[i]
        } 
    }

    let now
    let minutes = localtime.getMinutes()
    if ( minutes < 10) {
        now = `${localtime.getHours()}:0${localtime.getMinutes()}`
    } else {
        now = `${localtime.getHours()}:${localtime.getMinutes()}`
    }
    
    console.log(city, dayInWeek, now)

    const status = json.current

    getIcon(status.condition.code)

    const tempC = status.temp_c + "°C"
    const tempF = status.temp_f + "°F"

    const windC = status.wind_kph + " kph"
    const windF = status.wind_mph + " mph"

    const rainC = status.precip_mm + " mm"
    const rainF = status.precip_in + " in"

    const wet = status.humidity + "%"

    console.log(tempC, tempF, windC, windF, rainC, rainF, wet)

    // if(weather) {
    //     weather.replace(new Weather(city, dayInWeek, now, status.condition.code, tempC, tempF, windC, windF, rainC, rainF, wet))
    // } else {

    // }

    weather = new Weather(city, dayInWeek, now, status.condition.code, tempC, tempF, windC, windF, rainC, rainF, wet)

    console.log(weather)

    return showData(weather)

    } catch (error) {
        alert('Khong tim thay du lieu, vui long thu lai')
    }

    
}

getWeather("Ho chi minh")

