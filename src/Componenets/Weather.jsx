import React from "react";
import { useEffect, useState } from "react";

const Weather = () => {

    const [currentWeather, setCurrentWeather] = useState({ weather: [], });
    const [city, setCity] = useState("");
    // const onChange = (e) => setCity(e.target.value);

    useEffect(() => {
        getWeather()
    }, [city])

    const getWeather = (city) => {
        const APIkey = "4f62b4511aae25559f2ae77ae94ab77a";
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`)
            .then((res) => res.json())
            .then((data) => {
                if (data.cod === 200) {
                    setCurrentWeather(data)
                }
            })
            .catch((error) => {

            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city) {
            getWeather(city)
        }
    }


    const temp = Math.round(currentWeather?.main?.temp - 273.15)
    return (
        <>
            <div className="  bg-pink-950 flex justify-center">
                <h1 className="text-4xl text-pink-600 font-bold p-4 text-center">Live Weather App</h1>
                <img className=" w-[100px] h-[70px] " src="weather.png" alt="" />
            </div>
            <div className=" flex justify-center items-center mt-6">
                <input
                    className=" border-2 border-pink-950 p-3 w-[35%] rounded-lg outline-none"
                    type="search" placeholder="Search City Name"
                    value={city}
                    onChange={(e) => e.target.value}
                />

                

                <button className="border-2 border-amber-900 p-3 rounded-md ml-2 text-pink-950 font-semibold hover:bg-pink-950 hover:underline hover:text-white px-3"
                    onClick={getWeather}>
                    Search</button>
            </div>

            <div>
            {temp}
            </div>
        </>
    )
}

export default Weather