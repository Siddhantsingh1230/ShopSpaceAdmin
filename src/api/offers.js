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
export const deleteOffer = async (id) => {
  const { data } = await axios.delete(
    process.env.REACT_APP_SERVER_BASE_URL + `/v1/offer/deleteposter/` + id,
    options
  );
  return data;
};

export const addNewOffer = async (offerObj) => {
  const { data } = await axios.post(
    process.env.REACT_APP_SERVER_BASE_URL + `/v1/offer/addnewposter`,
    offerObj,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
  return data;
};
