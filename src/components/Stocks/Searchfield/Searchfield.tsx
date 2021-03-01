import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { StockTickerNameState } from "../../../type";
import { editTickerNameActionCreator } from "../../../redux/store";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const SearchField: React.FC = () => {
  const dispatch = useDispatch();
  const tickerValue = useSelector(
    (state: StockTickerNameState) => state.ticker
  );
  const classes = useStyles();

  const handleTickerChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    dispatch(editTickerNameActionCreator(e.target.value));
  };

  return (
    <>
      <form>
        <Grid container direction="row" justify="center">
          <Grid item xs={4} />
          <Grid item xs={2}>
            <TextField
              id="stockTickerEntry"
              label="Stock Ticker"
              variant="outlined"
              value={tickerValue}
              onChange={handleTickerChange}
              helperText="Enter stock ticker"
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              color="primary"
              size="large"
              variant="outlined"
              className={classes.margin}
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={4} />
        </Grid>
      </form>
    </>
  );
};

export default SearchField;
