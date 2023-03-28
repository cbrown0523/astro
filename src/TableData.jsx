import React from "react";

function TableData(props) {
  return (
    <div key={index}>
      <table className="tableData">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temperature : Hi / Low</th>
            <th>Day</th>
            <th>Night</th>
          </tr>
        </thead>
        <tr>
          <td className="td">{item.Date.substring(0, 10)}</td>
          <td>
            {props.temp} F /{item.Temperature.Minimum.Value} F
          </td>
          <td className="td">{item.Day.IconPhrase}</td>
          <td className="td"> {item.Night.IconPhrase}</td>
        </tr>
      </table>
    </div>
  );
}

export default TableData;
