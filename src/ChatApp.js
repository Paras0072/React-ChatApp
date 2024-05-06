import React, { useState, useRef, useEffect } from "react";
import Avatar from "./Avatar";
import "./index.css";

// Function to generate a unique background color based on the user's name
const generateBackgroundColor = (name) => {
  // Convert the name to a numeric value (hash)
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Generate the background color based on the hash
  const color = Math.floor(
    Math.abs(Math.sin(hash) * 16777215) % 16777215
  ).toString(16);
  return "#" + color.padStart(6, "0"); // Ensure the color is in hex format
};

const ChatMessage = ({ sender, time, message, likes, onLike }) => (
  <div className="senderbox">
    <div className="profilebox">
      <Avatar name={sender} backgroundColor={generateBackgroundColor(sender)} />
      <div>
        <div style={{ fontWeight: "600" }}>{sender}</div>
      </div>
      <div className="time">{time}</div>
    </div>

    <div className="messagebox">
      <div className="text-sm">{message}</div>
      <button onClick={onLike} className="like-button">
        <span role="img" aria-label="Like">
          👍
        </span>

        {likes}
      </button>
    </div>
  </div>
);

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const messageInputRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];
  const handleLike = (index) => {
    // Create a copy of the messages array
    const updatedMessages = [...messages];
    // Increment the likes count for the message at the specified index
    updatedMessages[index].likes++;
    // Update the state with the updated messages array
    setMessages(updatedMessages);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // Prevent the default behavior (e.g., line break)
        const randomUser =
          user_list[Math.floor(Math.random() * user_list.length)];
        const message = messageInputRef.current.value;
        if (message.trim() !== "") {
          const newMessage = {
            sender: randomUser,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            message: message,
            likes: 0,
          };

          setMessages([...messages, newMessage]);
          messageInputRef.current.value = "";
          chatMessagesRef.current.scrollTop =
            chatMessagesRef.current.scrollHeight;
        }
      }
    };

    messageInputRef.current.addEventListener("keypress", handleKeyPress);

    return () => {
      messageInputRef.current.removeEventListener("keypress", handleKeyPress);
    };
  }, [messages]);

  return (
    <>
      <div className="container">
        <div className="sidepanel">
          <div className="profile">
            <img
              className="img"
              src="https://placehold.co/100x100"
              alt="Profile"
            />
            <div>
              <div style={{ fontWeight: "600" }}>Rolande Raimondi</div>
              <div style={{ fontSize: "0.875rem", color: "#718096" }}>
                Research Nurse
              </div>
            </div>
          </div>
          <div className="conver">
            <div
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                marginRight: "90px",
              }}
            >
              Conversations
            </div>
            <button style={{ color: "#4299e1" }}>+</button>
          </div>
          <div className="listbox">
            <ul>
              <li> Poland Office</li>
              <li> Introductions</li>
              <li> India Office</li>
            </ul>
          </div>
        </div>
        <div className="mainbox">
          <div className="box">
            <div>
              <div style={{ fontWeight: "600", fontSize: "1.6rem" }}>
                Introductions
              </div>
              <div style={{ color: "#718096", fontSize: "1rem" }}>
                This Channel Is For Company Wide Chatter
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                left: "10",
                width: "80%",
                marginTop: "60px",
              }}
            >
              <hr />
            </div>
            <div
              style={{
                position: "absolute",
                marginTop: "8px",
                right: 50,
                color: "#a0aec0",
              }}
            >
              3 | 100
            </div>
          </div>

          <div
            className="chatbox"
            // style={{ height: "calc(100vh - 200px)" }}
            ref={chatMessagesRef}
          >
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                sender={msg.sender}
                time={msg.time}
                message={msg.message}
                likes={msg.likes}
                onLike={() => handleLike(index)}
              />
            ))}
          </div>

          <div className="textbox">
            <input
              type="text"
              className="input"
              placeholder="Type Message"
              ref={messageInputRef}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatApp;
