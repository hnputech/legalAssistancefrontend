import { useState, useEffect } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { Button, Divider } from "@mui/material";
import { SingleChatHistory } from "./SingleChatHistory";
import CloseIcon from "@mui/icons-material/Close";
import { deleteFiles, getThreadAlFiles } from "../../requests/chats";

export const ChatsHistory = ({
  userData,
  handleChatChange,
  handleNewChat,
  handleUploadFile,
  threadId,
  fileData,
}) => {
  const [drawer, setDrawer] = useState(false);

  const ismobile = useIsMobile();

  return (
    <div
      style={{
        width: ismobile ? "10%" : "30%",
        backgroundColor: "white",
        color: "black",
      }}
    >
      {ismobile &&
        (!drawer ? (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setDrawer(!drawer)}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <ChevronLeftIcon />
        ))}

      <div>
        <SwipeableDrawer
          anchor={"left"}
          open={drawer}
          onClose={() => setDrawer(false)}
          onOpen={() => setDrawer(true)}
        >
          <h2 className="charHistoryheading">Chat history</h2>
          <Divider />
          <Button
            onClick={() => {
              handleNewChat();
              setDrawer(false);
            }}
            variant="text"
            style={{ textAlign: "center", width: "100%", padding: "10px" }}
          >
            Create new chat
          </Button>
          <Divider />
          <div>
            {userData &&
              userData.map((item) => {
                return (
                  <SingleChatHistory
                    chatData={item}
                    handleChatChange={handleChatChange}
                    setDrawer={setDrawer}
                    key={item.threadid}
                  />
                );
              })}
          </div>
        </SwipeableDrawer>
      </div>
      {!ismobile ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              overflowY: "auto",
              height: "60vh",
            }}
          >
            <h2 className="charHistoryheading">Chat history</h2>
            <Divider />
            <Button
              onClick={() => handleNewChat()}
              variant="text"
              style={{ textAlign: "center", width: "100%", padding: "10px" }}
            >
              Create new chat
            </Button>
            <Divider />

            <div>
              {userData &&
                userData.map((item) => {
                  return (
                    <SingleChatHistory
                      chatData={item}
                      handleChatChange={handleChatChange}
                    />
                  );
                })}
            </div>
          </div>

          <div style={{ height: "40vh", overflowY: "auto" }}>
            <Divider />
            <h2 className="charHistoryheading">Uploaded Files</h2>
            <Divider />
            <Button
              onClick={() => {
                handleUploadFile();
                setDrawer(false);
              }}
              variant="text"
              style={{ textAlign: "center", width: "100%", padding: "10px" }}
            >
              Upload{" "}
            </Button>
            <Divider />

            <div>
              {threadId && threadId ? (
                <ThreadFiles threadId={threadId.threadid} fileData={fileData} />
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const ThreadFiles = ({ threadId, fileData }) => {
  console.count("========*****render*****======");
  console.log("======fileData", fileData);
  const [files, setFiles] = useState(fileData);
  console.log("====files", files);

  const handleDelete = async (fileId, storeId) => {
    try {
      await deleteFiles(fileId, storeId);
      // Update the state to remove the deleted file
      setFiles((prevFiles) =>
        prevFiles.filter((file) => file.fileid !== fileId)
      );
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  // Sync files state with fileData prop changes
  // useEffect(() => {
  //   setFiles((prev) => [...prev, ...fileData]);
  // }, [fileData]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getThreadAlFiles(threadId);
        setFiles(data); // Correctly set the fetched data
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    if (threadId) {
      fetchData();
    }
  }, [threadId]);

  return (
    <div
      style={{
        display: "flex",
        padding: "10px",
        paddingLeft: "20px",
        flexDirection: "column",
      }}
    >
      {files &&
        files.map((item) => {
          console.log("=======itemssss", item);
          return (
            <div
              key={item.fileid} // Add a key to each item
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <p style={{ width: "90%" }}>{item.filename}</p>
              <Button
                onClick={() => {
                  handleDelete(item.fileid, item.storeid);
                }}
              >
                <CloseIcon />
              </Button>
            </div>
          );
        })}
    </div>
  );
};
