import { axioxInstance } from "./apiInstance";

export const chats = async (chat) => {
  console.log("====chat", chat);

  const jsonchats = JSON.stringify(chat);
  console.log("====jsonchats", jsonchats);
  try {
    const response = await axioxInstance.post("/chat", jsonchats);
    return response.data;
  } catch (err) {
    console.log("erro");
  }
};
