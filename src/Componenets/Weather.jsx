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
            .then((data) => data.json())
            .then((data) => {
                const sunset= (data.sys.sunset) * 1000;
                const getsunset= new Date(sunset).toLocaleTimeString();

                const sunrise= (data.sys.sunrise) * 1000;
                const getsunrise= new Date(sunrise).toLocaleTimeString();

                weatherResult.innerHTML =
                `<h1 class=" text-3xl font-semibold font-serif underline text-center">${data.name}</h1>
                <h1 class=" text-[18px] font-serif ">Temprature: ${data.main.temp}°C</h1>
                <h1 class=" text-[18px] font-serif ">Feels: ${data.main.feels_like}°C</h1>
                <h1 class=" text-[18px] font-serif ">Weather: ${data.weather[0].description}</h1>
                <h1 class=" text-[18px] font-serif ">Humidity: ${data.main.humidity}%</h1>
                <h1 class=" text-[18px] font-serif ">Wind Speed: ${data.wind.speed}%</h1>
                <h1 class=" text-[18px] font-serif ">Clouds: ${data.clouds.all}%</h1>
                <h1 class=" text-[18px] font-serif ">Sunset: ${getsunrise}</h1>
                <h1 class=" text-[18px] font-serif ">Sunset: ${getsunset}</h1>
                `
                setCurrentWeather(data)
            })
    }



    const temp = Math.floor(currentWeather?.main?.temp);
    const feelsLike = Math.round(currentWeather?.main?.feels_like);
    const weatherCondtion = currentWeather?.weather[0]?.main;
    const name = currentWeather?.name;


    return (
        <>
            <div className="  bg-pink-950 flex justify-center">
                <h1 className="text-4xl text-pink-600 font-bold p-4 text-center">Live Weather App</h1>
                <img className=" w-[100px] h-[70px] " src="weather.png" alt="" />
            </div>
            <div className=" flex justify-center items-center mt-6">
                <input
                    className=" border-2 border-pink-950 bg-none p-3 w-[35%] rounded-lg outline-none"
                    type="search" placeholder="Search City Name"
                    onChange={(e) => setCity(e.target.value)}
                    id="input"
                />

                <button className="border-2 border-amber-900 p-3 rounded-md ml-2 text-pink-950 font-semibold hover:bg-pink-950 hover:underline hover:text-white px-3"
                    onClick={getWeather}>
                    Search
                </button>
            </div>

            <div className="w-[50%] bg-slate-400 flex justify-center items-center m-auto rounded-lg mt-4 text-center">
                <div id="weatherResult">

                </div>
            </div>
        </>
    )
}

export default Weather