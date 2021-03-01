import React from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
// import { data } from "../Data/Data";
// @ts-ignore
import { ChartCanvas, Chart } from "react-stockcharts";
// @ts-ignore
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
// @ts-ignore
import { fitWidth } from "react-stockcharts/lib/helper";
// import { CandlestickSeries } from "react-stockcharts/lib/series";
// import { utcDay } from "d3-time-format";
// import { timeIntervalBarWidth } from "react-stockcharts/lib/utils";

// type SvgInHtml = HTMLElement & SVGElement;

interface StockGraphProps {
  type: SVGElement;
  width: number;
  ratio: number;
}

const Stockgraph: React.FC<StockGraphProps> = (props: StockGraphProps) => {
  const { type, width, ratio } = props;
  // const madeData = data;

  // const xAccessor = (d: number) => {
  //   return d.date;
  // };

  return (
    <>
      <Grid container direction="row" justify="center">
        <Grid item xs={3} />
        <Grid item xs={5} container justify="center">
          <ChartCanvas
            height={400}
            ratio={ratio}
            width={width}
            margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
            type={type}
            seriesName="MSFT"
            // xAccessor={xAccessor}
            // xScale={scaleTime()}
            xExtents={[new Date(2020, 0, 30), new Date(2020, 1, 16)]}
          >
            {/* <Chart id={1} yExtents={(d) => [d.high, d.low]}>
              <XAxis axisAt="bottom" orient="bottom" ticks={6} />
              <YAxis axisAt="left" orient="left" ticks={5} />
            </Chart> */}
          </ChartCanvas>
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </>
  );
};

Stockgraph.propTypes = {
  // data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  // type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

// Stockgraph.defaultProps = {
//   type: "svg",
// };

export default fitWidth(Stockgraph);
