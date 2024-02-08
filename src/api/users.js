import axios from "axios";
const options = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const getAllUsers = async () => {
  const { data } = await axios.get(
    process.env.REACT_APP_SERVER_BASE_URL + "/v1/showusers",
    options
  );
  return data;
};

export const getTotalUsers = async () => {
  const { data } = await axios.get(
    process.env.REACT_APP_SERVER_BASE_URL + "/v1/getTotalUsers",
    options
  );
  return data;
};
