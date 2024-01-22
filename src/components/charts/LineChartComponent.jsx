import { useSelector } from "react-redux";
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

const LineChartComponent = () => {
  const products = useSelector((state) => state.product.products);
  console.log(products)
  return (
    <>
      {products?.length > 0 ? (
        <div className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={products?.slice(0, 15)}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid stroke="#1f1e1e" strokeDasharray="5 5"  />
              <XAxis  tick={false}  dataKey="title" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="viewCount"
                stroke="#5C85E7"
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
