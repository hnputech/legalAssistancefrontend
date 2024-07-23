import React, { useState } from "react";
import { PurchaseForm } from "./GoodsPurchase";
import { TemplateEditor } from "../../editer";
import { Box, Grid } from "@mui/material";
import { EmploymentAgreement } from "./EmploymentAgreement";
import { LeaseAgreement } from "./Lease";
import { LoanAgreement } from "./Loan";
import { NDA } from "./NDA";
import { Partnership } from "./Partnership";
import { RentAgreement } from "./Rent";
import { Patent } from "../applications/Patent";
import { Trademark } from "../applications/Trademark";
import { Demand } from "../letters/Demand";
import { OfferLetter } from "../letters/Offer";
import { useParams, useNavigate } from "react-router-dom";

const templatFormObj = {
  partnershipagreement: Partnership,
  nondisclosureagreementnda: NDA,
  employmentcontract: EmploymentAgreement,
  leaseagreement: LeaseAgreement,
  purchaseandsellagreement: PurchaseForm,
  rentalagreement: RentAgreement,
  loanagreement: LoanAgreement,
  offerletter: OfferLetter,
  demandletter: Demand,
  patentapplication: Patent,
  trademarkapplication: Trademark,
};

const SellPurchase = () => {
  let { templateId } = useParams();
  const [content, setContent] = useState("");

  return (
    <Grid
      sx={{
        overflow: "auto",
        height: "100vh",
      }}
      container
    >
      <Grid item xs={12} md={5}>
        {React.createElement(templatFormObj[templateId], {
          setContent: setContent,
        })}
      </Grid>
      <Grid item xs={12} md={7} style={{ padding: "20px" }}>
        <TemplateEditor content={content} setContent={setContent} />
      </Grid>
    </Grid>
  );
};

export default SellPurchase;
