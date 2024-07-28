import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { TemplateEditor } from "../editer";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getUserTemplateById } from "../../requests/template";
import { useIsMobile } from "../../hooks/useIsMobile";

export const EditTemplate = () => {
  const [content, setContent] = useState("");
  const [documentName, setDocumentName] = useState("");
  const { documentId } = useParams();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserTemplateById(documentId);
      setContent(data[0].text);
      setDocumentName(data[0].name);
      console.log("=====data", data);
    };

    fetchData();
  }, [documentId]);
  return (
    <Grid item xs={12} md={8} style={{ padding: "20px" }}>
      {isMobile ? (
        <ArrowBackIcon
          onClick={() => {
            navigate("/AllGeneratedTemplate/testing123");
          }}
          style={{
            marginBottom: "10px",
          }}
        />
      ) : null}
      <TemplateEditor
        content={content}
        setContent={setContent}
        documentName={documentName}
        setDocumentName={setDocumentName}
        documentId={documentId}
      />
    </Grid>
  );
};
