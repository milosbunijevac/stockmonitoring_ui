import {
  combineReducers,
  configureStore,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { StockTickerNameState, StockTickerDataState } from "../type";
// import { data as sampleData } from "../components/Stocks/Data/Data";

const tickerInitialNameState: StockTickerNameState = { ticker: "" };

const tickerInitialDataState: StockTickerDataState = { data: [] };

const tickerNameSlice = createSlice({
  name: "tickerName",
  initialState: tickerInitialNameState,
  reducers: {
    edit: (state, { payload }: PayloadAction<string>) => {
      state.ticker = payload;
    },
  },
});

const tickerDataSlice = createSlice({
  name: "tickerData",
  initialState: tickerInitialDataState,
  reducers: {
    tickerData: (state, { payload }: PayloadAction<string[]>) => {
      state.data = payload;
    },
  },
});

export const { edit: editTickerNameActionCreator } = tickerNameSlice.actions;

export const {
  tickerData: editTickerDataActionCreator,
} = tickerDataSlice.actions;

const reducer = combineReducers({
  tickerName: tickerNameSlice.reducer,
  tickerData: tickerDataSlice.reducer,
});

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
