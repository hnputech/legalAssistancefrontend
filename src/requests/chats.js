import { axioxInstance } from "./apiInstance";

export const chats = async ({
  query,
  threadId,
  assitanceId,
  userId,
  titleUpdate,
}) => {
  try {
    const response = await axioxInstance.post("/chat/", {
      query,
      threadId,
      assitanceId,
      userId,
      titleUpdate,
    });
    return response.data;
  } catch (err) {
    console.log("erro");
  }
};

export const getUserAlMassages = async (threadid) => {
  try {
    const response = await axioxInstance.post(`/listmassgaes/`, {
      threadId: threadid,
    });

    return response.data.data;
  } catch (error) {
    console.error("Error :", error);
  }
};

export const getThreadAlFiles = async (threadid) => {
  try {
    const response = await axioxInstance.post(`/listfiles/`, {
      threadId: threadid,
    });

    return response.data;
  } catch (error) {
    console.error("Error :", error);
  }
};

export const deleteFiles = async (fileid, storeid) => {
  try {
    const response = await axioxInstance.post(`/deletefile/`, {
      fileid: fileid,
      storeid: storeid,
    });

    return response.data;
  } catch (error) {
    console.error("Error :", error);
  }
};

export const getCurrentUserData = async (userName) => {
  try {
    const response = await axioxInstance.post(`/assistanc/${userName}`);
    return response.data;
  } catch (error) {
    console.error("Error :", error);
  }
};

export const uploadFiles = async (formData) => {
  const response = await axioxInstance.post("/upload/", formData);
  return response.data;
};
