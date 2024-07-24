import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import showdown from "showdown";

import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleSharpIcon from "@mui/icons-material/ArticleSharp";
import ContentCopySharpIcon from "@mui/icons-material/ContentCopySharp";
import { Grid, IconButton, TextField } from "@mui/material";
import { useIsMobile } from "../../hooks/useIsMobile";
// import { useSelector } from "react-redux";

const config = {
  height: "80vh",
  width: "55vw",

  // width: "100%",

  removeButtons: ["image", "video", "file", "speechRecognize", "about"],
};
const config1 = {
  height: "80vh",
  width: "90vw",
  // width: "100%",

  removeButtons: ["image", "video", "file", "speechRecognize", "about"],
};

const converter = new showdown.Converter({
  omitExtraWLInCodeBlocks: true,
  simplifiedAutoLink: true,
  strikethrough: true,
});
export const TemplateEditor = ({ content, setContent }) => {
  const editor = useRef(null);
  const ismobile = useIsMobile();

  const [documentName, setDocumentName] = useState("New document");

  const fetchChatData = async () => {
    try {
      const response = await fetch(
        "https://legalbackend-aondtyyl6a-uc.a.run.app/templateGenerator",
        {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userPrompt: "what you can do ?" }),
        }
      );

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

  // const printDocument = () => {
  //   const input = document.getElementsByClassName("jodit-wysiwyg")[0];
  //   if (!input) {
  //     console.error("Editor content not found");
  //     return;
  //   }

  //   // Clone the content in JoditEditor for manipulation
  //   const clone = input.cloneNode(true);
  //   clone.style.width = "800px"; // Set a fixed width for capturing
  //   clone.style.maxWidth = "none"; // Remove any max-width constraints

  //   // Append the clone to the body temporarily for it to be captured properly
  //   document.body.appendChild(clone);

  //   // Create a jsPDF instance
  //   const pdf = new jsPDF("p", "pt", "a4");

  //   // Generate the PDF
  //   pdf.html(clone, {
  //     callback: function(pdf) {
  //       pdf.save(`${documentName || "New document"}.pdf`);

  //       // Clean up the clone after rendering
  //       document.body.removeChild(clone);
  //     },
  //     x: 10,
  //     y: 15,
  //     autoPaging: "text", // Enable auto pagination
  //     html2canvas: {
  //       scale: 0.5, // Scale down HTML to fit into the PDF
  //     },
  //   });
  // };
  const printDocument = () => {
    // Find the Jodit editor content
    const input = document.getElementsByClassName("jodit-wysiwyg")[0];
    if (!input) {
      console.error("Editor content not found");
      return;
    }

    // Clone the content in JoditEditor for manipulation
    const clone = input.cloneNode(true);

    // Apply consistent styling dimensions and ensure it aligns with A4 width
    const pdfPageWidth = 595.28; // jsPDF A4 page width in points

    // Create a container div to apply the wrapping styles
    const container = document.createElement("div");
    container.className = "pdf-content";
    container.appendChild(clone);
    document.body.appendChild(container); // Temporarily append for sizing context

    // Override styles to prevent content overflow
    const applyWordWrapStyles = (element) => {
      element.style.wordWrap = "break-word";
      element.style.overflowWrap = "break-word";
      element.style.whiteSpace = "pre-wrap";

      // Recursively apply for all child elements
      Array.from(element.children).forEach((child) =>
        applyWordWrapStyles(child)
      );
    };

    applyWordWrapStyles(clone);

    // Create a jsPDF instance
    const pdf = new jsPDF("p", "pt", "a4");

    // Generate the PDF
    pdf.html(container, {
      callback: function(pdf) {
        pdf.save(`${documentName || "New document"}.pdf`);

        // Clean up the container after rendering
        document.body.removeChild(container);
      },
      x: 10,
      y: 15,
      html2canvas: {
        scale: 0.8, // Adjust the scale to better fit the content
        useCORS: true, // Handle CORS issues if there are any external images
        logging: true, // Enable logging for debugging
        width: container.offsetWidth,
        windowWidth: container.scrollWidth, // Ensure the whole content width is captured
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
      <Grid item xs={12} md={6}>
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
        {/* <button onClick={() => fetchChatData()}>fetch data</button> */}

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
        config={ismobile ? config1 : config}
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      />
    </Grid>
  );
};
