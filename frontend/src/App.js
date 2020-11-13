import React, { useEffect, useState } from "react";
import './App.css';

import Header from './components/Header/Header';
import Cards from './components/Card/Cards';
import Map from './components/Map/Map';
import Chart from './components/Chart/Chart';
import Graph from './components/Graph/Graph'



function App() {

  // for the dropdown menu
  const[countries, setCountries] = useState([]);
  // for the selected country
  const[country, setCountry] = useState('Worldwide');
  // info for the cards
  const[countryInfo, setCountryInfo] = useState({})

  // for the dropdown menu which will fetch all the countries
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
  
  // for the initial Worldwide data
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);


const onCountrySelect = async (event) => {
  const countryCode = event.target.value;
  setCountry(countryCode);

  let url;
  if(countryCode === "Worldwide") {
    url = "https://disease.sh/v3/covid-19/all"
  } else {
    url = `https://disease.sh/v3/covid-19/countries/${countryCode}`;
  }
        
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
    });
}

console.log(countryInfo)


 
  return (
    <div className="app">

      <div className="appLeft">
        <Header onCountrySelect={onCountrySelect} country={country} countries={countries}/>
        
        <div className="Cards">
          <Cards  
          title="Active Cases"  
          cases= {countryInfo.todayCases} 
          total={countryInfo.cases} />

          <Cards  
          title="Recovered" 
          cases= {countryInfo.todayRecovered} 
          total={countryInfo.recovered} />

          <Cards  
          title="Deaths"  
          cases= {countryInfo.todayDeaths} 
          total= {countryInfo.deaths} />
        </div>

        <Map/>
      </div>

      <div className="appRight">
        <Chart/>
        <Graph/>
      </div>


    </div>
  );
}

export default App;
