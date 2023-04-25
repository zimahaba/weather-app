import styled from 'styled-components';
import { getWeatherByCode } from './Utils';

const Dashboard = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #100e1d;
  padding: 20px 80px;
`;

const WeekWeather = styled.div`
  display: flex;
  flex-diretion: row;
`;

const WeekDay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: #1e213a;
  flex: 1;
  height: 140px;
  padding: 10px;
  margin: 10px;
`;

const WeekDashboard = props => {
  return (
    <Dashboard>
      <div style={{color: '#ffffff'}}>C / F</div>
      <WeekWeather>
        {
          props.weekInfo.map(day => (
            ( <WeekDay>
                <label style={{color: '#ffffff'}}>{day.name}</label>
                <img style={{width: '50px'}} src={getWeatherByCode(day.weatherCode).image}/>
                <div style={{display: 'flex', justifyContent: 'space-evenly', width: '100%'}}>
                  <label style={{color: '#ffffff'}}>{day.max}°C</label>
                  <label style={{color: '#a09fb1'}}>{day.min}ºC</label>
                </div>
              </WeekDay>)))
        }
      </WeekWeather>
    </Dashboard>
  );
}

export default WeekDashboard;