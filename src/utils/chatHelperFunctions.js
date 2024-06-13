export const transformData = (userMessagesData) => {
  const formattedData = userMessagesData.reverse().map((message) => ({
    sender: message.role,
    message: message.content[0].text.value,
    direction: message.role === "user" ? "outgoing" : "incoming",
  }));
  return formattedData;
};
