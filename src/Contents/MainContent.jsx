import axios from "axios";
import React, { useEffect, useState } from "react";
import SimpleDisplay from "../DataDisplay/SimpleDisplay";
import TableDisplay from "../DataDisplay/TableDisplay";

function MainContent() {
  const [displayValues, setDisplayValues] = useState([]);

  const calculateEdgeValue = (data, isMax) => {
    let initialValue = data[0].value;
    const compareFunction = isMax ? (a, b) => a > b : (a, b) => a < b;
    for (let i = 1; i < data.length; i++) {
      if (compareFunction(data[i].value, initialValue)) {
        initialValue = data[i].value;
      }
    }
    return initialValue;
  };

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const [valuesNow, setValuesNow] = useState([]);
  useEffect(() => {
    fetchPrices(year, month, day).then((response) => {
      const prices = response.included[0].attributes.values;
      const maxValue = {
        text: "Today's Max Price",
        value: calculateEdgeValue(prices, true),
        max: true,
      }; // true for maximum
      const minValue = {
        text: "Today's Min Price",
        value: calculateEdgeValue(prices, false),
        max: false,
      }; // false for minimum
      setValuesNow(prices);
      let displayData = [maxValue, minValue];
      fetchPrices(year, month, day - 1).then((responseY) => {
        const pricesY = responseY.included[0].attributes.values;
        const maxValueY = {
          text: "Yesterday's Max Price",
          value: calculateEdgeValue(pricesY, true),
          max: true,
        }; // true for maximum
        const minValueY = {
          text: "Yesterday's Min Price",
          value: calculateEdgeValue(pricesY, false),
          max: false,
        }; // false for minimum
        displayData = [...displayData, maxValueY, minValueY];
        setDisplayValues(displayData);
      });
      // Guardamos los valores en el estado
    });
  }, []);

  const timeZone = "Europe/Madrid";
  const formattedDate = date.toLocaleString("default", {
    timeZone,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const fetchPrices = async (year, month, day) => {
    const response = await axios.get(
      `https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real?start_date=${year}-${month}-${day}T00:00&end_date=${year}-${month}-${day}T23:59&time_trunc=hour&cached=true`
    );
    return response.data;
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-3xl pt-4 pb-2" >
        <strong>
          {formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}
        </strong>
      </p>
      <div className="grid grid-cols-12 ">
        {displayValues.map((item, index) => (
          <SimpleDisplay key={index} value={item} max={item.max} />
        ))}
      </div>
      <TableDisplay valuesNow={valuesNow} />
    </div>
  );
}

export default MainContent;
