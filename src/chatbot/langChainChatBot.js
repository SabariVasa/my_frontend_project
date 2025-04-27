// import React, { useState } from "react";
// import axios from "axios";

// const LangChainChatBot = () => {
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);

//   const sendMessage = async () => {
//     if (!message.trim()) return;
    
//     const userMsg = { role: "user", content: message };
//     setChat([...chat, userMsg]);

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/api/chatbot/", {
//         message: message,
//       });

//       const botMsg = { role: "bot", content: response.data.reply };
//       setChat([...chat, userMsg, botMsg]);
//       setMessage("");
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div style={{ maxWidth: "500px", margin: "auto", textAlign: "center" }}>
//       <h2>Chatbot</h2>
//       <div style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "auto" }}>
//         {chat.map((msg, index) => (
//           <p key={index} style={{ textAlign: msg.role === "user" ? "right" : "left" }}>
//             <b>{msg.role === "user" ? "You" : "Bot"}:</b> {msg.content}
//           </p>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type your message..."
//         style={{ width: "80%", padding: "10px" }}
//       />
//       <button onClick={sendMessage} style={{ padding: "10px", marginLeft: "10px" }}>
//         Send
//       </button>
//     </div>
//   );
// };

// export default LangChainChatBot;
import React, { useState } from "react";
import axios from "axios";

function App() {
    const [file, setFile] = useState(null);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!question) {
            alert("Please enter a question");
            return;
        }

        const formData = new FormData();
        formData.append("question", question);
        if (file) {
            formData.append("file", file);
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/chatbot/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setAnswer(response.data.answer);
        } catch (error) {
            console.error("Error processing request", error);
            setAnswer("Failed to get a response");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>AI Chatbot (Text & PDF Support)</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="application/pdf" onChange={handleFileChange} />
                <br /><br />
                <input
                    type="text"
                    placeholder="Ask a question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <br /><br />
                <button type="submit">Submit</button>
            </form>
            {answer && (
                <div style={{ marginTop: "20px", padding: "10px", border: "1px solid black" }}>
                    <h3>Answer:</h3>
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
}

export default App;
