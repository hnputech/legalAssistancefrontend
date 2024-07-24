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
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { searchdaata } from "../const";
import { useIsMobile } from "../../../hooks/useIsMobile";
import MultiToggle from "../../multiToggle/MutiToggle";

export const Patent = ({ setContent }) => {
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
            name="applicantName"
            control={control}
            defaultValue=""
            rules={{ required: "Applicant Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Applicant Name"
                variant="outlined"
                error={!!errors.applicantName}
                helperText={
                  errors.applicantName ? errors.applicantName.message : ""
                }
              />
            )}
          />

          <Controller
            name="applicantAddress"
            control={control}
            defaultValue=""
            rules={{ required: "Applicant Address is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Applicant Address"
                variant="outlined"
                error={!!errors.applicantAddress}
                helperText={
                  errors.applicantAddress ? errors.applicantAddress.message : ""
                }
              />
            )}
          />

          <Controller
            name="inventionTitle"
            control={control}
            defaultValue=""
            rules={{ required: "Invention Title is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Invention Title"
                variant="outlined"
                error={!!errors.inventionTitle}
                helperText={
                  errors.inventionTitle ? errors.inventionTitle.message : ""
                }
              />
            )}
          />

          <Controller
            name="inventorNames"
            control={control}
            defaultValue=""
            rules={{ required: "Inventor Names are required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Inventor Names"
                variant="outlined"
                error={!!errors.inventorNames}
                helperText={
                  errors.inventorNames ? errors.inventorNames.message : ""
                }
              />
            )}
          />

          <Controller
            name="inventionDescription"
            control={control}
            defaultValue=""
            rules={{ required: "Invention Description is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Invention Description"
                variant="outlined"
                error={!!errors.inventionDescription}
                helperText={
                  errors.inventionDescription
                    ? errors.inventionDescription.message
                    : ""
                }
                multiline
                rows={4}
              />
            )}
          />

          <Controller
            name="fieldOfInvention"
            control={control}
            defaultValue=""
            rules={{ required: "Field of Invention is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Field of Invention"
                variant="outlined"
                error={!!errors.fieldOfInvention}
                helperText={
                  errors.fieldOfInvention ? errors.fieldOfInvention.message : ""
                }
              />
            )}
          />

          <Controller
            name="backgroundOfInvention"
            control={control}
            defaultValue=""
            rules={{ required: "Background of Invention is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Background of Invention"
                variant="outlined"
                error={!!errors.backgroundOfInvention}
                helperText={
                  errors.backgroundOfInvention
                    ? errors.backgroundOfInvention.message
                    : ""
                }
                multiline
                rows={4}
              />
            )}
          />

          <Controller
            name="summaryOfInvention"
            control={control}
            defaultValue=""
            rules={{ required: "Summary of Invention is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Summary of Invention"
                variant="outlined"
                error={!!errors.summaryOfInvention}
                helperText={
                  errors.summaryOfInvention
                    ? errors.summaryOfInvention.message
                    : ""
                }
                multiline
                rows={4}
              />
            )}
          />

          <Controller
            name="detailedDescription"
            control={control}
            defaultValue=""
            rules={{ required: "Detailed Description is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Detailed Description"
                variant="outlined"
                error={!!errors.detailedDescription}
                helperText={
                  errors.detailedDescription
                    ? errors.detailedDescription.message
                    : ""
                }
                multiline
                rows={4}
              />
            )}
          />

          <Controller
            name="claims"
            control={control}
            defaultValue=""
            rules={{ required: "Claims are required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Claims"
                variant="outlined"
                error={!!errors.claims}
                helperText={errors.claims ? errors.claims.message : ""}
                multiline
                rows={4}
              />
            )}
          />

          <Controller
            name="filingDate"
            control={control}
            defaultValue=""
            rules={{ required: "Filing Date is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Filing Date"
                variant="outlined"
                error={!!errors.filingDate}
                helperText={errors.filingDate ? errors.filingDate.message : ""}
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
