import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Cards";
function App() {
  const [forecastHeadline, setForecastHeadline] = useState({});

  const [userEnterLocation, setUserEnterLocation] = useState("");
  const [locationId, setLocationId] = useState();
  const [input, setInput] = useState("");
  const [location, setLocation] = useState();
  const [forcast, setForcast] = useState(null);
  const [headLine, setHeadLine] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [locationInput, setLocationInput] = useState();
  const [countryLocation, setCountryLocation] = useState();

  const locationIdUrl = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=LEtrUIIsdg5z7lnRFwUdpvWCTzebfbgH&q=${userEnterLocation}`;
  const forcastUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationId}?apikey=LEtrUIIsdg5z7lnRFwUdpvWCTzebfbgH`;
  const currentForcastUrl = `http://dataservice.accuweather.com/currentconditions/v1/${locationId}?apikey=LEtrUIIsdg5z7lnRFwUdpvWCTzebfbgH `;
  useEffect(() => {
    const fetchAllData = async () => {
      const response = await fetch(locationIdUrl);
      const json = await response.json();
      // const newLocation = { ...json };
      // setLocation(newLocation);
      const locations = json[0].LocalizedName;
      setLocationInput(locations);
      console.log(locationInput, "locationcc");

      const locateId = json[0].Key;
      setLocationId(locateId);
      console.log("lid", locateId);
      const countryLocation = json[0].Country.LocalizedName;
      setCountryLocation(countryLocation);
      const location = json[0].LocalizedName;
      setLocation(location);
      console.log(location);
    };
    fetchAllData().catch(console.error);
  }, [userEnterLocation]);

  useEffect(() => {
    const fetchAllData = async () => {
      const response = await fetch(forcastUrl);
      const json = await response.json();
      setWeatherData(json);
      const newForcast = [...json.DailyForecasts];
      setForcast(newForcast);
      const headline = json.Headline;
      setHeadLine(headline);
    };
    fetchAllData().catch(console.error);
  }, [locationId]);

  useEffect(() => {
    const fetchAllData = async () => {
      const response = await fetch(currentForcastUrl);
      const json = await response.json();
      const currentWeather = [json[0].Temperature.Imperial.Value];
      setCurrentWeather(currentWeather);
    };
    fetchAllData().catch(console.error);
  }, [locationId]);

  return (
    <div className="App">
      <h1>Weather Api </h1>
      <input
        type="text"
        className=""
        onChange={(e) => setInput(e.target.value)}
        value={input}
        placeholder="search location"
      />
      <button onClick={(e) => setUserEnterLocation(input)}>Go!</button>

      <h2>
        {weatherData?.Headline && (
          <div className="container">
            <div>
              <Card title={location} subTitle={countryLocation} />
            </div>
            <div>
              <Card title={currentWeather + " F"} />
            </div>
            <div>
              <Card title={weatherData.Headline.Text} />
            </div>
          </div>
        )}
      </h2>
      <br></br>
      <br></br>
      <h1>Weekly Forecasts</h1>

      {/* if null return false ? */}

      {weatherData?.DailyForecasts &&
        weatherData.DailyForecasts.map((item, index) => {
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
                    {item.Temperature.Maximum.Value} F /
                    {item.Temperature.Minimum.Value} F
                  </td>
                  <td className="td">{item.Day.IconPhrase}</td>
                  <td className="td"> {item.Night.IconPhrase}</td>
                </tr>
              </table>
            </div>
          );
        })}
    </div>
  );
}

export default App;
