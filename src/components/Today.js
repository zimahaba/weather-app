import styled from "styled-components";
import gpsImage from '../assets/Gps.png';
import { GrayLabel, WhiteLabel } from "./Styled";

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

const TempUnitLabel = styled(GrayLabel)`
  font-size: 40px;
`;

const GrayLabel14 = styled(GrayLabel)`
  font-size: 14px;
`;

const GrayLabel30 = styled(GrayLabel)`
  font-size: 30px;
`;

const WhilteLabel80 = styled(WhiteLabel)`
  font-size: 80px;
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
          <WhilteLabel80>{props.todayInfo.temperature}</WhilteLabel80>
          <TempUnitLabel>°{props.tempUnit}</TempUnitLabel>
        </div>
        <div><GrayLabel30>{props.todayInfo.weather}</GrayLabel30></div>
        <div><GrayLabel14>Today - {new Date().toDateString()}</GrayLabel14></div>
        <div><GrayLabel14>{props.location.name}</GrayLabel14></div>
      </div>
    </div>
  );
}

export default Today;