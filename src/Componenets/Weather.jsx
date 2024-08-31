import React from "react";
import { useEffect, useState } from "react";
const Weather = () => {

    const [currentWeather, setCurrentWeather] = useState({ weather: [] });
    const [city, setCity] = useState('')

    useEffect(() => {
        getWeather(city)
        console.log("chal gayaa")
    }, [])


    const getWeather = () => {
        const weatherResult = document.getElementById('weatherResult');
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4f62b4511aae25559f2ae77ae94ab77a&units=metric`)
            .then((res) => res.json())
            .then((data) => {

                const sunset = (data.sys.sunset) * 1000;
                const getsunset = new Date(sunset).toLocaleTimeString();
                const sunrise = (data.sys.sunrise) * 1000;
                const getsunrise = new Date(sunrise).toLocaleTimeString();
                const date = new Date().toLocaleTimeString();

                weatherResult.innerHTML =
                    `<h1 class=" text-3xl font-semibold font-serif underline text-center">${data.name}, ${data.sys.country}</h1>
                                    <h1 class=" text-[18px] font-serif capitalize"><b>Weather:</b> ${data.weather[0].description}</h1>
                <h1 class=" text-[18px] font-serif "><b>Temprature:</b> ${data.main.temp}°C</h1>
                <h1 class=" text-[18px] font-serif "><b>Feels:</b> ${data.main.feels_like}°C</h1>
                <h1 class=" text-[18px] font-serif "><b>Humidity:</b> ${data.main.humidity}%</h1>
                <h1 class=" text-[18px] font-serif "><b>Wind Speed:</b> ${data.wind.speed}%</h1>
                <h1 class=" text-[18px] font-serif "><b>Clouds:</b> ${data.clouds.all}%</h1>
                <h1 class=" text-[18px] font-serif "><b>Sunrise:</b> ${getsunrise}</h1>
                <h1 class=" text-[18px] font-serif "><b>Sunset:</b>: ${getsunset}</h1>
                `
                setCurrentWeather(data)
                const weatherMain = data.weather[0].main.toLowerCase();
                if (weatherMain.includes('clear') || weatherMain.includes('sun')) {
                    document.body.style.backgroundImage = "url('Images/clearback.webp')";
                } else if (weatherMain.includes('cloud')) {
                    document.body.style.backgroundImage = "url('Images/clouds.jpg')";
                } else if (weatherMain.includes('rainy') || weatherMain.includes('rain')) {
                    document.body.style.backgroundImage = "url('Images/rainybg.jpg')";
                } else if (weatherMain.includes('snowy')) {
                    document.body.style.backgroundImage = "url('Images/snowbg.jpg')";
                } else if (weatherMain.includes('haze') || weatherMain.includes('smoke') || weatherMain.includes('mist')) {
                    document.body.style.backgroundImage = "url('Images/hazebg.webp')";
                } else if (weatherMain.includes('thunderstorm')) {
                    document.body.style.backgroundImage = "url('Images/thunderstormbg.jpeg')";
                } else {
                    // document.body.style.backgroundImage = "url('default.jpg')";
                }

                if (getsunset >= date) {
                    if (weatherMain.includes('clear') || weatherMain.includes('sun')) {
                        document.body.style.backgroundImage = "url('Images/night.webp')";
                    } else if (weatherMain.includes('cloud')) {
                        document.body.style.backgroundImage = "url('Images/nightcloudy.jpg')"
                    }
                }

                if (data.main.feels_like > 40) {
                    style.color = 'red'
                }
                if (data.main.temp > 40) {
                    style.color = 'red'
                }
            })
        // .catch(error => {
        //     weatherResult.innerHTML = `<p class=' text-red-600 text-2xl font-serif font-bold underline'>${error.message}</p>`;
        // })
    }

    const temp = Math.floor(currentWeather?.main?.temp);
    const feelsLike = Math.round(currentWeather?.main?.feels_like);
    const weatherCondtion = currentWeather?.weather[0]?.main;
    const name = currentWeather?.name;


    return (
        <>
            <div className="  bg-pink-950 flex justify-center">
                <h1 className="text-4xl text-pink-600 font-bold p-4 text-center">Live Weather App</h1>
                <img className=" w-[100px] h-[70px] " src="src/weather.png" alt="" />
            </div>
            <div className=" flex justify-center items-center mt-6">
                <input
                    className=" border-2 border-pink-950 bg-none p-3 w-[35%] rounded-lg outline-none placeholder: font-serif"
                    type="search" placeholder="Search City Name"
                    onChange={(e) => setCity(e.target.value)}
                    id="input"
                />

                <button className="border-2 border-amber-900 p-3 rounded-md ml-2 text-pink-950 font-semibold hover:bg-pink-950 hover:underline hover:text-white px-3"
                    onClick={getWeather}>
                    Search
                </button>
            </div>

            <div className=" w-[50%] flex justify-center items-center m-auto rounded-lg mt-4 text-center">
                <div id="weatherResult">

                </div>
            </div>
        </>
    )
}

export default Weather