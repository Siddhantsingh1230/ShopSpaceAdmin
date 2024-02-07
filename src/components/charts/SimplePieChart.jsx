import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const SimplePieChart = ({ data, value }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF7B92"];
  let renderLabel = function (entry) {
    return entry.category;
  };
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer>
        <PieChart width={"100%"} height={"100%"}>
          <Pie
            label={renderLabel}
            data={data}
            cx={160}
            cy={100}
            innerRadius={45}
            outerRadius={60}
            fill="#8884d8"
            paddingAngle={5}
            dataKey={value}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimplePieChart;
