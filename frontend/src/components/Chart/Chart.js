import React from 'react'
import './Chart.css';

function Chart(props) {
    return (
        <div className="infoTable">
            <h2>Active Cases</h2>
            <div className="table">
                {
                    props.countries.map(country => (
                        <tr>
                            <td> {country.country} </td>
                            <td>{country.cases}</td>
                        </tr>
                    ))
                }
            </div>
            

        </div>
    )
}

export default Chart
