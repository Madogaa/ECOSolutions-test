import React from "react";
import "./TableDisplay.css";

function TableDisplay({ valuesNow }) {
  const calculateMean = (data) => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i].value;
    }
    return sum / data.length;
  };
  return (
    <table className="self-center text-center w-1/2 mt-12">
      <div className="bg-blur" />
      <thead>
        <tr>
          <th className="text-xl border-b-t" colSpan="2">
            Price for last 24 hours
          </th>
        </tr>
        <tr>
          <th className="w-1/2 py-4 ">Time</th>
          <th className="w-1/2 py-4 border-l-t">Price</th>
        </tr>
      </thead>
      <tbody>
        {valuesNow.map((item, index) => {
          const date = new Date(item.datetime);
          const hours = date.getHours().toString().padStart(2, "0"); // Añadir ceros a la izquierda si es necesario
          const minutes = date.getMinutes().toString().padStart(2, "0");
          return (
            <tr key={index}>
              <th>{`${hours}:${minutes}`}</th>
              <th>{item.value}€/MWh</th>
            </tr>
          );
        })}
        <tr>
          <th>Media ponderada</th>
          <th>{calculateMean(valuesNow).toFixed(2)}€/MWh</th>
        </tr>
      </tbody>
    </table>
  );
}

export default TableDisplay;
