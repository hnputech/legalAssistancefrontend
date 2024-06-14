import Divider from "@mui/material/Divider";

export const SingleChatHistory = ({
  chatData,
  handleChatChange,
  setDrawer,
}) => {
  console.log("-=====vchatData", chatData);
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
