import axios from "axios";
import apiKey from "../apiKey.json";

const getApiInfo = async (): Promise<string[]> => {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${apiKey}`;
  const { data } = await axios.get(url);

  return data["Time Series (5min)"];
};

export { getApiInfo };
