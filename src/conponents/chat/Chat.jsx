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
  Button,
} from "@chatscope/chat-ui-kit-react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import bot from "../../assets/bot.svg";
import user from "../../assets/user.svg";
import sualbot from "../../assets/saulbot.svg";
import pdf from "../../assets/pdf.svg";

import { chats } from "../../requests/chats";

// "Explain things like you would to a 10 year old learning how to co de."
const systemMessage = {
  //  Explain things like you're talking to a software professional with 5 years of experience.
  role: "system",
  content:
    "you are the experience lawyer having 10 years in the field your job is to help and guid people  ",
};

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

  const [model, setModel] = useState(modellist[0].name);
  const [userName, setUserName] = useState("");
  const [isFileUpload, setIsFileUpload] = useState(false);

  const [threadId, setThreadId] = useState(null);

  const fileInputRef = useRef(null);
  const hasRunRef = useRef(false);

  const getUserData = async (userName) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/assistanc/${userName}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const transformData = (userMessagesData) => {
    const formattedData = userMessagesData.reverse().map((message) => ({
      sender: message.role,
      message: message.content[0].text.value,
      direction: message.role === "user" ? "outgoing" : "incoming",
    }));
    return formattedData;
  };

  const getUserMassages = async (threadid) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/listmassgaes`,
        {
          threadId: threadId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", response.data);
      const result = await transformData(response.data.data);
      setMessages(result);
      return result;
    } catch (error) {
      console.error("Error :", error);
    }
  };
  useEffect(() => {
    console.log("-----**********************--");
    const fetchData = async () => {
      const data = await getUserMassages(threadId);
      console.log("=====dta", data);
    };

    if (threadId) {
      fetchData();
    }
  }, [threadId]);
  useEffect(() => {
    console.log("ye wala");
    // Get the query string from the URL
    const queryString = window.location.search;

    // Parse the query string to get the value of the 'queryParam' parameter
    const urlParams = new URLSearchParams(queryString);
    const queryParam = urlParams.get("user");

    const fetchData = async () => {
      try {
        const result = await getUserData(queryParam);
        setUserData(result);
      } catch (error) {
        console.log(error.message);
      }
    };

    if (!hasRunRef.current) {
      hasRunRef.current = true;
      fetchData();
    }
  }, []);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setModel(value);
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
      chat:
        model === modellist[0].name
          ? [
              ...apiMessages.slice(1), // The messages from our chat with ChatGPT
            ]
          : [
              systemMessage, // The system message DEFINES the logic of our chatGPT
              ...apiMessages.slice(1), // The messages from our chat with ChatGPT
            ],
      model: model,
    };

    // =================
    // const query = { query: chatMessages[chatMessages.length - 1].message };

    try {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const userId = urlParams.get("user");
      const response = await axios.post(
        "http://localhost:3001/chat",
        {
          query: chatMessages[chatMessages.length - 1],
          threadId: threadId,
          isFileUpload: isFileUpload,
          assitanceId: userData.assistenceid,
          userId: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("File uploaded successfully:", response.data);
      setMessages([
        ...chatMessages,
        {
          message: response.data.content[0].text.value,
          sender: model,
        },
      ]);
      if (!threadId) {
        setThreadId(response.data.thread_id);
      }

      // for testing

      // Get the query string from the URL
      const queryStrin = window.location.search;

      // Parse the query string to get the value of the 'queryParam' parameter
      const urlParam = new URLSearchParams(queryStrin);
      const queryPara = urlParam.get("user");

      const myresult = await getUserData(queryPara);
      setUserData(myresult);

      // testing end
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    // ================

    const query = { query: chatMessages[chatMessages.length - 1].message };
    // const data = await chats(query);
    // setMessages([
    //   ...chatMessages,
    //   {
    //     message: data[0].content,
    //     sender: model,
    //   },
    // ]);
    // setMessages([
    //   ...chatMessages,
    //   {
    //     message: response.data,
    //     sender: model,
    //   },
    // ]);
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

    // formData.append("uploaded_file", selectedFile);

    // const userData = userName;

    // formData.append("userId", userData);

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

      setIsFileUpload(true);
      const filesize = response.data.size / 1000;
      const unit = filesize >= 1000 ? "MB" : "KB";
      const divider = unit === "MB" ? 1000 : 1;
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: `<div class="message">
          <div class="pdf-thumbnail">
              <img src=${pdf} alt="PDF Icon">
          </div>
          <div class="pdf-details" >
              <p class="pdf-title">${response.data.name}</p>
              <p class="pdf-size">Size: ${(filesize / divider).toFixed(
                2
              )} ${unit}</p>
          </div>
      </div>`,
          sender: "user",
          fileUrl: response.data.name,
          direction: "outgoing",
          // isFile: true, // Indicator for file message
          type: "html",
        },
      ]);

      setIsUploading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsUploading(false);
    }
  };

  // const handleFileChange = (event) => {
  //   const selectedFile = event.target.files[0];
  //   if (!selectedFile) {
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("file", selectedFile);

  //   fetch("http://localhost:5000/upload-pdf", {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.error) {
  //         alert("Error: " + data.error);
  //       } else {
  //         alert("Success: " + data.message);
  //         setMessages([
  //           ...messages,
  //           { message: `Uploaded: ${selectedFile.name}`, sender: "user" },
  //         ]);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  return (
    <div style={{ display: "flex" }}>
      <AllChats
        userData={userData}
        handleChatChange={handleChatChange}
        handleNewChat={handleNewChat}
      />
      <Box
        className="container"
        sx={{
          maxWidth: "1440px",
          height: "100vh",
          width: "70%",
        }}
      >
        <MainContainer
          style={{ width: "80%", display: "flex", flexDirection: "column" }}
        >
          <Box
            sx={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <FormControl className="model-select">
              <InputLabel id="demo-multiple-name-label">Chat Model</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={model}
                onChange={handleChange}
                input={<OutlinedInput label="Chat model" />}
              >
                {modellist.map((item) => (
                  <MenuItem key={item.name} value={item.name}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        name="test"
                        src={item.icon}
                        style={{
                          display: "inline-block",
                          width: "25px",
                          minWidth: "25px",
                          height: "25px",
                          minHeight: "25px",
                          marginRight: "5px",
                        }}
                      />{" "}
                      <span>{item.name}</span>{" "}
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Divider>{threadId}</Divider>

          <ChatContainer style={{ paddingTop: "10px", paddingBottom: "10px" }}>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator
                    content={
                      model === modellist[0].name
                        ? "Sual Ai is typing "
                        : "Adapt model is typing "
                    }
                  />
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

const AllChats = ({ userData, handleChatChange, handleNewChat }) => {
  return (
    <div
      style={{
        width: "30%",
        backgroundColor: "white",
        color: "black",
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
        {userData && userData.threadid
          ? userData.threadid.map((item) => {
              return (
                <SingleChat
                  chatData={item}
                  handleChatChange={handleChatChange}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

const SingleChat = ({ chatData, handleChatChange }) => {
  return (
    <div>
      <h3 className="chatHeading" onClick={() => handleChatChange(chatData)}>
        {chatData}
      </h3>
      <Divider />
    </div>
  );
};
