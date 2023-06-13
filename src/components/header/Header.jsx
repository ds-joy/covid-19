import React, {useState} from 'react'; 
import {
    MenuItem,
    FormControl,
    Select
  } from "@material-ui/core";
import './Header.css';
 

const Header = ({countries, getSelectedCountry}) => {

  const [country, setCountry]  = useState("Worldwide");

  // event listener 
  const onCountryChange = (event) => {
    try {
      let countryCode;
      if(event === undefined) {
        countryCode = "Worldwide";
      } else {
        countryCode = event.target.value;
        setCountry(countryCode);
        getSelectedCountry(countryCode);
      }
      
    } catch(err) {
      console.log(err);
    }
    
  }
 
  return(
    <div className="header">

      {/* title */}
      <h1>Covid-19 Tracker</h1>

      {/* dropdown */}
      <FormControl className="app__dropdown">
        <Select
          variant="outlined"
          onClick={onCountryChange}
          value= {country}
        >
          <MenuItem value='Worldwide'>Worldwide</MenuItem>
          {
            countries.map( (country) => (
              <MenuItem value={country.value} key={countries.value}> {country.name} </MenuItem>
            ))
          }
           
        </Select>
      </FormControl>
    </div>
  );
}

export default Header;