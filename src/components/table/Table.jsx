import React from 'react'
import './Table.css';

const Table = ({countries}) => {
  return (
    <div className="infoTable">
      <h2>Total Cases</h2>
      <div className="table">
          {
              countries.map(country => (
                  <tr>
                      <td> {country.name} </td>
                      <td>{country.cases}</td>
                  </tr>
              ))
          }
      </div>
    </div>
  );
}

export default Table;