import { csvParse } from "d3-dsv";
import { timeParse } from "d3-time-format";
import apiKey from "../apiKey.json";
// import { IOHLCData } from "../components/Stocks/Stockgraph/Stockgraph";

const getApiInfo = async (tickerName: string): Promise<string[]> => {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${tickerName}&apikey=${apiKey}&datatype=csv`;
  const response = fetch(url)
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      return csvParse(data, parseData(parseDate));
    });

  return response;
};

function parseData(parse) {
  return function (d) {
    d.date = parse(d.timestamp);
    d.open = +d.open;
    d.high = +d.high;
    d.low = +d.low;
    d.close = +d.close;
    d.volume = +d.volume;

    return d;
  };
}

// const parseDate2 = timeParse("%Y-%m-%dT%H-%M-S");
const parseDate = timeParse("%Y-%m-%d");

// export function getData(): Promise<IOHLCData> {
//   const promiseMSFT = fetch(
//     "https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv"
//   )
//     .then((response) => {
//       return response.text();
//     })
//     .then((data) => {
//       console.log("this is data before tsvParse: ", data);
//       return tsvParse(data, parseData(parseDate));
//     });
//   console.log("THis is promiseMST: ", promiseMSFT);
//   return promiseMSFT;
// }

export { getApiInfo };
