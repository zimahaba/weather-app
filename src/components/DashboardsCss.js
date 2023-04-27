import styled from "styled-components";
import { DivColumn, DivRow, WhiteLabel } from "./Styled";

const Wrapper = styled.div`
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

const MaxMin = styled(DivRow)`
  justify-content: space-evenly;
  width: 100%;
`;

const HighlightsWrapper = styled(DivColumn)`
  margin-top: 60px;
`;

const HighlightsLabel = styled(WhiteLabel)`
  font-weight: bold;
  font-size: larger;
  margin: 10px;
`;

const HighlightDiv = styled(DivColumn)`
  align-items: center;
  flex: 1;
  background-color: #1e213a;
  margin: 10px;
`;

const Label20 = styled(WhiteLabel)`
  margin: 20px;
`;

const Label60Top = styled(WhiteLabel)`
  font-size: 60px;
  margin: 10px;
`;

const Label60Bottom = styled(WhiteLabel)`
  font-size: 60px;
  margin: 10px 0px 20px 0px;
`;

export {Wrapper, WeekWeather, WeekDay, TemperatureSelectionDiv, TemperatureButton, MaxMin, HighlightsWrapper, HighlightsLabel, HighlightDiv, Label20, Label60Top, Label60Bottom}