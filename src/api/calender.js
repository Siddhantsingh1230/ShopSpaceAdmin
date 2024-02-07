import axios from "axios";
const options = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const getCalender = async (userId) => {
  const { data } = await axios.get(
    process.env.REACT_APP_SERVER_BASE_URL +
      `/v1/calender/getCalender/${userId}`,
    options
  );
  return data;
};

export const addEvent = async (eventObj) => {
  const { data } = await axios.post(
    process.env.REACT_APP_SERVER_BASE_URL + `/v1/calender/addEvent/`,
    eventObj,
    options
  );
  return data;
};

export const updateEvent = async (id,eventObj) => { 
  const { data } = await axios.post(
    process.env.REACT_APP_SERVER_BASE_URL + `/v1/calender/updateEvent/${id}`,
    eventObj,
    options
  );
  return data;
};

export const deleteNote = async (id) => {
  const { data } = await axios.delete(
    process.env.REACT_APP_SERVER_BASE_URL + `/v1/calender/deleteEvent/${id}`,
    options
  );
  return data;
};
