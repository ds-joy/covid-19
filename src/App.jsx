import { Card, CardContent } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import numeral from "numeral";

import Header from "./components/header/Header";
import InfoBox from "./components/infobox/InfoBox";
import Table from "./components/table/Table";
import Map from "./components/map/Map";
import Graph from "./components/graph/Graph";

import {prettyPrintStat} from  './util/util';

import "./App.css";
import "leaflet/dist/leaflet.css"

const App = (props) => {
  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState({});
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 23.8103, lng: 90.4125 });
  const [mapZoom, setMapZoom] = useState(3);


  // use effect of single country
  useEffect(() => {
    const getSingleCountriesInfo = async () => {
      await fetch("https://disease.sh/v3/covid-19/all")
        .catch(console.error)
        .then((response) => response.json())
        .then((data) => {
          setCountryInfo(data);
        });
    };

    getSingleCountriesInfo();
  }, []);

  // for the dropdown menu which will fetch all the countries
  useEffect(() => {
    //this will fetch all the data about the countries
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .catch(console.error)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // setting the country name and code
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
            cases: country.cases,
          }));

          // sorts the countries by total cases
          // const sortedData = sortData(data);

          setCountries(countries);
          setMapCountries(data);
        });
    };
    getCountriesData();
  }, []);

  // helper Functions
  const getSelectedCountry = (selectedCountry) => {

    if(selectedCountry != null) {
      const url =
      selectedCountry === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${selectedCountry}`;

        console.log(`url --> ${url}`);

      const getSelectedCountriesInfo = async () => {
        try {
          await fetch(url)
          .catch(console.error)
          .then((response) => response.json())
          .then((data) => {
            // setInputCountry(countryCode);
            setCountryInfo(data);
            if(selectedCountry !== "Worldwide") {
              setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
            }
            setMapZoom(4); 
          });
        } catch(err) {
          console.log(err);
        }
        
      };
      getSelectedCountriesInfo();
    } else {

    }
    
  };

  

  

  return (
    <div className="app">
      <div className="app__left">
        <Header
          countries={countries}
          getSelectedCountry={getSelectedCountry}
        ></Header>

        <div className="app__stats">
        <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />

          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />

          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
        </div>

        <Graph casesType={casesType}/>

        <div className="app__map">
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />

        </div>

        
      </div>

      <div className="app__right">
        <Card>
          <CardContent>
            <Table countries={countries}></Table>
          </CardContent>
        </Card>

      </div>

    </div>
  );
};

export default App;
