import axios from "axios";
const options = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const signup = async (userData) => {
  const { data } = await axios.post(
    process.env.REACT_APP_SERVER_BASE_URL + "/v1/admin/signup",
    {
      ...userData,
    },
    options
  );
  return data;
};

export const login = async (userData) => {
  const { data } = await axios.post(
    process.env.REACT_APP_SERVER_BASE_URL + "/v1/admin/login",
    {
      ...userData,
    },
    options
  );
  return data;
};

export const logout = async () => {
  const { data } = await axios.get(
    process.env.REACT_APP_SERVER_BASE_URL + "/v1/admin/logout",
    options
  );
  return data;
};

export const getUser = async () => {
  const { data } = await axios.get(
    process.env.REACT_APP_SERVER_BASE_URL + "/v1/admin/me",
    options
  );
  return data;
};

export const updateUser = async (updateObj) => {
  //this updateObj contains updated info and id too
  const { data } = await axios.put(
    process.env.REACT_APP_SERVER_BASE_URL + "/v1/update/" + updateObj.id,
    {
      ...updateObj.data,
    },
    options
  );
  return data;
};

export const deleteUser = async (userid) => {
  const { data } = await axios.delete(
    process.env.REACT_APP_SERVER_BASE_URL + "/v1/delete/" + userid,
    options
  );
  return data;
};

export const forgotPassword = async (email) => {
  const { data } = await axios.post(
    process.env.REACT_APP_SERVER_BASE_URL + "/v1/forgotpassword/",
    { email },
    options
  );
  return data;
};

export const resetPassword = async (id, password, token) => {
  const { data } = await axios.post(
    process.env.REACT_APP_SERVER_BASE_URL + "/v1/resetpassword/",
    { id, password, token },
    options
  );
  return data;
};
