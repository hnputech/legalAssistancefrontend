import { useRef, useState, useEffect } from "react";
import axios from "axios";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import bot from "../../assets/bot.svg";
import user from "../../assets/user.svg";
import sualbot from "../../assets/saulbot.svg";
import pdf from "../../assets/pdf.svg";

import {
  chats,
  getCurrentUserData,
  getUserAlMassages,
  uploadFiles,
} from "../../requests/chats";
import { useIsMobile } from "../../hooks/useIsMobile";
import { ChatsHistory } from "./ChatsHistory";
import { calculateCost, transformData } from "../../utils/chatHelperFunctions";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import StorageIcon from "@mui/icons-material/Storage";
import { useSelector, useDispatch } from "react-redux";
import { addFile, setThreadFiles } from "../../store/features/chatSlice";
import { marked } from "marked";

import useKeyboardAwareFocus from "../../hooks/useKeyboardAwareFocus"; // Adjust the import path as needed

const modellist = [
  { name: "Equall/Saul-Instruct-v1", icon: sualbot },
  { name: "AdaptLLM/law-chat", icon: bot },
];
export const Chat = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Law GPT! Ask me anything!",
      sentTime: "just now",
      sender: "Equall/Saul-Instruct-v1",
    },
  ]);
  const [userData, setUserData] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [teststate, setTestState] = useState(false);

  const [tokenCost, setTokenCost] = useState({
    token: 0,
    cost: 0,
  });
  // const [model, setModl] = useState("");

  const [threadId, setThreadId] = useState(null);
  const [isToggled, setIsToggled] = useState(true);

  const filesArray = useSelector((state) => state.file);
  const dispatch = useDispatch();

  const fileInputRef = useRef(null);
  const hasRunRef = useRef(false);
  const ismobile = useIsMobile();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const model = isToggled ? "gpt440" : "gpt35turbo";
  let userId = urlParams.get("user");

  // scroll the mobile down
  const inputRef = useRef(null);

  //  scroll end

  if (!userId) {
    userId = model;
  }

  // temporary state

  const [open, setOpen] = useState(false);

  const handleFocus = () => {
    console.log("=========");
    if (inputRef.current) {
      inputRef.current.style.backgroundColor = "red";
      inputRef.current.style.padding = "40px";
    }
    setTimeout(() => {
      if (
        inputRef.current &&
        typeof inputRef.current.scrollIntoView === "function"
      ) {
        // Scroll the input element into view smoothly and center it in the viewport
        inputRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else {
        console.error(
          "scrollIntoView is not a function or inputRef.current is null"
        );
      }
    }, 200); // Timeout to delay the scroll action
  };

  useEffect(() => {
    const fetchData = async () => {
      setOpen(true);

      try {
        const result = await getCurrentUserData(userId);
        const reversedata = result.reverse();

        setUserData(reversedata);
        setOpen(false);
      } catch (error) {
        console.log(error.message);
        setOpen(false);
      }
    };

    if (!hasRunRef.current) {
      hasRunRef.current = true;
      fetchData();
    }
  }, [isToggled]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setOpen(true);

        const data = await getUserAlMassages(threadId.threadid);
        const result = await transformData(data);
        setOpen(false);

        setMessages(result);
      } catch (error) {
        console.log("=====error", error);
        setOpen(false);

        setMessages([
          {
            message: "Hello, I'm Law GPT! Ask me anything!",
            sentTime: "just now",
            sender: "Equall/Saul-Instruct-v1",
          },
        ]);
      }
    };

    if (threadId && teststate) {
      fetchData();
    }
  }, [threadId]);
  const toggleButton = () => {
    setIsToggled(!isToggled);
    hasRunRef.current = false;
    handleNewChat();
  };

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    // ====
    await processMessageToChatGPT(message, newMessages, model);
    // ====
  };

  const handleChatChange = (threadId) => {
    setThreadId(threadId);
    setTestState(true);
  };
  const handleNewChat = () => {
    setThreadId(null);
    dispatch(setThreadFiles([]));
    setTestState(false);
    setTokenCost({
      token: 0,
      cost: 0,
    });
    setMessages([
      {
        message: "Hello, I'm Law GPT! Ask me anything!",
        sentTime: "just now",
        sender: "Equall/Saul-Instruct-v1",
      },
    ]);
  };

  const handleUploadFile = () => {
    handleAttachClick();
  };
  const processMessageToChatGPT = async (message, chatMessages, model) => {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (
        messageObject.sender === "Equall/Saul-Instruct-v1" ||
        messageObject.sender === "AdaptLLM/law-chat"
      ) {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const tid = threadId && threadId.threadid ? threadId.threadid : threadId;
    const title = tid ? userData.find((item) => item.threadid === tid) : null;

    try {
      const payloadObj = {
        query: chatMessages[chatMessages.length - 1],
        threadId: tid,
        assitanceId: userData[0].assistenceid
          ? userData[0].assistenceid
          : userData.id,
        userId: userId,
        titleUpdate: false,
        title: title && title.title,
        // isTitleUpdate: threadId && JSON.parse(threadId).titleUpdated,
      };
      const response = await chats(payloadObj);
      if (response) {
        setMessages([
          ...chatMessages,
          {
            message: response.chat,
            sender: model,
          },
        ]);
        const costCalculator =
          calculateCost(
            (model = "gpt35turbo" ? 0.5 : 5),
            response.tokkens.promptTokens
          ) +
          calculateCost(
            (model = "gpt35turbo" ? 1.5 : 15),
            response.tokkens.completionTokens
          );
        setTokenCost({
          token: response.tokkens.totalTokens,
          cost: costCalculator,
        });

        if (!threadId) {
          setThreadId(response.thread_id);
          setTestState(false);

          setUserData((prevState) => {
            const newState = {
              assistenceid: userData[0].assistenceid,
              threadid: response.thread_id,
              title: response.title,
              isttileupdated: response.titleUpdated,
            };

            return [newState, ...prevState];
          });
        } else if (title.title === "untitled") {
          setUserData((prevUserState) => {
            const newdata = prevUserState.map((item) => {
              if (item.threadid === tid) {
                return { ...item, title: response.title };
              } else {
                return item;
              }
            });

            return newdata;
          });
        }
      }
    } catch (error) {
      console.error("Error  in chat:", error);
    }

    setIsTyping(false);
  };

  const handleAttachClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const selectedFiles = event.target.files;
    // formData.append("files", selectedFile); // Change 'uploaded_file' to 'files'

    // Iterate over each selected file and append it to the FormData object
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }

    formData.append(
      "threadId",
      threadId && threadId.threadid ? threadId.threadid : threadId
    );
    formData.append(
      "assitanceId",
      userData[0].id ? userData[0].id : userData[0].assistenceid
    );
    formData.append("userId", userId);

    setIsUploading(true);
    try {
      const response = await axios.post(
        // "http://localhost:3001/upload",
        "https://legalbackedn2-aondtyyl6a-uc.a.run.app",

        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(addFile(response.data.filesdata));

      if (!threadId) {
        setThreadId(response.data.threadData.threadid);

        setUserData((prevState) => {
          const newState = {
            assistenceid: userData[0].assistenceid,
            threadid: response.data.threadData.threadid,
            title: response.data.threadData.title,
            isttileupdated: response.data.threadData.titleUpdated,
          };

          return [newState, ...prevState];
        });
      }
      setIsUploading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsUploading(false);
    }
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {!ismobile ? (
        <ChatsHistory
          userData={userData}
          handleChatChange={handleChatChange}
          handleNewChat={handleNewChat}
          handleUploadFile={handleUploadFile}
          threadId={threadId}
        />
      ) : null}

      <Box
        className="container"
        sx={{
          maxWidth: "2000px",
          height: "100vh",
          width: ismobile ? "100%" : "70%",
        }}
      >
        <MainContainer
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: ismobile ? "space-between" : "end",
              alignItems: "center",
            }}
          >
            {ismobile ? (
              <ChatsHistory
                userData={userData}
                handleChatChange={handleChatChange}
                handleNewChat={handleNewChat}
                handleUploadFile={handleUploadFile}
                threadId={threadId}
              />
            ) : null}
            <div className="toggle-container">
              <div style={{ marginRight: "20px", fontWeight: "bold" }}>
                {isToggled ? "GPT 4o" : "GPT -3.5"}
              </div>

              <div
                className={`toggle-button ${isToggled ? "active" : ""}`}
                onClick={toggleButton}
              >
                {" "}
                <div className="toggle-circle"></div>
              </div>
            </div>
          </div>

          <Divider>{threadId && threadId.threadId}</Divider>

          <div
            style={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "space-between",
              marginRight: "30px",
            }}
          >
            <div style={{ marginLeft: "10px", marginBottom: "20px" }}>
              <span>
                {" "}
                <span style={{ fontWeight: "bold" }}>
                  ${tokenCost.cost.toPrecision(3)} &nbsp;
                </span>
                cost (CE ),
              </span>
              <span>
                {" "}
                <span style={{ fontWeight: "bold" }}>
                  {tokenCost.token}
                </span>{" "}
                tokens
              </span>
            </div>
            <div>
              <Badge color="primary" badgeContent={filesArray.length}>
                <StorageIcon />
              </Badge>
            </div>
          </div>
          <div ref={inputRef}>
            <ChatContainer
              style={{
                paddingTop: "10px",
                paddingBottom: "10px",

                height: "85vh",
              }}
            >
              <MessageList
                className="test"
                scrollBehavior="smooth"
                typingIndicator={
                  isTyping ? (
                    <TypingIndicator content="Assistant is typing" />
                  ) : isUploading ? (
                    <TypingIndicator content="file is uploading" />
                  ) : null
                }
              >
                {messages.map((message, i) => {
                  const newMsg = {
                    ...message,
                    message: marked.parse(message.message),
                  };
                  // Determine if the current message is the last one from the same user in a sequence
                  const showAvatar =
                    i === messages.length - 1 ||
                    (messages[i + 1] &&
                      messages[i + 1].sender !== message.sender);

                  return (
                    <Message
                      key={i}
                      className="testting"
                      model={newMsg}
                      // style={{
                      //   marginLeft:
                      //     (message.sender === "Equall/Saul-Instruct-v1" ||
                      //       message.sender === "AdaptLLM/law-chat") &&
                      //     !showAvatar
                      //       ? "30px"
                      //       : "",
                      //   marginRight:
                      //     (message.sender === "Equall/Saul-Instruct-v1" ||
                      //       message.sender === "AdaptLLM/law-chat") &&
                      //     !showAvatar
                      //       ? "30px"
                      //       : "",
                      //   marginTop: "10px",
                      // }}
                    >
                      {showAvatar && (
                        <Avatar
                          size={ismobile ? "sm" : "md"}
                          name={message.sender}
                          src={
                            message.sender === "Equall/Saul-Instruct-v1"
                              ? sualbot
                              : message.sender === "AdaptLLM/law-chat"
                              ? bot
                              : user
                          }
                        />
                      )}
                    </Message>
                  );
                })}
              </MessageList>

              <MessageInput
                placeholder="Type message here"
                onSend={handleSend}
                style={{ paddingTop: "15px" }}
                // attachButton={false}
                // onAttachClick={handleAttach}
                attachButton={true}
                onAttachClick={handleAttachClick}
                disabled={isTyping || isUploading}
                onFocus={handleFocus} // Attach the onFocus event
                // onClick={() => {
                //   useKeyboardAwareFocus(inputRef);
                // }}
              />
            </ChatContainer>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            multiple
            // onChange={handleFileChange}
            onChange={handleFileUpload}
          />
        </MainContainer>
        {/* <div
          ref={inputRef}
          style={{
            height: "50px",
            backgroundColor: "white",
            paddingTop: "20px",
          }}
        ></div> */}
      </Box>
    </div>
  );
};

//
