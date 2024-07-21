import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import showdown from "showdown";

import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleSharpIcon from "@mui/icons-material/ArticleSharp";
import ContentCopySharpIcon from "@mui/icons-material/ContentCopySharp";
import { Grid, IconButton, TextField } from "@mui/material";

const config = {
  height: "80vh",
  // width: "60vw",
  width: "100%",
  removeButtons: ["image", "video", "file", "speechRecognize", "about"],
};

const converter = new showdown.Converter({
  omitExtraWLInCodeBlocks: true,
  simplifiedAutoLink: true,
  strikethrough: true,
});
export const TemplateEditor = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const [documentName, setDocumentName] = useState("New document");

  const fetchChatData = async () => {
    try {
      const response = await fetch("http://localhost:3001/templateGenerator", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userPrompt: "what you can do ?" }),
      });

      if (!response.ok || !response.body) {
        throw new Error(response.statusText);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const decodedChunk = decoder.decode(value, { stream: true });
        setContent((prevContent) => prevContent + decodedChunk);
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  // this is testing

  const printDocument = () => {
    const input = document.getElementsByClassName("jodit-wysiwyg")[0];
    console.log("====inpout ", input);

    const pdf = new jsPDF("p", "pt", "a4");

    // Calculate the height required to fit content on an A4 page
    const specialElementHandlers = {
      "#editor": function(element, renderer) {
        return true;
      },
    };

    pdf.html(input, {
      callback: function(pdf) {
        pdf.save(`${documentName || "New document"}.pdf`);
      },
      x: 10,
      y: 15,
      autoPaging: "text", // Enable auto pagination
      html2canvas: {
        // Set html2canvas options
        scale: 0.5, // Scale down HTML to fit into the PDF
      },
    });
  };

  const handleDownloadDoc = () => {
    const input = document.getElementsByClassName("jodit-wysiwyg")[0].innerHTML;

    const blob = new Blob([input], { type: "application/msword" });
    saveAs(blob, `${documentName || "New document"}.doc`);
  };

  const handleCopyClipboard = () => {
    const input = document.getElementsByClassName("jodit-wysiwyg")[0].innerHTML;

    navigator.clipboard.writeText(input).then(() => {
      alert("Content copied to clipboard");
    });
  };
  //  testing end

  return (
    <Grid
      container
      style={{
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
        // style={{
        //   display: "flex",
        //   justifyContent: "space-between",
        //   alignItems: "center",
        // }}
      >
        <TextField
          sx={{
            // marginLeft: "10px",
            marginTop: "10px",
            width: "100%",
            maxWidth: "400px",
          }}
          value={documentName}
          label="Document Name"
          variant="outlined"
          onChange={(e) => {
            setDocumentName(e.target.value);
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        style={{
          display: "flex",
          justifyContent: "end",
          padding: "20px",
          gap: "15px",
        }}
      >
        <button onClick={() => fetchChatData()}>fetch data</button>

        <IconButton
          title="Export as Word Document"
          sx={{ "&:hover": { color: "blue" } }}
          onClick={() => handleDownloadDoc()}
        >
          <ArticleSharpIcon />
        </IconButton>

        <IconButton
          title="Export as Word PDF"
          sx={{ "&:hover": { color: "red" } }}
          onClick={printDocument}
        >
          <PictureAsPdfIcon />
        </IconButton>

        <IconButton
          title="Copy Text"
          sx={{ "&:hover": { color: "orange" } }}
          onClick={() => handleCopyClipboard()}
        >
          <ContentCopySharpIcon />
        </IconButton>
      </Grid>

      <JoditEditor
        ref={editor}
        value={converter.makeHtml(content)}
        config={config}
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      />
    </Grid>
  );
};
