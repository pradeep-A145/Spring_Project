import api from "./axiosConfig";

export const addMechanic = (data) => {
  return api.post("/admin/mechanic", data);
};

export const getMechanics = () => {
  return api.get("/admin/mechanics");
};

export const createSlot = (data) => {
  return api.post("/admin/slot", data);
};

export const getSlots = () => {
  return api.get("/admin/slots");
};

export const getUsers = () => {
  return api.get("/admin/users");
};

export const createJobCard = (data) => {
  return api.post("/admin/jobcard", data);
};
