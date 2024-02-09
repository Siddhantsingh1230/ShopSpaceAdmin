import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const AreaChartComponent = ({ data, x, area, stroke, fill }) => {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart width={"100%"} height={"100%"} data={data}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={"#5C85E7"} /// change colour here to get that gradient
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={fill} /// change colour here to get that gradient
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#1f1e1e" strokeDasharray="5 5" />

          <XAxis tick={false} dataKey={x} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey={area}
            dot
            stroke={stroke}
            strokeWidth={2}
            fill={"url(#colorUv)"}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default AreaChartComponent;
