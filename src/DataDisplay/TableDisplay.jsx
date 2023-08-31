import React from "react";

function TableDisplay({ valuesNow }) {
  const calculateMean = (data) => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i].value;
    }
    return sum / data.length;
  };
  return (
    <table className="text-center">
      <thead>
        <tr>
          <th colSpan="2">Price for last 24 hours</th>
        </tr>
        <tr>
          <th>Price</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {valuesNow.map((item, index) => {
          const date = new Date(item.datetime);
          const hours = date.getHours().toString().padStart(2, "0"); // Añadir ceros a la izquierda si es necesario
          const minutes = date.getMinutes().toString().padStart(2, "0");
          return (
            <tr key={index}>
              <th >{item.value}€/MWh</th>
              <th >{`${hours}:${minutes}`}</th>
            </tr>
          );
        })}
      </tbody>
      <tr>
        <th>{calculateMean(valuesNow)}</th>
      </tr>
    </table>
  );
}

export default TableDisplay;
