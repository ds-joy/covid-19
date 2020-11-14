import React, { useEffect, useState } from "react";
import './App.css';
import "leaflet/dist/leaflet.css";

import Header from './components/Header/Header';
import Cards from './components/Card/Cards';
import Map from './components/Map/Map';
import Chart from './components/Chart/Chart';
import Graph from './components/Graph/Graph';


import { sortData, prettyPrintStat } from "./components/util";
import { Card, CardContent, Typography } from "@material-ui/core";


function App() {

  // for the dropdown menu
  const [countries, setCountries] = useState([]);
  // for the selected country
  const [country, setCountry] = useState('Worldwide');
  // info for the cards
  const [countryInfo, setCountryInfo] = useState({})

  // for the chart
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  // for the map
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapCountries, setMapCountries] = useState([]);
  const [mapZoom, setMapZoom] = useState(3);
  


  // for the dropdown menu which will fetch all the countries
  useEffect( () => {
      //this will fetch all the data about the countries 
      const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
          // setting the country name and code
          const countries = data.map((country) => ({
          name: country.country,
          value:country.countryInfo.iso2,

          }));

          // sorts the countries by total cases
          const sortedData = sortData(data);
          
          // updating the states
          setTableData(sortedData);
          setCountries(countries);
          setMapCountries(data);
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

  // console.log("mapCountries->")
  // console.log(mapCountries);


const onCountrySelect = async (event) => {
  const countryCode = event.target.value;
  // which country is selected
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
        if(countryCode !== "Worldwide") {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
        }
    });
}


 let isRed;

 
  return (
    <div className="app">

      <div className="appLeft">
        <Header onCountrySelect={onCountrySelect} country={country} countries={countries}/>
        
        {/* cards components to show the info */}
        <div className="Cards">
          <Cards  
          isRed = {true} 
          onClick={(e) => setCasesType("cases")}
          title="Active Cases"  
          active={casesType === "cases"}
          cases= {countryInfo.todayCases} 
          total={prettyPrintStat(countryInfo.cases)} />

          <Cards
          isRed = {false} 
          onClick={(e) => setCasesType("recovered")}
          title="Recovered" 
          active={casesType === "recovered"}
          cases= {countryInfo.todayRecovered} 
          total={prettyPrintStat(countryInfo.recovered)} />

          <Cards  
          isRed = {true}
          onClick={(e) => setCasesType("deaths")}
          title="Deaths"  
          active={casesType === "deaths"}
          cases= {countryInfo.todayDeaths} 
          total= {prettyPrintStat(countryInfo.deaths)} />
        </div>
         
        <Graph casesType={casesType}/>

        <Map
          countries={mapCountries} 
          casesType={casesType} 
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      <div className="appRight">
        <Card>
          <CardContent>
            <div className="appRightContents">
              <Chart countries={tableData} />
              
            </div>

          </CardContent>
        </Card>
        
      </div>


    </div>
  );
}

export default App;
