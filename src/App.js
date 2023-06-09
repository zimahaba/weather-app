import styled from 'styled-components';
import './App.css';
import axios from 'axios';
import { useState } from 'react';
import Today from './components/Today';
import SearchPlaces from './components/SearchPlaces';

import { getWeatherByCode, formatDateTime } from './Utils';
import Dashboard from './components/Dashboard';
import { DivColumn } from './components/Styled';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const LeftColumn = styled(DivColumn)`
  width: 20%;
  min-width: 340px;
  background-color: #1e213a;
`;

const PlacesLeftColumn = styled(LeftColumn)`
  height: 100%;
  position: absolute;
  z-index: 10;
  left: 0;
  transition: transform 1s;
  transform: translate(${props => props.translate}, 0)
`;

function buildUrl(latitude, longitude, startDate, endDate, temperatureUnit) {
  const dailyParams = 'temperature_2m_max,temperature_2m_min,weathercode';
  const hourlyParams = 'relativehumidity_2m,surface_pressure,visibility';
  const currentWeather = true;
  const timezone = 'America%2FSao_Paulo'

  let url = 'https://api.open-meteo.com/v1/forecast?'
  url+='latitude=' + latitude
  url+='&longitude=' + longitude
  url+='&daily=' + dailyParams;
  url+='&hourly=' + hourlyParams;
  url+='&current_weather=' + currentWeather;
  url+='&start_date=' + startDate;
  url+='&end_date=' + endDate;
  url+='&timezone=' + timezone;
  if (temperatureUnit === 'F') {
    url+= '&temperature_unit=fahrenheit'
  }
  
  return url;
}

function App() {

  const [currentLocation, setCurrentLocation] = useState({});
  const [tempUnit, setTempUnit] = useState('C');
  const [todaySidebarInfo, setTodaySidebarInfo] = useState({});
  const [todayDashboardInfo, setTodayDashboardInfo] = useState({});
  const [placesTranslate, setPlacesTranslate] = useState('-100%');
  const [weekInfo, setWeekInfo] = useState([])

  const fetchWeather = (latitude, longitude, tempUnit) => {
    
    const currentDate = new Date();
    let lastDateTime = new Date();
    lastDateTime.setDate(lastDateTime.getDate() + 6);
    const startDate = formatDateTime(currentDate);
    const endDate = formatDateTime(lastDateTime);
    
    axios({method: 'get', url: buildUrl(latitude, longitude, startDate, endDate, tempUnit)})
    .then(response => {
      
      
      let weather = getWeatherByCode(response.data.current_weather.weathercode);
      const humidity = response.data.hourly.relativehumidity_2m[currentDate.getHours()];
      const visibility = response.data.hourly.visibility[currentDate.getHours()]/1000;
      const airPressure = response.data.hourly.surface_pressure[currentDate.getHours()];

      let week = [];
      for (let i = 1; i < 7; i++) {
        currentDate.setDate(currentDate.getDate()+1);
        week.push({name: currentDate.toLocaleDateString('en-US', {weekday: 'long'}), 
                  weatherCode: response.data.daily.weathercode[i],
                  max: response.data.daily.temperature_2m_max[i].toString().split('.')[0],
                  min: response.data.daily.temperature_2m_min[i].toString().split('.')[0]});
      }

      setTodaySidebarInfo({weather: weather.description, icon: weather.image, temperature: response.data.current_weather.temperature.toString().split('.')[0]});
      setTodayDashboardInfo({windSpeed: response.data.current_weather.windspeed, windDirection: response.data.current_weather.winddirection, humidity: humidity, visibility: visibility, airPressure: airPressure});
      setWeekInfo(week);
      if (tempUnit !== undefined) {
        setTempUnit(tempUnit);
      }
    })
    .catch(err => console.log(err));
  }

  const locationClickHandler = (location) => {
    setCurrentLocation(location);
    setPlacesTranslate('-100%')
    fetchWeather(location.lat, location.lng, tempUnit);
  }

  const geocodingClickHandler = (location) => {
    setCurrentLocation(location);
    fetchWeather(location.lat, location.lng, tempUnit);
  }

  const tempUnitChangeHandler = (tempUnit) => {
    fetchWeather(currentLocation.lat, currentLocation.lng, tempUnit);
  }

  const placesTranslationHandler = (showPlaces) => {
    if (showPlaces) {
      setPlacesTranslate('0')
    } else {
      setPlacesTranslate('-100%')
    }
  }

  return (
    <Wrapper>
      
      <LeftColumn>
          <Today todayInfo={todaySidebarInfo} location={currentLocation} setGeocodingLocation={geocodingClickHandler} showPlaces={placesTranslationHandler} tempUnit={tempUnit}/>
      </LeftColumn>
      
      <PlacesLeftColumn translate={placesTranslate}>
          <SearchPlaces locationClickHandler={locationClickHandler} showPlaces={placesTranslationHandler}/>
      </PlacesLeftColumn>
      
      <Dashboard todayInfo={todayDashboardInfo} weekInfo={weekInfo} tempUnit={tempUnit} setTempUnit={tempUnitChangeHandler}/>      
    </Wrapper>
  );
}

export default App;
