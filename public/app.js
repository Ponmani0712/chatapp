import React, { useState, useEffect } from "react";

const ChatApp = () => {
  const [messages, setMessages] = useState([]); // Holds all chat messages
  const [input, setInput] = useState(""); // Tracks the current message input
  const [socket, setSocket] = useState(null); // Stores the WebSocket connection

  useEffect(() => {
    // Create WebSocket connection on component mount
    const ws = new WebSocket("ws://localhost:8080");

    // Handle incoming messages
    ws.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prev) => [...prev, newMessage]);
    };
      ws.onmessage = (event) => {
  console.log("Received message:", event.data); // Debugging log
  setMessages((prevMessages) => [...prevMessages, event.data]);
};
      

    setSocket(ws);

    return () => {
      // Clean up WebSocket connection on component unmount
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() !== "" && socket) {
      const message = { content: input, timestamp: new Date().toISOString() };
      socket.send(JSON.stringify(message)); // Send the message through WebSocket
      setMessages((prev) => [...prev, message]); // Update local chat history
      setInput(""); // Clear input
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white text-center py-4 font-bold text-xl">
        Real-Time Chat App
      </header>
      <div className="flex-grow overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="p-3 bg-white rounded-lg shadow-md text-gray-800"
          >
            <span className="block font-semibold text-blue-500">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <div className="flex p-4 border-t bg-white">
        <input
          type="text"
          className="flex-grow p-2 border rounded-l-lg focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
