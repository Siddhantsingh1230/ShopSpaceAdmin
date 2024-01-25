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
export const deleteproduct = async (id) => {
  const { data } = await axios.delete(
    process.env.REACT_APP_SERVER_BASE_URL + `/v1/products/delete/` + id,
    options
  );
  return data;
};

export const updateProduct = async (id, product) => {
  const { data } = await axios.patch(
    process.env.REACT_APP_SERVER_BASE_URL + `/v1/products/update/` + id,
    product ,
    options
  );
  return data;
};
