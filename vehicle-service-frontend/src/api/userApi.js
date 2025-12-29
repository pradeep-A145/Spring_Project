import api from "./axiosConfig";

export const getSlots = () => {
  return api.get("/user/slots");
};

export const bookSlot = (data) => {
  return api.post("/user/book", data);
};

export const getUserBookings = (userId) => {
  return api.get(`/user/bookings/${userId}`);
};

export const getJobCard = (bookingId) => {
  return api.get(`/user/jobcard/${bookingId}`);
};
