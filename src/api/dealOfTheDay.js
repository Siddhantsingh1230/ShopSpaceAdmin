import axios from "axios";
const options = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const getCurrentDeal = async () => {
  const { data } = await axios.get(
    process.env.REACT_APP_SERVER_BASE_URL + "/v1/dod/getcurrentdeal",
    options
  );
  return data;
};

export const getAllDeals = async () => {
  const { data } = await axios.get(
    process.env.REACT_APP_SERVER_BASE_URL + "/v1/dod/alldeals",
    options
  );
  return data;
};
