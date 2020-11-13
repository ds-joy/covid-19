import React, { useEffect, useState } from "react";
import {
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";

import './Header.css'




function Header(props){
    return(
        <div className="appHeader">
            <h1>Covid-19 Tracker</h1>

            <FormControl className="appDropdown">
                <Select variant="outlined" onChange={props.onCountrySelect} value={props.country}>
                    
                    <MenuItem value="Worldwide">Worldwide</MenuItem>
                    {props.countries.map((country) => (
                    <MenuItem value={country.value}> {country.name} </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

export default Header