import React from "react";
import { cardData } from "./Template";

export const TemplateFilter = ({ filter, handleUpdateFilter }) => {
  return (
    <div
      style={{
        backgroundColor: "#f5f9fc",
        borderRadius: "50vh",
        display: "flex",
        gap: "20px",
        alignItems: "center",
        height: "50px",
      }}
    >
      <span
        className="template-filter"
        onClick={() => handleUpdateFilter("")}
        style={{
          backgroundColor: filter === "" ? "#f1f1f1" : "",
          marginLeft: "20px",
          "&:hover": {
            backgroundColor: "#f1f1f1",
          },
        }}
      >
        All templates
      </span>
      {Object.keys(cardData).map((item) => (
        <span
          className="template-filter"
          onClick={() => handleUpdateFilter(item)}
          style={{
            backgroundColor: filter === item ? "#f1f1f1" : "",
            marginLeft: "20px",
            "&:hover": {
              backgroundColor: "#f1f1f1",
            },
            // height: "50px",
          }}
        >
          {item}
        </span>
      ))}
    </div>
  );
};
