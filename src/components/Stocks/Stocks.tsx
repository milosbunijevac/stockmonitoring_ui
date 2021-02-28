import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { StockTickerNameState } from "../../type";
import { editTickerNameActionCreator } from "../../redux/store";

const Stocks: React.FC = () => {
  const dispatch = useDispatch();
  const tickerValue = useSelector(
    (state: StockTickerNameState) => state.ticker
  );

  const handleTickerChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    dispatch(editTickerNameActionCreator(e.target.value));
  };

  return (
    <>
      <TextField
        id="stockTickerEntry"
        label="Stock Ticker"
        variant="outlined"
        value={tickerValue}
        onChange={handleTickerChange}
        helperText="Enter stock ticker"
      />
    </>
  );
};

export default Stocks;
