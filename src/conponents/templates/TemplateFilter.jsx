import React from "react";
import "./filter.css";
import { cardData } from "./const";

export const TemplateFilter = ({ filter, handleUpdateFilter }) => {
  return (
    <div className="template-filter-container">
      <span
        className={`template-filter ${filter === "" ? "active" : ""}`}
        onClick={() => handleUpdateFilter("")}
      >
        All templates
      </span>
      {Object.keys(cardData).map((item) => (
        <span
          className={`template-filter ${filter === item ? "active" : ""}`}
          onClick={() => handleUpdateFilter(item)}
          key={item}
        >
          {item}
        </span>
      ))}
    </div>
  );
};
