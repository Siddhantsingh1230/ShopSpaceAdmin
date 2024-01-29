import axios from "axios";

const options = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const getAllOrders = async () => {
  const { data } = await axios.get(
    process.env.REACT_APP_SERVER_BASE_URL + `/v1/orders`,
    options
  );
  return data;
};

export const updateOrder = async(id,order)=>{
  const {data} = await axios.patch(
    process.env.REACT_APP_SERVER_BASE_URL + `/v1/orders/updateByAdmin/` +id,
    order,
    options
  );
  return data
}