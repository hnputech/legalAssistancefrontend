import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { TemplateEditor } from "../editer";
import { useParams } from "react-router-dom";
import { getUserTemplateById } from "../../requests/template";

export const EditTemplate = () => {
  const [content, setContent] = useState("");
  const [documentName, setDocumentName] = useState("");
  const { documentId } = useParams();

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
