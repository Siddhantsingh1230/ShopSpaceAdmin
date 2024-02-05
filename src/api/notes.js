import axios from "axios";

const options = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const getAllNotes = async (userId) => {
  const { data } = await axios.get(
    process.env.REACT_APP_SERVER_BASE_URL + `/v1/notes/getAllNotes/${userId}`,
    options
  );
  return data;
};
export const addNote = async (title, userId, category, createdAt) => {
  const { data } = await axios.post(
    process.env.REACT_APP_SERVER_BASE_URL + `/v1/notes/addNote`,
    { title, userId, category, createdAt },
    options
  );
  return data;
};
export const updateNoteCategory = async (id, category) => {
  const { data } = await axios.post(
    process.env.REACT_APP_SERVER_BASE_URL + `/v1/notes/updateNote/${id}`,
    { category },
    options
  );
  return data;
};
export const deleteNote = async (id) => {
  const { data } = await axios.delete(
    process.env.REACT_APP_SERVER_BASE_URL + `/v1/notes/deleteNote/${id}`,
    options
  );
  return data;
};
