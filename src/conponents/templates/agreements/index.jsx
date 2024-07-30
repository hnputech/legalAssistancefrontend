import React, { useState } from "react";
import { PurchaseForm } from "./GoodsPurchase";
import { TemplateEditor } from "../../editer";
import { Grid } from "@mui/material";
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
import { useParams } from "react-router-dom";
import { useIsMobile } from "../../../hooks/useIsMobile";

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
  const [documentName, setDocumentName] = useState("New document");
  const [documentId, setDocumentId] = useState("");

  const isMobile = useIsMobile();

  return (
    <Grid
      sx={{
        overflow: "auto",
        // height: "100vh",
        height: isMobile ? "100vh" : "calc(100vh - 64px)",
      }}
      container
    >
      <Grid item xs={12} md={3}>
        {React.createElement(templatFormObj[templateId], {
          setContent: setContent,
          content: content,
          documentName: documentName,
          setDocumentId: setDocumentId,
        })}
      </Grid>
      <Grid item xs={12} md={8} style={{ padding: "20px" }}>
        <TemplateEditor
          content={content}
          setContent={setContent}
          documentName={documentName}
          setDocumentName={setDocumentName}
          documentId={documentId}
        />
      </Grid>
    </Grid>
  );
};

export default SellPurchase;
