import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import {} from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { searchdaata } from "../const";
import { useIsMobile } from "../../../hooks/useIsMobile";
import MultiToggle from "../../multiToggle/MutiToggle";

export const NDA = ({ setContent }) => {
  const [active, setActive] = useState("gpt-4o");

  let { templateId } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const cardInfo = searchdaata.find((item) => item.id === templateId);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `https://legalbackend-aondtyyl6a-uc.a.run.app/templateGenerator/${templateId}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: data }),
        }
      );

      if (!response.ok || !response.body) {
        throw new Error(response.statusText);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const decodedChunk = decoder.decode(value, { stream: true });

        setContent((prevContent) => prevContent + decodedChunk);
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  return (
    <Card>
      <CardContent>
        {isMobile ? (
          <ArrowBackIcon onClick={() => navigate("/template")} />
        ) : null}
        <Typography
          variant="h6"
          sx={{ marginTop: "5px", fontWeight: "bold" }}
          gutterBottom
        >
          {cardInfo.title}
        </Typography>

        <Typography variant="body2">{cardInfo.description}.</Typography>
        <Box sx={{ "& > :not(style)": { m: 2, width: "35ch" } }}>
          <MultiToggle active={active} setActive={setActive} />
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ "& > :not(style)": { m: 2, width: "35ch" } }}
        >
          <Controller
            name="purposeOfTheNDA"
            control={control}
            defaultValue=""
            rules={{ required: "Purpose of the NDA is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Purpose of the NDA"
                variant="outlined"
                error={!!errors.buyer}
                helperText={errors.buyer ? errors.buyer.message : ""}
              />
            )}
          />

          <Controller
            name="typeOfConfidentiality"
            control={control}
            defaultValue=""
            rules={{ required: "Confidentiality type is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Mutual or one-way confidentiality"
                variant="outlined"
                error={!!errors.seller}
                helperText={errors.seller ? errors.seller.message : ""}
              />
            )}
          />

          <Controller
            name="durationOfConfidentiality"
            control={control}
            defaultValue=""
            rules={{ required: "duration Of Confidentiality Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="How long does confidentiality last"
                variant="outlined"
                error={!!errors.buyerAddress}
                helperText={
                  errors.buyerAddress ? errors.buyerAddress.message : ""
                }
              />
            )}
          />
          <Controller
            name="GoverningLaw"
            control={control}
            defaultValue=""
            rules={{ required: "Governing law  is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Governing law and jurisdiction"
                variant="outlined"
                error={!!errors.seller}
                helperText={errors.seller ? errors.seller.message : ""}
              />
            )}
          />

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
