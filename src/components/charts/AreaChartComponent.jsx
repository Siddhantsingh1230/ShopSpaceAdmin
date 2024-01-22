import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const AreaChartComponent = ({data,x,area,stroke,fill}) => {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={"100%"}
          height={"100%"}
          data={data}
        >
          <CartesianGrid stroke="#1f1e1e" strokeDasharray="5 5" />
          <XAxis tick={false} dataKey={x} />
          <YAxis />
          <Tooltip />
          <Legend/>
          <Area type="monotone" dataKey={area} dot stroke={stroke} strokeWidth={2} fill={fill} />
        </AreaChart>
      </ResponsiveContainer>
    </>
  )
}

export default AreaChartComponent;
