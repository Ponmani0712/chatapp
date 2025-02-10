import  { useState, useEffect } from "react";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);

    ws.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (socket && input.trim()) {
      socket.send(input);
      setInput("");
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatApp;
