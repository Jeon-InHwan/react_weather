import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchTokyo } from "../api";
import { TailSpin } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCloudSun,
  faCloudRain,
  faSnowflake,
  faCloud,
  faDroplet,
  faTemperatureHalf,
} from "@fortawesome/free-solid-svg-icons";
import { Link, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import WeatherForcastChart from "./WeatherForcastChart";
import HumidityForcastChart from "./HumidityForcastChart";
import TempForcastChart from "./TempForcastChart";
var randomColor = require("randomcolor");

const WeatherWrapper = styled.div`
  width: 580px;
  margin: 0 auto;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding-top: 80px;
`;

const Box = styled(Link)`
  color: black;
  height: 80px;
  margin-top: 20px;
  border: none;
  border-radius: 10px;
  background-color: #dbdbdc;
  text-align: center;
  padding: 20px 10px;
  display: grid;
  grid-template-rows: auto;
  gap: 6px;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
    font-weight: 600;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

const Loader = styled.span`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextInfoWrapper = styled.div`
  margin-left: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 20px;
  font-weight: 700;
`;

function Tokyo() {
  const { isLoading, data: tokyoData } = useQuery(
    ["weather", "tokyo"],
    () => fetchTokyo(),
    {
      refetchInterval: 60000,
    }
  );

  console.dir(tokyoData);

  /*
  const { isLoadingForcast, data: tokyoDataForcast } = useQuery(
    ["weather forcast", "tokyo forcast"],
    () => fetchTokyoForcast(),
    {
      refetchInterval: 60000,
    }
  );


  console.dir(tokyoDataForcast);
    */

  let icon;
  let weatherIconColor;
  let tempIconColor;

  switch (tokyoData?.weather[0]?.main) {
    case "Clear":
      icon = faSun;
      weatherIconColor = "orange";
      break;
    case "Clouds":
      icon = faCloudSun;
      weatherIconColor = "grey";
      tempIconColor = "#FED7C3";
      break;
    case "Rain":
      icon = faCloudRain;
      weatherIconColor = "grey";
      break;
    case "Snow":
      icon = faSnowflake;
      weatherIconColor = "white";
      break;
    default:
      icon = faCloud;
      weatherIconColor = "grey";
  }

  // switch (tokyoData?.main?.temp - 273.15) {
  const handleComparison = (temp) => {
    if (temp > 30) {
      tempIconColor = "#EC407A";
    } else if (temp > 20) {
      tempIconColor = "#F48FB1";
    } else if (temp > 0) {
      tempIconColor = "#4DD0E1";
    } else {
      tempIconColor = "#26C6DA";
    }
  };

  handleComparison(tokyoData?.main?.temp - 273.15);

  return (
    <>
      <WeatherWrapper>
        <Box to="/tokyo/weather">
          {isLoading ? (
            <Loader>
              <TailSpin height="40" width="40" color={randomColor()}></TailSpin>
            </Loader>
          ) : (
            <IconWrapper>
              <FontAwesomeIcon
                icon={icon}
                size="2x"
                style={{ color: weatherIconColor }}
              />
              <TextInfoWrapper>{tokyoData?.weather[0]?.main} </TextInfoWrapper>
            </IconWrapper>
          )}
        </Box>
        <Box to="/tokyo/humidity">
          {isLoading ? (
            <Loader>
              <TailSpin height="40" width="40" color={randomColor()}></TailSpin>
            </Loader>
          ) : (
            <IconWrapper>
              <FontAwesomeIcon
                icon={faDroplet}
                size="2x"
                style={{ color: "#007acc" }}
              />
              <TextInfoWrapper>{tokyoData?.main?.humidity} %</TextInfoWrapper>
            </IconWrapper>
          )}
        </Box>
        <Box to="/tokyo/temperature">
          {isLoading ? (
            <Loader>
              <TailSpin height="40" width="40" color={randomColor()}></TailSpin>
            </Loader>
          ) : (
            <IconWrapper>
              <FontAwesomeIcon
                icon={faTemperatureHalf}
                size="2x"
                style={{ color: tempIconColor }}
              />
              <TextInfoWrapper>
                {(tokyoData?.main?.temp - 273.15).toFixed(2)} °
              </TextInfoWrapper>
            </IconWrapper>
          )}
        </Box>
      </WeatherWrapper>
      <Switch>
        <Route path={"/tokyo/weather"}>
          <WeatherForcastChart />
        </Route>
        <Route path={"/tokyo/humidity"}>
          <HumidityForcastChart />
        </Route>
        <Route path={"/tokyo/temperature"}>
          <TempForcastChart />
        </Route>
      </Switch>
    </>
  );
}

export default Tokyo;
