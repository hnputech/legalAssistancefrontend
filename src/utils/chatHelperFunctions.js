export const transformData = (userMessagesData) => {
  const formattedData = userMessagesData.reverse().map((message) => ({
    sender: message.role,
    message: message.content[0].text.value,
    direction: message.role === "user" ? "outgoing" : "incoming",
  }));
  return formattedData;
};

export const calculateCost = (pricePerMillion, numberOfUnits) => {
  // Calculate the price per unit
  const pricePerUnit = pricePerMillion / 1000000;

  // Calculate the total cost
  const totalCost = pricePerUnit * numberOfUnits;

  return totalCost;
};
