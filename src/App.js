import styled from 'styled-components';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Today from './components/Today';
import SearchPlaces from './components/SearchPlaces';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const LeftColumn = styled.div`
  width: 20%;
  min-width: 340px;
  background-color: #1e213a;
`;

const Dashboard = styled.div`
  background-color: #100e1d;
  width: 80%;
`;

const getCurrentDateTime = () => {
  const currentDatetime = new Date();
  const year = currentDatetime.getFullYear();
  const monthInt = parseInt(currentDatetime.getMonth())+1;
  const month = monthInt < 10 ? '0' + monthInt : monthInt;
  const day = currentDatetime.getDate < 10 ? '0' + currentDatetime.getDate() : currentDatetime.getDate();
  const hour = currentDatetime.getHours() < 10 ? '0' + currentDatetime.getHours() : currentDatetime.getHours();
  return year + '-' + month + '-' + day + 'T' + hour + ':00';
}

function App() {

  const [currentLocation, setCurrentLocation] = useState('Recife');
  const [todayTemperature, setTodayTemperature] = useState('');
  const [todayWeather, setTodayWeather] = useState('');
  const [showToday, setShowToday] = useState(true);

  useEffect(() => {
    //axios({method: 'get', url: 'https://api.open-meteo.com/v1/forecast?latitude=-8.05&longitude=-34.88&current_weather=true&start_date=2023-04-24&end_date=2023-04-24&timezone=America%2FSao_Paulo&hourly=relativehumidity_2m,precipitation'})
    //axios({method: 'get', url: 'https://api.open-meteo.com/v1/forecast?latitude=-8.05&longitude=-34.88&hourly=cloudcover&daily=rain_sum,showers_sum,snowfall_sum&current_weather=true&start_date=2023-04-24&end_date=2023-04-30&timezone=America%2FSao_Paulo'})
    //axios({method: 'get', url: 'https://api.open-meteo.com/v1/forecast?latitude=-22.90&longitude=-43.22&hourly=cloudcover&daily=rain_sum,showers_sum,snowfall_sum&current_weather=true&start_date=2023-04-24&end_date=2023-04-30&timezone=America%2FSao_Paulo'})
    axios({method: 'get', url: 'https://api.open-meteo.com/v1/forecast?latitude=-9.07&longitude=-35.24&hourly=rain,cloudcover&daily=precipitation_sum,rain_sum,showers_sum,snowfall_sum&current_weather=true&start_date=2023-04-24&end_date=2023-04-30&timezone=America%2FSao_Paulo'})
    .then(response => {
      console.log(response);
      //const currentDateTime = getCurrentDateTime();
      //const currentDateTimeIndex = response.data.hourly.time.indexOf(currentDateTime);
      //sunny - cloud < 50%
      // cloudy - cloud >= 50%
      // shower - showers < 1
      // rain -  1 <= showers > 5
      // heavy rain - 5 <= showers > 10
      // thunderstorm showers >= 10
      // snow
      // sleet - rain + snow
      const cloudcover = response.data.hourly.cloudcover.slice(0, 24);
      const cloudcoverPercentage = cloudcover.reduce((sum, value) => sum + value, 0);
      const showers = response.data.daily.showers_sum[0];
      const snowfall = response.data.daily.snowfall_sum[0];
      
      let weather = 'Sunny';
      if (cloudcoverPercentage >= 50) {
        weather = 'Cloudy';
      }
      if (showers < 1) {
        weather = 'Shower';
      } else if (showers >= 1 && showers < 5) {
        weather = 'Rain';
      } else if (showers >= 5 && showers < 10) {
        weather = 'Heavy Rain';
      } else if (showers > 10) {
        weather = 'Thunderstorm';
      }
      
      if (snowfall > 1) {
        weather = 'Snow';
        if (showers >= 1) {
          weather = 'Sleet';
        }
      }

      setTodayWeather(weather);
      setTodayTemperature(response.data.current_weather.temperature);
    })
    .catch(err => console.log(err));
  }, [])

  const locationClickHandler = (location) => {
    setCurrentLocation(location.name);
    setShowToday(true);
    axios({method: 'get', url: 'https://api.open-meteo.com/v1/forecast?latitude=' + location.lat + '&longitude=' + location.lng + '&hourly=rain,cloudcover&daily=precipitation_sum,rain_sum,showers_sum,snowfall_sum&current_weather=true&start_date=2023-04-24&end_date=2023-04-30&timezone=America%2FSao_Paulo'})
    .then(response => {
      console.log(response);
      //const currentDateTime = getCurrentDateTime();
      //const currentDateTimeIndex = response.data.hourly.time.indexOf(currentDateTime);
      //sunny - cloud < 50%
      // cloudy - cloud >= 50%
      // shower - showers < 1
      // rain -  1 <= showers > 5
      // heavy rain - 5 <= showers > 10
      // thunderstorm showers >= 10
      // snow
      // sleet - rain + snow
      const cloudcover = response.data.hourly.cloudcover.slice(0, 24);
      const cloudcoverPercentage = cloudcover.reduce((sum, value) => sum + value, 0);
      const showers = response.data.daily.showers_sum[0];
      const snowfall = response.data.daily.snowfall_sum[0];
      
      let weather = 'Sunny';
      if (cloudcoverPercentage >= 50) {
        weather = 'Cloudy';
      }
      if (showers < 1) {
        weather = 'Shower';
      } else if (showers >= 1 && showers < 5) {
        weather = 'Rain';
      } else if (showers >= 5 && showers < 10) {
        weather = 'Heavy Rain';
      } else if (showers > 10) {
        weather = 'Thunderstorm';
      }
      
      if (snowfall > 1) {
        weather = 'Snow';
        if (showers >= 1) {
          weather = 'Sleet';
        }
      }

      setTodayWeather(weather);
      setTodayTemperature(response.data.current_weather.temperature);
    })
    .catch(err => console.log(err));
  }

  return (
    <Wrapper>
      {showToday && 
        <LeftColumn>
          <div style={{margin: '20px', display: 'flex', flexDirection: 'column', height: '100%'}}>
            <Today todayTemperature={todayTemperature} todayWeather={todayWeather} location={currentLocation} setShowToday={setShowToday}/>
          </div>
        </LeftColumn>
      }
      {!showToday &&
        <LeftColumn>
          <div style={{margin: '20px', display: 'flex', flexDirection: 'column', height: '100%'}}>
            <SearchPlaces locationClickHandler={locationClickHandler} setShowToday={setShowToday}/>
          </div>
        </LeftColumn>
      }
      
      
      <Dashboard>

      </Dashboard>
    </Wrapper>
  );
}

export default App;
