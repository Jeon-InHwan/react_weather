import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchTokyo } from "../api";

const WeatherWrapper = styled.div`
  width: 580px;
  margin: 0 auto;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;

const HumadityDiv = styled.div`
  color: black;
  height: 70px;
  margin-top: 40px;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  text-align: center;
  padding: 20px 10px;
  display: grid;
  grid-template-rows: auto;
  gap: 6px;
`;

function Tokyo() {
  const { isLoading, data } = useQuery(
    ["weather", "tokyo"],
    () => fetchTokyo(),
    {
      refetchInterval: 60000,
    }
  );

  console.log(data);

  return (
    <WeatherWrapper>
      <HumadityDiv>
        <div>Humanity</div>
        <div>432</div>
      </HumadityDiv>
      <HumadityDiv></HumadityDiv>
      <HumadityDiv></HumadityDiv>
    </WeatherWrapper>
  );
}

export default Tokyo;
