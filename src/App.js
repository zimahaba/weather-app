import styled from 'styled-components';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Today from './components/Today';
import SearchPlaces from './components/SearchPlaces';

import { getWeatherByCode, formatDateTime } from './Utils';
import WeekDashboard from './Dashboard';

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

function App() {

  const [currentLocation, setCurrentLocation] = useState('Recife');
  const [todayTemperature, setTodayTemperature] = useState('');
  const [todayWeather, setTodayWeather] = useState('');
  const [todayIcon, setTodayIcon] = useState(null);
  const [showToday, setShowToday] = useState(true);
  const [weekInfo, setWeekInfo] = useState([])

  const fetchWeather = (latitude, longitude) => {
    
    const currentDate = new Date();
    let lastDateTime = new Date();
    lastDateTime.setDate(lastDateTime.getDate() + 6);
    const [startDate] = formatDateTime(currentDate);
    const [endDate] = formatDateTime(lastDateTime);
    
    axios({method: 'get', url: 'https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=temperature_2m_max,temperature_2m_min,weathercode&current_weather=true&start_date=' + startDate + '&end_date=' + endDate + '&timezone=America%2FSao_Paulo'})
    .then(response => {
      console.log(response.data);
      
      let weather = getWeatherByCode(response.data.current_weather.weathercode);

      let week = [];
      for (let i = 1; i < 7; i++) {
        week.push({name: '', 
                  weatherCode: response.data.daily.weathercode[i],
                  max: response.data.daily.temperature_2m_max[i].toString().split('.')[0],
                  min: response.data.daily.temperature_2m_min[i].toString().split('.')[0]});
      }

      setTodayIcon(weather.image);
      setTodayWeather(weather.description);
      setTodayTemperature(response.data.current_weather.temperature.toString().split('.')[0]);
      setWeekInfo(week);

    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchWeather('-8.05', '-34.88');
  }, [])

  const locationClickHandler = (location) => {
    setCurrentLocation(location.name);
    setShowToday(true);
    fetchWeather(location.lat, location.lng)
  }

  return (
    <Wrapper>
      {showToday && 
        <LeftColumn>
            <Today todayIcon={todayIcon} todayTemperature={todayTemperature} todayWeather={todayWeather} location={currentLocation} setShowToday={setShowToday}/>
        </LeftColumn>
      }
      {!showToday &&
        <LeftColumn>
            <SearchPlaces locationClickHandler={locationClickHandler} setShowToday={setShowToday}/>
        </LeftColumn>
      }
      
      <WeekDashboard weekInfo={weekInfo}/>      
    </Wrapper>
  );
}

export default App;
