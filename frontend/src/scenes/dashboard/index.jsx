import { Box, Button, IconButton, Typography, useTheme, Autocomplete, TextField, List, ListItemText } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import PieChart from "../../components/PieChart";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import ForecastCard from "../../components/ForecastCard";

import SearchIcon from "@mui/icons-material/Search";
import CloudIcon from '@mui/icons-material/Cloud';
import AirIcon from '@mui/icons-material/Air';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WindPowerIcon from '@mui/icons-material/WindPower';
import InvertColorsIcon from '@mui/icons-material/InvertColors';

import CompressIcon from '@mui/icons-material/Compress';

import ThermostatIcon from '@mui/icons-material/Thermostat';

import { useEffect, useState } from "react";



const Dashboard = () => {

  const [isGeolocationEnabled, setIsGeolocationEnabled] = useState(false);

  



  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedValue, setSelectedValue] = useState(null);
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [dewPoint, setdewPoint] = useState(0);
  const [windSpeed, setwindSpeed] = useState(0);
  const [windDirection, setwindDirection] = useState(0);
  const [uvIndex, setUvIndex] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [weather, setWeather] = useState(0);
  const [data, setData] = useState(null);
  const [weatherToday, setWeatherToday] = useState(null);
  const [forecastData, setForecastData] = useState([]);

  const cities = [
    "London",
    "Manchester",
    "Birmingham",
    "Glasgow",
    "Liverpool",
    "Bristol",
    "Edinburgh",
    "Leeds",
    "Sheffield",
    "Dublin",
    "Paris",
    "Marseille",
    "Lyon",
    "Hamburg",
    "Berlin",
    "Munich",
    "Rome",
    "Milan",
    "Naples",
    "Amsterdam",
    "Rotterdam",
    "The Hague",
    "Utrecht",
    "Vienna",
    "Zurich",
    "Geneva",
    "Stockholm",
    "Oslo",
    "Copenhagen",
    "Helsinki",
    "Barcelona",
    "Madrid",
    "Valencia",
    "Seville",
    "Zaragoza",
    "Malaga",
    "Murcia",
    "Palma",
    "Las Palmas",
    "Bilbao",
    "Alicante",
    "Cordoba",
    "Valladolid",
    "Vigo",
    "Gijon",
    "Lisbon",
    "Porto",
    "Budapest",
    "Warsaw",
    "Krakow",
    "Poznan",
    "Wroclaw",
    "Gdansk",
    "Katowice",
    "Lodz",
    "Szczecin",
    "Bydgoszcz",
    "Brussels",
    "Antwerp",
    "Ghent",
    "Charleroi",
    "Liege",
    "Bruges",
    "Louvain-la-Neuve",
    "Namur",
    "Athens",
    "Thessaloniki",
    "Patras",
    "Heraklion",
    "Larissa",
    "Volos",
    "Ioannina",
    "Rhodes",
    "Chania",
    "Crete",
    "Bucharest",
    "Cluj-Napoca",
    "Timisoara",
    "Iasi",
    "Constanta",
    "Craiova",
    "Galati",
    "Brasov",
    "Ploiesti",
    "Sibiu",
    "Prague",
    "Brno",
    "Ostrava",
    "Plzen",
    "Olomouc",
    "Liberec",
    "Usti nad Labem",
    "Hradec Kralove",
    "Ceske Budejovice",
    "Zlin",
    "Dubrovnik",
    "Split",
    "Zagreb",
    "Rijeka",
    "Osijek",
    "Pula",
    "Sibenik",
    "Varazdin",
    "Ljubljana",
    "Maribor",
    "Koper",
    "Novo Mesto",
    "Velenje",
    "Skopje",
    "Bitola",
    "Kumanovo",
    "Ohrid",
    "Tetovo",
    "Stip",
    "Veles",
    "Prilep",
  ];
  
  const API_KEY = "d0654d378c1e5af3cce8c93afb1fa05f"
  const GEO_API_KEY = "bee6776c35664d63958d0dcaaba3e3b7"
  const units = "metric"

  
  // check if geolocation is enabled
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        // The user allowed the request for geolocation
        console.log('User allowed geolocation');
        setIsGeolocationEnabled(true);
      },
      function(error) {
        if (error.code == error.PERMISSION_DENIED) {
          // The user denied the request for geolocation
          console.log('User denied geolocation');
        }
      }
    );
  }, []);


  const getWeatherByCoords = async (lat, lon) => {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + API_KEY + '&units=' + units;
    const response = await fetch(apiUrl);
    const data = await response.json();
    const cityName = data.name;
    const temperature = data.main.temp;
    console.log(`${cityName}: ${temperature}°C`);
    setTemperature(temperature);
    setHumidity(data.main.humidity);
    setwindSpeed(data.wind.speed);
    setPressure(data.main.pressure);
    setWeather(data.weather[0].main);
    setSelectedValue(cityName);

    // OneAPI 
    const exclude = "current,minutely,hourly";

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${API_KEY}`)
  .then(response => response.json())
  .then(data => {

    // get uv index
    const uvIndex = data.daily[0].uvi;
    setUvIndex(uvIndex);

    // get wind direction
    const windDirection = data.daily[0].wind_deg;
    // convert wind direction to compass direction
    function degToCompass(num) {
      var val = Math.floor((num / 22.5) + 0.5);
      var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
      return arr[(val % 16)];
    }
    const windDirectionCompass = degToCompass(windDirection);
    setwindDirection(windDirectionCompass);

    setdewPoint(data.daily[0].dew_point);




    let weatherCounts = {};
    data.daily.forEach(day => {
      const weather = day.weather[0].main;
      if (weatherCounts[weather]) {
        weatherCounts[weather] += 1;
      } else {
        weatherCounts[weather] = 1;
      }
    });
    // convert object to array
    weatherCounts = Object.keys(weatherCounts).map(key => {
      return {
        id: key,
        label: key,
        value: weatherCounts[key],
        color: 'hsl(0, 70%, 50%)'
      }
    });

    setWeatherToday(weatherCounts)
  });


    // Forecast API

     // Set the API endpoint and parameters
     const api2Url = 'https://api.openweathermap.org/data/2.5/forecast';

     // Construct the API URL
     const apiUrlWithParams = `${api2Url}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`;
 
     // Fetch the data from the API
     fetch(apiUrlWithParams)
       .then(response => response.json())
       .then(data => {

        const dailyForecasts = data.list.filter((forecast, index) => index % 8 === 0);

        setForecastData(dailyForecasts);

         const tempData = {
           id: cityName,
           color: tokens("dark").greenAccent[500],
           data: []
         };
     
         // Loop over 24-hour forecast data and format it for the chart
         for (let i = 0; i < data.list.length && i < 24; i++) {
           const forecast = data.list[i];
           const hour = new Date(forecast.dt * 1000).getHours();
           tempData.data.push({
             x: `${hour}h`,
             y: forecast.main.temp
           });
         }
 
         var newData = [tempData]
         setData(newData);
       })
       .catch(error => console.error(error));
  }


  useEffect(() => {
    console.log("Starting geolocation...")
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("Geolocation is supported by this browser.");
        getWeatherByCoords(position.coords.latitude, position.coords.longitude);
      });
    } else {
      setIsGeolocationEnabled(false);
      console.log("Geolocation is not supported by this browser.");
      
    }
  }, []);

  const getWeather = async () => {
    if (!selectedValue) {
      return;
    }


    const generalapi = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${selectedValue}&appid=${API_KEY}&units=${units}`)
    const data = await generalapi.json()
    const cityName = data.name;
    const temperature = data.main.temp;

    // Set the API endpoint and parameters
    const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';

    // Construct the API URL
    const apiUrlWithParams = `${apiUrl}?q=${selectedValue}&appid=${API_KEY}&units=${units}`;

    // Fetch the data from the API
    fetch(apiUrlWithParams)
      .then(response => response.json())
      .then(data => {

        const dailyForecasts = data.list.filter((forecast, index) => index % 8 === 0);

        setForecastData(dailyForecasts);
        
        const tempData = {
          id: selectedValue,
          color: tokens("dark").greenAccent[500],
          data: []
        };
    
        // Loop over 24-hour forecast data and format it for the chart
        for (let i = 0; i < data.list.length && i < 24; i++) {
          const forecast = data.list[i];
          const hour = new Date(forecast.dt * 1000).getHours();
          tempData.data.push({
            x: `${hour}h`,
            y: forecast.main.temp
          });
        }
        

        var newData = [tempData]
        setData(newData);
      })
      .catch(error => console.error(error));

    
      
      let weather = "clear";
      let weatherLastHour = 0;
      data.weather.forEach(item => {
        if (item.main === "Rain") {
          weather = "rain";
        } else if (item.main === "Snow") {
          weather = "snow";
          if (item.snow && item.snow["1h"]) {
            weatherLastHour = item.snow["1h"];
          }
        }
      });



      setTemperature(temperature);
      setWeather(weather);
      setHumidity(data.main.humidity);
      setPressure(data.main.pressure);
      const windSpeed = data.wind.speed;
      const country = data.sys.country;
    
    console.log(`${cityName}, ${country}: ${temperature}°C, ${weather}, ${weatherLastHour} cm last hour, wind speed ${windSpeed} m/s`); 

    // Pie Chart
    
    // Get Lat and Lon from selectedValue

    const openCageAPI = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${selectedValue}&key=${GEO_API_KEY}`)
    const openCageData = await openCageAPI.json()
    const lat = openCageData.results[0].geometry.lat;
    const lon = openCageData.results[0].geometry.lng;

        // OneAPI 
        const exclude = "current,minutely,hourly";

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${API_KEY}`)
      .then(response => response.json())
      .then(data => {

        const uvIndex = data.daily[0].uvi;
        setUvIndex(uvIndex);
    
        // get wind direction
        const windDirection = data.daily[0].wind_deg;
        // convert wind direction to compass direction
        function degToCompass(num) {
          var val = Math.floor((num / 22.5) + 0.5);
          var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
          return arr[(val % 16)];
        }
        const windDirectionCompass = degToCompass(windDirection);
        setwindDirection(windDirectionCompass);
    
        setdewPoint(data.daily[0].dew_point);
    
        let weatherCounts = {};
        data.daily.forEach(day => {
          const weather = day.weather[0].main;
          if (weatherCounts[weather]) {
            weatherCounts[weather] += 1;
          } else {
            weatherCounts[weather] = 1;
          }
        });
        // convert object to array
        weatherCounts = Object.keys(weatherCounts).map(key => {
          return {
            id: key,
            label: key,
            value: weatherCounts[key],
            color: 'hsl(0, 70%, 50%)'
          }
        });
    
        setWeatherToday(weatherCounts);
        console.log(weatherCounts)

      })




    
  }








  return (
    
 
    

    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        

        <Box>

        </Box>
      </Box>

          {/* WEATHER SEARCH */}
          <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        bgcolor="primary.400"
        borderRadius="3px"
      >
            <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={cities.filter((city) => city.toLowerCase().startsWith(selectedValue?.toLowerCase() || ''))}
      limitTags={5}
      sx={{ width: 300 }}
      value={selectedValue}
      onChange={(event, newValue) => {
        setSelectedValue(newValue);
      }}
      renderInput={(params) => <TextField {...params} label="City" />}
    />
        <IconButton type="button" sx={{ p: 1 }} onClick={getWeather}>
          <SearchIcon />
        </IconButton>
      </Box>
    </Box>
    


      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={temperature}
            subtitle="Temperature"
            icon={
              <ThermostatIcon
                sx={{ color: colors.greenAccent[600], fontSize: "32px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={weather}
            subtitle="Current Weather"
            icon={
              <CloudIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={humidity + "%"}
            subtitle="Humidity"
            icon={
              <InvertColorsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={pressure + " hPa"}
            subtitle="Pressure"
            progress="0.80"
            increase="+43%"
            icon={
              <CompressIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title= {uvIndex}
            subtitle="UV Index"
            icon={
              <WbSunnyIcon
                sx={{ color: colors.greenAccent[600], fontSize: "32px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title= {windDirection}
            subtitle="Wind Direction"
            icon={
              <AirIcon
                sx={{ color: colors.greenAccent[600], fontSize: "32px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title= {windSpeed + " m/s"}
            subtitle="Wind Speed"
            icon={
              <WindPowerIcon
                sx={{ color: colors.greenAccent[600], fontSize: "32px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title= {dewPoint}
            subtitle="Dew Point"
            icon={
              <ThermostatIcon
                sx={{ color: colors.greenAccent[600], fontSize: "32px" }}
              />
            }
          />
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Temperature
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
              Currently: {temperature}
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} data={data}/>
          </Box>
        </Box>


        {/* ROW 4 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
              <Box m="10px">
      <Header title="Weather Today"/>
      <Box height="200px">
        <PieChart data={weatherToday}/>
      </Box>
    </Box>
    











        </Box>

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="start"
        >
      <Box m="20px">
        <Header title="Weekly Forecast"/>
        <Box display="flex" justifyContent="space-between" flexWrap="wrap">

        {forecastData.map(forecast => (
        <Box m="10px">

        <ForecastCard
          key={forecast.dt}
          date={new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}
          temperature={`${forecast.main.temp} °C`}
          icon={<img src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} alt={forecast.weather[0].description} />}
        />
        </Box>
      ))}

        </Box>
      </Box>
      </Box>

       
      </Box>
      
    </Box>

    
  );
};

export default Dashboard;