import styled from 'styled-components';
import './App.css';
import cloudBgImage from './assets/Cloud-background.png';
import gpsImage from './assets/Gps.png';
import showerImage from './assets/Shower.png';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Today = styled.div`
  width: 20%;
  background-color: #1e213a;
  
`;

const Dashboard = styled.div`
  background-color: #100e1d;
  width: 80%;
`;

const TodayButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SearchPlaces = styled.button`
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

function App() {
  return (
    <Wrapper>
      <Today>
        <div style={{margin: '20px', display: 'flex', flexDirection: 'column', height: '100%'}}>
          <TodayButtons>
            <button>Search for places</button>
            <Gps>
              <img style={{width: '28px'}} src={gpsImage}/>
            </Gps>
          </TodayButtons>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', height: '100%'}}>
            <div>
              <img src={showerImage}/>
            </div>
            <div><label style={{color: '#e7e7eb', fontSize: '80px'}}>15°C</label></div>
            <div>Shower</div>
            <div>date</div>
            <div>location</div>
          </div>
        </div>

      </Today>
      
      <Dashboard>

      </Dashboard>
    </Wrapper>
  );
}

export default App;
