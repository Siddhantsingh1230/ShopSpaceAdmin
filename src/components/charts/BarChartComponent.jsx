import FileSaver from "file-saver";
import { useCallback, useRef } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useCurrentPng } from "recharts-to-png";

const BarChartComponent = ({ data, keyField }) => {
  const [getPng, { ref, isLoading }] = useCurrentPng();
  const handleDownload = useCallback(async () => {
    const png = await getPng();

    // Verify that png is not undefined
    if (png) {
      // Download with FileSaver
      FileSaver.saveAs(png, `${keyField}.png`);
    }
  }, [getPng]);
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={"100%"}
          height={"100%"}
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
          ref={ref}
        >
          <CartesianGrid stroke="#1f1e1e" strokeDasharray="3 3" />
          <XAxis tick={false} dataKey="title" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey={keyField}
            fill="#5C85E7"
            activeBar={<Rectangle fill="#5C85E7" stroke="#5C85E7" />}
          />
        </BarChart>
        <button 
        title="Save Graph"
          className="text-gray-200 opacity-55 hover:opacity-100 hover:bg-blue-700 hover:text-white transition-all bg-gray-600 rounded-md text-sm p-2 px-3"
          onClick={handleDownload}
        >
          {isLoading ? (
            "Downloading..."
          ) : (
            <p>
              <i className="ri-download-2-line"></i>
            </p>
          )}
        </button>
      </ResponsiveContainer>
    </>
  );
};

export default BarChartComponent;
