import { useState, useRef, useEffect } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "./FileUpload.css";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import Showdown from "showdown";
import { useIsMobile } from "../../hooks/useIsMobile";

const converter = new Showdown.Converter({
  omitExtraWLInCodeBlocks: true,
  simplifiedAutoLink: true,
  strikethrough: true,
});
export const Analyzer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [fileName, setFileNme] = useState("");
  const [data, setData] = useState("");
  const [loading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const [actionType, setActionType] = useState("analyze");

  const containerRef = useRef(null);
  const navigate = useNavigate();

  const isMobile = useIsMobile();

  useEffect(() => {
    // Scroll to the bottom when the data changes
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [data]);

  const handleChange = (event) => {
    setActionType(event.target.value);
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    setFileNme(file.name);
    setSelectedFile(file);
    setMessage("");
  };

  const onFileUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a file first.");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("actionType", actionType);

    try {
      setIsLoading(true);
      if (data !== "") setData("");

      const response = await fetch(
        `https://legalbackedn-login-585300090217.us-central1.run.app`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok || !response.body) {
        throw new Error(response.statusText);
      }

      setIsLoading(false);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        const decodedChunk = decoder.decode(value, { stream: true });
        setData((prevContent) => prevContent + decodedChunk);
      }
      // setData(response.data.content);
    } catch (error) {
      setMessage("File upload failed");
      console.error("File upload failed", error);
    }
  };

  const onFileRemove = () => {
    setSelectedFile(null);

    fileInputRef.current.value = null;
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFile(file);
  };
  return (
    <div className="main-analyze-container" ref={containerRef}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {isMobile ? (
        <ArrowBackIcon
          onClick={() => {
            navigate("/");
          }}
          style={{
            marginTop: "20px",
            marginLeft: "20px",
          }}
        />
      ) : null}
      <div className="card">
        <h2>Upload a File</h2>

        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 200, marginBottom: "40px", marginTop: "20px" }}
        >
          <InputLabel id="demo-simple-select-standard-label">Action</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={actionType}
            onChange={handleChange}
            label="Action"
          >
            <MenuItem value={"summarize"}>Document Summary</MenuItem>
            <MenuItem value={"analyze"}>Analyze Document</MenuItem>
            <MenuItem value={"response"}>Document Response</MenuItem>
          </Select>
        </FormControl>

        <div className="card-body">
          {selectedFile ? (
            <div className="remove-btn-container">
              <p>{fileName}</p>
              <IconButton onClick={onFileRemove}>
                <CancelIcon color="error" />
              </IconButton>
            </div>
          ) : (
            <div
              onClick={triggerFileInput}
              onDragOver={onDragOver}
              onDrop={onDrop}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  color: "#BDBDBD",
                  "&:hover": {
                    color: "#1a1a1a",
                    "& svg": {
                      color: "#1a1a1a",
                    },
                  },
                }}
              >
                <CloudUploadIcon fontSize="large" color="disabled" />
                <p>Click or drag to upload file</p>
              </Box>
            </div>
          )}
          <input
            className="custom-file-input"
            type="file"
            accept=".pdf,.docx,.txt"
            ref={fileInputRef}
            onChange={onFileChange}
          />

          {message && <p className="message">{message}</p>}
        </div>
        <div>
          <button className="button" onClick={onFileUpload}>
            Upload
          </button>
        </div>
      </div>
      {loading ? (
        "..."
      ) : (
        <div
          className="response-container"
          dangerouslySetInnerHTML={{ __html: converter.makeHtml(data) }}
        ></div>
      )}
    </div>
  );
};
