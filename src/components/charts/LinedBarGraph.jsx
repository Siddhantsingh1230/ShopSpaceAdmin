import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LinedBarGraph = ({ data, title, value }) => {
  console.log()
  return (
    <>
      <div className="relative w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart width={"100%"} height={"100%"} data={data}>
            <CartesianGrid strokeDasharray="5 5" stroke="#1f1e1e" />
            <XAxis dataKey={title} scale="band" className="text-sm" />
            <YAxis />
            <Tooltip />
            <Bar dataKey={value} barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey={title} stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default LinedBarGraph;
