import appleStock from '@visx/mock-data/lib/mocks/appleStock';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { TooltipProvider } from '@visx/xychart';
import './App.css';
import { Chart3 } from './Chart';

function App() {
  return (
    <div style={{ marginTop: '300px', width: '100%', height: '600px' }}>
      <AppleChart />
    </div>
  );
}

const AppleChart = () => {
  const data = appleStock.map((x) => ({
    timestamp: +new Date(x.date),
    value: x.close,
  }));

  return (
    <ParentSize>
      {({ width, height }) => (
        <TooltipProvider hideTooltipDebounceMs={100}>
          <Chart3
            data={data}
            width={width}
            height={height}
            margin={{
              top: 10,
              bottom: 50,
              left: 10,
              right: 10,
            }}
          />
        </TooltipProvider>
      )}
    </ParentSize>
  );
};

export default App;
