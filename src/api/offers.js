import axios from "axios";

const options = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const getOffers = async () => {
  const { data } = await axios.get(
    process.env.REACT_APP_SERVER_BASE_URL + `/v1/offer/getposters`,
    options
  );
  return data;
};
