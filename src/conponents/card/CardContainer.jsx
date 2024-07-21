import React from "react";
import { BasicCard } from ".";
import { Typography } from "@mui/material";

export const CardContainer = ({ title, description, data }) => {
  return (
    <div>
      <Typography variant="h4">{title}</Typography>
      <Typography
        variant="body2"
        sx={{
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        {description}.
      </Typography>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {data.map((item) => {
          return (
            <BasicCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
              id={item.id}
              type={item.type}
            />
          );
        })}
      </div>
    </div>
  );
};
