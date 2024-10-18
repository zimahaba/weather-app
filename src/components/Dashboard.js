import styled from 'styled-components';
import Highlights from './Highlights';
import WeekInfo from './WeekInfo';
import { DivRow } from './Styled';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #100e1d;
  padding: 20px 160px;
`;

const TemperatureSelectionDiv = styled(DivRow)`
  justify-content: flex-end;
  margin: 10px 10px 30px 10px;
`;

const TemperatureButton = styled.button`
  border: none;
  border-radius: 100px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-left: 8px;
  background-color: ${props => (props.selected ? '#e7e7eb' : '#585676')};
`;

const Dashboard = props => {

  const tempUnitClickHandler = (unit) => {
    props.setTempUnit(unit);
  }

  return (
    <Wrapper>
      
      <TemperatureSelectionDiv>
        <TemperatureButton selected={props.tempUnit === 'C'} onClick={() => tempUnitClickHandler('C')}>°C</TemperatureButton>
        <TemperatureButton selected={props.tempUnit === 'F'} onClick={() => tempUnitClickHandler('F')}>°F</TemperatureButton>
      </TemperatureSelectionDiv>

      <WeekInfo weekInfo={props.weekInfo} tempUnit={props.tempUnit}/>
      
      <Highlights todayInfo={props.todayInfo}/>
      
    </Wrapper>
  );
}

export default Dashboard;