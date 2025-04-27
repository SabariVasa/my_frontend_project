import React, { useState } from "react";
import axios from "axios";
import ThreeBackground from "../ThreeBackground/ThreeBackground";

const LLMChatBot = () => {
  const [query, setQuery] = useState("");
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState([]);
  const [webScrapingResponse, setWebScrapingResponse] = useState([]);
  const [toggleScraping, setToggleScraping] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (toggleScraping) {
      handleWebScraping(query);
      return;
    }

    const formData = new FormData();
    formData.append("query", query);
    if (file) {
      formData.append("file", file);
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/llm_chatbot/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error:", error);
      setResponse(["Something went wrong."]);
    }
  };

  const handleWebScraping = async (url) => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/web_scrab/", { url });
      if (res.data.table_data_sample) {
        setWebScrapingResponse(res.data.table_data_sample.slice(0, 5));
      }
    } catch (error) {
      console.error("Error:", error);
      setWebScrapingResponse(["Something went wrong."]);
    }
  };

  return (
    <div style={{ background: "#060818", overflow: "hidden" }}>
      <ThreeBackground />
      <div style={{ background:"#060818", maxWidth: "600px", margin: "auto", textAlign: "center", padding: "20px", color: "white" }}>
        <h2>Chatbot with Web Scraping</h2>

        {/* Toggle Button */}
        <label style={{ display: "block", marginBottom: "10px" }}>
          <input
            type="checkbox"
            checked={toggleScraping}
            onChange={() => setToggleScraping(!toggleScraping)}
            style={{ marginRight: "8px" }}
          />
          Enable Web Scraping
        </label>

        <textarea
          rows="3"
          placeholder="Ask me anything..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", color: "black" }} // user input in black
        />

        <input type="file" onChange={handleFileChange} style={{ marginBottom: "10px" }} />

        <button
          onClick={handleSubmit}
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            backgroundColor: "#333",
            color: "white",
            border: "none",
            marginTop: "10px",
          }}
        >
          {toggleScraping ? "Scrape Web Data" : "Get LLM Response"}
        </button>

        {/* Display LLM Response */}
        {!toggleScraping && response.length > 0 && (
          <div style={{ marginTop: "20px", padding: "10px", border: "1px solid white" }}>
            <strong>LLM Response:</strong>
            <p>{response}</p>
          </div>
        )}

        {/* Display Web Scraping Response */}
        {toggleScraping && webScrapingResponse.length > 0 && (
          <div style={{ marginTop: "20px", padding: "10px", border: "1px solid white" }}>
            <strong>Web Scraping Data (Sample):</strong>
            <ul>
              {webScrapingResponse.map((data, index) => (
                <li key={index}>{data.join(", ")}</li>
              ))}
            </ul>
            <p style={{ color: "lightblue" }}>
              Check your downloads folder for the full scraped data.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LLMChatBot;
