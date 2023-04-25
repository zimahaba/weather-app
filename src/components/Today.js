import styled from "styled-components";
import cloudBgImage from '../assets/Cloud-background.png';
import gpsImage from '../assets/Gps.png';
import showerImage from '../assets/Shower.png';

const TodayButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SearchPlacesButton = styled.button`
  border: none;
`;

const Gps = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 100px;
  width: 40px;
  height: 40px;
  background-color: #71727e;
  cursor: pointer;
`;

const Today = props => {

  const searchPlacesHandler = () =>{
    props.setShowToday(false);
  }

  return (
    <>
      <TodayButtons>
        <button onClick={searchPlacesHandler}>Search for places</button>
        <Gps>
          <img style={{width: '28px'}} src={gpsImage}/>
        </Gps>
      </TodayButtons>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', height: '100%'}}>
        <div>
          <img src={showerImage}/>
        </div>
        <div><label style={{color: '#e7e7eb', fontSize: '80px'}}>{props.todayTemperature}°C</label></div>
        <div>{props.todayWeather}</div>
        <div>date</div>
        <div>{props.location}</div>
      </div>
    </>
  );
}

export default Today;