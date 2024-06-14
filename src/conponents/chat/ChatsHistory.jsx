import { useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { Button, Divider } from "@mui/material";
import { SingleChatHistory } from "./SingleChatHistory";

export const ChatsHistory = ({ userData, handleChatChange, handleNewChat }) => {
  const [drawer, setDrawer] = useState(false);
  console.log("user===", userData);

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
            sx={{ marginTop: "10px" }}
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
            {userData && userData.threadid
              ? userData.threadid.map((item) => {
                  return (
                    <SingleChatHistory
                      chatData={item}
                      handleChatChange={handleChatChange}
                      setDrawer={setDrawer}
                    />
                  );
                })
              : null}
          </div>
        </SwipeableDrawer>
      </div>
      {!ismobile ? (
        <div>
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
            {userData && userData.threadid
              ? userData.threadid.map((item) => {
                  return (
                    <SingleChatHistory
                      chatData={item}
                      handleChatChange={handleChatChange}
                    />
                  );
                })
              : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};
