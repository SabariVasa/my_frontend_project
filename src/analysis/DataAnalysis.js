import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Button,
  TextField,
  Typography,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ThreeBackground from "../ThreeBackground/ThreeBackground"; 
// Adjust import path based on your project structure

function DataAnalysis() {
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState("");
  const [columns, setColumns] = useState([]);
  const [previewData, setPreviewData] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [chartImg, setChartImg] = useState("");
  const [chartType, setChartType] = useState("");
  const [selectedCols, setSelectedCols] = useState([]);

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("http://localhost:8000/api/upload_preview/", formData);

      if (res.data.error) {
        alert(res.data.error);
        return;
      }

      setFilePath(res.data.file_path);
      setColumns(res.data.columns);
      setPreviewData(res.data.preview);
    } catch (err) {
      console.error("Upload Error:", err);
      alert("Failed to upload/preview. Check server logs.");
    }
  };

  const handlePromptProcess = async () => {
    if (!filePath || !prompt) {
      alert("Please upload a file and enter a prompt.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/api/process_prompt/", {
        file_path: filePath,
        query: prompt,
        response_type: "both",
      });
      setAiResponse(res.data.response);
      setChartImg(res.data.visualization);
    } catch (err) {
      console.error("Prompt Processing Error:", err);
      alert("Failed to process the prompt.");
    } finally {
      setLoading(false);
    }
  };

  const handleChartGenerate = async () => {
    if (!filePath || !chartType || selectedCols.length === 0) {
      alert("Please select chart type and columns.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/api/process_visualization/", {
        file_path: filePath,
        chart_type: chartType,
        columns: selectedCols,
      });
      setChartImg(res.data.visualization);
    } catch (err) {
      console.error("Chart Generation Error:", err);
      alert("Failed to generate chart.");
    } finally {
      setLoading(false);
    }
  };

  const dataCols = previewData.length > 0 ? Object.keys(previewData[0]) : [];

  return (
    <Box sx={{ position: "relative", width: "100%", background:"#060818", zIndex:1, minHeight: "100vh", overflow: "hidden" }}>
      <ThreeBackground color="#00ffff" speed={1} />
      <Box
        sx={{
          borderRadius: 4,
          position: "relative",
          zIndex: 1,
          maxWidth: 900,
          mx: "auto",
          mt: 4,
          px: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 10px 25px rgba(138, 43, 226, 0.3)",
            transform: "perspective(1000px) rotateX(2deg)",
            color: "white",
          }}
        >
          <Typography variant="h4" gutterBottom>AI Data Analysis</Typography>

          <Button variant="contained" component="label" sx={{ mt: 2 }}>
            Select CSV File
            <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} hidden />
          </Button>

          <Typography variant="body2" color="white" sx={{ mt: 1 }}>
            {file?.name || "No file selected"}
          </Typography>

          <Button
            onClick={handleUpload}
            variant="contained"
            color="White"
            sx={{ mt: 2, color:"White" }}
            disabled={!file}
          >
            Upload & Preview
          </Button>

          {previewData.length > 0 && (
            <>
              <Box sx={{ height: 300, mt: 4 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>Data Preview</Typography>
                <DataGrid
                  rows={previewData.map((row, id) => ({ id, ...row }))}
                  columns={dataCols.map((col) => ({
                    field: col,
                    headerName: col.toUpperCase(),
                    flex: 1,
                  }))}
                  sx={{
                    backgroundColor: "transparent",     // Table background transparent
                    color: "gray",                      // All text gray
                    border: "none",                     // No border
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: "transparent",    // Header transparent
                      color: "gray",                     // Header text gray
                      fontWeight: "bold",                 // Bold headers
                      borderBottom: "1px solid rgba(128,128,128,0.2)", // light gray bottom border
                    },
                    "& .MuiDataGrid-cell": {
                      borderBottom: "1px solid rgba(128,128,128,0.1)", // light gray row divider
                    },
                    "& .MuiDataGrid-footerContainer": {
                      backgroundColor: "transparent",     // Footer transparent
                      borderTop: "1px solid rgba(128,128,128,0.2)",   // light gray top border
                    },
                    "& .MuiDataGrid-iconSeparator": {
                      display: "none", // Hide the icon separators
                    },
                  }}
                />

              </Box>

              <TextField
                label="Enter your Analysis Prompt"
                fullWidth
                multiline
                minRows={2}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                sx={{ mt: 4, input: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              <Button
                onClick={handlePromptProcess}
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={20} /> : "Process Prompt"}
              </Button>

              {aiResponse && (
                <Typography sx={{ mt: 3, whiteSpace: "pre-line", color: "white" }}>
                  {aiResponse}
                </Typography>
              )}

              <FormControl fullWidth sx={{ mt: 4 }}>
                <InputLabel style={{ color: "white" }}>Chart Type</InputLabel>
                <Select
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value)}
                  sx={{ color: "white" }}
                  label="Chart Type"
                >
                  <MenuItem value="bar">Bar</MenuItem>
                  <MenuItem value="scatter">Scatter</MenuItem>
                  <MenuItem value="histogram">Histogram</MenuItem>
                  <MenuItem value="pie">Pie</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Columns (comma-separated)"
                fullWidth
                value={selectedCols.join(",")}
                onChange={(e) => setSelectedCols(e.target.value.split(",").map(col => col.trim()))}
                sx={{ mt: 2, input: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              <Button
                onClick={handleChartGenerate}
                variant="outlined"
                sx={{ mt: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={20} /> : "Generate Chart"}
              </Button>

              {chartImg && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6">Generated Chart:</Typography>
                  <img
                    src={`data:image/png;base64,${chartImg}`}
                    alt="Generated Chart"
                    style={{ maxWidth: "100%", marginTop: "10px" }}
                  />
                </Box>
              )}
            </>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

export default DataAnalysis;
