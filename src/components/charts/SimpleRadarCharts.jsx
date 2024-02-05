import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

const SimpleRadialBarCharts = ({ data, title, value }) => {
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
  const style = {
    top: "50%",
    right: 0,
    transform: "translate(0, -50%)",
    lineHeight: "24px",
  };
  return (
    <>
      <div className="relative w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey={title} />
            <PolarRadiusAxis />
            <Radar
              name={title}
              dataKey={value}
              stroke="#8884d8"
              fill="#00C49F"
              fillOpacity={0.6}
            />
          </RadarChart>
          <Legend />
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default SimpleRadialBarCharts;
