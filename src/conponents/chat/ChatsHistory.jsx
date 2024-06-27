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
import { useSelector, useDispatch } from "react-redux";
import { setThreadFiles } from "../../store/features/chatSlice";

export const ChatsHistory = ({
  userData,
  handleChatChange,
  handleNewChat,
  handleUploadFile,
  threadId,
  setTitle,
}) => {
  const [drawer, setDrawer] = useState(false);

  const ismobile = useIsMobile();

  const handleThreadUpdate = (threadId) => {
    handleChatChange(threadId);
    setDrawer(false);
  };

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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                // overflowY: "auto",
                height: "15vh",
                // width: "20rem",
              }}
            >
              <h2 className="charHistoryheading">Chat history</h2>
              <Divider />
              <Button
                sx={{
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                  },
                }}
                onClick={() => handleNewChat()}
                variant="text"
                style={{ textAlign: "center", width: "100%", padding: "10px" }}
              >
                Create new chat
              </Button>
              <Divider />
            </div>
            <div
              style={{
                overflowY: "auto",
                height: "45vh",
                // width: "20rem",
              }}
            >
              <div>
                {userData &&
                  userData.map((item) => {
                    return (
                      <SingleChatHistory
                        chatData={item}
                        handleChatChange={handleThreadUpdate}
                        setTitle={setTitle}
                      />
                    );
                  })}
              </div>
            </div>

            <div>
              <Divider />
              <h2 className="charHistoryheading">Uploaded Files</h2>
              <Divider />
            </div>
            <div style={{ height: "30vh", overflowY: "auto" }}>
              {/* <Button
                onClick={() => {
                  handleUploadFile();
                  setDrawer(false);
                }}
                variant="text"
                style={{ textAlign: "center", width: "100%", padding: "10px" }}
              >
                Upload{" "}
              </Button> */}
              <Divider />

              <div>
                {threadId && threadId ? (
                  <ThreadFiles threadId={threadId.threadid} />
                ) : null}
              </div>
            </div>
          </div>
        </SwipeableDrawer>
      </div>
      {!ismobile ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <h2 className="charHistoryheading">Chat history</h2>
            <Divider />
            <Button
              sx={{
                "&:focus": {
                  outline: "none",
                  boxShadow: "none",
                },
              }}
              onClick={() => handleNewChat()}
              variant="text"
              style={{ textAlign: "center", width: "100%", padding: "10px" }}
            >
              Create new chat
            </Button>
            <Divider />
          </div>
          <div
            style={{
              overflowY: "auto",
              height: "60vh",
            }}
          >
            <div>
              {userData &&
                userData.map((item) => {
                  return (
                    <SingleChatHistory
                      chatData={item}
                      handleChatChange={handleThreadUpdate}
                      setTitle={setTitle}
                    />
                  );
                })}
            </div>
          </div>

          <div>
            <Divider />
            <h2 className="charHistoryheading">Uploaded Files</h2>
            <Divider />
          </div>
          <div style={{ height: "30vh", overflowY: "auto" }}>
            {/* <Button
              onClick={() => {
                handleUploadFile();
                setDrawer(false);
              }}
              variant="text"
              style={{ textAlign: "center", width: "100%", padding: "10px" }}
            >
              Upload{" "}
            </Button>
            <Divider /> */}

            <div>
              {threadId && threadId ? (
                <ThreadFiles threadId={threadId.threadid} />
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const ThreadFiles = ({ threadId }) => {
  const filesArray = useSelector((state) => state.file);
  const dispatch = useDispatch();

  const handleDelete = async (fileId, storeId) => {
    try {
      await deleteFiles(fileId, storeId);
      // Update the state to remove the deleted file
      const newFiles = filesArray.filter((file) => file.fileid !== fileId);
      dispatch(setThreadFiles(newFiles || []));
      // setFiles((prevFiles) =>
      //   prevFiles.filter((file) => file.fileid !== fileId)
      // );
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getThreadAlFiles(threadId);
        // setFiles(data); // Correctly set the fetched data
        dispatch(setThreadFiles(data || []));
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
      {filesArray &&
        filesArray.map((item) => {
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
