import Divider from "@mui/material/Divider";
import Showdown from "showdown";

export const SingleChatHistory = ({
  chatData,
  handleChatChange,
  setDrawer,
  setTitle,
}) => {
  const converter = new Showdown.Converter({
    omitExtraWLInCodeBlocks: true,
    simplifiedAutoLink: true,
    strikethrough: true,
  });

  const chatTitle = converter
    .makeHtml(chatData?.title ?? "")
    .replace(/<\/?[^>]+(>|$)/g, " ")
    .replace(/^[\s"]+|[\s"]+$/g, "")
    .split(":");

  return (
    <div>
      {chatData.title ? (
        <h3
          className="chatHeading"
          onClick={() => {
            handleChatChange(chatData);
            setTitle(chatData.title);

            if (setDrawer) {
              setDrawer(false);
            }
          }}
        >
          {chatTitle[0].trim().toLowerCase() === "title"
            ? chatTitle[1]
            : chatTitle[0]}
        </h3>
      ) : null}
      <Divider />
    </div>
  );
};
