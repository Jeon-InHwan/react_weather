import { useQuery } from "react-query";
import { fetchSeoulForcast, fetchTokyoForcast } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import styled from "styled-components";
import { TailSpin } from "react-loader-spinner";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import moment from "moment-timezone";
var randomColor = require("randomcolor");

const Loader = styled.span`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

function TempForcastChart() {
  const isDark = useRecoilValue(isDarkAtom);

  const location = useLocation();
  const currentPath = location.pathname;

  const { isLoadingForcastSeoul, data: seoulDataForcast } = useQuery(
    ["weather forcast", "seoul forcast"],
    () => fetchSeoulForcast(),
    {
      refetchInterval: 60000,
      enabled: currentPath.includes("seoul"),
    }
  );

  const { isLoadingForcastTokyo, data: tokyoDataForcast } = useQuery(
    ["weather forcast", "tokyo forcast"],
    () => fetchTokyoForcast(),
    {
      refetchInterval: 60000,
      enabled: currentPath.includes("tokyo"),
    }
  );

  if (currentPath.includes("seoul")) {
    console.dir(seoulDataForcast);
  } else {
    console.dir(tokyoDataForcast);
  }

  const isLoading = currentPath.includes("seoul")
    ? isLoadingForcastSeoul
    : isLoadingForcastTokyo;

  const data = currentPath.includes("seoul")
    ? seoulDataForcast
    : tokyoDataForcast;

  return (
    <div>
      {isLoading ? (
        <Loader>
          <TailSpin height="200" width="200" color={randomColor()}></TailSpin>
        </Loader>
      ) : (
        <ApexChart
          height={400}
          width={800}
          type="line"
          style={{
            marginTop: "50px",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
          series={[
            {
              name: "temperature",
              data: data?.list.map((info) => info.main?.temp - 273.15) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            grid: {
              show: false,
            },
            chart: {
              id: "temperatureChart",
              height: "100%",
              width: "100%",
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            stroke: {
              curve: "smooth",
              width: 5,
            },
            yaxis: {
              labels: {
                formatter: (value) => `${value.toFixed(2)} °`,
              },
            },
            xaxis: {
              type: "datetime",
              labels: {
                show: false,
              },
              categories:
                data?.list.map((info) =>
                  moment
                    .unix(info?.dt)
                    .add(9, "hours")
                    .format("YYYY-MM-DD HH:mm:ss")
                ) ?? [],
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#FEAE19"],
                stops: [0, 100],
                type: "vertical",
              },
            },
            colors: ["#7C98EC"],
            tooltip: {
              y: {
                formatter: (value) => `${value.toFixed(2)} °`,
              },
              x: {
                format: "yy/MM/dd HH:mm:ss",
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default TempForcastChart;
