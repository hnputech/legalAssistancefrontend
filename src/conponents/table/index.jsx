import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { StyledPaginationTable } from "./StyledPaginationTable";
import { getUserTemplatesData } from "../../requests/template";
import { useIsMobile } from "../../hooks/useIsMobile";
import { Backdrop, CircularProgress } from "@mui/material";

export const AllGeneratedTemplate = () => {
  const [tableData, setTableDta] = useState([]);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setOpen(true);
      const res = await getUserTemplatesData(userId);
      console.log("res", res);
      setTableDta(res);
      setOpen(false);
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);
  console.log("======userid", userId);
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // height: "100vh",
          marginTop: !isMobile ? "40px" : "",
          padding: "20px",
        }}
      >
        <StyledPaginationTable data={tableData} setTableDta={setTableDta} />
      </div>
    </>
  );
};
