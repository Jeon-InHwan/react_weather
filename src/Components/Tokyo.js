import { useQuery } from "react-query";
import { fetchTokyo } from "../api";

function Tokyo() {
  const { isLoading, data } = useQuery(
    ["weather", "tokyo"],
    () => fetchTokyo(),
    {
      refetchInterval: 60000,
    }
  );

  console.log(data);

  return <h1>Tokyo</h1>;
}

export default Tokyo;
