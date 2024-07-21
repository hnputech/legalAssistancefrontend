import React from "react";
import PurchaseForm from "./GoodsPurchase";
import { TemplateEditor } from "../../editer";
import { Box, Grid } from "@mui/material";

const SellPurchase = () => {
  return (
    <Grid
      sx={{
        overflow: "auto",
        height: "100vh",
      }}
      container
      // style={{
      //   display: "flex",
      //   rowGap: "20px",
      // }}
    >
      <Grid item xs={12} md={5}>
        <PurchaseForm />
      </Grid>
      <Grid item xs={12} md={7} style={{ padding: "20px" }}>
        <TemplateEditor />
      </Grid>
    </Grid>
  );
};

export default SellPurchase;
