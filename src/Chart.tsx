import { LineSeries, Tooltip, XYChart, lightTheme } from '@visx/xychart';
import { format } from 'date-fns';

export type DataPoint = {
  timestamp: number;
  value: number;
};

const formatDate = (d: Date | number) => format(d, 'P p');
const formatValue = Intl.NumberFormat(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format;

export type AreaProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export type ChartProps = {
  data: DataPoint[];
} & AreaProps;

export const Chart3 = ({ data, width, height, margin = { top: 0, right: 0, bottom: 0, left: 0 } }: ChartProps) => {
  if (width < 10) return null;

  return (
    <XYChart
      {...{ width, height, margin }}
      xScale={{ type: 'band', paddingInner: 0.5 }}
      yScale={{ type: 'linear' }}
      theme={lightTheme}
    >
      <LineSeries
        dataKey="apple"
        data={data}
        xAccessor={(x) => x.timestamp}
        yAccessor={(x) => x.value}
        // enableEvents={false}
      />
      <Tooltip<DataPoint>
        showVerticalCrosshair
        showHorizontalCrosshair
        snapTooltipToDatumX
        snapTooltipToDatumY
        showDatumGlyph={true}
        renderTooltip={({ tooltipData, colorScale, tooltipTop, tooltipLeft }) => (
          <>
            {tooltipData?.nearestDatum?.datum.timestamp && (
              <div className="text-muted">{formatDate(tooltipData?.nearestDatum?.datum.timestamp)}</div>
            )}
            <div>{formatValue(tooltipData?.nearestDatum?.datum.value || 0)}</div>
          </>
        )}
      />
    </XYChart>
  );
};
