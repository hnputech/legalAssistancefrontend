import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import leaseimg from "../../assets/lease.png";
import { CardActionArea } from "@mui/material";

export const BasicCard = ({
  icon = leaseimg,
  title = "Title",
  description = "description",
  id = "",
  minWidth = 350,
  maxWidth = 345,
  hover = true,
}) => {
  return (
    <Card
      sx={(theme) => ({
        // minWidth: minWidth,
        // maxWidth: maxWidth,
        // width: "20vw",
        // width: "350px",
        width: {
          xs: "100%",
          sm: "400px",
        },

        borderRadius: "5px",
        transition: hover ? "transform 0.3s, border 0.3s" : "",
        "&:hover": {
          // borderColor: theme.vars.palette.primary.outlinedHoverBorder,
          transform: hover ? "translateY(4px)" : "",
          backgroundColor: "#f1f1f1",
        },
      })}
    >
      {/* <CardActionArea> */}
      <Link to={`/template/${id}`} underline="none">
        <CardContent style={{ color: "rgba(0, 0, 0, 0.87)" }}>
          <img src={icon} width={30} height={30} />
          <Typography
            variant="h6"
            sx={{ marginTop: "5px", fontWeight: "bold" }}
            gutterBottom
          >
            {title}
          </Typography>

          <Typography variant="body2">{description}.</Typography>
        </CardContent>
      </Link>
      {/* </CardActionArea> */}
    </Card>
  );
};
