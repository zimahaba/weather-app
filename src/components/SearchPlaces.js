import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { DivColumn } from "./Styled";

const CloseButton = styled.button`
  background-color: #1e213a;
  border: none;
  color: white;
  font-weight: bold;
  font-size: large;
  cursor: pointer;
`;

const LocationInput = styled.input`
  width: 200px;
  height: 36px;
  padding: 5px 10px;
  border: 1px solid #ffffff;
  background-color: #1e213a;
  font-size: larger;
  color: #ffffff;
`;

const SearchButton = styled.button`
  background-color: #3c47e9;
  color: #ffffff;
  border: none;
  cursor: pointer;
  width: 80px;
`;

const LocationDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 2px;
  padding: 16px 10px;
  cursor: pointer;
  border: 1px solid #1e213a;

  &:hover {
    border: 1px solid #ffffff;
  }
`;

const LocationItem = styled.label`
  color: #ffffff;
  cursor: pointer;
`;

const LocationSubItem = styled.label`
  color: #ffffff;
  cursor: pointer;
  font-size: smaller;
  color: #a7a7a7;
`;

const Wrapper = styled(DivColumn)`
  height: 100%;
  margin: 20px;
`;

const SearchPlaces = props => {

  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState('');
  
  const searchButtonHandler = () => {
    
    if (location.length >= 3) {
      axios({method: 'get', url: 'https://geocoding-api.open-meteo.com/v1/search?name=' + location + '&count=5&language=en&format=json'})
      .then(response => {
        setLocations(response.data.results.map(loc => {
          let lat = parseFloat(loc.latitude);
          lat = lat <= -10 ? (lat.toString().substring(0, 6)) : ( lat >= 0 && lat < 10 ? lat.toString().substring(0, 4) : lat.toString().substring(0, 5))
          let lng = parseFloat(loc.longitude);
          lng = lng <= -10 ? lng.toString().substring(0, 6) : ( lng >= 0 && lng < 10 ? lng.toString().substring(0, 4) : lng.toString().substring(0, 5))
          
          const place = loc.admin1 !== undefined ? ', ' + loc.admin1.substring(0, 10) : '';

          return ({name: loc.name.substring(0, 20), place: place, country: loc.country_code, lat: lat, lng: lng});
        }));
      })
      .catch(err => console.log(err));
    }
  }

  const locationClickHandler = (location) => {
    props.locationClickHandler(location);
  }

  return (
    <Wrapper>
      <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '16px'}}>
        <CloseButton onClick={() => props.showPlaces(false)}>X</CloseButton>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
        <LocationInput placeholder="Search location" onChange={(event) => setLocation(event.target.value)}></LocationInput>
        <SearchButton onClick={searchButtonHandler}>Search</SearchButton>
      </div>
      {locations.map(location => (
        (<LocationDiv key={location.lat+'-'+location.lng} onClick={() => locationClickHandler(location)}>
          <LocationItem>{location.name + location.place + ' - ' + location.country}</LocationItem>
          <LocationSubItem>{'(' + location.lat + '°E ' + location.lng + '°N)'}</LocationSubItem>
         </LocationDiv>)
      ))}
    </Wrapper>
  );
}

export default SearchPlaces;