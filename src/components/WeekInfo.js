import styled from "styled-components";
import { getWeatherByCode } from '../Utils';
import { DivColumn, DivRow, GrayLabel, WhiteLabel } from "./Styled";
import { useState } from "react";

const WeekDay = styled(DivColumn)`
  justify-content: space-evenly;
  align-items: center;
  background-color: #1e213a;
  flex: 1;
  height: 180px;
  padding: 10px;
  margin: 10px;
`;

const MaxMin = styled(DivRow)`
  justify-content: space-evenly;
  width: 100%;
`;

const WeekInfo = props => {

  return (
    <DivRow>
      {
        props.weekInfo.map(day => (
          ( <WeekDay>
              <WhiteLabel>{day.name}</WhiteLabel>
              <img style={{width: '50px'}} src={getWeatherByCode(day.weatherCode).image} title={getWeatherByCode(day.weatherCode).description}/>
              <MaxMin>
                <WhiteLabel>{day.max}°{props.tempUnit}</WhiteLabel>
                <GrayLabel>{day.min}°{props.tempUnit}</GrayLabel>
              </MaxMin>
            </WeekDay>)))
      }
    </DivRow>
  );
}

export default WeekInfo;