import { useState } from "react";

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
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import bot from "../../assets/bot.svg";
import user from "../../assets/user.svg";
import { chats } from "../../requests/chats";

// "Explain things like you would to a 10 year old learning how to co de."
const systemMessage = {
  //  Explain things like you're talking to a software professional with 5 years of experience.
  role: "system",
  content:
    "you are the experience lawyer having 10 years in the field your job is to help and guid people  ",
};

const names = ["Equall/Saul-Instruct-v1", "AdaptLLM/law-chat"];
export const Chat = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Law GPT! Ask me anything!",
      sentTime: "just now",
      sender: "lawgtp",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const [model, setModel] = useState(names[0]);

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
    await processMessageToChatGPT(newMessages, model);
  };

  const processMessageToChatGPT = async (chatMessages, model) => {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "lawgtp") {
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
        model === names[0]
          ? [
              ...apiMessages.slice(1), // The messages from our chat with ChatGPT
            ]
          : [
              systemMessage, // The system message DEFINES the logic of our chatGPT
              ...apiMessages.slice(1), // The messages from our chat with ChatGPT
            ],
      model: model,
    };

    console.log("====apiRequestBody", apiRequestBody);

    const data = await chats(apiRequestBody);
    console.log("data", data);
    setMessages([
      ...chatMessages,
      {
        message: data[0].content,
        sender: "lawgtp",
      },
    ]);
    setIsTyping(false);
  };

  return (
    <Box
      className="container"
      sx={{
        maxWidth: "1440px",
        height: "100vh",
      }}
    >
      <MainContainer
        style={{ width: "100%", display: "flex", flexDirection: "column" }}
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
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  //   style={getStyles(name, personName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Divider>Chat</Divider>

        <ChatContainer style={{ paddingTop: "10px", paddingBottom: "10px" }}>
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={
              isTyping ? <TypingIndicator content="lawgtp is typing" /> : null
            }
          >
            {messages.map((message, i) => {
              console.log(message);
              // Determine if the current message is the last one from the same user in a sequence
              const showAvatar =
                i === messages.length - 1 ||
                (messages[i + 1] && messages[i + 1].sender !== message.sender);

              return (
                <Message
                  key={i}
                  model={message}
                  style={{
                    marginLeft:
                      message.sender === "lawgtp" && !showAvatar ? "50px" : "",
                    marginRight:
                      message.sender !== "lawgtp" && !showAvatar ? "50px" : "",
                  }}
                >
                  {showAvatar && (
                    <Avatar
                      name={message.sender}
                      src={message.sender === "lawgtp" ? bot : user}
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
            attachButton={false}
            disabled={isTyping}
          />
        </ChatContainer>
      </MainContainer>
    </Box>
  );
};

//
