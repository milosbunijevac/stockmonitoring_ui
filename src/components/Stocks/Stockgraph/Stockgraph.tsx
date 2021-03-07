import React, { useEffect } from "react";
// @ts-ignore
import { ChartCanvas, Chart } from "react-stockcharts";
// @ts-ignore
import { CandlestickSeries } from "react-stockcharts/lib/series";
// @ts-ignore
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
// @ts-ignore
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
// @ts-ignore
import { fitWidth } from "react-stockcharts/lib/helper";
// @ts-ignore
import { last } from "react-stockcharts/lib/utils";

import PropTypes from "prop-types";

import { getApiInfo } from "../../../utilities/apiCall";

interface StockGraphProps {
  width: number;
  ratio: number;
}

const StockGraph: React.FC<StockGraphProps> = (props) => {
  const [useData, setUseData] = React.useState([] as string[]);
  const { width = 400, ratio = 1 } = props;

  useEffect(() => {
    const getStockData = async () => {
      // const stockData: string[] = await getApiInfo();
      setUseData(stockData);
    };

    getStockData();
  }, []);

  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
    // @ts-ignore
    (d) => d.date
  );
  const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(useData);
  const xExtents = [xAccessor(last(data)), xAccessor(data[data.length - 100])];

  console.log("This is useData: ", useData);
  if (useData.length > 0) {
    return (
      <div>
        <ChartCanvas
          width={width}
          height={400}
          ratio={ratio}
          xScale={xScale}
          margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
          displayXAccessor={displayXAccessor}
          type={"svg"}
          seriesName="MSFT"
          data={data}
          // @ts-ignore
          xAccessor={(d) => d.date}
          xScaleProvider={discontinuousTimeScaleProvider}
          xExtents={xExtents}
        >
          {/* @ts-ignore */}
          <Chart id={1} yExtents={(d) => [d.high, d.low]}>
            <XAxis axisAt="bottom" orient="bottom" ticks={6} />
            <YAxis axisAt="left" orient="left" ticks={5} />
            <CandlestickSeries />
          </Chart>
        </ChartCanvas>
        See graph?
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

StockGraph.propTypes = {
  // data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  // type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

export default fitWidth(StockGraph);
