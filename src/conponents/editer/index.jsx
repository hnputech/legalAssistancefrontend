import { useRef } from "react";
import JoditEditor from "jodit-react";
import showdown from "showdown";

import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleSharpIcon from "@mui/icons-material/ArticleSharp";
import ContentCopySharpIcon from "@mui/icons-material/ContentCopySharp";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { Grid, IconButton, TextField } from "@mui/material";
import { useIsMobile } from "../../hooks/useIsMobile";
import { updateUserTemplate } from "../../requests/template";
// import { useSelector } from "react-redux";

const config = {
  height: "80vh",
  width: "55vw",
  askBeforePasteHTML: false,
  askBeforePasteFromWord: false,

  // width: "100%",
  // buttons:
  //   "bold,italic,underline,strikethrough,ul,ol,font,fontsize,paragraph,lineHeight,superscript,subscript,spellcheck,cut,copy,paste,selectall,hr,table",

  removeButtons: [
    "image",
    "video",
    "file",
    "speechRecognize",
    "about",
    "source",
  ],
};
const config1 = {
  height: "80vh",
  width: "90vw",
  askBeforePasteHTML: false,
  askBeforePasteFromWord: false,
  // width: "100%",
  // buttons:
  //   "bold,italic,underline,strikethrough,ul,ol,font,fontsize,paragraph,lineHeight,superscript,subscript,spellcheck,cut,copy,paste,selectall,hr,table",

  removeButtons: [
    "image",
    "video",
    "file",
    "speechRecognize",
    "about",
    "source",
  ],
};

const converter = new showdown.Converter({
  omitExtraWLInCodeBlocks: true,
  simplifiedAutoLink: true,
  strikethrough: true,
});
export const TemplateEditor = ({
  content,
  setContent,
  documentName,
  setDocumentName,
  documentId,
}) => {
  const editor = useRef(null);
  const ismobile = useIsMobile();

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
    // const pdfPageWidth = 595.28; // jsPDF A4 page width in points

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
      callback: function (pdf) {
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

  const handleSaveDocument = async () => {
    const words = content.trim().split(/\s+/).length;
    await updateUserTemplate(documentId, documentName, content, words);
  };
  //  testing end

  return (
    <Grid
      container
      style={{
        width: ismobile ? "90vw" : "55vw",

        // width: "100%",
        backgroundColor: "white",
      }}
    >
      <Grid item xs={12} md={6}>
        <TextField
          sx={{
            // marginLeft: "10px",
            marginTop: "10px",
            width: ismobile ? "90vw" : "55vw",

            // width: "100%",
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
        <IconButton
          title="Save "
          sx={{ "&:hover": { color: "green" } }}
          onClick={() => handleSaveDocument()}
        >
          <SaveAsIcon />
        </IconButton>
      </Grid>

      <JoditEditor
        ref={editor}
        value={converter.makeHtml(content)}
        config={ismobile ? config1 : config}
        key={content}
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      />
    </Grid>
  );
};
