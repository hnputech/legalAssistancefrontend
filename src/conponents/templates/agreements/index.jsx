import React from "react";
import PurchaseForm from "./GoodsPurchase";
import { TemplateEditor } from "../../editer";

const SellPurchase = () => {
  return (
    <div
      style={{
        display: "flex",
        rowGap: "20px",
      }}
    >
      <PurchaseForm />
      <div style={{ padding: "20px" }}>
        <TemplateEditor />
      </div>
    </div>
  );
};

export default SellPurchase;
