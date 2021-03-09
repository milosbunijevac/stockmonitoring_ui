import { IOHLCData } from "../components/Stocks/Stockgraph/Stockgraph";
import { IOHLCData } from "./components/Stocks/Stockgraph/Stockgraph";

export interface StockTickerNameState {
  ticker: string;
}

// This should be a JSON type
export interface StockTickerDataState {
  data: IOHLCData;
}
