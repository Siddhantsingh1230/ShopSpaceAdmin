import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LineChartComponent = ({data,x,line,stroke}) => {
  return (
    <>
      {data?.length > 0 ? (
        <div className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={"100%"}
              height={"100%"}
              data={data}
            >
              <CartesianGrid stroke="#1f1e1e" strokeDasharray="5 5"  />
              <XAxis  tick={false}  dataKey={x} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={line}
                stroke={stroke}
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : null}
    </>
  );
};

export default LineChartComponent;
