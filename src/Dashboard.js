import styled from 'styled-components';
import { getWeatherByCode } from './Utils';

const Dashboard = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #100e1d;
  padding: 20px 160px;
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
  height: 180px;
  padding: 10px;
  margin: 10px;
`;

const WeekDashboard = props => {
  return (
    <Dashboard>
      <div style={{display: 'flex', justifyContent: 'flex-end', margin: '10px 10px 30px 10px'}}>
        <button style={{backgroundColor: '#e7e7eb', border: 'none', borderRadius: '100px', width: '30px', height: '30px', cursor: 'pointer', marginLeft: '8px'}}>°C</button>
        <button style={{backgroundColor: '#585676', border: 'none', borderRadius: '100px', width: '30px', height: '30px', cursor: 'pointer', marginLeft: '8px'}}>°F</button>
      </div>
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

      <div style={{display: 'flex', flexDirection: 'column', marginTop: '60px'}}>
        <div style={{margin: '10px'}}>
          <label style={{color: '#ffffff', fontWeight: 'bold', fontSize: 'larger'}}>Today's Highlights</label>
        </div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1', backgroundColor: '#1e213a', margin: '10px'}}>
              <label style={{color: '#ffffff', margin: '20px'}}>Wind Status</label>
              <label style={{color: '#ffffff', fontSize: '60px', margin: '10px'}}>7kph</label>
              <label style={{color: '#ffffff', margin: '20px'}}>Direction</label>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1', backgroundColor: '#1e213a', margin: '10px'}}>
              <label style={{color: '#ffffff', margin: '20px'}}>Humidity</label>
              <label style={{color: '#ffffff', fontSize: '60px', margin: '10px'}}>84%</label>
              <label style={{color: '#ffffff', margin: '20px'}}>Progress Bar</label>
            </div>
          </div>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1', backgroundColor: '#1e213a', margin: '10px'}}>
              <label style={{color: '#ffffff', margin: '20px'}}>Visibility</label>
              <label style={{color: '#ffffff', fontSize: '60px', margin: '10px 0px 20px 0px'}}>6,4 miles</label>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1', backgroundColor: '#1e213a', margin: '10px'}}>
              <label style={{color: '#ffffff', margin: '20px'}}>Air Pressure</label>
              <label style={{color: '#ffffff', fontSize: '60px', margin: '10px 0px 20px 0px'}}>998 mmb</label>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}

export default WeekDashboard;