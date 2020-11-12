import React, { useEffect, useState } from "react";
import './App.css';

import {
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";

function App() {
  // state

  const[countries, setCountries] = useState([]);
  const[country, setCountry] = useState('Worldwide');

  useEffect( () => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name: country.country,
          value:country.countryInfo.iso2,

        }));
        setCountries(countries);
      });
    };

    getCountriesData();

  }, []);

  function onCountrySelect(event) {
    const countryCode = event.target.value;

    setCountry(countryCode);
  }



  return (
    <div className="app">
      
      {/* Header */}
      
      <div className="appHeader">
      <h1>Covid-19 Tracker</h1>

        <FormControl className="appDropdown">
          <Select variant="outlined" onChange={onCountrySelect} value={country}>

            <MenuItem value="Worldwide">Worldwide</MenuItem>

            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}

          </Select>
        </FormControl>
      </div>



      
      {/* Title + dropdown */}

      {/* InfoBoxes */}
      {/* InfoBoxes */}
      {/* InfoBoxes */}

      {/* Tables */}
      {/* Graphs */}

      {/* Map */}

    </div>
  );
}

export default App;
