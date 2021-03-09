import React, { useEffect } from "react";
import {
  elderRay,
  ema,
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  BarSeries,
  CandlestickSeries,
  lastVisibleItemBasedZoomAnchor,
  XAxis,
  YAxis,
  CrossHairCursor,
} from "react-financial-charts";
import { format } from "d3-format";
// import { timeFormat } from "d3-time-format";
import PropTypes from "prop-types";
// import { data as sampleData } from "../Data/Data";

import { getApiInfo } from "../../../utilities/apiCall";

export interface IOHLCData {
  close: number;
  date: Date;
  high: number;
  low: number;
  open: number;
  volume: number;
}

interface StockGraphProps {
  height?: number;
  dateTimeFormat?: string;
  width?: number;
  ratio?: number;
}

// Need to parse the data correctly here.

const StockGraph: React.FC<StockGraphProps> = (props) => {
  const [useData, setUseData] = React.useState<any>([]);

  useEffect(() => {
    const getStockData = async () => {
      // const stockData: string[] = await getApiInfo();
      const data2 = await getApiInfo("IBM");
      setUseData(data2);
    };

    getStockData();
  }, []);

  const { height = 1000, ratio = 3, width = 1000 } = props;

  const margin = { left: 0, right: 48, top: 0, bottom: 24 };
  const pricesDisplayFormat = format(".2f");
  const xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
    (d: IOHLCData) => d.date
  );

  const ema12 = ema()
    .id(1)
    .options({ windowSize: 12 })
    .merge((d: any, c: any) => {
      d.ema12 = c;
    })
    .accessor((d: any) => d.ema12);

  const ema26 = ema()
    .id(2)
    .options({ windowSize: 26 })
    .merge((d: any, c: any) => {
      d.ema26 = c;
    })
    .accessor((d: any) => d.ema26);

  const elder = elderRay();

  const calculatedData = elder(ema26(ema12(useData)));

  const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
    calculatedData
  );

  const max = xAccessor(data[data.length - 1]);
  const min = xAccessor(data[Math.max(0, data.length - 100)]);
  const xExtents = [min, max + 5];

  const gridHeight = height - margin.top - margin.bottom;

  const elderRayHeight = 100;
  const barChartHeight = gridHeight / 4;
  const barChartOrigin = (_: number, h: number) => [
    0,
    h - barChartHeight - elderRayHeight,
  ];
  const chartHeight = gridHeight - elderRayHeight;

  const barChartExtents = (data: IOHLCData) => {
    return data.volume;
  };

  const candleChartExtents = (data: IOHLCData) => {
    return [data.high, data.low];
  };

  const volumeColor = (data: IOHLCData) => {
    return data.close > data.open
      ? "rgba(38, 166, 154, 0.3)"
      : "rgba(239, 83, 80, 0.3)";
  };

  const volumeSeries = (data: IOHLCData) => {
    return data.volume;
  };

  if (useData.length) {
    return (
      <ChartCanvas
        height={height}
        ratio={ratio}
        width={width}
        margin={margin}
        data={data}
        displayXAccessor={displayXAccessor}
        seriesName="Data"
        xScale={xScale}
        xAccessor={xAccessor}
        xExtents={xExtents}
        zoomAnchor={lastVisibleItemBasedZoomAnchor}
      >
        <Chart
          id={2}
          height={barChartHeight}
          origin={barChartOrigin}
          yExtents={barChartExtents}
        >
          <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
        </Chart>
        <Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
          <XAxis showGridLines showTickLabel={true} />
          <YAxis showGridLines tickFormat={pricesDisplayFormat} />
          <CandlestickSeries />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
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

export default StockGraph;
