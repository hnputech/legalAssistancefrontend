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

import got40 from "../../assets/bot.svg";
import user from "../../assets/user.svg";
import gpt40mini from "../../assets/saulbot.svg";
import gpt3 from "../../assets/bot3.svg";

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
import showdown from "showdown";
import { botMessage } from "./const";
import MultiToggle from "../multiToggle/MutiToggle";

let pattern = /【\d+:\d+†source】/g;

const modelsList = [
  { value: "gpt440", label: "4o" },
  { value: "gpt4omini", label: "4o mini" },
  { value: "gpt35turbo", label: "3.5 turbo" },
];

export const Chat = () => {
  const [messages, setMessages] = useState([
    {
      message: botMessage,
      sentTime: "just now",
      sender: "assistant",
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

  const [threadId, setThreadId] = useState(null);
  // const [isToggled, setIsToggled] = useState(true);

  const [title, setTitle] = useState("");
  const [active, setActive] = useState("gpt440");

  const filesArray = useSelector((state) => state.file);
  const dispatch = useDispatch();

  const fileInputRef = useRef(null);
  const hasRunRef = useRef(false);
  const ismobile = useIsMobile();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  // const model = isToggled ? "gpt440" : "gpt35turbo";
  let userId = urlParams.get("user");

  // scroll the mobile down
  const inputRef = useRef(null);

  //  scroll end

  if (!userId) {
    userId = active;
  }

  // temporary state

  const [open, setOpen] = useState(false);

  const converter = new showdown.Converter({
    omitExtraWLInCodeBlocks: true,
    simplifiedAutoLink: true,
    strikethrough: true,
  });

  const handleFocus = () => {
    console.log("=========");
    if (inputRef.current) {
      inputRef.current.style.paddingBottom = "20px";
    }
    if (ismobile) {
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
    }
  };

  const handleBlur = () => {
    if (inputRef.current) {
      inputRef.current.style.paddingBottom = "0";
    }
  };

  const handleActiveStateChange = (state) => {
    setActive(state);
    hasRunRef.current = false;
    handleNewChat();
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
  }, [active]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setOpen(true);

        const data = await getUserAlMassages(threadId.threadid);
        const result = await transformData(data);
        setOpen(false);

        setMessages(
          result.length > 0
            ? result
            : [
                {
                  message: botMessage,
                  sentTime: "just now",
                  sender: "assistant",
                },
              ]
        );
      } catch (error) {
        console.log("=====error", error);
        setOpen(false);

        setMessages([
          {
            message: botMessage,
            sentTime: "just now",
            sender: "assistant",
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
    await processMessageToChatGPT(message, newMessages, active);
    // ====
  };

  const handleChatChange = (threadId) => {
    setThreadId(threadId);
    setTestState(true);
  };
  const handleNewChat = () => {
    setThreadId(null);
    dispatch(setThreadFiles([]));
    setTitle("");
    setTestState(false);
    setTokenCost({
      token: 0,
      cost: 0,
    });
    setMessages([
      {
        message: botMessage,
        sentTime: "just now",
        sender: "assistant",
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
            model === "gpt35turbo" ? 0.5 : model === "gpt440" ? 5 : 0.15,
            response.tokkens.promptTokens
          ) +
          calculateCost(
            model === "gpt35turbo" ? 1.5 : model === "gpt440" ? 15 : 0.6,
            response.tokkens.completionTokens
          );
        setTokenCost({
          token: response.tokkens.totalTokens,
          cost: costCalculator,
        });

        if (!threadId) {
          setTitle(response.title);
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
        // "https://legalbackedn2-aondtyyl6a-uc.a.run.app/upload",
        "https://legalbackend-aondtyyl6a-uc.a.run.app/upload",

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

  const chatTitle = converter
    .makeHtml(title)
    .replace(/<\/?[^>]+(>|$)/g, " ")
    .replace(/^[\s"]+|[\s"]+$/g, "")
    .split(":");

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
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
          setTitle={setTitle}
        />
      ) : null}

      <Box
        className="container"
        sx={{
          maxWidth: "2000px",
          // height: "100vh",
          height: ismobile ? "100vh" : "calc(100vh - 64px)",

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
                setTitle={setTitle}
              />
            ) : null}
            <div className="toggle-container">
              <div style={{ marginRight: "20px", fontWeight: "bold" }}>
                <MultiToggle
                  active={active}
                  setActive={handleActiveStateChange}
                  toggleOptions={modelsList}
                />
              </div>
            </div>
          </div>

          <Divider>{threadId && threadId.threadId}</Divider>

          <div
            style={{
              marginTop: "7px",
              display: "flex",
              justifyContent: "space-between",
              marginRight: "30px",
            }}
          >
            <div
              style={{
                marginLeft: "10px",
                marginBottom: title ? "0px" : "13px",
              }}
            >
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
          <Divider>
            {chatTitle[0].trim().toLowerCase() === "title"
              ? chatTitle[1].length > 20
                ? chatTitle[1].substring(0, 20) + "..."
                : chatTitle[1]
              : chatTitle[0].length > 20
              ? chatTitle[0].substring(0, 20) + "..."
              : chatTitle[0]}
          </Divider>
          <div ref={inputRef}>
            <ChatContainer
              style={{
                paddingTop: "10px",
                paddingBottom: "10px",

                height: ismobile ? "85vh" : "calc(85vh - 40px)",

                // height: "85vh",
              }}
            >
              <MessageList
                className="test"
                scrollBehavior="auto"
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
                    message: converter
                      .makeHtml(message.message)
                      .replace(pattern, ""),
                  };
                  // Determine if the current message is the last one from the same user in a sequence
                  const showAvatar =
                    i === messages.length - 1 ||
                    (messages[i + 1] &&
                      messages[i + 1].sender !== message.sender);

                  return (
                    <Message key={i} className="testting" model={newMsg}>
                      {showAvatar && (
                        <Avatar
                          size={ismobile ? "sm" : "md"}
                          name={message.sender}
                          src={
                            message.sender === "assistant" &&
                            active === "gpt440"
                              ? got40
                              : message.sender === "assistant" &&
                                active === "gpt4omini"
                              ? gpt40mini
                              : message.sender === "assistant" &&
                                active === "gpt35turbo"
                              ? gpt3
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
                attachButton={true}
                onAttachClick={handleAttachClick}
                disabled={isTyping || isUploading}
                onFocus={handleFocus} // Attach the onFocus event
                onBlur={handleBlur}
              />
            </ChatContainer>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            multiple
            onChange={handleFileUpload}
          />
        </MainContainer>
      </Box>
    </div>
  );
};

//
