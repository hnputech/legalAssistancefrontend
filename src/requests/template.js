import { axioxInstance } from "./apiInstance";

export const addTemplateDocuments = async (
  documentid,
  name,
  typeid,
  words,
  text,
  userid
) => {
  console.log("======", documentid, name, typeid, words, text, userid);
  try {
    const response = await axioxInstance.post("/templates/", {
      documentid,
      name,
      typeid,
      words,
      text,
      userid,
    });
    return response.data;
  } catch (err) {
    console.log("erro", err);
  }
};

export const getUserTemplatesData = async (userId) => {
  try {
    const response = await axioxInstance.get(`/templates/${userId}`);

    return response.data;
  } catch (error) {
    console.error("Error :", error);
  }
};

export const getUserTemplateById = async (documentId) => {
  try {
    const response = await axioxInstance.get(`/singleDocument/${documentId}`);

    return response.data;
  } catch (error) {
    console.error("Error :", error);
  }
};

export const updateUserTemplate = async (documentId, name, text, words) => {
  try {
    const response = await axioxInstance.put(`/templates/${documentId}`, {
      name,
      text,
      words,
    });

    return response.data;
  } catch (error) {
    console.error("Error :", error);
  }
};

export const deleteUserTemplate = async (documentId) => {
  console.log("-documentId", documentId);
  try {
    const response = await axioxInstance.delete(`/templates/${documentId}`);

    return response.data;
  } catch (error) {
    console.error("Error :", error);
  }
};
