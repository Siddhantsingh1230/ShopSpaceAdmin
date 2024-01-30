import FileSaver from "file-saver";
import { useCallback } from "react";
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
      <div className="relative w-full h-full">
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
        </ResponsiveContainer>
        <button
          title="Save Graph"
          className="text-gray-200 absolute -top-10 right-0  hover:bg-[#5C85E7] hover:text-white transition-all bg-transparent rounded-md text-sm p-1 px-2"
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
      </div>
    </>
  );
};

export default BarChartComponent;
