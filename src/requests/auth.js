import { axioxInstance } from "./apiInstance";

export const signup = async (firstName, lasttName, email, password) => {
  try {
    const response = await axioxInstance.post(`/auth/signup/`, {
      firstName,
      lasttName,
      email,
      password,
    });

    console.log("======response.data", response.data);
    return response.data;
  } catch (error) {
    console.error("Error :", error);
  }
};

export const signin = async (email, password) => {
  try {
    const response = await axioxInstance.post(`auth/signin`, {
      email,
      password,
    });

    console.log("======response.data", response.data);

    return response.data;
  } catch (error) {
    console.error("Error :", error);
  }
};
