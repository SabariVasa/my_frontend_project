import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isListening, setIsListening] = useState(false);

    // Check if SpeechRecognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;
    
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
        };
    } else {
        console.warn("Speech recognition is not supported in this browser.");
    }

    const startListening = () => {
        if (recognition) {
            recognition.start();
        } else {
            alert("Speech recognition is not supported in this browser.");
        }
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { text: input, sender: "user" }];
        setMessages(newMessages);
        setInput("");

        try {
            const response = await axios.post("http://3.109.206.156:8000/api/chat/", { message: input });
            setMessages([...newMessages, { text: response.data.response, sender: "bot" }]);
        } catch (error) {
            console.error("Error fetching response:", error);
            setMessages([...newMessages, { text: "Error connecting to chatbot!", sender: "bot" }]);
        }
    };

    return (
        <div style={{ maxWidth: "500px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
            <h2>Medical Chatbot</h2>
            <div style={{ height: "300px", overflowY: "auto", padding: "10px", border: "1px solid #ddd" }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ textAlign: msg.sender === "user" ? "right" : "left", margin: "5px 0" }}>
                        <span
                            style={{
                                display: "inline-block",
                                padding: "8px 12px",
                                borderRadius: "10px",
                                background: msg.sender === "user" ? "#007bff" : "#ddd",
                                color: msg.sender === "user" ? "#fff" : "#000",
                            }}
                        >
                            {msg.text}
                        </span>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                style={{ width: "70%", padding: "10px", marginTop: "10px" }}
            />
            <button onClick={sendMessage} style={{ width: "15%", padding: "10px", marginLeft: "2%", background: "#007bff", color: "#fff" }}>
                Send
            </button>
            <button onClick={startListening} 
                style={{ width: "10%", padding: "10px", marginLeft: "2%", background: isListening ? "red" : "green", color: "#fff" }}>
            </button>
        </div>
    );
};

export default Chatbot;
