import { getWeatherByCode } from '../Utils';
import { DivColumn, DivRow, GrayLabel, WhiteLabel } from './Styled';
import {Wrapper, WeekWeather, WeekDay, TemperatureSelectionDiv, TemperatureButton, MaxMin, HighlightsWrapper, HighlightsLabel, HighlightDiv, Label20, Label60Top, Label60Bottom} from './DashboardsCss';

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
      <WeekWeather>
        {
          props.weekInfo.map(day => (
            ( <WeekDay>
                <WhiteLabel>{day.name}</WhiteLabel>
                <img style={{width: '50px'}} src={getWeatherByCode(day.weatherCode).image}/>
                <MaxMin>
                  <WhiteLabel>{day.max}°{props.tempUnit}</WhiteLabel>
                  <GrayLabel>{day.min}°{props.tempUnit}</GrayLabel>
                </MaxMin>
              </WeekDay>)))
        }
      </WeekWeather>

      <HighlightsWrapper>
        <HighlightsLabel>Today's Highlights</HighlightsLabel>
        <DivColumn>
          <DivRow>
            <HighlightDiv>
              <Label20>Wind Status</Label20>
              <Label60Top>{props.todayInfo.windSpeed}kph</Label60Top>
              <Label20>{props.todayInfo.windDirection}</Label20>
            </HighlightDiv>
            <HighlightDiv>
              <Label20>Humidity</Label20>
              <Label60Top>{props.todayInfo.humidity}%</Label60Top>
              <Label20>Progress Bar</Label20>
            </HighlightDiv>
          </DivRow>
          <DivRow>
            <HighlightDiv>
              <Label20>Visibility</Label20>
              <Label60Bottom>{props.todayInfo.visibility} km</Label60Bottom>
            </HighlightDiv>
            <HighlightDiv>
              <Label20>Air Pressure</Label20>
              <Label60Bottom>{props.todayInfo.airPressure} mb</Label60Bottom>
            </HighlightDiv>
          </DivRow>
        </DivColumn>
      </HighlightsWrapper>
    </Wrapper>
  );
}

export default Dashboard;