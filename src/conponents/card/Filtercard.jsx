import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import legal from "../../assets/legal.png";
import { TemplateFilter } from "../templates/TemplateFilter";
import { useIsMobile } from "../../hooks/useIsMobile";

export const FilterCard = ({
  icon = legal,
  title = "Title",
  description = "description",
  filter,
  handleUpdateFilter,
  search,
  handleUpdateSearch,
}) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleChange = (e) => {
    handleUpdateSearch(e.target.value);
  };

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: "5px",
      }}
    >
      <CardContent>
        <div style={{ marginLeft: "10px" }}>
          {isMobile ? (
            <ArrowBackIcon
              onClick={() => {
                navigate("/");
              }}
              style={{
                marginBottom: "10px",
              }}
            />
          ) : null}
          <div
            style={{
              display: "flex ",
            }}
          >
            <img src={icon} width={30} height={30} />
            <Typography
              variant="h6"
              sx={{ marginTop: "5px", fontWeight: "bold" }}
              gutterBottom
            >
              {title}
            </Typography>
          </div>
          <Typography variant="body2">{description}</Typography>
        </div>

        <TextField
          fullWidth
          sx={{ marginTop: "10px" }}
          id="fullWidth"
          placeholder="Search template"
          value={search}
          onChange={handleChange}
          InputProps={{
            style: {
              borderRadius: "50vh",
            },
          }}
        />
        <TemplateFilter
          filter={filter}
          handleUpdateFilter={handleUpdateFilter}
        />
      </CardContent>
    </Card>
  );
};
