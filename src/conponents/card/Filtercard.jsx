import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import leaseimg from "../../assets/lease.png";
import TextField from "@mui/material/TextField";
import { TemplateFilter } from "../templates/TemplateFilter";

export const FilterCard = ({
  icon = leaseimg,
  title = "Title",
  description = "description",
  filter,
  handleUpdateFilter,
  search,
  handleUpdateSearch,
}) => {
  console.log("======search", search);
  const handleChange = (e) => {
    handleUpdateSearch(e.target.value);
  };
  return (
    <Card
      sx={{
        width: "80%",
        borderRadius: "5px",
      }}
    >
      <CardContent>
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
        <TextField
          fullWidth
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
