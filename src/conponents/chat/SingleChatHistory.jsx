import Divider from "@mui/material/Divider";

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
        {chatData}
      </h3>
      <Divider />
    </div>
  );
};
