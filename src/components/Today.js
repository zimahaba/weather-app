import styled from "styled-components";
import gpsImage from '../assets/Gps.png';

const TodayButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SearchPlacesButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: #6e707a;
  color: #ffffff;
  box-shadow: 0px 0px 1px 0.1px #000000;
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
  box-shadow: 0px 0px 1px 0.1px #000000;
  cursor: pointer;
`;

const Today = props => {

  const searchPlacesHandler = () =>{
    props.setShowToday(false);
  }

  return (
    <div style={{margin: '20px', display: 'flex', flexDirection: 'column', height: '100%'}}>
      <TodayButtons>
        <SearchPlacesButton onClick={searchPlacesHandler}>Search for places</SearchPlacesButton>
        <Gps>
          <img style={{width: '28px'}} src={gpsImage}/>
        </Gps>
      </TodayButtons>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', height: '100%'}}>
        <div>
          <img src={props.todayInfo.icon}/>
        </div>
        <div>
          <label style={{color: '#e7e7eb', fontSize: '80px'}}>{props.todayInfo.temperature}</label>
          <label style={{color: '#a09fb1', fontSize: '40px'}}>°{props.tempUnit}</label>
        </div>
        <div style={{color: '#a09fb1', fontSize: '30px'}}>{props.todayInfo.weather}</div>
        <div><label style={{color: '#a09fb1', fontSize: '14px'}}>Today - {new Date().toDateString()}</label></div>
        <div><label style={{color: '#a09fb1', fontSize: '14px'}}>{props.location.name}</label></div>
      </div>
    </div>
  );
}

export default Today;