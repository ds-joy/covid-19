import React, { useEffect, useState } from "react";
import './App.css';

import Header from './components/Header/Header';
import Card from './components/Card/Card';
import Map from './components/Map/Map';
import Chart from './components/Chart/Chart';
import Graph from './components/Graph/Graph'



function App() {
 
  return (
    <div className="app">

      <div className="appLeft">
        <Header/>
        
        <div className="Cards">
          <Card/>
          <Card/>
          <Card/>
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
