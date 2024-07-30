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
    const input = document.getElementsByClassName("jodit-wysiwyg")[0];
    if (!input) {
      console.error("Editor content not found");
      return;
    }

    const clone = input.cloneNode(true);
    const container = document.createElement("div");
    container.className = "pdf-content";
    container.appendChild(clone);
    document.body.appendChild(container);

    const applyWordWrapStyles = (element) => {
      element.style.wordWrap = "break-word";
      element.style.overflowWrap = "break-word";
      element.style.whiteSpace = "pre-wrap";
      Array.from(element.children).forEach((child) =>
        applyWordWrapStyles(child)
      );
    };

    applyWordWrapStyles(clone);

    const pdf = new jsPDF("p", "pt", "a4");

    pdf.html(container, {
      callback: function (pdf) {
        pdf.save(`${documentName || "New document"}.pdf`);
        document.body.removeChild(container);
      },
      x: 10,
      y: 15,
      html2canvas: {
        scale: 0.8,
        useCORS: true,
        logging: true,
        width: container.offsetWidth,
        windowWidth: container.scrollWidth,
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

  return (
    <Grid
      container
      style={{
        width: ismobile ? "90vw" : "55vw",
        backgroundColor: "white",
      }}
    >
      <Grid item xs={12} md={6}>
        <TextField
          sx={{
            marginTop: "10px",
            width: ismobile ? "90vw" : "55vw",
            maxWidth: "400px",
          }}
          value={documentName}
          label="Document Name"
          variant="outlined"
          onChange={(e) => setDocumentName(e.target.value)}
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
          onClick={handleDownloadDoc}
        >
          <ArticleSharpIcon />
        </IconButton>
        <IconButton
          title="Export as PDF"
          sx={{ "&:hover": { color: "red" } }}
          onClick={printDocument}
        >
          <PictureAsPdfIcon />
        </IconButton>
        <IconButton
          title="Copy Text"
          sx={{ "&:hover": { color: "orange" } }}
          onClick={handleCopyClipboard}
        >
          <ContentCopySharpIcon />
        </IconButton>
        <IconButton
          title="Save"
          sx={{ "&:hover": { color: "green" } }}
          onClick={handleSaveDocument}
        >
          <SaveAsIcon />
        </IconButton>
      </Grid>
      <JoditEditor
        ref={editor}
        value={converter.makeHtml(content)}
        config={ismobile ? config1 : config}
        // key={content}
        onBlur={(newContent) => setContent(newContent)}
      />
    </Grid>
  );
};
