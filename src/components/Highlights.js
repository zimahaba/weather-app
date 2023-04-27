import styled from "styled-components";
import { DivRow, DivColumn, WhiteLabel } from "./Styled";
import directionImage from '../assets/Direction.png';
import { useEffect, useState } from "react";
import { getWindDirection } from "../Utils";

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

const ProgressDiv = styled(DivColumn)`
  width: 60%;
`;

const PercentageNumberDiv = styled(DivRow)`
  justify-content: space-between;
  width: 100%;
  font-size: small;
  color: #ffffff;
`;

const PercentageDiv = styled(PercentageNumberDiv)`
  justify-content: flex-end;
`;

const ProgressBar = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 8px;
  border-radius: 20px;
  overflow: hidden;
`;

const Progress = styled.span`
  background-color: #ffec65;
  width: ${props => (props.width ? props.width + '%' : '0%')};
  height: 100%;
  display: block;
`;

const WindDirectionLabel = styled(WhiteLabel)`
  margin-left: 10px;
  font-weight: bold;
`;

const Highlights = props => {

  return (
    <HighlightsWrapper>
      <HighlightsLabel>Today's Highlights</HighlightsLabel>
      <DivColumn>
        <DivRow>
          <HighlightDiv>
            <Label20>Wind Status</Label20>
            <Label60Top>{props.todayInfo.windSpeed}kph</Label60Top>
            <DivRow style={{margin: '20px', alignItems: 'center'}}>
              <img style={{width: '30px', height: '30px', transform: 'rotate(' + props.todayInfo.windDirection+135 + 'deg)'}} src={directionImage}/>
              <WindDirectionLabel>{getWindDirection(props.todayInfo.windDirection)}</WindDirectionLabel>
            </DivRow>
          </HighlightDiv>
          <HighlightDiv>
            <Label20>Humidity</Label20>
            <Label60Top>{props.todayInfo.humidity}%</Label60Top>
            <ProgressDiv>
              <PercentageNumberDiv>
                <label>0</label>
                <label>50</label>
                <label>100</label>
              </PercentageNumberDiv>
              <ProgressBar>
                <Progress width={props.todayInfo.humidity}/>
              </ProgressBar>
              <PercentageDiv>
                <label>%</label>
              </PercentageDiv>
            </ProgressDiv>
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
  );
}

export default Highlights;