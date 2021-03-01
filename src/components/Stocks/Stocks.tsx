import React from "react";
import SearchField from "./Searchfield/Searchfield";
import StockGraph from "./Stockgraph/Stockgraph";

const Stocks: React.FC = () => {
  return (
    <>
      <SearchField />
      <StockGraph />
    </>
  );
};

export default Stocks;
