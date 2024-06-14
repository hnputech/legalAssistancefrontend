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
import { transformData } from "../../utils/chatHelperFunctions";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

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

  // const [model, setModl] = useState("");

  const [threadId, setThreadId] = useState(null);
  const [isToggled, setIsToggled] = useState(true);

  const fileInputRef = useRef(null);
  const hasRunRef = useRef(false);
  const ismobile = useIsMobile();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const userId = urlParams.get("user");

  const model = isToggled ? "GPT-4o" : "GPT-3.5";

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setOpen(true);

      const data = await getUserAlMassages(threadId);
      console.log("====data", data);
      const result = await transformData(data);
      setOpen(false);

      setMessages(result);
    };

    if (threadId && teststate) {
      fetchData();
    }
  }, [threadId]);
  useEffect(() => {
    const fetchData = async () => {
      setOpen(true);

      try {
        const result = await getCurrentUserData(userId);
        console.log("=====resu", result);
        setUserData(result);
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
  }, []);
  const toggleButton = () => {
    setIsToggled(!isToggled);
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
    setMessages([
      {
        message: "Hello, I'm Law GPT! Ask me anything!",
        sentTime: "just now",
        sender: "Equall/Saul-Instruct-v1",
      },
    ]);
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

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody = {
      chat: [
        ...apiMessages.slice(1), // The messages from our chat with ChatGPT
      ],
      model: model,
    };

    // =================

    try {
      const payloadObj = {
        query: chatMessages[chatMessages.length - 1],
        threadId: threadId && threadId,
        assitanceId: userData.assistenceid
          ? userData.assistenceid
          : userData.id,
        userId: userId,
        // isTitleUpdate: threadId && JSON.parse(threadId).titleUpdated,
      };
      const response = await chats(payloadObj);
      console.log("======response", response);
      setMessages([
        ...chatMessages,
        {
          message: response.chat,
          sender: model,
        },
      ]);
      console.log("=====threadId", threadId);
      if (!threadId) {
        console.log("in ke under a na bhai ");
        setThreadId(response.thread_id);
        setTestState(false);

        // for testing
        // const myresult = await getCurrentUserData(userId);

        // const newUJSerValue = {
        //   ...userData,
        //   threadid: userData.threadid.push({
        //     thread_id: threadId,
        //     title: "untitled",
        //   }),
        // };

        const newThread = {
          thread_id: response.thread_id,
          title: "untitled",
        };

        setUserData((prevState) => {
          const updatedThreads = prevState.threadid
            ? [newThread, ...prevState.threadid]
            : [newThread];
          return { ...prevState, threadid: updatedThreads };
        });

        // testing end
      }
    } catch (error) {
      console.error("Error uploading file:", error);
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

    formData.append("threadId", threadId);
    formData.append(
      "assitanceId",
      userData.id ? userData.id : userData.assistenceid
    );
    formData.append("userId", userId);
    console.log("====formData", formData);

    setIsUploading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const msg = response.data.filesdata.map((item) => {
        const filesize = item.size / 1000;
        const unit = filesize >= 1000 ? "MB" : "KB";
        const divider = unit === "MB" ? 1000 : 1;
        return {
          message: `<div class="message">
          <div class="pdf-thumbnail">
              <img src=${pdf} alt="PDF Icon">
          </div>
          <div class="pdf-details" >
              <p class="pdf-title">${item.name}</p>
              <p class="pdf-size">Size: ${(filesize / divider).toFixed(
                2
              )} ${unit}</p>
          </div>
      </div>`,
          sender: "user",
          fileUrl: item.name,
          direction: "outgoing",
          // isFile: true, // Indicator for file message
          type: "html",
        };
      });
      setMessages((prevMessages) => [...prevMessages, ...msg]);

      if (!threadId) {
        setThreadId(response.data.threadId);
      }
      setIsUploading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsUploading(false);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ChatsHistory
        userData={userData}
        handleChatChange={handleChatChange}
        handleNewChat={handleNewChat}
      />

      <Box
        className="container"
        sx={{
          maxWidth: "2000px",
          height: "100vh",
          width: ismobile ? "90%" : "70%",
        }}
      >
        <MainContainer
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
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

          <Divider>{threadId && threadId.threadId}</Divider>

          <ChatContainer style={{ paddingTop: "10px", paddingBottom: "10px" }}>
            <MessageList
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
                // Determine if the current message is the last one from the same user in a sequence
                const showAvatar =
                  i === messages.length - 1 ||
                  (messages[i + 1] &&
                    messages[i + 1].sender !== message.sender);

                return (
                  <Message
                    key={i}
                    model={message}
                    style={{
                      marginLeft:
                        (message.sender === "Equall/Saul-Instruct-v1" ||
                          message.sender === "AdaptLLM/law-chat") &&
                        !showAvatar
                          ? "50px"
                          : "",
                      marginRight:
                        (message.sender === "Equall/Saul-Instruct-v1" ||
                          message.sender === "AdaptLLM/law-chat") &&
                        !showAvatar
                          ? "50px"
                          : "",
                      marginTop: "10px",
                    }}
                  >
                    {showAvatar && (
                      <Avatar
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
            />
          </ChatContainer>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            multiple
            // onChange={handleFileChange}
            onChange={handleFileUpload}
          />
        </MainContainer>
      </Box>
    </div>
  );
};

//
