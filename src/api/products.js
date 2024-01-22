import axios from "axios";

const options = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const getAllProducts = async () => {
  const { data } = await axios.get(
    process.env.REACT_APP_SERVER_BASE_URL + `/v1/products`
  );
  return data;
};
export const getMostOrderedProducts = async () => {
  const { data } = await axios.get(
    process.env.REACT_APP_SERVER_BASE_URL + `/v1/orders/mostordered`
  );
  return data;
};
