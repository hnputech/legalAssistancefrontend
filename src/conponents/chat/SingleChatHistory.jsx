import Divider from "@mui/material/Divider";

function extractTitle(input) {
  // Remove any leading "###"
  if (input.startsWith("###")) {
    input = input.slice(3).trim();
  }

  // Find the part after the colon
  let colonIndex = input.indexOf(":");
  if (colonIndex === -1) {
    return ""; // No colon found
  }

  // Extract the part after the colon and trim any surrounding whitespace
  let result = input.slice(colonIndex + 1).trim();

  // Remove leading and trailing quotation marks if they exist
  if (
    (result.startsWith('"') && result.endsWith('"')) ||
    (result.startsWith("'") && result.endsWith("'"))
  ) {
    result = result.slice(1, -1).trim();
  }

  return result;
}

export const SingleChatHistory = ({
  chatData,
  handleChatChange,
  setDrawer,
}) => {
  return (
    <div>
      <h3
        className="chatHeading"
        onClick={() => {
          handleChatChange(chatData);

          if (setDrawer) {
            setDrawer(false);
          }
        }}
      >
        {chatData.title}
      </h3>
      <Divider />
    </div>
  );
};
