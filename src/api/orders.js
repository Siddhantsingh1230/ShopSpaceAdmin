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

export const updateOrder = async (id, order) => {
  const { data } = await axios.patch(
    process.env.REACT_APP_SERVER_BASE_URL + `/v1/orders/updateByAdmin/` + id,
    order,
    options
  );
  return data;
};

export const mostCommonLocation = async () => {
  const { data } = await axios.get(
    process.env.REACT_APP_SERVER_BASE_URL + `/v1/orders/mostcommonlocation`,
    options
  );
  return data;
};

export const mostUsedPaymentMode = async () => {
  const { data } = await axios.get(
    process.env.REACT_APP_SERVER_BASE_URL + `/v1/orders/mostusedpaymentmode`,
    options
  );
  return data;
};

export const mostCommonCategory = async () => {
  const { data } = await axios.get(
    process.env.REACT_APP_SERVER_BASE_URL + `/v1/orders/commoncategory`,
    options
  );
  return data;
};

export const bonusMonth = async () => {
  const { data } = await axios.get(
    process.env.REACT_APP_SERVER_BASE_URL + `/v1/orders/bonusmonth`,
    options
  );
  return data;
};

export const deliveryCounts = async () => {
  const { data } = await axios.get(
    process.env.REACT_APP_SERVER_BASE_URL + `/v1/orders/deliverycounts`,
    options
  );
  return data;
};

export const getTotalEarnings = async () => {
  const { data } = await axios.get(
    process.env.REACT_APP_SERVER_BASE_URL + `/v1/orders/getTotalEarnings`,
    options
  );
  return data;
};

export const getTotalOrders = async () => {
  const { data } = await axios.get(
    process.env.REACT_APP_SERVER_BASE_URL + `/v1/orders/getTotalOrders`,
    options
  );
  return data;
};
